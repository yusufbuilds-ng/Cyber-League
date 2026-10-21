import React, { useState, useEffect } from 'react';
import { OperativeProfile } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface DuelModalProps {
  isOpen: boolean;
  onClose: () => void;
  operative: OperativeProfile;
  onDuelWin: (xp: number) => void;
}

export const DuelModal: React.FC<DuelModalProps> = ({
  isOpen,
  onClose,
  operative,
  onDuelWin,
}) => {
  const [step, setStep] = useState<'matchmaking' | 'combat' | 'result'>('matchmaking');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [opponentProgress, setOpponentProgress] = useState(15);
  const [userWon, setUserWon] = useState(false);

  // Matchmaking simulation
  useEffect(() => {
    if (!isOpen) {
      setStep('matchmaking');
      setSelectedAnswer(null);
      setTimeLeft(10);
      return;
    }

    if (step === 'matchmaking') {
      const t = setTimeout(() => {
        soundFx.playSuccess();
        setStep('combat');
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [isOpen, step]);

  // Combat countdown
  useEffect(() => {
    if (step !== 'combat') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resolveCombat(false);
          return 0;
        }
        return prev - 1;
      });

      // Bot slowly decodes
      setOpponentProgress((prev) => Math.min(100, prev + 12));
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const resolveCombat = (won: boolean) => {
    setUserWon(won);
    setStep('result');
    if (won) {
      soundFx.playSuccess();
      onDuelWin(60);
    } else {
      soundFx.playAlert();
    }
  };

  const handlePickAnswer = (idx: number, isCorrect: boolean) => {
    soundFx.playClick();
    setSelectedAnswer(idx);
    setTimeout(() => {
      resolveCombat(isCorrect);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-xl bg-surface-container-low p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative border-2 border-tertiary/40">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3 font-mono">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">swords</span>
            <span className="text-on-surface font-bold text-sm uppercase tracking-wider">
              1V1 SPEED DECIPHER COMBAT
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Step 1: Matchmaking */}
        {step === 'matchmaking' && (
          <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
            <div className="relative w-20 h-20 rounded-full border-4 border-tertiary/20 border-t-tertiary animate-spin flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-tertiary">radar</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-on-surface font-bold">
                Scanning Ranked Grid Operatives...
              </h3>
              <p className="font-mono text-xs text-outline">
                PING: 14ms // MATCHMAKING PROTOCOL: ELO BRACKET [BRONZE III]
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Combat Screen */}
        {step === 'combat' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Versus Header */}
            <div className="grid grid-cols-5 items-center bg-surface-container-lowest p-3 rounded-lg border border-surface-container-high">
              <div className="col-span-2 flex items-center gap-3">
                <img
                  src={operative.avatarUrl}
                  alt={operative.handle}
                  className="w-10 h-10 rounded-lg object-cover ring-1 ring-tertiary"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-xs font-bold text-on-surface truncate">
                    {operative.handle}
                  </span>
                  <span className="font-mono text-[10px] text-tertiary">YOU</span>
                </div>
              </div>

              <div className="col-span-1 text-center font-headline-sm text-secondary font-bold text-sm">
                VS
              </div>

              <div className="col-span-2 flex items-center justify-end gap-3 text-right">
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-xs font-bold text-on-surface truncate">
                    GhostHacker_99
                  </span>
                  <span className="font-mono text-[10px] text-error">RIVAL BOT</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-error ring-1 ring-error/50">
                  <span className="material-symbols-outlined text-xl">smart_toy</span>
                </div>
              </div>
            </div>

            {/* Timers & Adversary Progress */}
            <div className="flex items-center justify-between font-mono text-xs text-outline">
              <span>
                TIME REMAINING: <strong className="text-tertiary text-sm">{timeLeft}s</strong>
              </span>
              <span>
                Rival Decryption:{' '}
                <strong className="text-error text-sm">{opponentProgress}%</strong>
              </span>
            </div>

            {/* Quick Riddle Prompt */}
            <div className="p-4 rounded-lg bg-surface-container border border-surface-container-high flex flex-col gap-2">
              <span className="font-mono text-xs text-tertiary font-bold uppercase">
                RAPID DECRYPT CHALLENGE:
              </span>
              <p className="font-body-md text-on-surface text-sm">
                Which protocol securely encapsulates HTTP traffic inside an encrypted TLS/SSL tunnel
                over default port 443?
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { text: 'FTP (Port 21)', correct: false },
                { text: 'HTTPS (Port 443)', correct: true },
                { text: 'Telnet (Port 23)', correct: false },
                { text: 'SNMP (Port 161)', correct: false },
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handlePickAnswer(i, opt.correct)}
                  className={`p-3 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer ${
                    selectedAnswer === i
                      ? 'bg-tertiary text-surface-container-lowest font-bold border-tertiary'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-surface-container-high'
                  }`}
                >
                  [{i + 1}] {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 'result' && (
          <div className="py-6 flex flex-col items-center justify-center gap-4 text-center animate-fadeIn">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl ${
                userWon ? 'bg-tertiary/20 text-tertiary ring-2 ring-tertiary' : 'bg-error/20 text-error ring-2 ring-error'
              }`}
            >
              <span className="material-symbols-outlined text-3xl font-bold">
                {userWon ? 'military_tech' : 'close'}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-headline-sm text-2xl font-bold text-on-surface uppercase">
                {userWon ? 'VICTORY IN SPEED DUEL!' : 'DUEL DEFEATED!'}
              </h3>
              <p className="font-body-md text-on-surface-variant text-sm max-w-sm">
                {userWon
                  ? 'Decryption packet submitted prior to adversary response. High-speed combat reward granted.'
                  : 'Adversary submitted decryption token first or incorrect payload chosen.'}
              </p>
            </div>

            {userWon && (
              <div className="px-4 py-1.5 rounded-full bg-tertiary/15 text-tertiary font-mono text-sm font-bold border border-tertiary/30">
                ⚡ +60 XP COMBAT BOUNTY AWARDED
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-md uppercase tracking-wider hover:bg-surface-variant transition-colors cursor-pointer"
            >
              Return to Terminal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
