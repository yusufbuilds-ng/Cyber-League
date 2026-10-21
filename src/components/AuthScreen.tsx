import React, { useState } from 'react';
import { OperativeProfile } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface AuthScreenProps {
  onSuccess: (profile: Partial<OperativeProfile>, isNewSignUp?: boolean) => void;
  onCancel?: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onCancel }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [handle, setHandle] = useState('ShadowZero');
  const [email, setEmail] = useState('agent@cyberleague.gg');
  const [password, setPassword] = useState('CyberMatrix99!');
  const [confirmPassword, setConfirmPassword] = useState('CyberMatrix99!');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [enableAlerts, setEnableAlerts] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Password strength calculation
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: 'Min 8 chars', color: 'text-outline' };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score === 1) return { score: 1, label: 'Weak Cipher', color: 'text-error' };
    if (score === 2) return { score: 2, label: 'Fair Defense', color: 'text-amber-400' };
    if (score === 3) return { score: 3, label: 'Strong Shield', color: 'text-primary' };
    return { score: 4, label: 'Cyber-Secured [MIL-SPEC]', color: 'text-tertiary font-bold' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isSignIn && password !== confirmPassword) {
      soundFx.playAlert();
      setErrorMessage('Master Encryption Ciphers do not match!');
      return;
    }

    if (!isSignIn && !acceptTerms) {
      soundFx.playAlert();
      setErrorMessage('You must accept the Operative Code of Conduct.');
      return;
    }

    soundFx.playSuccess();
    onSuccess(
      {
        handle: handle.trim() || 'Specter_Ops',
        email: email.trim() || 'agent@cyberleague.gg',
      },
      !isSignIn
    );
  };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-background selection:bg-tertiary-container selection:text-on-tertiary flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Optional Cancel/Back button if accessed from in-app */}
      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/80 text-on-surface-variant hover:text-tertiary transition-colors font-label-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Return to Grid</span>
        </button>
      )}

      <div className="w-full max-w-7xl mx-auto z-10 py-4">
        {/* Interactive Split Grid Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT COLUMN: Esports Telemetry, Badges, & Cinematic Visuals */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-surface-container-low rounded-xl relative overflow-hidden shadow-2xl border border-surface-container-high/50">
            {/* Glow ambient background blobs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none"></div>

            {/* Top Header Segment */}
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary font-label-sm uppercase tracking-wider shadow-sm border border-tertiary/20">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
                  DEFCON 1 :: SYSTEM ACTIVE
                </span>
                <span className="text-on-surface-variant font-label-sm tracking-widest uppercase">
                  NODE-ALPHA-79
                </span>
              </div>
              <div>
                <h1 className="font-headline-xl text-3xl sm:text-5xl uppercase tracking-tighter bg-gradient-to-r from-primary via-surface-tint to-secondary bg-clip-text text-transparent font-bold">
                  CYBER LEAGUE
                </h1>
                <p className="font-headline-sm text-lg sm:text-xl text-on-surface-variant mt-1">
                  Start at zero. Climb to pro.
                </p>
              </div>
            </div>

            {/* Center Feature: Visual Asset Illustration & Holographic League Badges */}
            <div className="relative z-10 my-6 flex flex-col gap-4">
              {/* Visual Illustration Container */}
              <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden bg-surface-container-lowest shadow-xl group border border-surface-container-high/40">
                <img
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Futuristic cyber security hacker warfare operations center"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4bakIwZuAb0yvVsIoiKCxQvHdooGUP8jd8-7znTmrbS7TO7b9JhQPgbos2ZFmNe73cQRV4r2N47l5fk-Q3VPUi4ulquxO6Ze4q22ltI_DlhNiDaa6tXKRMv071cMjYZrqGcHtakzHXPeTKiujYEIbLyOFlrPErFaa_sPYLpY94vm4-uLbE6rGrei86O2j34Te4_1YbBS9QHjMmz1g4Fo0uAIAIQNuqN6_MImzsscDAHB934UVZyzo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-surface font-label-sm bg-surface-container-high/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-surface-container-highest/60">
                  <span className="flex items-center gap-2 text-tertiary">
                    <span className="material-symbols-outlined text-base">radar</span>
                    LIVE SURVEILLANCE GRID
                  </span>
                  <span className="text-primary-fixed-dim font-label-md font-mono">
                    GRID ID: 0x992B
                  </span>
                </div>
              </div>

              {/* Tier Division Badges */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm uppercase tracking-widest text-outline">
                    TIER MATRIX RANKS
                  </span>
                  <span className="font-label-sm text-tertiary font-semibold">SEASON VIII</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {/* Bronze */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-high/60 backdrop-blur-sm text-center shadow-sm border border-[#cd7f32]/30">
                    <span className="material-symbols-outlined text-amber-600 text-xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shield
                    </span>
                    <span className="font-label-sm font-semibold text-on-surface">BRONZE</span>
                    <span className="font-label-sm text-outline scale-90">TIER V</span>
                  </div>
                  {/* Silver */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-high/60 backdrop-blur-sm text-center shadow-sm border border-slate-400/30">
                    <span className="material-symbols-outlined text-slate-300 text-xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shield
                    </span>
                    <span className="font-label-sm font-semibold text-on-surface">SILVER</span>
                    <span className="font-label-sm text-outline scale-90">TIER IV</span>
                  </div>
                  {/* Gold */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-high/60 backdrop-blur-sm text-center shadow-sm border border-yellow-500/30">
                    <span className="material-symbols-outlined text-yellow-400 text-xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      military_tech
                    </span>
                    <span className="font-label-sm font-semibold text-on-surface">GOLD</span>
                    <span className="font-label-sm text-outline scale-90">TIER III</span>
                  </div>
                  {/* Platinum */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-surface-container-high/60 backdrop-blur-sm text-center shadow-sm border border-tertiary/30">
                    <span className="material-symbols-outlined text-tertiary text-xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified_user
                    </span>
                    <span className="font-label-sm font-semibold text-on-surface">PLATINUM</span>
                    <span className="font-label-sm text-outline scale-90">TIER II</span>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary-container/40 backdrop-blur-sm text-center shadow-sm border border-secondary/40">
                    <span className="material-symbols-outlined text-secondary text-xl mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                    <span className="font-label-sm font-bold text-secondary">LEGEND</span>
                    <span className="font-label-sm text-secondary-fixed scale-90">TIER I</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cyber Stats Matrix */}
            <div className="relative z-10 grid grid-cols-3 gap-2.5 pt-2">
              <div className="bg-surface-container-lowest/80 p-3 rounded-lg flex flex-col shadow-inner border border-surface-container-high/40">
                <span className="font-label-sm text-outline uppercase">OPERATIVES</span>
                <span className="font-headline-sm text-on-surface font-bold mt-0.5">50,000+</span>
                <span className="font-label-sm text-tertiary flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs">arrow_upward</span> +14% /wk
                </span>
              </div>
              <div className="bg-surface-container-lowest/80 p-3 rounded-lg flex flex-col shadow-inner border border-surface-container-high/40">
                <span className="font-label-sm text-outline uppercase">CHALLENGES SOLVED</span>
                <span className="font-headline-sm text-primary font-bold mt-0.5">1.2M</span>
                <span className="font-label-sm text-on-surface-variant flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs">bolt</span> CTF Global
                </span>
              </div>
              <div className="bg-surface-container-lowest/80 p-3 rounded-lg flex flex-col shadow-inner border border-surface-container-high/40">
                <span className="font-label-sm text-outline uppercase">THREAT DEFLECTION</span>
                <span className="font-headline-sm text-tertiary font-bold mt-0.5">99.8%</span>
                <span className="font-label-sm text-outline-variant flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-xs">verified</span> Live SOC
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Registration / Sign In HUD Form */}
          <div className="lg:col-span-6 bg-surface-container p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl flex flex-col justify-center relative overflow-hidden backdrop-blur-xl border border-surface-container-high/60">
            {/* Glow ambient backdrop */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Card Heading */}
            <div className="mb-6 relative z-10">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">
                  {isSignIn ? 'Sign in to Terminal' : 'Create your account'}
                </h2>
                <span className="material-symbols-outlined text-tertiary text-2xl">
                  {isSignIn ? 'lock' : 'shield_person'}
                </span>
              </div>
              <p className="font-body-md text-on-surface-variant">
                {isSignIn
                  ? 'Authenticate your cryptographic cipher to resume tactical operations.'
                  : 'Join the cyber defense frontlines and secure your operative rank.'}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-error-container/40 border border-error/40 text-error font-body-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form Elements */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
              {/* Operative Handle */}
              {!isSignIn && (
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface uppercase tracking-wider flex items-center justify-between">
                    <span>Operative Handle / Call Sign</span>
                    <span className="text-tertiary lowercase text-label-sm font-mono">required*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-xl">
                      person
                    </span>
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface font-label-md pl-10 pr-4 py-2.5 rounded-lg placeholder:text-outline/60 focus:outline-none focus:ring-1 focus:ring-tertiary focus:bg-surface-container-low transition-colors border border-surface-container-high"
                      placeholder="e.g. ShadowZero"
                      required
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Classified Comms (Email) */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-on-surface uppercase tracking-wider flex items-center justify-between">
                  <span>Classified Comms (Email)</span>
                  <span className="text-tertiary lowercase text-label-sm font-mono">required*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-xl">
                    alternate_email
                  </span>
                  <input
                    className="w-full bg-surface-container-lowest text-on-surface font-label-md pl-10 pr-4 py-2.5 rounded-lg placeholder:text-outline/60 focus:outline-none focus:ring-1 focus:ring-tertiary focus:bg-surface-container-low transition-colors border border-surface-container-high"
                    placeholder="agent@cyberleague.gg"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password / Master Encryption Cipher */}
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-on-surface uppercase tracking-wider flex items-center justify-between">
                  <span>Master Encryption Cipher</span>
                  {!isSignIn && (
                    <span className={`text-label-sm font-mono ${strength.color}`}>
                      {strength.label}
                    </span>
                  )}
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-xl">
                    key
                  </span>
                  <input
                    className="w-full bg-surface-container-lowest text-on-surface font-label-md pl-10 pr-10 py-2.5 rounded-lg placeholder:text-outline/60 focus:outline-none focus:ring-1 focus:ring-tertiary focus:bg-surface-container-low transition-colors tracking-wider border border-surface-container-high"
                    placeholder="••••••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    aria-label="Toggle password visibility"
                    className="absolute right-3 text-outline hover:text-on-surface transition-colors focus:outline-none"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Segmented Password Strength Bar */}
                {!isSignIn && (
                  <div className="grid grid-cols-4 gap-1.5 mt-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        strength.score >= 1
                          ? strength.score === 1
                            ? 'bg-error'
                            : strength.score === 2
                            ? 'bg-amber-400'
                            : strength.score === 3
                            ? 'bg-primary'
                            : 'bg-tertiary shadow-[0_0_8px_rgba(0,218,243,0.8)]'
                          : 'bg-surface-container-highest'
                      }`}
                    ></div>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        strength.score >= 2
                          ? strength.score === 2
                            ? 'bg-amber-400'
                            : strength.score === 3
                            ? 'bg-primary'
                            : 'bg-tertiary shadow-[0_0_8px_rgba(0,218,243,0.8)]'
                          : 'bg-surface-container-highest'
                      }`}
                    ></div>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        strength.score >= 3
                          ? strength.score === 3
                            ? 'bg-primary'
                            : 'bg-tertiary shadow-[0_0_8px_rgba(0,218,243,0.8)]'
                          : 'bg-surface-container-highest'
                      }`}
                    ></div>
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        strength.score >= 4
                          ? 'bg-tertiary shadow-[0_0_8px_rgba(0,218,243,0.8)]'
                          : 'bg-surface-container-highest'
                      }`}
                    ></div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              {!isSignIn && (
                <div className="flex flex-col gap-1">
                  <label className="font-label-sm text-on-surface uppercase tracking-wider">
                    Verify Master Encryption Cipher
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none text-xl">
                      lock_reset
                    </span>
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface font-label-md pl-10 pr-4 py-2.5 rounded-lg placeholder:text-outline/60 focus:outline-none focus:ring-1 focus:ring-tertiary focus:bg-surface-container-low transition-colors tracking-wider border border-surface-container-high"
                      placeholder="••••••••••••"
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Checkboxes */}
              {!isSignIn && (
                <div className="flex flex-col gap-2 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      className="mt-1 rounded bg-surface-container-lowest accent-primary cursor-pointer w-4 h-4"
                      required
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <span className="font-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
                      I accept the{' '}
                      <span className="text-primary underline hover:text-tertiary">
                        Operative Code of Conduct
                      </span>{' '}
                      &amp;{' '}
                      <span className="text-primary underline hover:text-tertiary">
                        Terms of Engagement
                      </span>
                      .
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      className="mt-1 rounded bg-surface-container-lowest accent-primary cursor-pointer w-4 h-4"
                      type="checkbox"
                      checked={enableAlerts}
                      onChange={(e) => setEnableAlerts(e.target.checked)}
                    />
                    <span className="font-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
                      Enable multi-factor threat notifications &amp; classified intel alerts.
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary-container via-surface-tint to-secondary-container hover:from-primary hover:to-secondary text-on-primary font-label-lg uppercase tracking-wider font-bold shadow-lg shadow-primary-container/20 hover:shadow-primary-container/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-xl">
                    {isSignIn ? 'login' : 'rocket_launch'}
                  </span>
                  <span>{isSignIn ? 'Sign In to Terminal' : 'Create Account'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-center">
                  <span className="font-body-md text-on-surface-variant">
                    {isSignIn ? "Need to register?" : "Already an operative?"}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setIsSignIn(!isSignIn);
                      setErrorMessage('');
                    }}
                    className="font-label-md text-tertiary hover:text-primary-fixed underline transition-colors uppercase tracking-wider font-semibold cursor-pointer"
                  >
                    {isSignIn ? 'Register Here' : 'Sign In'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
