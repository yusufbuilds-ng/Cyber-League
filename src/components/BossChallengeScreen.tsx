import React, { useState, useEffect } from 'react';
import { BossEmail, TabType } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface BossChallengeScreenProps {
  emails: BossEmail[];
  onNavigate: (tab: TabType) => void;
  onAwardBounty: (xp: number, badgeId: string) => void;
}

export const BossChallengeScreen: React.FC<BossChallengeScreenProps> = ({
  emails,
  onNavigate,
  onAwardBounty,
}) => {
  const [inSandbox, setInSandbox] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [activeEmailId, setActiveEmailId] = useState(1);
  const [emailStates, setEmailStates] = useState<Record<number, 'unreviewed' | 'quarantined' | 'verified_safe'>>({});
  const [strikes, setStrikes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(180);
  const [missionComplete, setMissionComplete] = useState(false);
  const [missionFailed, setMissionFailed] = useState(false);
  const [deployingSandbox, setDeployingSandbox] = useState(false);

  // Timer in active sandbox
  useEffect(() => {
    if (!inSandbox || missionComplete || missionFailed) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setMissionFailed(true);
          soundFx.playAlert();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [inSandbox, missionComplete, missionFailed]);

  const startChallenge = (isPractice: boolean) => {
    soundFx.playClick();
    setDeployingSandbox(true);
    setTimeout(() => {
      setDeployingSandbox(false);
      setIsPracticeMode(isPractice);
      setInSandbox(true);
      setEmailStates({});
      setStrikes(0);
      setTimerSeconds(180);
      setMissionComplete(false);
      setMissionFailed(false);
      setActiveEmailId(1);
    }, 1200);
  };

  const handleAction = (emailId: number, action: 'quarantine' | 'verify') => {
    const targetEmail = emails.find((e) => e.id === emailId);
    if (!targetEmail || emailStates[emailId]) return;

    soundFx.playClick();
    const isQuarantineAction = action === 'quarantine';
    const isActuallyMalicious = targetEmail.isMalicious;

    if (
      (isQuarantineAction && isActuallyMalicious) ||
      (!isQuarantineAction && !isActuallyMalicious)
    ) {
      // Correct!
      soundFx.playSuccess();
      const updated = {
        ...emailStates,
        [emailId]: isQuarantineAction ? ('quarantined' as const) : ('verified_safe' as const),
      };
      setEmailStates(updated);

      // Check win condition: all 5 malicious quarantined
      const quarantinedMaliciousCount = emails.filter(
        (e) => e.isMalicious && updated[e.id] === 'quarantined'
      ).length;

      if (quarantinedMaliciousCount === 5) {
        setMissionComplete(true);
        soundFx.playSuccess();
        if (!isPracticeMode) {
          onAwardBounty(750, 'badge-apex-phish');
        }
      }
    } else {
      // Mistake / Strike
      soundFx.playAlert();
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);
      if (newStrikes >= 3 && !isPracticeMode) {
        setMissionFailed(true);
      }
    }
  };

  const activeEmail = emails.find((e) => e.id === activeEmailId) || emails[0];
  const quarantinedCount = emails.filter((e) => emailStates[e.id] === 'quarantined').length;
  const verifiedCount = emails.filter((e) => emailStates[e.id] === 'verified_safe').length;

  return (
    <div className="flex flex-col w-full relative pb-16 overflow-hidden">
      {/* Dynamic Ambient Backing Glow & Grid Orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-secondary/15 via-tertiary/10 to-transparent blur-[140px] rounded-full"></div>
      <div className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 bg-secondary-container/20 blur-[100px] rounded-full"></div>
      <div className="pointer-events-none absolute bottom-12 -right-32 w-96 h-96 bg-tertiary-container/15 blur-[120px] rounded-full"></div>

      {/* HUD Status Bar / Navigation Breadcrumb */}
      <div className="w-full px-4 sm:px-6 xl:px-12 pt-6 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              if (inSandbox) {
                setInSandbox(false);
              } else {
                onNavigate('quiz');
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/80 text-on-surface-variant hover:text-tertiary hover:bg-surface-variant transition-all font-label-sm uppercase tracking-widest cursor-pointer border border-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>{inSandbox ? 'Exit Workstation' : 'Back to Arena'}</span>
          </button>
          <span className="font-label-sm text-outline-variant">/</span>
          <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
            Campaign Act II
          </span>
          <span className="font-label-sm text-outline-variant">/</span>
          <span className="font-label-sm text-tertiary uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
            Boss Incursion #04
          </span>
        </div>

        {/* Live Telemetry Ticker */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm border border-surface-container-high">
            <span className="text-error font-label-md">●</span>
            <span>
              GLOBAL DEFEAT RATE: <strong className="text-on-surface font-label-sm font-mono">68.4%</strong>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm border border-surface-container-high">
            <span className="material-symbols-outlined text-[15px] text-tertiary">timer</span>
            <span>
              AVG CLEAR TIME: <strong className="text-tertiary font-label-sm font-mono">02:14</strong>
            </span>
          </div>
        </div>
      </div>

      {/* VIEW 1: HERO BOSS BRIEFING SCREEN (Screen 6) */}
      {!inSandbox && (
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 xl:px-8 mt-6 z-10">
          {/* Grand Boss Card with Pulsing Gradient Border Enclosure */}
          <div className="relative p-[2px] rounded-xl bg-gradient-to-b from-secondary via-tertiary to-secondary-container shadow-[0_0_50px_rgba(111,0,190,0.35),0_0_80px_rgba(0,218,243,0.25)] transition-all">
            {/* High-Tech Chamfer HUD Brackets */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-tertiary pointer-events-none z-20"></div>
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-2 border-r-2 border-secondary pointer-events-none z-20"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-2 border-l-2 border-secondary pointer-events-none z-20"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-tertiary pointer-events-none z-20"></div>

            {/* Core Boss Content Panel */}
            <div className="relative rounded-xl bg-surface-container-lowest/95 backdrop-blur-2xl p-6 sm:p-10 xl:p-12 overflow-hidden border border-surface-container-high/40">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/10 via-surface-container-lowest to-surface-container-lowest pointer-events-none"></div>

              {/* Ambient Tactical Boss Hologram Background Graphic */}
              <div className="absolute -top-24 -right-24 w-96 h-96 opacity-10 pointer-events-none">
                <svg className="w-full h-full text-tertiary" fill="none" viewBox="0 0 200 200">
                  <polygon
                    points="100,10 190,55 190,145 100,190 10,145 10,55"
                    stroke="currentColor"
                    strokeDasharray="6 4"
                    strokeWidth="1.5"
                  ></polygon>
                  <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1"></circle>
                  <path d="M70,100 L130,100 M100,70 L100,130" stroke="currentColor" strokeWidth="1"></path>
                </svg>
              </div>

              {/* HEADER SECTION: League Tier Insignia & Threat Status */}
              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Glowing Bronze League Insignia with Cyber Wings */}
                <div className="relative flex items-center justify-center mb-4">
                  {/* Left Cyber Wing */}
                  <svg
                    className="w-16 h-8 text-outline transform -scale-x-100 hidden sm:block opacity-60"
                    fill="none"
                    viewBox="0 0 64 32"
                  >
                    <path d="M0,16 L32,4 L64,16 L48,28 L0,16 Z" fill="currentColor" fillOpacity="0.2"></path>
                    <path d="M0,16 L32,4 L64,16" stroke="currentColor" strokeWidth="1.5"></path>
                    <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="16" x2="48" y1="20" y2="20"></line>
                  </svg>

                  {/* Center Bronze Cyber Shield Crest */}
                  <div className="relative mx-3 p-1 rounded-full bg-gradient-to-tr from-[#cd7f32] via-[#e5a663] to-secondary-container shadow-[0_0_24px_rgba(205,127,50,0.5)]">
                    <div className="px-4 py-1.5 rounded-full bg-surface-container-lowest flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[20px] text-[#e5a663]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        military_tech
                      </span>
                      <span className="font-label-sm uppercase tracking-widest text-[#e5a663] font-semibold">
                        BRONZE III APEX BOSS
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e5a663] animate-pulse"></span>
                    </div>
                  </div>

                  {/* Right Cyber Wing */}
                  <svg className="w-16 h-8 text-outline hidden sm:block opacity-60" fill="none" viewBox="0 0 64 32">
                    <path d="M0,16 L32,4 L64,16 L48,28 L0,16 Z" fill="currentColor" fillOpacity="0.2"></path>
                    <path d="M0,16 L32,4 L64,16" stroke="currentColor" strokeWidth="1.5"></path>
                    <line stroke="currentColor" strokeDasharray="2 2" strokeWidth="1" x1="16" x2="48" y1="20" y2="20"></line>
                  </svg>
                </div>

                {/* Main Glowing Boss Title */}
                <div className="relative inline-block mb-2">
                  <h1 className="font-headline-xl text-3xl sm:text-5xl uppercase tracking-tight bg-gradient-to-r from-tertiary via-on-background to-secondary bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,218,243,0.45)] font-bold">
                    The Phishing Inbox
                  </h1>
                  <span className="absolute -top-3 -right-6 px-2 py-0.5 rounded bg-error-container text-on-error font-label-sm tracking-wider uppercase shadow-[0_0_12px_rgba(255,180,171,0.4)] font-bold">
                    CRITICAL THREAT
                  </span>
                </div>

                {/* Subtitle */}
                <div className="flex items-center gap-3 max-w-xl mx-auto w-full">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-outline-variant"></div>
                  <p className="font-headline-sm text-tertiary tracking-wide font-medium text-base sm:text-xl">
                    10 emails. 5 are malicious. Find them all.
                  </p>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-outline-variant"></div>
                </div>

                {/* Rating & Token Cost */}
                <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-high/70 shadow-[0_0_16px_rgba(0,218,243,0.25)] border border-tertiary/20">
                    <span className="font-label-sm text-on-surface-variant uppercase tracking-wider mr-1">
                      RATING:
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-outline-variant">star</span>
                    <span className="material-symbols-outlined text-[18px] text-outline-variant">star</span>
                    <span className="font-label-md text-tertiary ml-2 font-semibold">Challenging</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm tracking-widest uppercase border border-secondary/30">
                    ATTEMPT COST: 1 TOKEN
                  </div>
                </div>
              </div>

              {/* 3-COLUMN INTEL & COMBAT TELEMETRY GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 relative z-10">
                {/* Left Column (Span 7) */}
                <div className="lg:col-span-7 flex flex-col gap-5">
                  <div className="p-6 rounded-xl bg-surface-container-high/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden border border-surface-container-highest">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-tertiary via-primary to-transparent"></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-[20px]">badge</span>
                        <h3 className="font-label-lg uppercase tracking-wider text-on-surface font-bold">
                          Tactical Threat Dossier
                        </h3>
                      </div>
                      <span className="font-label-sm text-outline uppercase tracking-widest font-mono">
                        INTEL ID: PH-2994
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-lg bg-surface-container-low/90 flex flex-col gap-1 border border-surface-container-high">
                        <span className="font-label-sm text-outline-variant uppercase">
                          Threat Actor Designation
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-[18px]">skull</span>
                          <span className="font-headline-sm text-error font-semibold font-mono">APT-29</span>
                        </div>
                        <span className="font-label-sm text-on-surface-variant font-mono">
                          "Phantom Protocol"
                        </span>
                      </div>
                      <div className="p-3.5 rounded-lg bg-surface-container-low/90 flex flex-col gap-1 border border-surface-container-high">
                        <span className="font-label-sm text-outline-variant uppercase">
                          Primary Attack Vector
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[18px]">
                            forward_to_inbox
                          </span>
                          <span className="font-headline-sm text-secondary font-semibold font-mono">
                            Spear Phishing
                          </span>
                        </div>
                        <span className="font-label-sm text-on-surface-variant font-mono">
                          &amp; Spoofed Top-Level Domains
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-4 rounded-lg bg-surface-container-low/70 flex flex-col gap-2 border border-surface-container-high">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-tertiary uppercase tracking-wider font-semibold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                          Tactical Mission Directive
                        </span>
                        <span className="font-label-sm text-outline font-mono">AUTHORIZATION GRANTED</span>
                      </div>
                      <p className="font-body-md text-on-surface leading-relaxed">
                        Inspect complex email raw headers, authenticate{' '}
                        <span className="font-label-md text-primary px-1.5 py-0.5 rounded bg-surface-container-high font-mono">
                          DKIM / SPF
                        </span>{' '}
                        cryptographic signatures, and quarantine zero-day malicious payload
                        attachments without triggering security alarms or alerting adversary intrusion sensors.
                      </p>
                    </div>

                    <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm font-mono border-t border-surface-container-highest">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                        <span>ENCRYPTION: RSA-4096 / SHA-256</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-secondary">memory</span>
                        <span>SANDBOX SIMULATION: ARMED</span>
                      </div>
                    </div>
                  </div>

                  {/* Rules of Engagement */}
                  <div className="p-5 rounded-xl bg-surface-container-high/40 flex flex-col gap-3 border border-surface-container-high">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                        <span className="font-label-md uppercase tracking-wider text-on-surface font-semibold">
                          Incursion Rules of Engagement
                        </span>
                      </div>
                      <span className="font-label-sm text-outline uppercase font-mono">
                        PROTOCOL V4.2
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-surface-container-lowest/80 flex items-center gap-3 border border-surface-container-high">
                        <div className="w-9 h-9 rounded-lg bg-error-container/30 flex items-center justify-center text-error font-bold font-mono text-lg">
                          3
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-on-surface font-semibold">
                            Strike Fail Condition
                          </span>
                          <span className="font-label-sm text-on-surface-variant">
                            3 misidentifications triggers abort
                          </span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-surface-container-lowest/80 flex items-center gap-3 border border-surface-container-high">
                        <div className="w-9 h-9 rounded-lg bg-tertiary-container/30 flex items-center justify-center text-tertiary font-bold font-mono">
                          180s
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-on-surface font-semibold">
                            Live Incursion Timer
                          </span>
                          <span className="font-label-sm text-on-surface-variant">
                            Score decays per elapsed second
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (Span 5) */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <div className="p-6 rounded-xl bg-surface-container-high/60 relative overflow-hidden flex flex-col justify-between border border-surface-container-highest">
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-secondary via-primary to-transparent"></div>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary text-[22px]">
                            featured_seasonal_and_gifts
                          </span>
                          <h3 className="font-label-lg uppercase tracking-wider text-on-surface font-bold">
                            Victory Bounty Chest
                          </h3>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm tracking-widest font-semibold uppercase">
                          TIER 1 LOOT
                        </span>
                      </div>

                      <div className="flex flex-col gap-3">
                        {/* XP */}
                        <div className="p-3.5 rounded-lg bg-surface-container-low/90 flex items-center justify-between border border-surface-container-high">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-[22px]">
                              🏆
                            </div>
                            <div className="flex flex-col">
                              <span className="font-headline-sm text-tertiary font-bold">
                                +750 Season XP
                              </span>
                              <span className="font-label-sm text-on-surface-variant">
                                Instant progression unlock
                              </span>
                            </div>
                          </div>
                          <span className="font-label-sm text-tertiary uppercase font-mono tracking-wider font-bold">
                            SECURED
                          </span>
                        </div>

                        {/* Badge */}
                        <div className="p-3.5 rounded-lg bg-surface-container-low/90 flex items-center justify-between border border-surface-container-high">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-secondary-container/50 flex items-center justify-center text-[22px] shadow-[0_0_12px_rgba(111,0,190,0.4)]">
                              🛡️
                            </div>
                            <div className="flex flex-col">
                              <span className="font-label-lg text-secondary font-bold">
                                "Apex Phish Hunter"
                              </span>
                              <span className="font-label-sm text-on-surface-variant">
                                Unique Armory Legendary Badge
                              </span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary font-label-sm uppercase font-mono font-bold">
                            EXCLUSIVE
                          </span>
                        </div>

                        {/* Buff */}
                        <div className="p-3.5 rounded-lg bg-surface-container-low/90 flex items-center justify-between border border-surface-container-high">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-[22px]">
                              ⚡
                            </div>
                            <div className="flex flex-col">
                              <span className="font-label-lg text-primary font-bold">
                                1.5x XP Combat Multiplier
                              </span>
                              <span className="font-label-sm text-on-surface-variant">
                                Valid across next 3 battle arena matches
                              </span>
                            </div>
                          </div>
                          <span className="font-label-sm text-primary uppercase font-mono font-bold">
                            BUFF
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cyber Visual Snapshot */}
                    <div className="mt-5 p-3 rounded-lg bg-surface-container-lowest/90 flex items-center gap-3 border border-surface-container-high">
                      <div className="w-12 h-12 rounded bg-surface-container-high overflow-hidden relative flex-shrink-0">
                        <img
                          className="w-full h-full object-cover"
                          alt="Packet Forensics terminal"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb57iYcYtFTUCDIz0zBiHll9nljy98IxVq87OizPqvv5dnbygfwh9swlnSzvnjkTAZCil_QJXmR0yHkiQxdJUrUFb8lFAgLEaiOwIzjyplefPsywj7b3Y1X4qTdwjrnIa4DzUk9p2Ht_YvXvRfL9oP_StahjpG2VNSqbFw9l07WQ_ZXaVOEJ5WBpPULVHSgFB62sUy_bYgepN3iYpOaJjqBh8PqfXI-vOuBpYypy5EZpMGTqq36Ok1"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-label-sm text-tertiary font-mono font-bold">
                            PACKET FORENSICS READY
                          </span>
                        </div>
                        <p className="font-body-sm text-on-surface-variant truncate">
                          Raw email capture data stream synced with SOC memory buffer.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Leaderboard Snippet */}
                  <div className="p-4 rounded-xl bg-surface-container-high/40 flex items-center justify-between border border-surface-container-high">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-outline text-[22px]">
                        military_tech
                      </span>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-outline-variant uppercase">
                          Current Boss Realm Record
                        </span>
                        <span className="font-label-md text-on-surface font-mono">
                          Operator <strong>NullVector_99</strong> • 01:04.22
                        </span>
                      </div>
                    </div>
                    <span className="font-label-sm text-tertiary font-mono font-bold">TOP 0.1%</span>
                  </div>
                </div>
              </div>

              {/* ACTION CONTROLS FOOTER */}
              <div className="mt-10 pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary flex-shrink-0 border border-tertiary/20">
                    <span className="material-symbols-outlined text-[20px]">terminal</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-on-surface font-semibold">
                      Simulated Workstation Ready
                    </span>
                    <span className="font-label-sm text-on-surface-variant">
                      Live telemetry and forensic tools will mount on initiation
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => startChallenge(true)}
                    className="px-6 py-4 rounded-lg bg-surface-container-high hover:bg-surface-variant text-tertiary font-label-md uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 border border-tertiary/20 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">model_training</span>
                    <span>Practice Drill (No Risk)</span>
                  </button>

                  <button
                    onClick={() => startChallenge(false)}
                    disabled={deployingSandbox}
                    className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-primary-container via-secondary to-tertiary text-on-primary font-headline-sm uppercase tracking-wider font-bold shadow-[0_0_24px_rgba(0,218,243,0.5),0_0_36px_rgba(111,0,190,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_0_35px_rgba(0,218,243,0.8),0_0_50px_rgba(111,0,190,0.6)] flex items-center justify-center gap-3 overflow-hidden cursor-pointer"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></span>
                    <span className="material-symbols-outlined text-[22px] group-hover:rotate-90 transition-transform duration-300">
                      track_changes
                    </span>
                    <span>
                      {deployingSandbox ? 'DEPLOYING SANDBOX...' : 'Enter Challenge'}
                    </span>
                    <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">
                      bolt
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Supplementary Tactical Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col gap-2 border border-surface-container-high">
              <div className="flex items-center gap-2 text-tertiary mb-1">
                <span className="material-symbols-outlined text-[20px]">travel_explore</span>
                <span className="font-label-md uppercase tracking-wider font-semibold">
                  Domain Spoofing TTPs
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Watch for homograph IDN attacks substituting Cyrillic Unicode glyphs into internal banking
                and HR domain names.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col gap-2 border border-surface-container-high">
              <div className="flex items-center gap-2 text-secondary mb-1">
                <span className="material-symbols-outlined text-[20px]">attachment</span>
                <span className="font-label-md uppercase tracking-wider font-semibold">
                  Zero-Day Payloads
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Suspicious double extensions like{' '}
                <span className="font-mono text-secondary">.pdf.exe</span> or nested macro-enabled{' '}
                <span className="font-mono text-secondary">.docm</span> files bypass typical gateway scans.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col gap-2 border border-surface-container-high">
              <div className="flex items-center gap-2 text-primary mb-1">
                <span className="material-symbols-outlined text-[20px]">speed</span>
                <span className="font-label-md uppercase tracking-wider font-semibold">
                  Speed Bonus Multiplier
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Completing the quarantine within the first 60 seconds awards an additional{' '}
                <span className="font-mono text-primary font-semibold">+250 XP Blitz Bonus</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: PLAYABLE INTERACTIVE WORKSTATION SANDBOX */}
      {inSandbox && (
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 xl:px-8 mt-6 z-10 flex flex-col gap-6">
          {/* Workstation Top Command Bar */}
          <div className="p-4 rounded-xl bg-surface-container-low/95 border border-surface-container-high flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high border border-tertiary/30">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse"></span>
                <span className="font-label-md text-tertiary font-bold font-mono">
                  LIVE WORKSTATION: SOC-SANDBOX-09
                </span>
              </div>
              {isPracticeMode && (
                <span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-outline border border-surface-container-highest">
                  PRACTICE DRILL (NO RANK IMPACT)
                </span>
              )}
            </div>

            {/* Incursion Telemetry: Strikes & Timer */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-outline text-xs uppercase">STRIKES:</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${
                        s <= strikes
                          ? 'bg-error text-surface-container-lowest shadow-[0_0_8px_rgba(255,180,171,0.8)]'
                          : 'bg-surface-container-highest text-outline'
                      }`}
                    >
                      ✕
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-6 w-px bg-surface-container-high"></div>

              <div className="flex items-center gap-2 font-mono">
                <span className="text-outline text-xs uppercase">TIMER:</span>
                <span
                  className={`text-lg font-bold ${
                    timerSeconds <= 30 ? 'text-error animate-pulse' : 'text-tertiary'
                  }`}
                >
                  {Math.floor(timerSeconds / 60)}:
                  {timerSeconds % 60 < 10 ? `0${timerSeconds % 60}` : timerSeconds % 60}
                </span>
              </div>

              <div className="h-6 w-px bg-surface-container-high"></div>

              <div className="font-mono text-xs">
                <span className="text-outline">QUARANTINED: </span>
                <strong className="text-error">{quarantinedCount}</strong>
                <span className="text-outline">/5 • SAFE: </span>
                <strong className="text-tertiary">{verifiedCount}</strong>
                <span className="text-outline">/5</span>
              </div>
            </div>
          </div>

          {/* Victory Modal Overlay */}
          {missionComplete && (
            <div className="p-8 rounded-xl bg-surface-container-lowest/95 border-2 border-tertiary shadow-[0_0_60px_rgba(0,218,243,0.4)] flex flex-col items-center text-center gap-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-tertiary/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,218,243,0.6)]">
                <span className="material-symbols-outlined text-4xl text-tertiary font-bold">
                  verified_user
                </span>
              </div>
              <div>
                <h2 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-bold uppercase">
                  INCURSION VICTORIOUS!
                </h2>
                <p className="font-body-md text-on-surface-variant max-w-lg mt-2">
                  All 5 weaponized phishing vectors isolated and quarantined. Corporate DNS &amp; SSO
                  perimeter secured against APT-29.
                </p>
              </div>
              <div className="flex items-center gap-4 py-2 font-mono">
                <div className="px-4 py-2 rounded-lg bg-tertiary/15 border border-tertiary/40 text-tertiary font-bold">
                  ⚡ +750 XP REWARDED
                </div>
                <div className="px-4 py-2 rounded-lg bg-secondary/15 border border-secondary/40 text-secondary font-bold">
                  🛡️ "Apex Phish Hunter" BADGE UNLOCKED
                </div>
              </div>
              <button
                onClick={() => setInSandbox(false)}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-tertiary text-on-primary font-label-lg font-bold uppercase tracking-wider shadow-lg hover:shadow-tertiary/50 transition-all cursor-pointer"
              >
                Return to Command Briefing
              </button>
            </div>
          )}

          {/* Failed Modal Overlay */}
          {missionFailed && (
            <div className="p-8 rounded-xl bg-surface-container-lowest/95 border-2 border-error shadow-[0_0_60px_rgba(255,180,171,0.4)] flex flex-col items-center text-center gap-5 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-error/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-error font-bold">
                  crisis_alert
                </span>
              </div>
              <div>
                <h2 className="font-headline-xl text-3xl sm:text-4xl text-error font-bold uppercase">
                  INCURSION ABORTED // BREACH
                </h2>
                <p className="font-body-md text-on-surface-variant max-w-lg mt-2">
                  Adversary intrusion sensors triggered by 3 operational errors or timeout. Security
                  gateway compromised.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => startChallenge(isPracticeMode)}
                  className="px-6 py-3 rounded-lg bg-surface-container-high text-on-surface font-label-md uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer"
                >
                  Retry Incursion
                </button>
                <button
                  onClick={() => setInSandbox(false)}
                  className="px-6 py-3 rounded-lg bg-error-container text-on-error font-label-md uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Exit Workstation
                </button>
              </div>
            </div>
          )}

          {/* Sandbox Split View: Left Email List / Right Email Forensics */}
          {!missionComplete && !missionFailed && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Email Inbox (Span 5) */}
              <div className="lg:col-span-5 bg-surface-container-low/95 rounded-xl border border-surface-container-high p-4 flex flex-col gap-2 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-high px-2 font-mono text-xs text-outline uppercase tracking-wider">
                  <span>INCOMING INBOX STREAM</span>
                  <span>10 PACKETS</span>
                </div>

                <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
                  {emails.map((em) => {
                    const isSelected = activeEmailId === em.id;
                    const st = emailStates[em.id];
                    return (
                      <div
                        key={em.id}
                        onClick={() => {
                          soundFx.playClick();
                          setActiveEmailId(em.id);
                        }}
                        className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col gap-1 relative ${
                          isSelected
                            ? 'bg-surface-container-high border-tertiary shadow-[0_0_12px_rgba(0,218,243,0.25)]'
                            : 'bg-surface-container/70 border-surface-container-high hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-on-surface font-semibold truncate max-w-[200px]">
                            {em.sender}
                          </span>
                          <span className="font-mono text-[10px] text-outline">{em.timestamp}</span>
                        </div>

                        <span className="font-body-sm text-on-surface-variant truncate text-xs font-medium">
                          {em.subject}
                        </span>

                        <div className="flex items-center justify-between mt-1">
                          <span className="font-mono text-[10px] text-outline truncate max-w-[180px]">
                            {em.senderEmail}
                          </span>
                          {st === 'quarantined' && (
                            <span className="px-2 py-0.5 rounded bg-error/20 text-error font-mono text-[10px] font-bold">
                              QUARANTINED
                            </span>
                          )}
                          {st === 'verified_safe' && (
                            <span className="px-2 py-0.5 rounded bg-tertiary/20 text-tertiary font-mono text-[10px] font-bold">
                              VERIFIED SAFE
                            </span>
                          )}
                          {!st && (
                            <span className="px-2 py-0.5 rounded bg-surface-container-highest text-outline font-mono text-[10px]">
                              PENDING
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Forensic Email Inspection Viewer (Span 7) */}
              <div className="lg:col-span-7 bg-surface-container-low/95 rounded-xl border border-surface-container-high p-6 flex flex-col gap-5 shadow-xl">
                {/* Email Header Panel */}
                <div className="flex flex-col gap-3 pb-4 border-b border-surface-container-high">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-tertiary font-semibold uppercase">
                      PACKET FORENSICS INSPECTOR
                    </span>
                    <span className="font-mono text-xs text-outline">MSG-ID: #0x0{activeEmail.id}AF</span>
                  </div>
                  <h3 className="font-headline-sm text-on-surface font-bold text-lg">
                    {activeEmail.subject}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 font-mono text-xs text-on-surface-variant bg-surface-container-lowest/80 p-3 rounded-lg border border-surface-container-high">
                    <div>
                      <span className="text-outline">FROM: </span>
                      <strong className="text-on-surface">{activeEmail.rawHeaders.from}</strong>
                    </div>
                    <div>
                      <span className="text-outline">RETURN-PATH: </span>
                      <strong className="text-on-surface truncate">{activeEmail.rawHeaders.returnPath}</strong>
                    </div>
                    <div>
                      <span className="text-outline">ORIGIN IP: </span>
                      <strong className="text-on-surface">{activeEmail.rawHeaders.originIp}</strong>
                    </div>
                    <div>
                      <span className="text-outline">MAILER: </span>
                      <strong className="text-on-surface">{activeEmail.rawHeaders.mailer}</strong>
                    </div>
                  </div>

                  {/* Cryptographic Authentications (SPF / DKIM / DMARC) */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container font-mono text-xs border border-surface-container-high">
                      <span className="text-outline">SPF:</span>
                      <strong
                        className={
                          activeEmail.rawHeaders.spf === 'PASS'
                            ? 'text-emerald-400'
                            : 'text-error animate-pulse'
                        }
                      >
                        {activeEmail.rawHeaders.spf}
                      </strong>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container font-mono text-xs border border-surface-container-high">
                      <span className="text-outline">DKIM:</span>
                      <strong
                        className={
                          activeEmail.rawHeaders.dkim === 'PASS'
                            ? 'text-emerald-400'
                            : 'text-error animate-pulse'
                        }
                      >
                        {activeEmail.rawHeaders.dkim}
                      </strong>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container font-mono text-xs border border-surface-container-high">
                      <span className="text-outline">DMARC:</span>
                      <strong
                        className={
                          activeEmail.rawHeaders.dmarc === 'PASS'
                            ? 'text-emerald-400'
                            : 'text-error'
                        }
                      >
                        {activeEmail.rawHeaders.dmarc}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Email Body Content */}
                <div className="p-4 rounded-lg bg-surface-container-lowest/60 border border-surface-container-high font-body-md text-on-surface text-sm leading-relaxed">
                  <p>{activeEmail.bodyText}</p>
                </div>

                {/* Attachment Inspection If Any */}
                {activeEmail.attachment && (
                  <div className="p-3 rounded-lg bg-surface-container flex items-center justify-between border border-surface-container-high">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center text-error">
                        <span className="material-symbols-outlined text-[22px]">attach_file</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-sm text-on-surface font-semibold">
                          {activeEmail.attachment.name}
                        </span>
                        <span className="font-mono text-xs text-outline">
                          Size: {activeEmail.attachment.size}
                        </span>
                      </div>
                    </div>
                    {activeEmail.attachment.isExecutable && (
                      <span className="px-2 py-0.5 rounded bg-error-container/40 text-error font-mono text-xs font-bold border border-error/30 animate-pulse">
                        ANOMALOUS PAYLOAD DETECTED
                      </span>
                    )}
                  </div>
                )}

                {/* Action Controls for this Email */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleAction(activeEmail.id, 'quarantine')}
                    disabled={!!emailStates[activeEmail.id]}
                    className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-error hover:bg-error/90 text-surface-container-lowest font-label-md uppercase tracking-wider font-bold shadow-[0_0_16px_rgba(255,180,171,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                    <span>Quarantine Threat</span>
                  </button>

                  <button
                    onClick={() => handleAction(activeEmail.id, 'verify')}
                    disabled={!!emailStates[activeEmail.id]}
                    className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-surface-container-high hover:bg-surface-variant text-tertiary font-label-md uppercase tracking-wider font-bold border border-tertiary/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Verify Legitimate</span>
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
