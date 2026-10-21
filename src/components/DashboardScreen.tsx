import React, { useState } from 'react';
import { OperativeProfile, TabType } from '../types/cyber';
import { streakMilestones, StreakMilestone } from '../data/mockData';
import { soundFx } from '../utils/audio';

interface DashboardScreenProps {
  operative: OperativeProfile;
  onNavigate: (tab: TabType) => void;
  onTriggerDuel: () => void;
  onClaimStreakReward?: (day: number, xpBonus: number) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  operative,
  onNavigate,
  onTriggerDuel,
  onClaimStreakReward,
}) => {
  const [selectedTierInfo, setSelectedTierInfo] = useState<string | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<StreakMilestone | null>(null);
  const [streakJustClaimed, setStreakJustClaimed] = useState(false);

  const tiers = [
    {
      name: 'Bronze',
      status: 'Active',
      tag: 'Active',
      icon: 'shield',
      iconColor: 'text-amber-500',
      active: true,
      desc: 'Foundational division rank. Unlocks Tactical Quiz Arena and Entry Level Threat Scans.',
    },
    {
      name: 'Silver',
      status: '2 to unlock',
      tag: '2 to unlock',
      icon: 'security',
      iconColor: 'text-on-surface-variant',
      active: false,
      desc: 'Requires 5 total milestone drills completed and 90%+ average threat deflection.',
    },
    {
      name: 'Gold',
      status: 'Locked',
      tag: 'Locked',
      icon: 'military_tech',
      iconColor: 'text-outline',
      active: false,
      desc: 'Requires reaching 10,000 XP and neutralizing at least 2 Apex Boss Incursions.',
    },
    {
      name: 'Platinum',
      status: 'Locked',
      tag: 'Locked',
      icon: 'diamond',
      iconColor: 'text-outline-variant',
      active: false,
      desc: 'Top 500 Global Operatives with verified MITRE framework mastery.',
    },
    {
      name: 'Legend',
      status: 'Top 100',
      tag: 'Top 100',
      icon: 'trophy',
      iconColor: 'text-outline-variant',
      active: false,
      desc: 'Exclusive Top 100 Bracket. Invites to the Global Zero-Day Invitational Tournament.',
    },
  ];

  return (
    <div className="flex flex-col w-full p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* TOP SECTION: Operative Profile & Tactical Engagement */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch relative z-10">
        {/* Operative Profile Card */}
        <div className="xl:col-span-8 bg-surface-container-low/90 backdrop-blur-xl p-6 rounded-xl shadow-xl relative overflow-hidden flex flex-col justify-between border border-surface-container-high/40">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-tertiary via-primary-container to-secondary"></div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-700 via-yellow-600 to-amber-900 animate-pulse opacity-75 blur-sm"></div>
                <div className="relative w-20 h-20 rounded-full p-1 bg-surface-container-lowest ring-2 ring-amber-600/70 shadow-[0_0_15px_rgba(205,127,50,0.4)]">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    alt="Cyberpunk operative portrait"
                    src={operative.avatarUrl}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded bg-surface-container-highest shadow-md border border-surface-container-high">
                  <span className="font-label-sm text-tertiary font-bold tracking-wider">
                    LVL {operative.level}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-headline-sm text-on-surface uppercase tracking-wide font-bold">
                    {operative.handle}
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-tertiary-fixed-dim font-label-sm uppercase tracking-wider border border-tertiary/20">
                    {operative.rankTitle}
                  </span>

                  {/* Dynamic Career Specialization Tag */}
                  <span
                    className={`px-2.5 py-0.5 rounded font-mono text-xs uppercase font-bold tracking-wider border transition-all ${
                      operative.careerPath
                        ? operative.careerPath.toLowerCase().includes('soc')
                          ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.35)]'
                          : operative.careerPath.toLowerCase().includes('cloud')
                          ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.35)]'
                          : 'bg-[#A855F7]/20 border-[#A855F7] text-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                        : 'bg-surface-container-highest text-outline-variant border-surface-container-high'
                    }`}
                  >
                    CAREER: {operative.careerPath ? operative.careerPath.toUpperCase() : 'UNSELECTED'}
                  </span>
                </div>
                <p className="font-body-sm text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary inline-block animate-ping"></span>
                  Grid Terminal Active // Node 0x7E1
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center">
              {/* Prominent Level Up & Choose Career Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('career-path');
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-tertiary/20 via-primary-container/30 to-secondary/20 hover:from-tertiary/30 hover:to-secondary/30 text-tertiary border border-tertiary/50 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 shadow-[0_0_18px_rgba(0,218,243,0.3)] hover:shadow-[0_0_26px_rgba(0,218,243,0.6)] transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px] animate-pulse">track_changes</span>
                <span>{operative.careerPath ? 'Switch Career Path' : 'Level Up & Choose Career'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <div className="px-3 py-1.5 rounded-lg bg-surface-container flex items-center gap-2 border border-surface-container-high/60">
                <span className="material-symbols-outlined text-[18px] text-tertiary">
                  military_tech
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-outline uppercase">Global Rank</span>
                  <span className="font-label-md text-on-surface font-bold">
                    #{operative.globalRank.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Specialization Status Banner */}
          {!operative.careerPath ? (
            <div className="mt-4 p-3.5 rounded-lg bg-gradient-to-r from-[#3B82F6]/15 via-[#00E5FF]/15 to-[#A855F7]/15 border border-[#00E5FF]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(0,229,255,0.12)]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary shadow-inner">
                  <span className="material-symbols-outlined text-[20px] animate-pulse">crisis_alert</span>
                </div>
                <div>
                  <p className="font-label-md text-on-surface font-bold">
                    Silver League Milestone Ready
                  </p>
                  <p className="font-body-sm text-on-surface-variant text-xs">
                    Level 10 reached. Select between SOC Analyst, Cloud Security, or Penetration Tester.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('career-path');
                }}
                className="px-4 py-2 rounded-lg bg-tertiary text-on-tertiary font-mono text-xs uppercase font-bold tracking-wider hover:bg-tertiary-fixed shadow-[0_0_15px_rgba(0,218,243,0.5)] transition-all cursor-pointer whitespace-nowrap active:scale-95"
              >
                Level Up &amp; Choose Career
              </button>
            </div>
          ) : (
            <div className="mt-4 p-3 rounded-lg bg-surface-container-low/70 border border-surface-container-high/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span>
                <span className="font-mono text-xs text-on-surface-variant">
                  Active Specialization: <strong className="text-on-surface font-bold">{operative.careerPath}</strong> (Silver League Division)
                </span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('career-path');
                }}
                className="text-xs font-mono text-tertiary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Recalibrate Path</span>
                <span className="material-symbols-outlined text-[14px]">tune</span>
              </button>
            </div>
          )}

          {/* XP Progress Bar */}
          <div className="mt-6 pt-5 bg-surface-container-lowest/50 rounded-lg p-4 space-y-4 border border-surface-container-high/30">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm uppercase tracking-widest text-on-surface-variant">
                    XP Progress to Cadet II
                  </span>
                  <span className="font-label-sm text-primary font-bold">64%</span>
                </div>
                <span className="font-label-sm text-on-surface font-semibold tracking-wide font-mono">
                  320 / 500 XP
                </span>
              </div>
              <div className="h-2.5 w-full bg-surface-container-highest rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-container via-primary to-secondary shadow-[0_0_12px_rgba(77,142,255,0.6)] transition-all duration-500"
                  style={{ width: '64%' }}
                ></div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex items-center gap-3 border border-surface-container-highest/40">
                <div className="p-2 rounded bg-tertiary/10 text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-outline truncate">Accuracy</span>
                  <span className="font-headline-sm text-on-surface font-bold">
                    {operative.accuracy}%
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex items-center gap-3 border border-surface-container-highest/40">
                <div className="p-2 rounded bg-secondary-container/30 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-outline truncate">Active Streak</span>
                  <span className="font-headline-sm text-on-surface font-bold">
                    {operative.streakDays} Days 🔥
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-high/60 flex items-center gap-3 border border-surface-container-highest/40">
                <div className="p-2 rounded bg-primary-container/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-outline truncate">Threat Index</span>
                  <span className="font-headline-sm text-on-surface font-bold">
                    {operative.threatIndex}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Engagement Card */}
        <div className="xl:col-span-4 bg-surface-container-low/90 backdrop-blur-xl p-6 rounded-xl shadow-xl flex flex-col justify-between relative overflow-hidden border border-surface-container-high/40">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-primary-container/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm uppercase tracking-wider text-outline">
                Matchmaker Protocol
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm uppercase tracking-widest flex items-center gap-1 border border-tertiary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                Queue Ready
              </span>
            </div>
            <h3 className="font-headline-md text-on-surface tracking-tight uppercase font-bold">
              Tactical Engagement
            </h3>
            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Test network infiltration, packet forensics, and zero-day containment against automated
              adversaries or live ranked challengers.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-6">
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigate('quiz');
              }}
              className="relative group w-full py-4 px-6 rounded-lg bg-gradient-to-r from-primary-container to-secondary-container hover:from-primary hover:to-secondary text-on-primary font-headline-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_24px_rgba(77,142,255,0.4)] hover:shadow-[0_0_32px_rgba(0,218,243,0.6)] flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">swords</span>
              <span>Start Quiz Session</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onTriggerDuel();
              }}
              className="w-full py-3 px-6 rounded-lg bg-surface-container-high hover:bg-surface-variant text-tertiary font-label-lg uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 border border-tertiary/30 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">sports_esports</span>
              <span>Quick 1v1 Duel</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION: PROMINENT VISUAL DAILY LOGIN STREAK & MILESTONES */}
      <section className="bg-surface-container-low/90 backdrop-blur-xl p-6 rounded-xl shadow-xl relative overflow-hidden border border-surface-container-high/60 group">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-secondary to-tertiary"></div>
        <div className="absolute -top-24 right-1/4 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-surface-container-lowest border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px] text-amber-400 animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded bg-amber-500 text-surface-container-lowest font-mono font-bold text-[10px]">
                {operative.streakDays}D
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-headline-sm text-on-surface uppercase tracking-wide font-bold text-lg sm:text-xl">
                  Daily Login Streak &amp; Tactical Bounty
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold">
                  DAY {operative.streakDays} / 30 ACTIVE 🔥
                </span>
              </div>
              <p className="font-body-sm text-on-surface-variant text-xs sm:text-sm">
                Maintain continuous terminal check-ins to amplify passive combat multipliers and unlock classified armory loot.
              </p>
            </div>
          </div>

          {/* Claim Action / Status */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {!operative.streakClaimedToday && !streakJustClaimed ? (
              <button
                onClick={() => {
                  soundFx.playSuccess();
                  setStreakJustClaimed(true);
                  if (onClaimStreakReward) {
                    onClaimStreakReward(operative.streakDays, 120);
                  }
                }}
                className="px-5 py-3 rounded-lg bg-gradient-to-r from-amber-500 via-secondary-container to-tertiary text-on-primary font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_28px_rgba(0,218,243,0.7)] transition-all flex items-center gap-2 cursor-pointer active:scale-95 animate-pulse"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Claim Day {operative.streakDays} Bounty (+120 XP)</span>
              </button>
            ) : (
              <div className="px-4 py-2.5 rounded-lg bg-surface-container border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-2 shadow-[0_0_12px_rgba(52,211,153,0.2)]">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Day {operative.streakDays} Claimed • Reset in 08h 14m</span>
              </div>
            )}
          </div>
        </div>

        {/* Milestone Roadmap Track */}
        <div className="relative pt-4 pb-2 z-10">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-outline">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              REWARD MILESTONES ROADMAP (DAYS 1 – 30)
            </span>
            <span className="text-secondary font-semibold">
              Current Boost: +15% XP Speed Multiplier Active
            </span>
          </div>

          {/* Track Nodes */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 relative">
            {streakMilestones.map((m) => {
              const isPast = m.day < operative.streakDays;
              const isCurrent = m.day === operative.streakDays;

              return (
                <div
                  key={m.day}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedMilestone(selectedMilestone?.day === m.day ? null : m);
                  }}
                  className={`p-2.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-surface-container-high border-amber-500 ring-2 ring-amber-500/50 shadow-[0_0_18px_rgba(245,158,11,0.4)] scale-105 z-20'
                      : isPast
                      ? 'bg-surface-container/70 border-emerald-500/30 text-on-surface hover:bg-surface-container'
                      : 'bg-surface-container-lowest/60 border-surface-container-highest/40 text-outline opacity-75 hover:opacity-100'
                  }`}
                >
                  {/* Top Badge */}
                  <span className={`font-mono text-[9px] uppercase font-bold px-1.5 py-0.2 rounded ${
                    isCurrent
                      ? 'bg-amber-500 text-surface-container-lowest'
                      : isPast
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-surface-container-highest text-outline'
                  }`}>
                    Day {m.day}
                  </span>

                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCurrent
                      ? 'bg-amber-500/20 text-amber-400'
                      : isPast
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-surface-container text-outline'
                  }`}>
                    <span className="material-symbols-outlined text-[18px]">
                      {isPast ? 'check' : m.icon}
                    </span>
                  </div>

                  {/* Title & Reward */}
                  <span className="font-headline-sm text-[11px] font-bold text-on-surface truncate w-full">
                    {m.title}
                  </span>
                  <span className="font-mono text-[10px] text-tertiary truncate w-full font-semibold">
                    {m.reward}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Selected Milestone Detail Banner */}
          {selectedMilestone && (
            <div className="mt-4 p-3.5 rounded-lg bg-surface-container border border-tertiary/40 flex items-center justify-between text-xs animate-fadeIn font-mono">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary text-lg">military_tech</span>
                <span>
                  <strong className="text-tertiary">Day {selectedMilestone.day} Milestone:</strong>{' '}
                  {selectedMilestone.title} awards <strong className="text-secondary">{selectedMilestone.reward}</strong> ({selectedMilestone.xpBonus} Base XP bonus directly credited to tactical reserve).
                </span>
              </div>
              <button
                onClick={() => setSelectedMilestone(null)}
                className="text-outline hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: Division Progression Tier */}
      <section className="bg-surface-container-low/80 backdrop-blur-xl p-6 rounded-xl shadow-xl relative overflow-hidden border border-surface-container-high/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                workspace_premium
              </span>
              <h3 className="font-headline-sm text-on-surface uppercase tracking-wide font-bold">
                Division Progression Tier
              </h3>
            </div>
            <p className="font-body-sm text-on-surface-variant">
              Climb seasonal ranks through offensive incursion milestones and ranked combat.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-surface-container-high self-start md:self-auto flex items-center gap-2 border border-surface-container-highest">
            <span className="font-label-sm text-tertiary font-semibold uppercase">Requirement:</span>
            <span className="font-label-sm text-on-surface font-bold">3/5 Milestones to Silver</span>
          </div>
        </div>

        <div className="relative py-4 px-2 sm:px-6">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-container-highest rounded-full z-0">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-primary-container to-surface-container-highest rounded-full"
              style={{ width: '25%' }}
            ></div>
          </div>

          <div className="grid grid-cols-5 relative z-10">
            {tiers.map((tier, idx) => (
              <div
                key={tier.name}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedTierInfo(selectedTierInfo === tier.name ? null : tier.name);
                }}
                className={`flex flex-col items-center text-center group cursor-pointer ${
                  idx === 0
                    ? ''
                    : idx === 1
                    ? ''
                    : idx === 2
                    ? 'opacity-80'
                    : idx === 3
                    ? 'opacity-60'
                    : 'opacity-50'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    tier.active
                      ? 'bg-surface-container-lowest p-2 ring-2 ring-amber-600 shadow-[0_0_18px_rgba(205,127,50,0.5)]'
                      : 'bg-surface-container p-2 ring-1 ring-outline-variant shadow-md'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[30px] ${tier.iconColor}`}>
                    {tier.icon}
                  </span>
                </div>
                <span
                  className={`mt-3 font-label-md font-bold uppercase tracking-wider ${
                    tier.active ? 'text-amber-400' : 'text-on-surface-variant'
                  }`}
                >
                  {tier.name}
                </span>
                <span
                  className={`mt-0.5 px-2 py-0.5 rounded-full font-label-sm uppercase ${
                    tier.active
                      ? 'bg-amber-950/70 text-amber-300'
                      : 'font-label-sm text-outline'
                  }`}
                >
                  {tier.tag}
                </span>
              </div>
            ))}
          </div>

          {/* Tier Detail Drawer Preview */}
          {selectedTierInfo && (
            <div className="mt-6 p-4 rounded-lg bg-surface-container-high/80 border border-tertiary/30 flex items-center justify-between text-sm animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary">info</span>
                <span>
                  <strong className="text-tertiary">{selectedTierInfo} Tier:</strong>{' '}
                  {tiers.find((t) => t.name === selectedTierInfo)?.desc}
                </span>
              </div>
              <button
                onClick={() => setSelectedTierInfo(null)}
                className="text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: Boss Invasion & Division Leaders */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Boss Invasion Card */}
        <div className="lg:col-span-7 bg-surface-container-low/90 backdrop-blur-xl rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between group border border-surface-container-high/40">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-container/10 via-transparent to-tertiary-container/10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-tertiary"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(111,0,190,0.5)]">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">warning</span>
                  BOSS INVASION
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant font-label-sm uppercase tracking-wider border border-surface-container-highest">
                  ★★☆☆☆ Intermediate
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-tertiary font-label-sm font-semibold border border-tertiary/20">
                <span className="material-symbols-outlined text-[16px] animate-spin">timelapse</span>
                <span>Ends in 14h 22m</span>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-48 bg-surface-container-lowest border border-surface-container-high">
              <img
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                alt="Holographic cybernetic leviathan entity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCd-CDo-uZcmgPu7QGlUIt2d-HxtYpybWHZuWiHhHgZOe4JPb8adI54c0t3er1p5m7cwsxOHgNIQdtHmbYqmeqPyfI3AHRSKhL3-VresziJ3Ktc6-h2JpsZaCIO2cef5b52J8YB1juOv9joyesGbqm9b2wJ8IsD2hVbF4QGReicy2-N_RjI3wjrI7SMEKzdBCVPKZleMYMQoSzv99i2nVteEF5u-doyc39lhp2QEDYgUBSM3ITo5GJc"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="font-label-sm text-tertiary uppercase tracking-widest font-semibold">
                    Tactical Raid Target
                  </p>
                  <h4 className="font-headline-md text-on-surface uppercase tracking-wide font-bold">
                    PHISHING INVASION: Level 1 Apex
                  </h4>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="font-label-sm text-outline uppercase">Target Vulnerability</span>
                  <p className="font-label-md text-secondary font-bold font-mono">
                    DKIM / SPF Bypass
                  </p>
                </div>
              </div>
            </div>

            <p className="font-body-sm text-on-surface-variant leading-relaxed">
              Infiltrate the weaponized spoofing server. Identify SPF misconfigurations, decode obfuscated
              macros in email headers, and neutralize the threat vector before corporate DNS
              synchronization completes.
            </p>

            <div className="p-4 rounded-lg bg-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-surface-container-high/60">
              <div className="space-y-1">
                <span className="font-label-sm text-outline uppercase tracking-wider">
                  Victory Rewards
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-tertiary font-label-md font-bold">
                    <span className="material-symbols-outlined text-[18px]">bolt</span> +500 XP
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline"></span>
                  <span className="flex items-center gap-1 text-secondary font-label-md font-bold">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>{' '}
                    Cyber Shield Badge
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('boss-challenges');
                }}
                className="py-3 px-6 rounded-lg bg-gradient-to-r from-secondary-container to-primary hover:from-secondary hover:to-primary-container text-on-primary font-headline-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_16px_rgba(111,0,190,0.4)] flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">terminal</span>
                <span>Launch Incursion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Division Leaders Preview */}
        <div className="lg:col-span-5 bg-surface-container-low/90 backdrop-blur-xl rounded-xl p-6 shadow-xl flex flex-col justify-between border border-surface-container-high/40">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[22px]">
                  leaderboard
                </span>
                <h3 className="font-headline-sm text-on-surface uppercase tracking-wide font-bold">
                  Division Leaders
                </h3>
              </div>
              <span className="font-label-sm text-outline uppercase tracking-wider">
                Weekly Sprint
              </span>
            </div>

            <div className="divide-y divide-outline-variant/20 flex flex-col gap-1">
              {/* Leader 1 */}
              <div className="py-2.5 px-3 rounded-lg bg-surface-container/60 hover:bg-surface-container-high transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-headline-sm text-amber-400 font-bold w-6 text-center">
                    🥇
                  </span>
                  <div className="w-9 h-9 rounded-full bg-surface-container-highest p-0.5 ring-1 ring-amber-400/50 flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="ViperStrike"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT4SFd26f3Z0Pub6IvA_0rxIBIM1t-CNpDw7yKV5DTBnB-I5P3Fd1mXxdPd-uQiWplCCqgenjPxrkone7xI0ent2NJhRFrIJVxEY-yb_HjWSI6mS6UHP8lDYCyeS7Fn5d4xAdNSvVBTvh4zT17kKQh6CgU6yGFvhGDcnq86u2NVtnLWF51_j7z6CvTzRiXrhvz7ZTWpMczY0pRSqSa7waBSQbd7FlMIiFqNuhEYra3mZNl73iVUHj9"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-on-surface font-semibold truncate group-hover:text-tertiary transition-colors">
                      ViperStrike
                    </span>
                    <span className="font-label-sm text-amber-300">Gold Tier</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-label-md text-tertiary font-bold font-mono">12,450 XP</span>
                  <span className="block font-label-sm text-outline">#1</span>
                </div>
              </div>

              {/* Leader 2 */}
              <div className="py-2.5 px-3 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-headline-sm text-slate-300 font-bold w-6 text-center">
                    🥈
                  </span>
                  <div className="w-9 h-9 rounded-full bg-surface-container-highest p-0.5 ring-1 ring-slate-400/50 flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="GhostByte"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsSk8d529mkp_t9Dzj0qmdmOFqaiYs0u2Fb9UOFtX7BREBCrnB7Wo4q2_HlA2CWCAwAiBnw3CEPT7d_ev8iSVP3brfpum1wHTuF46cUP8rNwZtCyg6jJb9ivvrx2iuBpuYXMEUaJtBZmjC85TZobakW9pp19OtSRkbLJkdlHjh6Spq3tkPKDB3FcIdQsXYRQ7PL3suIrFrlq8ICIfvX30c-aXkuSVxev3RX3z3F-yBykkgNzGCT3on"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-on-surface font-semibold truncate group-hover:text-tertiary transition-colors">
                      GhostByte
                    </span>
                    <span className="font-label-sm text-amber-300">Gold Tier</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-label-md text-tertiary font-bold font-mono">10,890 XP</span>
                  <span className="block font-label-sm text-outline">#2</span>
                </div>
              </div>

              {/* Leader 3 */}
              <div className="py-2.5 px-3 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-headline-sm text-amber-600 font-bold w-6 text-center">
                    🥉
                  </span>
                  <div className="w-9 h-9 rounded-full bg-surface-container-highest p-0.5 ring-1 ring-amber-600/50 flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="ZeroTrace"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD0VCaoMZcjx0-u81u0s3UDENdRct9v_uQBobRou1T-h-TcxAKtBHSeO7WgomThx6ikvm955QZT2F3EdRWG2sAMCYfjQaGGsRaV9eEVTE5qR8PAb4LT2FZnWHUC92whiLYKfmixvqQGvgh9uJFVTKVGlAdH8rXwU0xMrQMaKp0UnNuXLFYcM4GNp4FpN4EMGPMLNQLqPhWCFbLOYmjxW2PXJHg42zNe0IIl2GlqOqkWWZlQetBWVOY"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-on-surface font-semibold truncate group-hover:text-tertiary transition-colors">
                      ZeroTrace
                    </span>
                    <span className="font-label-sm text-slate-300">Silver Tier</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-label-md text-tertiary font-bold font-mono">9,420 XP</span>
                  <span className="block font-label-sm text-outline">#3</span>
                </div>
              </div>

              {/* Leader 4 */}
              <div className="py-2.5 px-3 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-label-md text-outline font-bold w-6 text-center font-mono">
                    #4
                  </span>
                  <div className="w-9 h-9 rounded-full bg-surface-container-highest p-0.5 ring-1 ring-outline-variant flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="NeonSpecter"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsyVhqrZ7LOrIhXNyXdPL0O3KGKyxHiYBP1IJ30285i8VAMzM9jtgRFqLFFubNir_aZEOIheB3dn2QjQ0zuYeXslpl7VzHkzImzAN6pdeJp0Ab8xzExgYI_Oly7eN_4EMSuzL6JVs4La9EHW-9oLtOfv-0So7dMvUYCazm-QhHvkNCSeLju7mBr9i3I89d_tBRV3vEjMQPhsmRs_1LA1HW9ofOrfIyimqrJeeyZx0Mm51OGegWX42R"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-on-surface font-semibold truncate group-hover:text-tertiary transition-colors">
                      NeonSpecter
                    </span>
                    <span className="font-label-sm text-slate-300">Silver Tier</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-label-md text-tertiary font-bold font-mono">8,110 XP</span>
                  <span className="block font-label-sm text-outline">#4</span>
                </div>
              </div>

              {/* Leader 5 */}
              <div className="py-2.5 px-3 rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-label-md text-outline font-bold w-6 text-center font-mono">
                    #5
                  </span>
                  <div className="w-9 h-9 rounded-full bg-surface-container-highest p-0.5 ring-1 ring-outline-variant flex-shrink-0">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="CryptoKnight"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu8FAYMVNH6Ihn9JrUPzy-Jw1CQ5B8-Py_ykxZcTMESciluoRuDu30wPCfz6F6h5Zy4Tp7rCFIoa9OVf8MxUTs_HvsnUV0bAmU_cPsJzi8JFNaamJa0lt1d9bf1fqP-VG4rkCdnWeyvafWThGH5AK7ihIReNsGIV6UoihnVWSMCXEnw9QzOEcH057vwHWDkMI7Pem95Y8kG2hMG3oDzNVe8aZypznkE00OBLHpH5f8d7N6nznRHvqS"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-on-surface font-semibold truncate group-hover:text-tertiary transition-colors">
                      CryptoKnight
                    </span>
                    <span className="font-label-sm text-amber-500">Bronze Tier</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-label-md text-tertiary font-bold font-mono">7,950 XP</span>
                  <span className="block font-label-sm text-outline">#5</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-on-surface-variant font-label-sm border-t border-surface-container-high">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Telemetry sync 4s ago
            </span>
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigate('leaderboard');
              }}
              className="text-tertiary hover:underline uppercase tracking-wider flex items-center gap-1 font-semibold cursor-pointer"
            >
              Full Standings{' '}
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
