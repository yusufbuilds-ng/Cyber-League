import React, { useState } from 'react';
import { AvatarOption, OperativeProfile } from '../types/cyber';
import { avatarOptions } from '../data/mockData';
import { soundFx } from '../utils/audio';

interface OnboardingScreenProps {
  initialHandle?: string;
  initialEmail?: string;
  onComplete: (profile: Partial<OperativeProfile>) => void;
  onCancel?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  initialHandle = 'ShadowZero',
  initialEmail = 'agent@cyberleague.gg',
  onComplete,
  onCancel,
}) => {
  const [handle, setHandle] = useState(initialHandle);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarOption>(avatarOptions[0]);
  const [selectedArchetype, setSelectedArchetype] = useState<string>(avatarOptions[0].archetype);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Offensive Red Team' | 'SOC Blue Defender' | 'Forensic Threat Hunter' | 'Cryptanalytic Breaker'>('all');

  const filteredAvatars = avatarOptions.filter((av) => {
    if (activeFilter === 'all') return true;
    return av.archetype === activeFilter;
  });

  const archetypes = [
    {
      id: 'SOC Blue Defender',
      icon: 'shield',
      title: 'SOC Blue Defender',
      description: 'Specialized in defensive incident triage, SPF/DKIM authentication, and perimeter containment.',
      buff: '+1 Free Demotion Shield in Ranked Ladder',
      color: 'text-tertiary border-tertiary/40 bg-tertiary/10',
    },
    {
      id: 'Offensive Red Team',
      icon: 'swords',
      title: 'Offensive Red Team',
      description: 'Master of weaponized spearphishing payload analysis and penetration testing vectors.',
      buff: '+15% Speed Multiplier on Incident Drills',
      color: 'text-secondary border-secondary/40 bg-secondary/10',
    },
    {
      id: 'Forensic Threat Hunter',
      icon: 'radar',
      title: 'Forensic Threat Hunter',
      description: 'Decodes obfuscated scripts, DNS tunnels, and anomalous network traffic patterns.',
      buff: 'Highlights Suspicious Headers in Boss Incursions',
      color: 'text-primary border-primary/40 bg-primary/10',
    },
    {
      id: 'Cryptanalytic Breaker',
      icon: 'key',
      title: 'Cryptanalytic Breaker',
      description: 'High-speed master of encryption ciphers, hash digests, and protocol vulnerabilities.',
      buff: '+25 XP Bonus on 1v1 Decipher Combats',
      color: 'text-[#FFD700] border-[#FFD700]/40 bg-[#FFD700]/10',
    },
  ];

  const handleFinish = () => {
    soundFx.playSuccess();
    onComplete({
      handle: handle.trim() || 'Specter_Ops',
      email: initialEmail,
      avatarUrl: selectedAvatar.url,
      avatarId: selectedAvatar.id,
      archetype: selectedArchetype,
      rankTitle: `Cadet ${selectedArchetype.split(' ')[0]}`,
    });
  };

  const rarityBorders: Record<string, string> = {
    Rare: 'border-primary/40 text-primary',
    Epic: 'border-tertiary/50 text-tertiary shadow-[0_0_12px_rgba(0,218,243,0.3)]',
    Legendary: 'border-secondary/60 text-secondary shadow-[0_0_16px_rgba(168,85,247,0.4)]',
    Mythic: 'border-[#FFD700]/70 text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)]',
  };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-background py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary-container/25 rounded-full blur-3xl pointer-events-none"></div>

      {onCancel && (
        <button
          onClick={onCancel}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/80 text-on-surface-variant hover:text-tertiary transition-colors font-label-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Skip Calibration</span>
        </button>
      )}

      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary font-label-sm uppercase tracking-widest font-mono">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            OPERATIVE PROTOCOL INITIATION // AVATAR CALIBRATION
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-5xl uppercase tracking-tight bg-gradient-to-r from-primary via-surface-tint to-secondary bg-clip-text text-transparent font-bold">
            Select Your Cyber Avatar Persona
          </h1>
          <p className="font-body-md text-on-surface-variant max-w-xl">
            Choose your cryptographic identity skin and tactical combat specialization before
            synchronizing with the Cyber League global arena.
          </p>
        </div>

        {/* Main Selection Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Avatar Grid & Filters (Span 8) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-surface-container-low p-1.5 rounded-xl border border-surface-container-high">
              {[
                { id: 'all', label: 'All Avatars' },
                { id: 'SOC Blue Defender', label: 'Blue Team' },
                { id: 'Offensive Red Team', label: 'Red Team' },
                { id: 'Forensic Threat Hunter', label: 'Forensics' },
                { id: 'Cryptanalytic Breaker', label: 'Cryptanalysts' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveFilter(tab.id as typeof activeFilter);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-surface-container-high text-tertiary font-bold shadow-[0_0_10px_rgba(0,218,243,0.3)] border border-tertiary/30'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Avatar Grid (10 items) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredAvatars.map((av) => {
                const isSelected = selectedAvatar.id === av.id;
                return (
                  <div
                    key={av.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedAvatar(av);
                      setSelectedArchetype(av.archetype);
                    }}
                    className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col gap-2 relative group overflow-hidden ${
                      isSelected
                        ? `bg-surface-container-high ring-2 ring-tertiary shadow-[0_0_20px_rgba(0,218,243,0.4)] ${rarityBorders[av.rarity]}`
                        : 'bg-surface-container-low/90 border-surface-container-high hover:border-surface-container-highest hover:bg-surface-container'
                    }`}
                  >
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-container-lowest">
                      <img
                        src={av.url}
                        alt={av.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold bg-surface-container-lowest/80 backdrop-blur-sm border border-surface-container-high">
                        {av.rarity}
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 bg-tertiary/10 border-2 border-tertiary flex items-center justify-center">
                          <span className="material-symbols-outlined text-tertiary text-2xl font-bold drop-shadow">
                            check_circle
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-headline-sm text-xs font-bold text-on-surface truncate">
                        {av.name}
                      </span>
                      <span className="font-mono text-[10px] text-outline truncate">
                        {av.archetype}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Specialization Archetype Selection */}
            <div className="flex flex-col gap-3 mt-2">
              <span className="font-mono text-xs uppercase text-outline tracking-wider font-bold">
                SELECT PRIMARY OPERATIVE SPECIALIZATION:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {archetypes.map((arch) => {
                  const isChosen = selectedArchetype === arch.id;
                  return (
                    <div
                      key={arch.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedArchetype(arch.id);
                      }}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                        isChosen
                          ? 'bg-surface-container-high border-tertiary shadow-[0_0_14px_rgba(0,218,243,0.3)]'
                          : 'bg-surface-container-low/80 border-surface-container-high hover:bg-surface-container'
                      }`}
                    >
                      <div className={`p-2 rounded-lg flex items-center justify-center ${arch.color}`}>
                        <span className="material-symbols-outlined text-xl">{arch.icon}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-on-surface font-bold text-xs">
                            {arch.title}
                          </span>
                          {isChosen && (
                            <span className="text-tertiary font-mono text-[10px] font-bold">
                              EQUIPPED
                            </span>
                          )}
                        </div>
                        <p className="font-body-sm text-on-surface-variant text-[11px] line-clamp-1 mt-0.5">
                          {arch.description}
                        </p>
                        <span className="font-mono text-[10px] text-tertiary font-semibold mt-1">
                          ⚡ Perk: {arch.buff}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Holographic Inspect Panel (Span 4) */}
          <div className="lg:col-span-4 bg-surface-container-low/95 p-6 rounded-xl border border-surface-container-high shadow-2xl flex flex-col justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-tertiary via-primary to-secondary"></div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-outline">HOLOGRAM SCANNER</span>
                <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold bg-tertiary/15 text-tertiary border border-tertiary/30">
                  {selectedAvatar.rarity} NFT TIER
                </span>
              </div>

              {/* Large Selected Avatar View */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-container-highest shadow-xl">
                <img
                  src={selectedAvatar.url}
                  alt={selectedAvatar.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-xs text-on-surface bg-surface-container-high/80 px-3 py-1.5 rounded-lg backdrop-blur-md border border-surface-container-highest">
                  <span className="text-tertiary font-bold">{selectedAvatar.name}</span>
                  <span className="text-outline text-[10px]">ID: 0x{selectedAvatar.id.slice(0, 4)}</span>
                </div>
              </div>

              {/* Callsign / Handle Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs text-outline uppercase">
                  OPERATIVE CALL SIGN:
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-outline text-lg">
                    terminal
                  </span>
                  <input
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="w-full bg-surface-container-lowest text-on-surface font-mono text-sm pl-9 pr-3 py-2 rounded-lg border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-tertiary"
                    placeholder="Enter Call Sign..."
                  />
                </div>
              </div>

              {/* Lore & Tactical Perk */}
              <div className="p-3.5 rounded-lg bg-surface-container border border-surface-container-high flex flex-col gap-2">
                <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                  CLASSIFIED LORE &amp; COMBAT ATTRIBUTE
                </span>
                <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
                  {selectedAvatar.lore}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-tertiary font-mono text-xs font-semibold">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  <span>{selectedAvatar.perk}</span>
                </div>
              </div>
            </div>

            {/* Launch CTA */}
            <button
              onClick={handleFinish}
              className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-primary-container via-secondary to-tertiary hover:opacity-95 text-on-primary font-headline-sm uppercase tracking-wider font-bold shadow-[0_0_24px_rgba(0,218,243,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              <span>Deploy to Tactical Grid</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
