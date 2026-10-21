import React, { useState } from 'react';
import { OperativeProfile, TabType } from '../types/cyber';
import { soundFx } from '../utils/audio';

interface SettingsScreenProps {
  operative: OperativeProfile;
  onUpdateProfile: (updated: Partial<OperativeProfile>) => void;
  onResetProgress: () => void;
  onNavigate?: (tab: TabType) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  operative,
  onUpdateProfile,
  onResetProgress,
  onNavigate,
}) => {
  const [handle, setHandle] = useState(operative.handle);
  const [email, setEmail] = useState(operative.email);
  const [gridNode, setGridNode] = useState('EU-WEST-1');
  const [soundEnabled, setSoundEnabled] = useState(soundFx.enabled);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    onUpdateProfile({
      handle: handle.trim() || operative.handle,
      email: email.trim() || operative.email,
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSoundToggle = (val: boolean) => {
    soundFx.enabled = val;
    setSoundEnabled(val);
    if (val) soundFx.playSuccess();
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 py-6 sm:py-8 gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm uppercase tracking-widest text-primary font-mono font-semibold">
            Grid Protocol Configuration
          </span>
        </div>
        <h1 className="font-headline-lg uppercase tracking-tight text-on-surface font-bold text-2xl sm:text-4xl">
          Terminal &amp; Operative Settings
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Configure cryptographic comms, tactical sound telemetry, grid node relays, and active
          defensive parameters.
        </p>
      </div>

      {saveToast && (
        <div className="p-3 rounded-lg bg-tertiary-container/30 border border-tertiary text-tertiary font-body-sm flex items-center gap-2 animate-fadeIn">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span>Operative terminal parameters updated and synchronized to SOC grid.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Profile Section */}
        <div className="p-6 rounded-xl bg-surface-container-low/90 border border-surface-container-high flex flex-col gap-5 shadow-xl">
          <h2 className="font-headline-sm text-base uppercase tracking-wider text-on-surface font-bold border-b border-surface-container-high pb-2">
            Operative Ident &amp; Comms
          </h2>

          {/* Avatar Persona Quick Bar */}
          <div className="p-4 rounded-xl bg-surface-container flex items-center justify-between border border-surface-container-high/60 gap-4">
            <div className="flex items-center gap-3">
              <img
                src={operative.avatarUrl}
                alt={operative.handle}
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-tertiary shadow-[0_0_12px_rgba(0,218,243,0.3)]"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-sm font-bold text-on-surface">
                  {operative.handle}
                </span>
                <span className="font-mono text-xs text-tertiary">
                  Archetype: {operative.archetype || 'SOC Blue Defender'}
                </span>
                <span className="font-mono text-[10px] text-outline">
                  Division: {operative.division}
                </span>
              </div>
            </div>

            {onNavigate && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onNavigate('onboarding');
                }}
                className="px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-tertiary font-mono text-xs font-bold uppercase tracking-wider border border-tertiary/30 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-base">palette</span>
                <span>Change Avatar Persona</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-on-surface uppercase tracking-wider font-mono">
                Call Sign / Handle
              </label>
              <input
                className="w-full bg-surface-container-lowest text-on-surface font-mono text-sm px-3.5 py-2.5 rounded-lg border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-tertiary"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-on-surface uppercase tracking-wider font-mono">
                Classified Comms (Email)
              </label>
              <input
                className="w-full bg-surface-container-lowest text-on-surface font-mono text-sm px-3.5 py-2.5 rounded-lg border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-tertiary"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-on-surface uppercase tracking-wider font-mono">
              SOC Relay Node Network
            </label>
            <select
              className="w-full bg-surface-container-lowest text-on-surface font-mono text-sm px-3.5 py-2.5 rounded-lg border border-surface-container-high focus:outline-none focus:ring-1 focus:ring-tertiary"
              value={gridNode}
              onChange={(e) => setGridNode(e.target.value)}
            >
              <option value="EU-WEST-1">EU-WEST-1 // Frankfurt Secured Citadel</option>
              <option value="US-EAST-SOC">US-EAST-SOC // Virginia Cyber Command</option>
              <option value="AP-NORTHEAST">AP-NORTHEAST // Tokyo Defense Hub</option>
              <option value="LATAM-SUR">LATAM-SUR // São Paulo Relay</option>
            </select>
          </div>
        </div>

        {/* Telemetry & Audio Section */}
        <div className="p-6 rounded-xl bg-surface-container-low/90 border border-surface-container-high flex flex-col gap-4 shadow-xl">
          <h2 className="font-headline-sm text-base uppercase tracking-wider text-on-surface font-bold border-b border-surface-container-high pb-2">
            HUD Telemetry &amp; Audio Synthesizer
          </h2>

          <div className="flex items-center justify-between py-2 border-b border-surface-container-high/60">
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface font-semibold">Tactical Audio FX</span>
              <span className="font-body-sm text-on-surface-variant text-xs">
                Synthesized sound cues for terminal clicks, combat successes, and threat alarms.
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => soundFx.playSuccess()}
                className="px-2.5 py-1 rounded bg-surface-container-high font-mono text-xs text-tertiary hover:bg-surface-variant transition-colors"
              >
                Test Sound
              </button>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => handleSoundToggle(e.target.checked)}
                className="w-5 h-5 accent-tertiary cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface font-semibold">
                Classified Defcon Notifications
              </span>
              <span className="font-body-sm text-on-surface-variant text-xs">
                Real-time HUD telemetry alerts for boss invasions and ladder rank changes.
              </span>
            </div>
            <input
              type="checkbox"
              checked={alertsEnabled}
              onChange={(e) => setAlertsEnabled(e.target.checked)}
              className="w-5 h-5 accent-tertiary cursor-pointer"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="p-6 rounded-xl bg-surface-container-low/90 border border-error/30 flex flex-col gap-4 shadow-xl">
          <h2 className="font-headline-sm text-base uppercase tracking-wider text-error font-bold border-b border-error/20 pb-2">
            Season Zero Calibration
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="font-label-md text-on-surface font-semibold">Reset Combat Progress</span>
              <span className="font-body-sm text-on-surface-variant text-xs">
                Restore initial Cadet Operative status and reset drill question history.
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to reset your local combat progress?')) {
                  soundFx.playAlert();
                  onResetProgress();
                }
              }}
              className="px-4 py-2 rounded-lg bg-error-container/40 text-error font-label-md uppercase tracking-wider hover:bg-error-container/60 transition-colors border border-error/40 cursor-pointer"
            >
              Reset Season State
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-tertiary text-on-primary font-label-lg uppercase tracking-wider font-bold shadow-lg shadow-tertiary/20 hover:shadow-tertiary/40 transition-all cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
