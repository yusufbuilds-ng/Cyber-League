import React from 'react';
import { TabType } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface SidebarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  latencyMs?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  latencyMs = 18,
  isOpen = false,
  onClose,
}) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'career-path', label: 'Career Path', icon: 'track_changes' },
    { id: 'quiz', label: 'Arena / Quiz', icon: 'swords' },
    { id: 'boss-challenges', label: 'Boss Challenges', icon: 'terminal' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
    { id: 'armory-badges', label: 'Armory / Badges', icon: 'military_tech' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  const handleNavClick = (tab: TabType) => {
    soundFx.playClick();
    onNavigate(tab);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-lowest/95 backdrop-blur-xl z-50 flex flex-col justify-between pt-20 pb-6 border-r border-surface-container-high/30 select-none transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
      <div className="flex flex-col gap-6">
        <div className="px-6">
          <p className="font-label-sm uppercase tracking-wider text-outline">
            Tactical Grid Ops
          </p>
        </div>

        <nav className="flex flex-col gap-1.5 px-3">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left w-full ${
                  isActive
                    ? 'bg-surface-container-high text-tertiary shadow-[0_0_12px_rgba(0,218,243,0.2)] font-semibold border-l-2 border-tertiary'
                    : 'text-on-surface-variant font-label-md hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-tertiary' : 'text-outline'}`}>
                  {item.icon}
                </span>
                <span className="font-label-md">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Telemetry Uplink Ping */}
      <div className="px-4 flex flex-col gap-2">
        <div className="p-3 rounded-lg bg-surface-container-low/70 flex items-center justify-between border border-surface-container-high/40 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_6px_rgba(0,218,243,0.8)]"></span>
            <span className="font-label-sm text-on-surface font-semibold tracking-wider">
              SOC UPLINK
            </span>
          </div>
          <span className="font-label-sm text-outline font-mono">{latencyMs}ms</span>
        </div>
      </div>
    </aside>
  </>
  );
};
