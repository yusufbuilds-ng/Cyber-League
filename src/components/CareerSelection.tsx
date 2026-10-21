import React, { useState } from 'react';
import { TabType } from '../types/cyber';
import { soundFx } from '../utils/audio';

export interface CareerPathOption {
  id: string;
  title: string;
  colorHex: string;
  colorName: string;
  tagline: string;
  description: string;
  icon: string;
  perk: string;
  coreTools: string[];
  certTrack: string;
}

interface CareerSelectionProps {
  currentCareer?: string;
  onSelectCareer: (careerTitle: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const CareerSelection: React.FC<CareerSelectionProps> = ({
  currentCareer,
  onSelectCareer,
  onNavigate,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(
    currentCareer
      ? currentCareer.toLowerCase().includes('soc')
        ? 'soc-analyst'
        : currentCareer.toLowerCase().includes('cloud')
        ? 'cloud-security'
        : currentCareer.toLowerCase().includes('penetration')
        ? 'penetration-tester'
        : null
      : null
  );

  const careers: CareerPathOption[] = [
    {
      id: 'soc-analyst',
      title: 'SOC Analyst',
      colorHex: '#3B82F6',
      colorName: 'blue',
      tagline: 'Defensive Sentinel & Threat Triage',
      description:
        'Monitor live telemetry streams, analyze malicious event logs, authenticate digital signatures, and execute immediate incident containment across enterprise networks.',
      icon: 'security',
      perk: '+20% Accuracy Multiplier on Phishing & Header Triage Drills',
      coreTools: ['Splunk SIEM', 'Suricata IDS', 'Wireshark PCAP', 'MITRE ATT&CK'],
      certTrack: 'BTL1 / CySA+ Silver Path',
    },
    {
      id: 'cloud-security',
      title: 'Cloud Security',
      colorHex: '#00E5FF',
      colorName: 'cyan',
      tagline: 'Infrastructure Fortress & IAM Architect',
      description:
        'Audit zero-trust architectures, remediate AWS/GCP IAM permission escalations, container breakouts, and enforce Kubernetes cluster runtime security posture.',
      icon: 'cloud_done',
      perk: '+15% Threat Deflection Score on Serverless & DNS Incursions',
      coreTools: ['AWS GuardDuty', 'Terraform SAST', 'Kube-Hunter', 'GCP IAM Sentinel'],
      certTrack: 'CCSP / AWS Security Specialty Path',
    },
    {
      id: 'penetration-tester',
      title: 'Penetration Tester',
      colorHex: '#A855F7',
      colorName: 'purple',
      tagline: 'Offensive Exploitation & Red Team Operator',
      description:
        'Weaponize reverse shells, chain web app zero-days (SQLi, SSRF, XSS), bypass web application firewalls, and execute targeted stealth privilege escalations.',
      icon: 'terminal',
      perk: '+25 XP Critical Exploit Bounty on Boss Breakouts & 1v1 Duels',
      coreTools: ['Burp Suite Pro', 'Metasploit', 'Nmap NSE', 'BloodHound AD'],
      certTrack: 'OSCP / CEH Master Path',
    },
  ];

  const handleCardClick = (id: string) => {
    soundFx.playClick();
    setSelectedId(id);
  };

  const handleConfirm = () => {
    if (!selectedId) return;
    const chosen = careers.find((c) => c.id === selectedId);
    if (!chosen) return;
    soundFx.playSuccess();
    onSelectCareer(chosen.title);
    onNavigate('dashboard');
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 lg:px-8 py-8 gap-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 bg-[#3B82F6]/15 rounded-full blur-[120px]"></div>
      <div className="pointer-events-none absolute top-1/2 -right-40 w-96 h-96 bg-[#A855F7]/15 rounded-full blur-[140px]"></div>
      <div className="pointer-events-none absolute -bottom-40 left-1/3 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[130px]"></div>

      {/* Breadcrumb / Navigation */}
      <div className="flex items-center justify-between z-10">
        <button
          onClick={() => {
            soundFx.playClick();
            onNavigate('dashboard');
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high/80 text-on-surface-variant hover:text-tertiary transition-colors font-label-sm uppercase tracking-wider cursor-pointer border border-surface-container-high"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs text-outline">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span>DIVISION ELEVATION PROTOCOL // SILVER PATH</span>
        </div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col items-center text-center gap-3 z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-high border border-tertiary/30 text-tertiary font-mono text-xs uppercase tracking-widest font-semibold shadow-sm">
          <span className="material-symbols-outlined text-[16px]">military_tech</span>
          <span>Silver League Specialization Gate</span>
        </div>

        <h1 className="font-headline-xl text-3xl sm:text-5xl uppercase tracking-tight text-on-surface font-bold drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          Choose Your Specialization
        </h1>

        <p className="font-headline-sm text-base sm:text-xl text-tertiary font-medium max-w-2xl">
          Level 10 Reached. Unlock your Silver League path.
        </p>

        <p className="font-body-md text-on-surface-variant max-w-xl text-sm">
          Selecting a career path recalibrates your tactical drills, provides passive combat multipliers,
          and sets your primary competitive division standing.
        </p>
      </div>

      {/* 3 Selectable Career Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 z-10">
        {careers.map((career) => {
          const isSelected = selectedId === career.id;

          // Theme styling based on exact colors:
          // SOC Analyst: #3B82F6 (Blue)
          // Cloud Security: #00E5FF (Cyan)
          // Penetration Tester: #A855F7 (Purple)
          let glowStyle = {};
          let borderClass = 'border-[#2D3748] hover:border-surface-variant';
          let badgeBg = '';
          let accentText = '';

          if (career.id === 'soc-analyst') {
            accentText = 'text-[#3B82F6]';
            badgeBg = 'bg-[#3B82F6]/15 border-[#3B82F6]/30 text-[#3B82F6]';
            if (isSelected) {
              borderClass = 'border-[#3B82F6]';
              glowStyle = {
                boxShadow: '0 0 28px rgba(59, 130, 246, 0.45)',
              };
            }
          } else if (career.id === 'cloud-security') {
            accentText = 'text-[#00E5FF]';
            badgeBg = 'bg-[#00E5FF]/15 border-[#00E5FF]/30 text-[#00E5FF]';
            if (isSelected) {
              borderClass = 'border-[#00E5FF]';
              glowStyle = {
                boxShadow: '0 0 28px rgba(0, 229, 255, 0.45)',
              };
            }
          } else {
            accentText = 'text-[#A855F7]';
            badgeBg = 'bg-[#A855F7]/15 border-[#A855F7]/30 text-[#A855F7]';
            if (isSelected) {
              borderClass = 'border-[#A855F7]';
              glowStyle = {
                boxShadow: '0 0 28px rgba(168, 85, 247, 0.45)',
              };
            }
          }

          return (
            <div
              key={career.id}
              onClick={() => handleCardClick(career.id)}
              style={glowStyle}
              className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all duration-300 cursor-pointer relative overflow-hidden bg-[#111827] border-2 group ${borderClass} ${
                isSelected ? 'scale-[1.02]' : 'hover:-translate-y-1 hover:bg-[#151e32]'
              }`}
            >
              {/* Top Accent Gradient Bar when selected */}
              {isSelected && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: career.colorHex }}
                ></div>
              )}

              {/* Card Header */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${career.colorHex}20`,
                      color: career.colorHex,
                      border: `1px solid ${career.colorHex}40`,
                    }}
                  >
                    <span className="material-symbols-outlined text-[30px]">{career.icon}</span>
                  </div>

                  {/* Radio / Selection Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                      isSelected
                        ? 'border-transparent text-white'
                        : 'border-outline-variant bg-surface-container-highest'
                    }`}
                    style={isSelected ? { backgroundColor: career.colorHex } : {}}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
                      {career.title}
                    </h3>
                  </div>
                  <p className="font-mono text-xs font-semibold mt-1" style={{ color: career.colorHex }}>
                    {career.tagline}
                  </p>
                </div>

                <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                  {career.description}
                </p>
              </div>

              {/* Tools & Tactical Perks */}
              <div className="flex flex-col gap-3 pt-4 border-t border-[#2D3748]">
                {/* Perk Box */}
                <div
                  className="p-3 rounded-lg flex items-center gap-2.5 text-xs font-mono font-semibold"
                  style={{
                    backgroundColor: `${career.colorHex}15`,
                    border: `1px solid ${career.colorHex}30`,
                    color: career.colorHex,
                  }}
                >
                  <span className="material-symbols-outlined text-base">bolt</span>
                  <span>{career.perk}</span>
                </div>

                {/* Core Toolsets */}
                <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                  <span className="text-outline uppercase">Core Tech Matrix:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {career.coreTools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface border border-[#2D3748]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certification Track */}
                <div className="flex items-center justify-between font-mono text-[11px] pt-1">
                  <span className="text-outline">Ladder Pathway:</span>
                  <span className="text-on-surface font-semibold">{career.certTrack}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Confirmation Action Panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-surface-container-low/95 border border-surface-container-high shadow-xl z-10">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-on-surface font-bold">
              {selectedId
                ? `Ready to confirm path: ${careers.find((c) => c.id === selectedId)?.title}`
                : 'Select one of the 3 career pathways above to proceed'}
            </span>
            <span className="font-body-sm text-on-surface-variant text-xs">
              Specialization unlocks tailored CTF arenas and division progression milestones.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onNavigate('dashboard');
            }}
            className="px-5 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md uppercase tracking-wider transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedId}
            onClick={handleConfirm}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-headline-sm uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              selectedId
                ? 'bg-gradient-to-r from-primary-container via-secondary to-tertiary text-on-primary shadow-[0_0_24px_rgba(0,218,243,0.5)] hover:shadow-[0_0_35px_rgba(0,218,243,0.8)] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-surface-container-highest text-outline cursor-not-allowed opacity-50'
            }`}
          >
            <span>Confirm Path</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
