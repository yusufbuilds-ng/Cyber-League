import React, { useState } from 'react';
import { OperativeProfile, TabType } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  operative: OperativeProfile;
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenNotifications: () => void;
  notificationCount: number;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  operative,
  onNavigate,
  onOpenNotifications,
  notificationCount,
  onToggleSidebar,
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    soundFx.playClick();
    onNavigate('dashboard');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface-container-lowest/80 backdrop-blur-xl z-40 px-3 sm:px-6 flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.3)] border-b border-surface-container-high/40">
      {/* Left: Brand Identity & Mobile Hamburger */}
      <div className="flex items-center gap-2 sm:gap-4">
        {onToggleSidebar && (
          <button
            onClick={() => {
              soundFx.playClick();
              onToggleSidebar();
            }}
            className="lg:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>
        )}
        <div className="flex items-center gap-3 sm:gap-4 cursor-pointer select-none" onClick={handleLogoClick}>
        <img
          alt="Cyber League Crest Logo"
          className="h-8 w-auto object-contain drop-shadow-[0_0_8px_rgba(0,218,243,0.5)]"
          src="https://lh3.googleusercontent.com/aida/AEtjO1WwUKAxamhYVx4kQ1DZsoQLH0-taVgt0C3AGuz8Y1ZszsjzM_ls8XgKf0MCYN_FwGRvo5kjwejGr02JZOnPY8mbfiUHdaTJEZGJlO6sG-wyfZNuCruvpqAv2E7dtFv1rlAnlDuKZgt1WLlRk39pnLmDygHWW9888tDFX1tLBpqxgAbi0GtaJS4LCHkMJDAYsm91bclv-qdHqdsfaj7oZBC8oywrfvg_Z66I9PQKTVExKpYkEhH8baUZ-dE"
        />
        <span className="font-headline-sm uppercase tracking-wide bg-gradient-to-r from-tertiary via-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,218,243,0.4)] font-bold">
          CYBER LEAGUE
        </span>
        <div className="hidden xl:flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm uppercase tracking-widest shadow-[0_0_8px_rgba(111,0,190,0.4)] font-semibold">
          SEASON 4: ZERO DAY
        </div>
      </div>
    </div>

      {/* Right: Telemetry & Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* XP Display */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high shadow-[0_0_10px_rgba(0,218,243,0.2)] border border-tertiary/20">
          <span className="font-label-md text-tertiary font-bold">⚡ {operative.xp.toLocaleString()} XP</span>
        </div>

        {/* Division Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high border border-outline-variant/30">
          <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_rgba(205,127,50,0.8)]"></span>
          <span className="font-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
            {operative.division}
          </span>
        </div>

        {/* Notifications Alert Bell */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenNotifications();
          }}
          aria-label="Notifications"
          className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors focus:outline-none focus:ring-1 focus:ring-tertiary"
        >
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,218,243,0.9)] animate-pulse"></span>
          )}
        </button>

        {/* Profile Avatar & Tactical Quick Menu */}
        <div className="relative">
          <button
            onClick={() => {
              soundFx.playClick();
              setProfileMenuOpen(!profileMenuOpen);
            }}
            className="p-0.5 rounded-full bg-gradient-to-tr from-tertiary to-secondary shadow-[0_0_10px_rgba(0,218,243,0.4)] hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-tertiary"
            aria-label="Open operative menu"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              src={operative.avatarUrl}
            />
          </button>

          {/* Quick Dropdown Menu */}
          {profileMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-64 bg-surface-container-low/95 border border-surface-container-high rounded-xl p-3 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-2"
              onMouseLeave={() => setProfileMenuOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 border-b border-surface-container-high/60">
                <img
                  src={operative.avatarUrl}
                  alt={operative.handle}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-tertiary"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-sm text-sm text-on-surface font-bold truncate">
                    {operative.handle}
                  </span>
                  <span className="font-label-sm text-tertiary text-[10px] uppercase">
                    {operative.rankTitle}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-sm">
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavigate('dashboard');
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-on-surface hover:bg-surface-container-high transition-colors font-body-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary">grid_view</span>
                  <span>Operative Dashboard</span>
                </button>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavigate('armory-badges');
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-on-surface hover:bg-surface-container-high transition-colors font-body-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">military_tech</span>
                  <span>Armory & Badges</span>
                </button>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavigate('onboarding');
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-tertiary hover:bg-surface-container-high transition-colors font-body-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">account_box</span>
                  <span>Change Avatar Persona</span>
                </button>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavigate('settings');
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-on-surface hover:bg-surface-container-high transition-colors font-body-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                  <span>System Settings</span>
                </button>
                <div className="h-px bg-surface-container-high my-1"></div>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavigate('auth');
                  }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-error hover:bg-error-container/20 transition-colors font-body-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                  <span>Switch Account / Sign In</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
