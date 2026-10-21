import React, { useState } from 'react';
import { ArmoryBadge, OperativeProfile } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface ArmoryScreenProps {
  badges: ArmoryBadge[];
  operative: OperativeProfile;
}

export const ArmoryScreen: React.FC<ArmoryScreenProps> = ({ badges, operative }) => {
  const [selectedBadge, setSelectedBadge] = useState<ArmoryBadge | null>(null);

  const rarityColors = {
    Common: 'text-outline border-outline/30 bg-surface-container',
    Rare: 'text-primary border-primary/30 bg-primary/10',
    Epic: 'text-secondary border-secondary/30 bg-secondary/10',
    Legendary: 'text-[#FFD700] border-[#FFD700]/30 bg-[#FFD700]/10 shadow-[0_0_12px_rgba(255,215,0,0.2)]',
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-6 sm:py-8 gap-6 sm:gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
          <span className="font-label-sm uppercase tracking-widest text-secondary font-semibold font-mono">
            Classified Armory // Combat Loadout
          </span>
        </div>
        <h1 className="font-headline-lg uppercase tracking-tight text-on-surface font-bold text-2xl sm:text-4xl">
          Tactical Armory &amp; Insignia Badges
        </h1>
        <p className="font-body-md text-on-surface-variant max-w-2xl">
          Unlock prestige badges and passive defense multipliers by completing critical incident drills
          and defeating Apex Bosses across seasonal campaigns.
        </p>
      </div>

      {/* Operative Loadout Matrix */}
      <div className="p-6 rounded-xl bg-surface-container-low/90 backdrop-blur-xl border border-surface-container-high shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-tertiary via-secondary to-primary"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="material-symbols-outlined text-tertiary text-xl">military_tech</span>
            <span className="font-label-md text-on-surface font-bold uppercase tracking-wider">
              OPERATIVE LOADOUT SLOTS
            </span>
          </div>
          <span className="font-label-sm text-outline font-mono">
            OPERATIVE: {operative.handle} // {operative.division}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-surface-container border border-surface-container-highest flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shadow-inner">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <span className="font-mono text-xs text-outline uppercase">OPTIC HUD</span>
            <span className="font-headline-sm text-xs font-bold text-on-surface">Mk-IV Holo Visor</span>
            <span className="text-[10px] text-tertiary font-mono">+8% Query Scan Speed</span>
          </div>

          <div className="p-4 rounded-lg bg-surface-container border border-surface-container-highest flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shadow-inner">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <span className="font-mono text-xs text-outline uppercase">ACTIVE DEFENSE</span>
            <span className="font-headline-sm text-xs font-bold text-on-surface">Cyber Shield Prime</span>
            <span className="text-[10px] text-secondary font-mono">Demotion Shield Active</span>
          </div>

          <div className="p-4 rounded-lg bg-surface-container border border-surface-container-highest flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-2xl">memory</span>
            </div>
            <span className="font-mono text-xs text-outline uppercase">COGNITIVE CIPHER</span>
            <span className="font-headline-sm text-xs font-bold text-on-surface">RSA-4096 Sandbox</span>
            <span className="text-[10px] text-primary font-mono">+15 XP Speed Multiplier</span>
          </div>

          <div className="p-4 rounded-lg bg-surface-container border border-surface-container-highest flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-[#FFD700] shadow-inner">
              <span className="material-symbols-outlined text-2xl">workspace_premium</span>
            </div>
            <span className="font-mono text-xs text-outline uppercase">RANK INSIGNIA</span>
            <span className="font-headline-sm text-xs font-bold text-on-surface">Cadet Operative I</span>
            <span className="text-[10px] text-[#FFD700] font-mono">Division III Bracket</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-on-surface font-bold text-xl uppercase tracking-wider">
            Earned &amp; Target Badges
          </h2>
          <span className="font-mono text-xs text-outline">
            {badges.filter((b) => b.unlocked).length} OF {badges.length} UNLOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedBadge(badge);
                }}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4 relative overflow-hidden group ${
                  badge.unlocked
                    ? 'bg-surface-container-low/90 border-surface-container-high hover:border-tertiary shadow-lg hover:shadow-tertiary/20'
                    : 'bg-surface-container-lowest/60 border-surface-container-highest/40 opacity-70 hover:opacity-90'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                      badge.unlocked
                        ? 'bg-surface-container-high text-tertiary ring-1 ring-tertiary/40'
                        : 'bg-surface-container text-outline ring-1 ring-outline-variant/30'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: badge.unlocked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {badge.iconName}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold border ${
                      rarityColors[badge.rarity]
                    }`}
                  >
                    {badge.rarity}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    {badge.category}
                  </span>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold group-hover:text-tertiary transition-colors">
                    {badge.title}
                  </h3>
                  <p className="font-body-sm text-on-surface-variant line-clamp-2 text-xs leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {badge.buffText && (
                  <div className="p-2 rounded bg-surface-container/70 border border-surface-container-high font-mono text-[11px] text-tertiary flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    <span className="truncate">{badge.buffText}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-surface-container-high/60 flex items-center justify-between font-mono text-[11px]">
                  <span className={badge.unlocked ? 'text-emerald-400 font-semibold' : 'text-outline'}>
                    {badge.unlocked ? '● UNLOCKED' : '○ LOCKED'}
                  </span>
                  <span className="text-outline">{badge.unlockedAt || 'Requires Incursion'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge Inspection Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-surface-container-low p-6 flex flex-col gap-5 shadow-2xl relative border border-surface-container-high">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary ring-1 ring-tertiary/40">
                  <span className="material-symbols-outlined text-3xl">{selectedBadge.iconName}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline-sm text-on-surface font-bold">{selectedBadge.title}</h3>
                  <span className="font-mono text-xs text-outline">{selectedBadge.category}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBadge(null)}
                className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-body-md text-on-surface text-sm leading-relaxed">
              {selectedBadge.description}
            </p>

            {selectedBadge.buffText && (
              <div className="p-3 rounded-lg bg-surface-container flex items-center gap-2 border border-surface-container-high">
                <span className="material-symbols-outlined text-tertiary">bolt</span>
                <span className="font-mono text-xs text-tertiary font-bold">
                  Active Multiplier: {selectedBadge.buffText}
                </span>
              </div>
            )}

            <div className="pt-2 flex justify-between items-center font-mono text-xs text-outline">
              <span>Status: {selectedBadge.unlocked ? 'Equipped in Loadout' : 'Locked'}</span>
              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors"
              >
                Close Insignia
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
