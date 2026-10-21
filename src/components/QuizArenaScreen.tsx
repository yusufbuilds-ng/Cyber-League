import React, { useState, useEffect } from 'react';
import { QuizQuestion, TabType } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface QuizArenaScreenProps {
  questions: QuizQuestion[];
  onAddXp: (amount: number) => void;
  onNavigate: (tab: TabType) => void;
}

export const QuizArenaScreen: React.FC<QuizArenaScreenProps> = ({
  questions,
  onAddXp,
  onNavigate,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('B');
  const [isDebrief, setIsDebrief] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [threatIntelOpen, setThreatIntelOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [roundExecutionTime, setRoundExecutionTime] = useState(8.4);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentIdx % questions.length];
  const maxSeconds = 60;
  const circumference = 2 * Math.PI * 23;

  // Countdown timer for question mode
  useEffect(() => {
    if (isDebrief) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isDebrief, currentIdx]);

  // Keyboard navigation [1-4] and Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (threatIntelOpen) return;
      if (!isDebrief) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const index = parseInt(e.key, 10) - 1;
          if (question.options[index]) {
            soundFx.playClick();
            setSelectedOption(question.options[index].key);
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit();
        }
      } else {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDebrief, selectedOption, threatIntelOpen, currentIdx]);

  const handleSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    soundFx.playClick();

    const elapsed = Math.max(1, maxSeconds - secondsLeft);
    const execTime = Number((elapsed * 0.4 + 4.2).toFixed(1));
    setRoundExecutionTime(execTime);

    const isCorrect = selectedOption === question.correctAnswer;
    if (isCorrect) {
      soundFx.playSuccess();
      onAddXp(45);
    } else {
      soundFx.playAlert();
      onAddXp(10);
    }

    setTimeout(() => {
      setIsDebrief(true);
      setIsSubmitting(false);
    }, 250);
  };

  const handleNextQuestion = () => {
    soundFx.playClick();
    setIsDebrief(false);
    setSelectedOption('B');
    setSecondsLeft(45);
    setCurrentIdx((prev) => prev + 1);
  };

  const timerOffset = circumference - (secondsLeft / maxSeconds) * circumference;
  const isTimeCritical = secondsLeft <= 15;

  return (
    <div className="flex flex-col w-full relative min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-10 justify-between overflow-hidden">
      {/* Tactical Glow Backdrops */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 right-10 w-[30rem] h-[30rem] bg-secondary-container/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(#2e3545_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none"></div>

      {/* Screen 3: ACTIVE QUESTION VIEW */}
      {!isDebrief && (
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-between min-h-[82vh] gap-6">
          {/* STAGE HEADER / HUD METRICS */}
          <header className="w-full flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-low/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg shadow-black/40 border border-surface-container-high/40">
              {/* Left: Sector / Stage Index & Category */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-surface-container-high border border-surface-container-highest">
                  <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  <span className="font-label-md uppercase tracking-wider text-on-surface font-mono font-bold">
                    QUESTION 0{((currentIdx % 10) + 1)} / 10
                  </span>
                </div>
                <span className="font-label-sm text-outline hidden sm:inline-block">•</span>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container/20 text-tertiary shadow-[0_0_12px_rgba(0,218,243,0.25)] border border-tertiary/30">
                  <span className="material-symbols-outlined text-[16px]">security</span>
                  <span className="font-label-sm tracking-widest uppercase font-semibold">
                    {question.category}
                  </span>
                </div>
              </div>

              {/* Right: Animated Countdown Radial HUD */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="font-label-sm uppercase tracking-wider text-outline">
                    TIME ALLOCATED
                  </span>
                  <span
                    className={`font-label-md tracking-tight font-semibold flex items-center gap-1 ${
                      isTimeCritical ? 'text-error animate-pulse' : 'text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
                    {isTimeCritical ? 'STAGE CRITICAL' : 'STAGE OPTIMAL'}
                  </span>
                </div>

                <div className="relative flex items-center justify-center w-14 h-14">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 56 56">
                    <circle
                      className="text-surface-container-highest"
                      cx="28"
                      cy="28"
                      fill="none"
                      r="23"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></circle>
                    <circle
                      className={`transition-all duration-1000 ease-linear ${
                        isTimeCritical ? 'text-error' : 'text-tertiary'
                      }`}
                      cx="28"
                      cy="28"
                      fill="none"
                      r="23"
                      stroke="currentColor"
                      strokeDasharray={circumference}
                      strokeDashoffset={timerOffset}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span
                      className={`font-label-md font-semibold tracking-tighter font-mono ${
                        isTimeCritical ? 'text-error' : 'text-on-surface'
                      }`}
                    >
                      00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Linear Micro Progress Bar with Neon Indicator */}
            <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-tertiary via-primary to-secondary rounded-full shadow-[0_0_12px_rgba(0,218,243,0.8)] transition-all duration-500"
                style={{ width: `${(((currentIdx % 10) + 1) / 10) * 100}%` }}
              ></div>
            </div>
          </header>

          {/* CENTER STAGE ARENA */}
          <main className="w-full my-auto py-2 flex flex-col gap-5">
            {/* Question Container Card */}
            <div className="relative bg-surface-container/85 backdrop-blur-xl rounded-xl p-6 sm:p-8 shadow-2xl shadow-black/60 overflow-hidden border border-surface-container-high/60">
              {/* Threat Drill Badge / Telemetry Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-error-container/40 text-error shadow-[0_0_12px_rgba(147,0,10,0.5)] border border-error/30">
                  <span className="material-symbols-outlined text-[16px] animate-pulse">warning</span>
                  <span className="font-label-sm uppercase tracking-widest font-semibold">
                    CRITICAL INCIDENT DRILL
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-label-sm text-outline">
                    LATENCY: <strong className="text-on-surface font-mono">14ms</strong>
                  </span>
                  <span className="font-label-sm text-outline">
                    DIFFICULTY: <strong className="text-secondary font-mono">{question.difficulty}</strong>
                  </span>
                </div>
              </div>

              {/* Question Prompt */}
              <h1 className="font-headline-md sm:font-headline-lg text-on-surface tracking-tight leading-snug">
                {question.title}
              </h1>

              {/* Interactive Micro Scenario Strip */}
              <div className="mt-4 pt-4 flex items-center gap-3 bg-surface-container-low/70 px-4 py-2.5 rounded-lg text-on-surface-variant font-body-sm border border-surface-container-high/40">
                <span className="material-symbols-outlined text-[18px] text-tertiary">mail</span>
                <span className="truncate font-label-sm text-outline">
                  FROM: <code className="text-on-surface">{question.scenarioSnippet.from}</code>
                </span>
                <span className="ml-auto hidden md:inline-block font-label-sm text-error font-semibold">
                  {question.scenarioSnippet.flag}
                </span>
              </div>
            </div>

            {/* Multiple Choice Stack */}
            <div className="grid grid-cols-1 gap-3.5">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedOption(opt.key);
                    }}
                    className={`group relative flex items-center justify-between p-4 sm:p-5 rounded-xl transition-all duration-200 cursor-pointer shadow-md ${
                      isSelected
                        ? 'bg-surface-container-high ring-1 ring-tertiary shadow-[0_0_24px_rgba(0,218,243,0.35)]'
                        : 'bg-surface-container-low/80 hover:bg-surface-container-high border border-surface-container-high/40'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0 pr-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-label-md font-semibold transition-colors ${
                          isSelected
                            ? 'bg-tertiary text-on-tertiary shadow-[0_0_10px_rgba(0,218,243,0.6)]'
                            : 'bg-surface-container-highest text-outline group-hover:text-on-surface'
                        }`}
                      >
                        {opt.key}
                      </div>
                      <p
                        className={`font-body-md text-on-surface tracking-normal select-none ${
                          isSelected ? 'font-medium' : ''
                        }`}
                      >
                        {opt.text}
                      </p>
                    </div>

                    <div className="flex-shrink-0 flex items-center gap-3">
                      <span
                        className={`hidden sm:inline-block font-label-sm uppercase px-2 py-0.5 rounded ${
                          isSelected
                            ? 'bg-tertiary-container/40 text-tertiary font-semibold shadow-[0_0_8px_rgba(0,218,243,0.4)]'
                            : 'bg-surface-container-highest text-outline group-hover:text-on-surface'
                        }`}
                      >
                        Key [{idx + 1}]
                      </span>
                      <div
                        className={`flex items-center justify-center ${
                          isSelected
                            ? 'w-6 h-6 rounded-full bg-tertiary text-on-tertiary shadow-[0_0_8px_rgba(0,218,243,0.8)]'
                            : 'w-5 h-5 rounded-full bg-surface-container-highest'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>

          {/* BOTTOM HUD BAR */}
          <footer className="w-full pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Streak & Combo Bonus Telemetry */}
            <div className="flex items-center gap-3 bg-surface-container-low/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-surface-container-high/40">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container shadow-[0_0_12px_rgba(111,0,190,0.5)]">
                <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-secondary font-semibold">3X STREAK ACTIVE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span>
                </div>
                <span className="font-label-sm text-outline">+15 XP speed multiplier active</span>
              </div>
            </div>

            {/* Action Cluster: Submit and Short-circuit Hint */}
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="hidden lg:flex items-center gap-1.5 text-outline font-label-sm">
                <span>PRESS</span>
                <kbd className="px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-sm uppercase shadow border border-surface-container-highest">
                  ENTER ↵
                </kbd>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto relative group flex items-center justify-center gap-3 px-8 py-3.5 rounded-lg bg-gradient-to-r from-secondary-container via-primary-container to-tertiary-container text-on-primary font-headline-sm uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(111,0,190,0.6)] hover:shadow-[0_0_30px_rgba(0,218,243,0.8)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                <span className="relative z-10 text-white drop-shadow">SUBMIT ANSWER</span>
                <span className="material-symbols-outlined text-[22px] text-white transition-transform group-hover:translate-x-1 relative z-10">
                  arrow_forward
                </span>
                <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* Screen 4: DEBRIEF / POST-ACTION RESULT VIEW */}
      {isDebrief && (
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-6 py-2">
          {/* Header Strip */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-surface-container-high text-tertiary font-label-md tracking-wider uppercase border border-tertiary/20 font-bold">
                STATION 0{((currentIdx % 10) + 1)} // VECTOR NEUTRALIZED
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 font-label-sm text-outline">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                REAL-TIME TELEMETRY VERIFIED
              </span>
            </div>
            <div className="flex items-center gap-2 font-label-sm text-on-surface-variant font-mono">
              <span>SESSION ID</span>
              <span className="font-label-md text-tertiary font-bold">#CL-88942-X</span>
            </div>
          </div>

          {/* Main Debrief Box */}
          <div className="relative rounded-xl bg-surface-container-low shadow-[0_0_50px_rgba(0,218,243,0.18)] p-1 border border-surface-container-high">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-tertiary/60 via-tertiary-container/20 to-secondary/30 pointer-events-none"></div>

            <div className="relative rounded-[10px] bg-surface-container-lowest/95 backdrop-blur-2xl p-6 sm:p-10 flex flex-col gap-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-tertiary/10 to-transparent pointer-events-none"></div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="font-label-sm uppercase tracking-widest text-outline">
                  DEFENSE SCORE
                </span>
                <span className="font-label-lg text-tertiary font-bold font-mono">MAXIMUM</span>
              </div>

              {/* Central Victory Crest */}
              <div className="flex flex-col items-center text-center gap-4 pt-2">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 w-28 h-28 rounded-full bg-tertiary/20 blur-xl animate-pulse"></div>
                  <div className="relative w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center shadow-[0_0_25px_rgba(0,218,243,0.5)] border border-tertiary/40">
                    <svg
                      className="w-16 h-16 text-tertiary"
                      fill="none"
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="opacity-80"
                        d="M24 4L8 10V22C8 32.5 14.8 42.2 24 44C33.2 42.2 40 32.5 40 22V10L24 4Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      ></path>
                      <path
                        d="M16 24.5L21.5 30L32 18"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      ></path>
                      <circle
                        className="opacity-40"
                        cx="24"
                        cy="24"
                        r="19"
                        stroke="currentColor"
                        strokeDasharray="2 3"
                        strokeWidth="1"
                      ></circle>
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-tertiary font-label-sm uppercase tracking-widest shadow-[0_0_12px_rgba(0,218,243,0.4)] border border-tertiary/30 font-bold">
                    THREAT BLOCKED
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 mt-1">
                  <h1 className="font-headline-xl uppercase tracking-wider text-on-surface drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] font-bold text-3xl sm:text-5xl">
                    CORRECT!
                  </h1>
                  <p className="font-body-md text-on-surface-variant max-w-lg">
                    Adversary credential harvesting routine effectively isolated and purged from
                    simulated inbox memory.
                  </p>
                </div>

                {/* XP Reward Tags */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary/15 text-tertiary shadow-[0_0_16px_rgba(0,218,243,0.3)] border border-tertiary/30">
                    <span className="material-symbols-outlined text-[18px]">bolt</span>
                    <span className="font-label-lg font-bold font-mono">+30 XP</span>
                    <span className="font-label-sm opacity-80 uppercase tracking-wider">
                      BASE VICTORY
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary-container/60 text-secondary-fixed shadow-[0_0_12px_rgba(111,0,190,0.35)] border border-secondary/30">
                    <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                    <span className="font-label-md font-semibold">Streak Multiplier: +10 XP Bonus!</span>
                  </div>
                </div>
              </div>

              {/* Tactical Debrief Panel */}
              <div className="rounded-lg bg-surface-container-low/90 p-5 sm:p-6 flex flex-col gap-4 border border-surface-container-high/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      format_image_left
                    </span>
                    <span className="font-label-md uppercase tracking-wider text-tertiary font-semibold">
                      TACTICAL DEBRIEF // DETAILED ANALYSIS
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-on-surface-variant border border-surface-container-highest font-mono">
                    {question.mitreAttackId}
                  </span>
                </div>
                <p className="font-body-md text-on-surface leading-relaxed">
                  {question.debrief}
                </p>

                {/* Micro Analysis Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1 border border-surface-container-high">
                    <div className="flex items-center justify-between text-outline">
                      <span className="font-label-sm uppercase">Threat Profile</span>
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        radar
                      </span>
                    </div>
                    <span className="font-label-md text-on-surface font-semibold truncate">
                      {question.threatProfile}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1 border border-surface-container-high">
                    <div className="flex items-center justify-between text-outline">
                      <span className="font-label-sm uppercase">Spoofed Entity</span>
                      <span className="material-symbols-outlined text-[16px] text-error">
                        domain_verification
                      </span>
                    </div>
                    <span className="font-label-md text-on-surface font-semibold truncate">
                      {question.spoofedEntity}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-1 border border-surface-container-high">
                    <div className="flex items-center justify-between text-outline">
                      <span className="font-label-sm uppercase">Risk Neutralized</span>
                      <span className="material-symbols-outlined text-[16px] text-tertiary">
                        key_off
                      </span>
                    </div>
                    <span className="font-label-md text-on-surface font-semibold truncate">
                      {question.riskNeutralized}
                    </span>
                  </div>
                </div>
              </div>

              {/* Response Metrics Panel */}
              <div className="rounded-lg bg-surface-container p-4 sm:p-5 flex flex-col gap-3 border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">speed</span>
                    <span className="font-label-sm uppercase tracking-wider text-on-surface-variant">
                      RESPONSE METRICS
                    </span>
                  </div>
                  <span className="font-label-sm text-tertiary font-semibold flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> FAST RESPONSE BONUS: +5 XP
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                      <span className="material-symbols-outlined text-[20px]">target</span>
                    </div>
                    <div>
                      <span className="block font-label-sm uppercase text-outline">Accuracy</span>
                      <span className="font-label-lg font-bold text-on-surface font-mono">
                        100% (Clean Hit)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[20px]">timer</span>
                    </div>
                    <div>
                      <span className="block font-label-sm uppercase text-outline">
                        Execution Time
                      </span>
                      <span className="font-label-lg font-bold text-on-surface font-mono">
                        {roundExecutionTime}s{' '}
                        <span className="font-label-sm text-outline font-normal">/ 30.0s</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-[20px]">military_tech</span>
                    </div>
                    <div>
                      <span className="block font-label-sm uppercase text-outline">
                        Total Round Gain
                      </span>
                      <span className="font-label-lg font-bold text-tertiary font-mono">+45 XP</span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-gradient-to-r from-tertiary via-primary-container to-secondary h-full rounded-full w-[84%] transition-all duration-700 shadow-[0_0_10px_rgba(0,218,243,0.6)]"></div>
                </div>

                <div className="flex justify-between font-label-sm text-outline font-mono">
                  <span>Response Velocity: {roundExecutionTime}s</span>
                  <span>Speed Rating: Top 6% of Tier</span>
                </div>
              </div>

              {/* Forensic Snapshots Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center gap-3 border border-surface-container-high">
                  <img
                    className="w-14 h-14 rounded object-cover shadow-sm flex-shrink-0"
                    alt="Network map"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqH6Pwglmquwc9ThakohdDNlkvohec4sMfnBp2m-_HFj8PSCUNel5AKHiDMSYPeCeH-Lfn2_TwAWzUqN2okzNhgWoX2WN2sGBqwqa_av79tOsXT1i0zbMfuHet17xBF-yjJFUmAwrZvGrKB-whTWVZZQbGW2__dHm0I-J7PnPo9hfMDLAKIyarYIL68dvZgSYUyRkwAiDTMFIYjloxZ_E-sMm7JxWkoWwDLpLDpjPOMms8bthZICm-"
                  />
                  <div className="min-w-0 flex flex-col">
                    <span className="font-label-sm uppercase text-outline">Tactical Snapshot</span>
                    <span className="font-label-md text-on-surface font-semibold truncate">
                      {question.snapshotTitle}
                    </span>
                    <span className="font-body-sm text-on-surface-variant truncate">
                      {question.snapshotDetail}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-surface-container-low flex items-center gap-3 border border-surface-container-high">
                  <img
                    className="w-14 h-14 rounded object-cover shadow-sm flex-shrink-0"
                    alt="Forensic terminal"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxVnP3XLAfaiqGMr4qnlyqUgQcRHXX2nl0I-OZ-JU1IQj9ZCGrZ6_CfdZQFqIug9-Hd3HYl30q1EClnPb_laM0Rno3AIXFykxeSbTfo9sxIN3bCS-S8xR992eF_OTxLJ46BSQJ0Gk5nb53e_CWMVluOPzOxQyqEJyx1en4OP6pfglIOkd6zoUlscIOSUFCcP7n8csoR_oMtnHrESjMJQZGBBCy4b0Vf78ZgvS41khXBJotYNih7aej"
                  />
                  <div className="min-w-0 flex flex-col">
                    <span className="font-label-sm uppercase text-outline">
                      Forensic Verification
                    </span>
                    <span className="font-label-md text-on-surface font-semibold truncate">
                      {question.forensicTitle}
                    </span>
                    <span className="font-body-sm text-on-surface-variant truncate">
                      {question.forensicDetail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setThreatIntelOpen(true);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-surface-container text-tertiary font-label-md uppercase tracking-wider hover:bg-surface-container-high transition-all flex items-center justify-center gap-2 group border border-tertiary/20 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">
                    menu_book
                  </span>
                  <span>Review Threat Intel</span>
                </button>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setIsBookmarked(!isBookmarked);
                    }}
                    className={`px-4 py-3 rounded-lg bg-surface-container-low transition-all flex items-center justify-center border border-surface-container-high cursor-pointer ${
                      isBookmarked
                        ? 'text-tertiary bg-surface-container'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                    aria-label="Bookmark drill"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isBookmarked ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>

                  <button
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto min-w-[220px] px-6 py-3 rounded-lg bg-gradient-to-r from-primary-container via-primary to-secondary-container text-white font-label-lg uppercase tracking-wider font-semibold shadow-[0_0_20px_rgba(77,142,255,0.45)] hover:shadow-[0_0_25px_rgba(0,218,243,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Next Question</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Progress Strip */}
          <div className="flex items-center justify-between px-2 text-outline font-label-sm font-mono">
            <div className="flex items-center gap-4">
              <span>ARENA: DEFENSIVE SOC OPS</span>
              <span>•</span>
              <span>DIFFICULTY: HARD</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span>PROGRESS: {((currentIdx % 10) + 1)} OF 10 STATIONS</span>
            </div>
          </div>

          {/* Threat Intel Modal Drawer */}
          {threatIntelOpen && (
            <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="w-full max-w-xl rounded-xl bg-surface-container-low p-6 flex flex-col gap-5 shadow-2xl relative border border-surface-container-high">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">
                      security_update_warning
                    </span>
                    <h2 className="font-headline-sm text-on-surface font-bold">
                      SOC Threat Dossier
                    </h2>
                  </div>
                  <button
                    onClick={() => setThreatIntelOpen(false)}
                    className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="space-y-3 font-body-md text-on-surface-variant">
                  <p>
                    <strong className="text-on-surface">Attack Classification:</strong> Phishing /
                    Credential Harvester ({question.mitreAttackId})
                  </p>
                  <p>
                    <strong className="text-on-surface">Indicators of Compromise:</strong>{' '}
                    <code className="font-label-sm text-tertiary bg-surface-container px-1.5 py-0.5 rounded font-mono">
                      {question.dossierIoc}
                    </code>
                  </p>
                  <p>
                    <strong className="text-on-surface">Recommended Countermeasure:</strong>{' '}
                    {question.dossierMitigation}
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setThreatIntelOpen(false)}
                    className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors cursor-pointer"
                  >
                    Dismiss Dossier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
