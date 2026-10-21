export type TabType =
  | 'dashboard'
  | 'career-path'
  | 'quiz'
  | 'boss-challenges'
  | 'leaderboard'
  | 'armory-badges'
  | 'settings'
  | 'auth'
  | 'onboarding';

export type DivisionTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Legend';

export interface AvatarOption {
  id: string;
  name: string;
  archetype: string;
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  url: string;
  perk: string;
  lore: string;
}

export interface OperativeProfile {
  handle: string;
  email: string;
  rankTitle: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  globalRank: number;
  division: string;
  tier: DivisionTier;
  accuracy: number;
  streakDays: number;
  streakClaimedToday: boolean;
  threatIndex: string;
  squad?: string;
  avatarUrl: string;
  avatarId?: string;
  archetype?: string;
  careerPath?: string;
  tokens: number;
}

export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: string;
  title: string;
  scenarioSnippet: {
    from: string;
    flag: string;
  };
  options: {
    key: string;
    text: string;
  }[];
  correctAnswer: string;
  mitreAttackId: string;
  debrief: string;
  threatProfile: string;
  spoofedEntity: string;
  riskNeutralized: string;
  snapshotTitle: string;
  snapshotDetail: string;
  forensicTitle: string;
  forensicDetail: string;
  dossierIoc: string;
  dossierMitigation: string;
}

export interface LeaderboardOperative {
  rank: number;
  handle: string;
  badge: string;
  tierLabel: string;
  tierType: 'gold' | 'silver' | 'bronze' | 'platinum' | 'legend';
  isVip?: boolean;
  tag?: string;
  squad: string;
  gridNode?: string;
  accuracy: number;
  streak: number;
  totalXp: number;
  todayXp: number;
  avatarUrl?: string;
  avatarInitials?: string;
}

export interface BossEmail {
  id: number;
  sender: string;
  senderEmail: string;
  subject: string;
  timestamp: string;
  isMalicious: boolean;
  threatType?: string;
  rawHeaders: {
    from: string;
    returnPath: string;
    spf: 'PASS' | 'FAIL' | 'NEUTRAL';
    dkim: 'PASS' | 'FAIL' | 'NONE';
    dmarc: 'PASS' | 'FAIL' | 'QUARANTINE';
    originIp: string;
    mailer: string;
  };
  bodyText: string;
  attachment?: {
    name: string;
    size: string;
    isExecutable: boolean;
  };
  status?: 'unreviewed' | 'quarantined' | 'verified_safe';
}

export interface ArmoryBadge {
  id: string;
  title: string;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
  iconName: string;
  buffText?: string;
}
