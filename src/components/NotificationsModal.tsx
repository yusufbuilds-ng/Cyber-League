import React from 'react';
import { soundFx } from '../utils/audio';

export interface IntelAlert {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'info' | 'reward';
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: IntelAlert[];
  onClear: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onClear,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl bg-surface-container-low p-6 flex flex-col gap-4 shadow-2xl relative border border-surface-container-high animate-fadeIn">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary">notifications_active</span>
            <h2 className="font-headline-sm text-on-surface font-bold">Classified Intel Feeds</h2>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5 max-h-[400px] overflow-y-auto pr-1">
          {alerts.length === 0 ? (
            <p className="text-outline font-body-sm text-center py-8">
              No pending security broadcast signals.
            </p>
          ) : (
            alerts.map((al) => (
              <div
                key={al.id}
                className={`p-3.5 rounded-lg border flex flex-col gap-1 ${
                  al.type === 'critical'
                    ? 'bg-error-container/20 border-error/40 text-on-surface'
                    : al.type === 'reward'
                    ? 'bg-tertiary/10 border-tertiary/30 text-on-surface'
                    : 'bg-surface-container border-surface-container-high text-on-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold">
                    {al.type === 'critical' && <span className="text-error">● CRITICAL DEFCON</span>}
                    {al.type === 'reward' && <span className="text-tertiary">⚡ BOUNTY ALERT</span>}
                    {al.type === 'info' && <span className="text-primary">ℹ INTEL DISPATCH</span>}
                    <span>{al.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-outline">{al.time}</span>
                </div>
                <p className="font-body-sm text-on-surface-variant text-xs">{al.message}</p>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-surface-container-high">
          <button
            onClick={() => {
              soundFx.playClick();
              onClear();
            }}
            className="font-label-sm text-outline hover:text-on-surface uppercase transition-colors"
          >
            Clear Telemetry Logs
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-label-md hover:bg-surface-variant transition-colors cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
