
export enum CategoryType {
  DASHBOARD = 'Dashboard',
  FINANCE = 'Finance',
  DOCUMENTS = 'Documents',
  HOUSEHOLD = 'Household',
  PLANNING = 'Planning',
  TRAVEL = 'Travel',
  INTERESTS = 'Interests',
  HEALTH = 'Health',
  MEMORY = 'Memories'
}

export type UserRole = 'Elvin' | 'Fiona' | 'Family';

// --- Finance Extended ---
export type TransactionType = 'Income' | 'Expense' | 'Transfer';

export enum ExpenseCategory {
  FOOD = 'Food & Groceries',
  HEALTH = 'Health & Insurance',
  LIVING = 'Living Essentials',
  LOVE = 'Love & Gifts',
  GROWTH = 'Personal Development',
  SHOPPING = 'Shopping & Lifestyle',
  TRANSPORT = 'Transport',
  TRAVEL = 'Travel & Entertainment',
  WORK = 'Work Related'
}

export enum IncomeCategory {
  EMPLOYMENT = 'Employment Income',
  SIDE = 'Side Income',
  INVESTMENT = 'Investment & Passive Income',
  ONEOFF = 'One-off Income',
  FAMILY = 'Family & Transfers',
  GOVERNMENT = 'Government Support'
}

export interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  owner: UserRole;
  linkedAssetId?: string;     
  linkedLiabilityId?: string; 
  attachment?: string; 
  description?: string;
}

export interface Budget {
  category: string;
  limit: number;
  usedAmount: number;
}

export interface Account {
  id: string;
  name: string;
  owner: UserRole;
  balance: number;
  type: 'Bank' | 'Saver' | 'Investment' | 'Term Deposit';
}

// Added Asset interface as it is explicitly imported in App-1.tsx
export interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  updatedAt: string;
}

// Added PortfolioItem interface as it is explicitly imported in App-1.tsx
export interface PortfolioItem {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  owner: UserRole;
  type: string;
}

// Added Subscription interface as it is explicitly imported in App-1.tsx
export interface Subscription {
  id: string;
  title: string;
  cost: number;
  period: string;
  category: string;
  owner: UserRole;
}

// Added Chore interface as it is explicitly imported in App-1.tsx
export interface Chore {
  id: string;
  title: string;
  assignee: UserRole;
  frequency: string;
  completed: boolean;
}

// Added ShoppingItem interface as it is explicitly imported in App-1.tsx
export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  completed: boolean;
}

// Added MaintenanceItem interface as it is explicitly imported in App-1.tsx
export interface MaintenanceItem {
  id: string;
  title: string;
  location: string;
  frequency: string;
  completed: boolean;
}

// Added OKR interface as it is explicitly imported in App-1.tsx
export interface OKR {
  id: string;
  objective: string;
  keyResults: { id: string; title: string; progress: number }[];
}

// Added Project interface as it is explicitly imported in App-1.tsx
export interface Project {
  id: string;
  title: string;
  status: string;
}

// Added Goal interface as it is explicitly imported in App-1.tsx
export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
}

// Added DocumentItem interface as it is explicitly imported in App-1.tsx
export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  url: string;
  owner: UserRole;
}

export interface RoadmapItem {
  id: string;
  title: string;
  owner: UserRole;
  month: string;
  year: number;
  status: 'Planned' | 'In Progress' | 'Completed';
  description: string;
}

// Added LongTermGoal interface as it is explicitly imported in App-1.tsx
export interface LongTermGoal {
  id: string;
  title: string;
  targetDate: string;
  status: string;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'Draft' | 'Wishlist' | 'Upcoming' | 'Past';
  itinerary: { time: string; activity: string }[];
  budget: number;
  packingList: { item: string; checked: boolean }[];
  aiData?: any;
}

// Added PsychData interface as it is explicitly imported in App-1.tsx
export interface PsychData {
  summary: string;
  identity: {
    id: { val: number; title: string; desc: string };
    ego: { val: number; title: string; desc: string };
    superego: { val: number; title: string; desc: string };
  };
  traits: { title: string; desc: string }[];
  strategy: { title: string; icon: string; desc: string }[];
  relationship: { summary: string; dynamics: string };
}

// Added HealthProfile interface as it is explicitly imported in App-1.tsx
export interface HealthProfile {
  role: UserRole;
  age: number;
  height: number;
  weight: number;
  metrics: any[];
  habits: any[];
  medicalRecords: any[];
  insurance: { provider: string; memberNumber: string; level: string; renewalDate: string };
  fitnessGoals: any[];
  psych: PsychData;
}

// Added InterestProfile interface as it is explicitly imported in App-1.tsx
export interface InterestProfile {
  role: UserRole;
  items: any[];
}

export interface LoveNote {
  id: string;
  from: UserRole;
  to: UserRole;
  content: string;
  date: string;
}

export interface Memo {
    id: string;
    to: 'Elvin' | 'Fiona';
    from: 'Elvin' | 'Fiona';
    content: string;
    date: string;
    isRead: boolean;
    style: 'Note' | 'Love' | 'Urgent';
}

export interface MemoryItem {
    id: string;
    date: string;
    title: string;
    description: string;
    photos: string[];
    tags: string[];
    location?: string;
    type: string;
}

export interface BucketListItem {
    id: string;
    title: string;
    category: string;
    completed: boolean;
}

export interface Liability {
  id: string;
  name: string;
  type: string; // Added type field
  owner: UserRole;
  amount: number;
  totalAmount?: number; // Added totalAmount for initial seed data
  remainingAmount: number;
  interestRate?: number;
  linkedAssetId?: string; // Added for initial seed data
}

export interface AppState {
  finances: Transaction[];
  accounts: Account[];
  liabilities: Liability[];
  budgets: Budget[];
  roadmap: RoadmapItem[];
  trips: Trip[];
  loveNotes: LoveNote[];
  tasks: UserTask[];
  memories: MemoryItem[];
  memos: Memo[];
  bucketList: BucketListItem[];
}

export interface UserTask {
  id: string;
  title: string;
  completed: boolean;
  owner: UserRole;
  category: string;
}
