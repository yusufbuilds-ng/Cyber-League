import React, { useState } from 'react';
import { LeaderboardOperative, OperativeProfile, TabType } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface LeaderboardScreenProps {
  operatives: LeaderboardOperative[];
  currentOperative: OperativeProfile;
  onNavigate: (tab: TabType) => void;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  operatives,
  currentOperative,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<'mastery' | 'ladder' | 'weekly' | 'clans'>('mastery');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedOperative, setInspectedOperative] = useState<LeaderboardOperative | null>(null);

  const filteredOperatives = operatives.filter((op) => {
    const matchSearch =
      op.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.squad.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-6 sm:py-8 gap-6 sm:gap-8 max-w-7xl mx-auto">
      {/* Top Command & Telemetry Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_rgba(0,218,243,0.8)]"></span>
            <span className="font-label-sm uppercase tracking-widest text-tertiary font-semibold">
              Live CTF Telemetry Feed // Global SOC Link
            </span>
          </div>
          <h1 className="font-headline-lg uppercase tracking-tight text-on-surface font-bold text-2xl sm:text-4xl">
            Global Rankings &amp; Season Ladder
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-xl">
            Elite tier rankings calculated across real-time exploit trials, cyber defense drills, and
            zero-day containment sprints.
          </p>
        </div>

        {/* Countdown & League Pulse Badge */}
        <div className="flex items-center gap-4 bg-surface-container-low px-5 py-3 rounded-xl shadow-lg relative overflow-hidden border border-surface-container-high/60">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex flex-col">
            <span className="font-label-sm text-outline uppercase tracking-wider">
              Cycle Status
            </span>
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-tertiary font-bold tracking-tight font-mono">
                18d 04h 32m
              </span>
            </div>
          </div>
          <div className="w-px h-8 bg-surface-variant"></div>
          <div className="flex flex-col">
            <span className="font-label-sm text-outline uppercase tracking-wider">Active Cycle</span>
            <span className="font-label-md text-secondary font-semibold font-mono">
              SEASON 4 [ZERO DAY]
            </span>
          </div>
        </div>
      </div>

      {/* Filter Controls & Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Horizontal Navigation Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-surface-container-lowest gap-1 border border-surface-container-high/40">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('mastery');
            }}
            className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'mastery'
                ? 'bg-surface-container-high text-tertiary shadow-[0_0_16px_rgba(0,218,243,0.3)] font-semibold border border-tertiary/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">public</span>
            <span>Global Mastery</span>
            {activeFilter === 'mastery' && (
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
            )}
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('ladder');
            }}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'ladder'
                ? 'bg-surface-container-high text-tertiary shadow-[0_0_16px_rgba(0,218,243,0.3)] font-semibold border border-tertiary/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">military_tech</span>
            <span>Season Ladder</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('weekly');
            }}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'weekly'
                ? 'bg-surface-container-high text-tertiary shadow-[0_0_16px_rgba(0,218,243,0.3)] font-semibold border border-tertiary/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Weekly XP</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveFilter('clans');
            }}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-label-md transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'clans'
                ? 'bg-surface-container-high text-tertiary shadow-[0_0_16px_rgba(0,218,243,0.3)] font-semibold border border-tertiary/20'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">groups</span>
            <span>Clan / Squads</span>
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container-lowest text-on-surface font-label-sm pl-9 pr-4 py-2 rounded-lg outline-none focus:ring-1 focus:ring-tertiary w-60 sm:w-64 placeholder:text-outline border border-surface-container-high/60 transition-all font-mono"
              placeholder="Filter handle or clan tag..."
              type="text"
            />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-low text-on-surface-variant font-label-sm border border-surface-container-high/40">
            <span className="text-outline">Pool:</span>
            <span className="text-tertiary font-semibold font-mono">14,290 Operatives</span>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Hub */}
      <div className="flex flex-col bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden relative border border-surface-container-high/60">
        {/* Micro HUD Header Bar */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-surface-container-low text-outline font-label-sm uppercase tracking-wider items-center border-b border-surface-container-high/60">
          <div className="col-span-1 text-center font-bold font-mono">RANK</div>
          <div className="col-span-4 lg:col-span-4">OPERATIVE</div>
          <div className="col-span-3 lg:col-span-2">BADGE / TIER</div>
          <div className="col-span-2 lg:col-span-2 text-right">ACCURACY</div>
          <div className="hidden lg:block lg:col-span-1 text-center">STREAK</div>
          <div className="col-span-2 lg:col-span-2 text-right pr-2">TOTAL XP</div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-1.5 p-2">
          {filteredOperatives.map((op) => {
            const isRank1 = op.rank === 1;
            const isRank2 = op.rank === 2;
            const isRank3 = op.rank === 3;

            if (isRank1) {
              return (
                <div
                  key={op.rank}
                  onClick={() => {
                    soundFx.playClick();
                    setInspectedOperative(op);
                  }}
                  className="grid grid-cols-12 gap-4 px-4 py-4 rounded-lg items-center bg-surface-container/90 relative overflow-hidden transition-all duration-200 hover:bg-surface-container-high shadow-[0_0_20px_rgba(255,215,0,0.22)] group cursor-pointer border border-[#FFD700]/30"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFD700]"></div>

                  {/* Rank */}
                  <div className="col-span-1 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-md bg-[#FFD700]/15 text-[#FFD700]">
                      <span className="material-symbols-outlined text-[20px] drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        workspace_premium
                      </span>
                      <span className="absolute -bottom-1 -right-1 font-label-sm text-[9px] font-bold bg-[#FFD700] text-surface-container-lowest px-1 rounded-sm leading-none font-mono">
                        1
                      </span>
                    </div>
                  </div>

                  {/* Operative */}
                  <div className="col-span-4 lg:col-span-4 flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-lg object-cover ring-1 ring-[#FFD700]/50"
                        alt={op.handle}
                        src={op.avatarUrl}
                      />
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-surface-container-lowest text-[10px] font-bold">
                          bolt
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-on-surface font-bold tracking-tight truncate group-hover:text-primary transition-colors">
                          {op.handle}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-[#FFD700]/10 text-[#FFD700] font-label-sm text-[10px] uppercase font-bold tracking-wider font-mono">
                          VIP
                        </span>
                      </div>
                      <span className="font-label-sm text-outline truncate font-mono">
                        SQUAD: [{op.squad}]
                      </span>
                    </div>
                  </div>

                  {/* Badge & Tier */}
                  <div className="col-span-3 lg:col-span-2 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">
                      <span className="material-symbols-outlined text-[16px]">stars</span>
                      <span className="font-label-sm uppercase font-bold tracking-wider">
                        {op.badge}
                      </span>
                    </div>
                  </div>

                  {/* Accuracy */}
                  <div className="col-span-2 lg:col-span-2 text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-label-lg text-on-surface font-mono font-semibold">
                        {op.accuracy}%
                      </span>
                      <div className="w-20 bg-surface-container-highest h-1 rounded-full overflow-hidden mt-1 hidden sm:block">
                        <div className="bg-tertiary h-full rounded-full" style={{ width: `${op.accuracy}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Win Streak */}
                  <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm font-bold font-mono">
                      <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                      <span>{op.streak}</span>
                    </div>
                  </div>

                  {/* Total XP */}
                  <div className="col-span-2 lg:col-span-2 text-right pr-2">
                    <div className="flex flex-col items-end">
                      <span className="font-headline-sm text-[#FFD700] font-bold font-mono tracking-tight drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                        {op.totalXp.toLocaleString()}
                      </span>
                      <span className="font-label-sm text-outline uppercase font-mono">
                        +{op.todayXp} today
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            if (isRank2) {
              return (
                <div
                  key={op.rank}
                  onClick={() => {
                    soundFx.playClick();
                    setInspectedOperative(op);
                  }}
                  className="grid grid-cols-12 gap-4 px-4 py-4 rounded-lg items-center bg-surface-container/75 relative overflow-hidden transition-all duration-200 hover:bg-surface-container-high shadow-[0_0_16px_rgba(192,192,192,0.18)] group cursor-pointer border border-[#C0C0C0]/30"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#C0C0C0] to-transparent"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C0C0C0]"></div>

                  <div className="col-span-1 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-md bg-[#C0C0C0]/15 text-[#C0C0C0]">
                      <span className="material-symbols-outlined text-[20px] drop-shadow-[0_0_8px_rgba(192,192,192,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        military_tech
                      </span>
                      <span className="absolute -bottom-1 -right-1 font-label-sm text-[9px] font-bold bg-[#C0C0C0] text-surface-container-lowest px-1 rounded-sm leading-none font-mono">
                        2
                      </span>
                    </div>
                  </div>

                  <div className="col-span-4 lg:col-span-4 flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-lg object-cover ring-1 ring-[#C0C0C0]/40"
                        alt={op.handle}
                        src={op.avatarUrl}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-on-surface font-bold tracking-tight truncate group-hover:text-primary transition-colors">
                          {op.handle}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-outline font-label-sm text-[10px] uppercase font-bold tracking-wider font-mono">
                          PRO
                        </span>
                      </div>
                      <span className="font-label-sm text-outline truncate font-mono">
                        SQUAD: [{op.squad}]
                      </span>
                    </div>
                  </div>

                  <div className="col-span-3 lg:col-span-2 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#C0C0C0]/10 text-[#C0C0C0] border border-[#C0C0C0]/20">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span className="font-label-sm uppercase font-bold tracking-wider">
                        {op.badge}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-2 text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-label-lg text-on-surface font-mono font-semibold">
                        {op.accuracy}%
                      </span>
                      <div className="w-20 bg-surface-container-highest h-1 rounded-full overflow-hidden mt-1 hidden sm:block">
                        <div className="bg-tertiary h-full rounded-full" style={{ width: `${op.accuracy}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm font-bold font-mono">
                      <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                      <span>{op.streak}</span>
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-2 text-right pr-2">
                    <div className="flex flex-col items-end">
                      <span className="font-headline-sm text-[#C0C0C0] font-bold font-mono tracking-tight drop-shadow-[0_0_8px_rgba(192,192,192,0.3)]">
                        {op.totalXp.toLocaleString()}
                      </span>
                      <span className="font-label-sm text-outline uppercase font-mono">
                        +{op.todayXp} today
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            if (isRank3) {
              return (
                <div
                  key={op.rank}
                  onClick={() => {
                    soundFx.playClick();
                    setInspectedOperative(op);
                  }}
                  className="grid grid-cols-12 gap-4 px-4 py-4 rounded-lg items-center bg-surface-container/65 relative overflow-hidden transition-all duration-200 hover:bg-surface-container-high shadow-[0_0_16px_rgba(205,127,50,0.18)] group cursor-pointer border border-[#CD7F32]/30"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#CD7F32] to-transparent"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#CD7F32]"></div>

                  <div className="col-span-1 flex items-center justify-center">
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-md bg-[#CD7F32]/15 text-[#CD7F32]">
                      <span className="material-symbols-outlined text-[20px] drop-shadow-[0_0_8px_rgba(205,127,50,0.8)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        shield
                      </span>
                      <span className="absolute -bottom-1 -right-1 font-label-sm text-[9px] font-bold bg-[#CD7F32] text-surface-container-lowest px-1 rounded-sm leading-none font-mono">
                        3
                      </span>
                    </div>
                  </div>

                  <div className="col-span-4 lg:col-span-4 flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-lg object-cover ring-1 ring-[#CD7F32]/40"
                        alt={op.handle}
                        src={op.avatarUrl}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-on-surface font-bold tracking-tight truncate group-hover:text-primary transition-colors">
                          {op.handle}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-outline font-label-sm text-[10px] uppercase font-bold tracking-wider font-mono">
                          ELITE
                        </span>
                      </div>
                      <span className="font-label-sm text-outline truncate font-mono">
                        SQUAD: [{op.squad}]
                      </span>
                    </div>
                  </div>

                  <div className="col-span-3 lg:col-span-2 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#CD7F32]/10 text-[#CD7F32] border border-[#CD7F32]/20">
                      <span className="material-symbols-outlined text-[16px]">shield_with_heart</span>
                      <span className="font-label-sm uppercase font-bold tracking-wider">
                        {op.badge}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-2 text-right">
                    <div className="flex flex-col items-end">
                      <span className="font-label-lg text-on-surface font-mono font-semibold">
                        {op.accuracy}%
                      </span>
                      <div className="w-20 bg-surface-container-highest h-1 rounded-full overflow-hidden mt-1 hidden sm:block">
                        <div className="bg-tertiary h-full rounded-full" style={{ width: `${op.accuracy}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary/10 text-tertiary font-label-sm font-bold font-mono">
                      <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                      <span>{op.streak}</span>
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-2 text-right pr-2">
                    <div className="flex flex-col items-end">
                      <span className="font-headline-sm text-[#CD7F32] font-bold font-mono tracking-tight drop-shadow-[0_0_8px_rgba(205,127,50,0.3)]">
                        {op.totalXp.toLocaleString()}
                      </span>
                      <span className="font-label-sm text-outline uppercase font-mono">
                        +{op.todayXp} today
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            // Other rows
            return (
              <div
                key={op.rank}
                onClick={() => {
                  soundFx.playClick();
                  setInspectedOperative(op);
                }}
                className="grid grid-cols-12 gap-4 px-4 py-3.5 rounded-lg items-center bg-surface-container-low/40 hover:bg-surface-container-high transition-all duration-150 group cursor-pointer border border-transparent hover:border-surface-container-highest"
              >
                <div className="col-span-1 text-center font-mono font-bold text-on-surface-variant group-hover:text-tertiary">
                  #{op.rank}
                </div>

                <div className="col-span-4 lg:col-span-4 flex items-center gap-3 min-w-0">
                  {op.avatarUrl ? (
                    <img
                      src={op.avatarUrl}
                      alt={op.handle}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-outline-variant"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-mono font-semibold text-primary text-label-sm border border-surface-container-high">
                      {op.avatarInitials}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-on-surface font-medium truncate group-hover:text-primary transition-colors">
                      {op.handle}
                    </span>
                    <span className="font-label-sm text-outline truncate font-mono">
                      {op.squad}
                    </span>
                  </div>
                </div>

                <div className="col-span-3 lg:col-span-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-label-sm font-semibold tracking-wider font-mono ${
                      op.tierType === 'platinum'
                        ? 'bg-secondary/10 text-secondary border border-secondary/20'
                        : op.tierType === 'gold'
                        ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20'
                        : op.tierType === 'silver'
                        ? 'bg-[#C0C0C0]/10 text-[#C0C0C0] border border-[#C0C0C0]/20'
                        : 'bg-[#CD7F32]/10 text-[#CD7F32] border border-[#CD7F32]/20'
                    }`}
                  >
                    {op.badge}
                  </span>
                </div>

                <div className="col-span-2 lg:col-span-2 text-right font-mono font-semibold text-on-surface text-label-md">
                  {op.accuracy}%
                </div>

                <div className="hidden lg:flex lg:col-span-1 items-center justify-center font-mono text-label-sm text-on-surface-variant">
                  {op.streak}
                </div>

                <div className="col-span-2 lg:col-span-2 text-right pr-2 font-mono font-bold text-primary text-label-lg">
                  {op.totalXp.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* PINNED BOTTOM ROW: CURRENT USER (CADET_ZERO / SPECTER_OPS) */}
        <div className="mt-2 bg-surface-container-high/95 backdrop-blur-xl relative shadow-[0_-4px_24px_rgba(0,0,0,0.6)] z-20 border-t border-tertiary/40">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary shadow-[0_0_12px_rgba(0,218,243,0.9)]"></div>
          <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
            {/* Rank Indicator */}
            <div className="col-span-1 text-center">
              <div className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-tertiary/15 text-tertiary font-mono font-bold text-label-md shadow-[0_0_8px_rgba(0,218,243,0.3)] border border-tertiary/30">
                #42
              </div>
            </div>

            {/* User Ident */}
            <div className="col-span-4 lg:col-span-4 flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-lg p-0.5 bg-gradient-to-tr from-tertiary to-secondary shadow-[0_0_12px_rgba(0,218,243,0.4)]">
                  <img
                    alt="User Profile"
                    className="w-full h-full rounded-md object-cover"
                    src={currentOperative.avatarUrl}
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-tertiary rounded-full animate-ping"></span>
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-tertiary rounded-full"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-tertiary font-bold tracking-tight">YOU</span>
                  <span className="font-label-md text-on-surface font-semibold truncate font-mono">
                    ({currentOperative.handle})
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 font-mono">
                  <span className="font-label-sm text-outline">Next rank in:</span>
                  <span className="font-label-sm text-secondary font-bold">150 XP</span>
                </div>
              </div>
            </div>

            {/* User Tier */}
            <div className="col-span-3 lg:col-span-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#CD7F32]/20 text-[#CD7F32] shadow-sm border border-[#CD7F32]/40">
                <span className="material-symbols-outlined text-[16px]">military_tech</span>
                <span className="font-label-sm uppercase font-bold tracking-wider">
                  {currentOperative.division}
                </span>
              </div>
            </div>

            {/* Accuracy */}
            <div className="col-span-2 lg:col-span-2 text-right">
              <div className="flex flex-col items-end">
                <span className="font-headline-sm text-on-surface font-mono font-bold">
                  {currentOperative.accuracy}.0%
                </span>
                <span className="font-label-sm text-tertiary font-mono hidden sm:inline">
                  +1.4% this week
                </span>
              </div>
            </div>

            {/* Win Streak */}
            <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-tertiary/15 text-tertiary font-label-md font-bold shadow-[0_0_8px_rgba(0,218,243,0.3)] font-mono border border-tertiary/20">
                <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                <span>{currentOperative.streakDays}</span>
              </div>
            </div>

            {/* Total XP & Action Button */}
            <div className="col-span-2 lg:col-span-2 flex flex-col items-end justify-center pr-2">
              <span className="font-headline-sm text-tertiary font-bold font-mono tracking-tight drop-shadow-[0_0_8px_rgba(0,218,243,0.4)]">
                {currentOperative.xp.toLocaleString()} XP
              </span>
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('quiz');
                }}
                className="mt-1 hidden sm:flex items-center gap-1 font-label-sm text-on-primary bg-gradient-to-r from-primary-container to-tertiary px-3 py-1 rounded font-semibold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-[0_0_10px_rgba(0,218,243,0.3)] cursor-pointer"
              >
                <span>Deploy CTF</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Footnote & Quick Match Link */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-2 font-mono">
        <div className="flex items-center gap-2 text-outline font-label-sm">
          <span className="material-symbols-outlined text-[16px]">schedule</span>
          <span>Ladder auto-refreshes every 60 seconds. Tier demotion shields activate at 48 hours.</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-label-md text-tertiary hover:underline flex items-center gap-1 cursor-pointer">
            <span>View Historical Seasons</span>
            <span className="material-symbols-outlined text-[16px]">north_east</span>
          </span>
        </div>
      </div>

      {/* Operative Inspection Modal */}
      {inspectedOperative && (
        <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl bg-surface-container-low p-6 flex flex-col gap-5 shadow-2xl relative border border-surface-container-high">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-3">
                {inspectedOperative.avatarUrl ? (
                  <img
                    src={inspectedOperative.avatarUrl}
                    alt={inspectedOperative.handle}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-tertiary"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center font-bold text-lg text-primary">
                    {inspectedOperative.avatarInitials}
                  </div>
                )}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-on-surface font-bold">
                      {inspectedOperative.handle}
                    </h3>
                    <span className="font-label-sm text-tertiary font-mono">
                      Rank #{inspectedOperative.rank}
                    </span>
                  </div>
                  <span className="font-label-sm text-outline font-mono">
                    Squad: [{inspectedOperative.squad}]
                  </span>
                </div>
              </div>
              <button
                onClick={() => setInspectedOperative(null)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3 rounded-lg bg-surface-container flex flex-col">
                <span className="text-outline text-xs uppercase">Total XP</span>
                <span className="text-xl font-bold text-tertiary">
                  {inspectedOperative.totalXp.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container flex flex-col">
                <span className="text-outline text-xs uppercase">Accuracy</span>
                <span className="text-xl font-bold text-on-surface">
                  {inspectedOperative.accuracy}%
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container flex flex-col">
                <span className="text-outline text-xs uppercase">Active Streak</span>
                <span className="text-xl font-bold text-secondary">
                  {inspectedOperative.streak} Wins 🔥
                </span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container flex flex-col">
                <span className="text-outline text-xs uppercase">Division Tier</span>
                <span className="text-xl font-bold text-primary">
                  {inspectedOperative.badge}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <span className="font-label-sm text-outline flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                SOC Verified Combat Record
              </span>
              <button
                onClick={() => setInspectedOperative(null)}
                className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
