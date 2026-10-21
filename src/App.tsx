/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TabType, OperativeProfile, ArmoryBadge, LeaderboardOperative } from './types/cyber';
import {
  initialOperative,
  quizQuestions,
  leaderboardData,
  bossEmailsData,
  initialBadges,
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AuthScreen } from './components/AuthScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { QuizArenaScreen } from './components/QuizArenaScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { BossChallengeScreen } from './components/BossChallengeScreen';
import { ArmoryScreen } from './components/ArmoryScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NotificationsModal, IntelAlert } from './components/NotificationsModal';
import { DuelModal } from './components/DuelModal';
import { soundFx } from './utils/audio';

import { OnboardingScreen } from './components/OnboardingScreen';
import { CareerSelection } from './components/CareerSelection';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [operative, setOperative] = useState<OperativeProfile>(initialOperative);
  const [badges, setBadges] = useState<ArmoryBadge[]>(initialBadges);
  const [leaderboard, setLeaderboard] = useState<LeaderboardOperative[]>(leaderboardData);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDuelOpen, setIsDuelOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState<IntelAlert[]>([
    {
      id: 'al-1',
      title: 'DEFCON 1 APEX INVASION DETECTED',
      message: 'APT-29 Phantom Protocol launched spoofing campaign against corporate DNS relays.',
      time: '12m ago',
      type: 'critical',
    },
    {
      id: 'al-2',
      title: 'WEEKLY LADDER SPRINT ACTIVE',
      message: 'Top 3 operatives in Season 4 qualify for demotion immunity and exclusive armory tokens.',
      time: '1h ago',
      type: 'info',
    },
    {
      id: 'al-3',
      title: 'DAILY REWARD LOGGED',
      message: 'Active login streak: 4 Days 🔥. +50 XP bonus credited to tactical reserve.',
      time: '3h ago',
      type: 'reward',
    },
  ]);

  const handleAddXp = (amount: number) => {
    setOperative((prev) => {
      const newXp = prev.xp + amount;
      const willLevelUp = newXp >= 5000 && prev.level === 1;

      if (willLevelUp) {
        soundFx.playSuccess();
        setAlerts((curr) => [
          {
            id: `al-${Date.now()}`,
            title: 'OPERATIVE PROMOTION ACHIEVED',
            message: 'You have been promoted to Cadet Operative II! Global rank elevated.',
            time: 'Just now',
            type: 'reward',
          },
          ...curr,
        ]);
      }

      return {
        ...prev,
        xp: newXp,
        level: willLevelUp ? 2 : prev.level,
        rankTitle: willLevelUp ? 'Cadet Operative II' : prev.rankTitle,
        globalRank: Math.max(1, prev.globalRank - Math.floor(amount / 5)),
      };
    });
  };

  const handleClaimStreakReward = (day: number, xpBonus: number) => {
    handleAddXp(xpBonus);
    setOperative((prev) => ({
      ...prev,
      streakClaimedToday: true,
    }));
    setAlerts((curr) => [
      {
        id: `al-${Date.now()}`,
        title: `DAY ${day} STREAK CLAIMED 🔥`,
        message: `Tactical check-in verified. +${xpBonus} XP and active speed multiplier synchronized!`,
        time: 'Just now',
        type: 'reward',
      },
      ...curr,
    ]);
  };

  const handleAwardBounty = (xpAmount: number, badgeId: string) => {
    handleAddXp(xpAmount);

    setBadges((prev) =>
      prev.map((b) =>
        b.id === badgeId
          ? { ...b, unlocked: true, unlockedAt: 'Unlocked in Season 4' }
          : b
      )
    );

    setAlerts((curr) => [
      {
        id: `al-${Date.now()}`,
        title: 'LEGENDARY BOSS DEFEATED!',
        message: 'The Phishing Inbox quarantined. "Apex Phish Hunter" badge awarded to Armory!',
        time: 'Just now',
        type: 'reward',
      },
      ...curr,
    ]);
  };

  const handleUpdateProfile = (updated: Partial<OperativeProfile>) => {
    setOperative((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleResetProgress = () => {
    setOperative(initialOperative);
    setBadges(initialBadges);
    setLeaderboard(leaderboardData);
  };

  const handleAuthSuccess = (profileData: Partial<OperativeProfile>, isNewSignUp?: boolean) => {
    setOperative((prev) => ({
      ...prev,
      ...profileData,
    }));
    if (isNewSignUp) {
      setCurrentTab('onboarding');
    } else {
      setCurrentTab('dashboard');
    }
  };

  // If user selected Auth Screen (matches Screen 1)
  if (currentTab === 'auth') {
    return (
      <AuthScreen
        onSuccess={handleAuthSuccess}
        onCancel={() => setCurrentTab('dashboard')}
      />
    );
  }

  // If user is in Onboarding Screen (Avatar calibration & persona picking)
  if (currentTab === 'onboarding') {
    return (
      <OnboardingScreen
        initialHandle={operative.handle}
        initialEmail={operative.email}
        onComplete={(profileData) => {
          handleUpdateProfile(profileData);
          setCurrentTab('dashboard');
        }}
        onCancel={() => setCurrentTab('dashboard')}
      />
    );
  }

  return (
    <div className="bg-background font-body-md text-on-background selection:bg-tertiary-container selection:text-on-tertiary min-h-screen">
      {/* Persistent Tactical Header */}
      <Header
        operative={operative}
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        notificationCount={alerts.length}
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        latencyMs={18}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main View Area (offset by sidebar w-64 and header h-16) */}
      <div className="pl-0 lg:pl-64 pt-16 min-h-screen flex flex-col">
        <main className="w-full flex-1">
          {currentTab === 'dashboard' && (
            <DashboardScreen
              operative={operative}
              onNavigate={setCurrentTab}
              onTriggerDuel={() => setIsDuelOpen(true)}
              onClaimStreakReward={handleClaimStreakReward}
            />
          )}

          {currentTab === 'career-path' && (
            <CareerSelection
              currentCareer={operative.careerPath}
              onSelectCareer={(careerTitle) => {
                handleUpdateProfile({
                  careerPath: careerTitle,
                  rankTitle: `${careerTitle} Specialist`,
                  level: Math.max(operative.level, 10),
                  tier: 'Silver',
                  division: 'Silver I',
                });
                soundFx.playSuccess();
                setAlerts((curr) => [
                  {
                    id: `al-${Date.now()}`,
                    title: `SPECIALIZATION UNLOCKED: ${careerTitle.toUpperCase()}`,
                    message: `Silver League path unlocked as ${careerTitle}. Tactical perks and division combat multipliers synchronized!`,
                    time: 'Just now',
                    type: 'reward',
                  },
                  ...curr,
                ]);
                setCurrentTab('dashboard');
              }}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'quiz' && (
            <QuizArenaScreen
              questions={quizQuestions}
              onAddXp={handleAddXp}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'boss-challenges' && (
            <BossChallengeScreen
              emails={bossEmailsData}
              onNavigate={setCurrentTab}
              onAwardBounty={handleAwardBounty}
            />
          )}

          {currentTab === 'leaderboard' && (
            <LeaderboardScreen
              operatives={leaderboard}
              currentOperative={operative}
              onNavigate={setCurrentTab}
            />
          )}

          {currentTab === 'armory-badges' && (
            <ArmoryScreen badges={badges} operative={operative} />
          )}

          {currentTab === 'settings' && (
            <SettingsScreen
              operative={operative}
              onUpdateProfile={handleUpdateProfile}
              onResetProgress={handleResetProgress}
              onNavigate={setCurrentTab}
            />
          )}
        </main>
      </div>

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        alerts={alerts}
        onClear={() => setAlerts([])}
      />

      {/* Quick 1v1 Duel Modal */}
      <DuelModal
        isOpen={isDuelOpen}
        onClose={() => setIsDuelOpen(false)}
        operative={operative}
        onDuelWin={(xp) => handleAddXp(xp)}
      />
    </div>
  );
}
