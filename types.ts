
export type Owner = 'Elvin' | 'Fiona' | 'Family';

export interface AppNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface AppDialog {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface CinemaEntry {
  id: string;
  videoUrl: string;
  coverUrl: string;
  title: string;
  motto?: string; 
  description?: string;
}

export interface ExhibitEntry {
  id: string;
  coverUrl: string;
  linkUrl: string;
  title: string;
  caption: string;
  date: string;
  location?: string;
  isStarred?: boolean;
}

export interface ConditionLog {
  date: string;
  note: string;
  improved: boolean;
}

export interface ConditionTrack {
  id: string;
  name: string;
  methods: string[];
  status: 'Improving' | 'Stable' | 'Worsening' | 'Resolved';
  logs: ConditionLog[];
  updatedAt: string;
}

export type HealthLog = { id: string; date: string; rhr: number; sleep: number; stress: number; weight: number; };
export type Workout = { 
  id: string; 
  date: string; 
  type: string; 
  duration: number; 
  intensity: 'Low' | 'Medium' | 'High'; 
  calories?: number; 
  startTime?: string; 
  endTime?: string; 
};

export interface TrainingSession {
  id: string;
  name: string;
  duration?: number;
  sets?: number;
  reps?: number;
  completed?: boolean;
}

export interface TrainingPlanDay {
  day: string; // 'MON', 'TUE', etc.
  sessions: TrainingSession[];
}

export interface MealPrepDay {
  day: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
}

export type Meal = { id: string; date: string; name: string; calories: number; protein: number; carbs: number; fats: number; };
export type MentalLog = { id: string; date: string; mood: 'Great' | 'Good' | 'Neutral' | 'Bad' | 'Stressed'; stressLevel: 'Low' | 'Medium' | 'High'; energyLevel: 'Full' | 'Normal' | 'Low' | 'Drained'; tags: string[]; note: string; };
export interface HealthAIAssessment { summary: string; risks: string[]; recommendations: string[]; generatedDate: string; overallScore?: number; radarRisk?: { cardio: number; metabolic: number; nutrient: number; digestive: number; immune: number; }; }
export interface HealthProfile { age: number; height: number; weight: number; zodiac?: string; logs: HealthLog[]; workouts: Workout[]; meals: Meal[]; waterIntake: number; mentalLogs: MentalLog[]; medicalProfile: MedicalRecord; medications: Medication[]; vaccines: { name: string; date: string }[]; healthChecks: { name: string; date: string; result: string; attachmentUrl?: string }[]; labResults: LabResult[]; dietProtocol: string; fastingStartTime?: string; isFasting?: boolean; aiAssessment?: HealthAIAssessment; aiMentalInsight?: string; identityData?: Record<string, any>; conditions?: ConditionTrack[]; annualPlan?: { vision: string; exercise: string; diet: string; mental: string; }; trainingMatrix?: Record<number, TrainingPlanDay[]>; mealPrepMatrix?: Record<number, MealPrepDay[]>; }
export interface Medication { id: string; name: string; dosage: string; frequency: string; startDate: string; endDate?: string; instructions: string; }
export interface MedicalRecord { bloodType: string; allergies: string[]; chronicConditions: string[]; currentConditions: string[]; pastSurgeries: string[]; familyHistory: string[]; }
export interface LabResult { id: string; date: string; metric: string; value: number; unit: string; referenceRange: string; }
export interface MaintenanceItem { id: string; title: string; date: string; provider?: string; completed: boolean; }
export interface HouseholdShoppingItem { id: string; item: string; category: 'GROCERIES' | 'HOME' | 'PERSONAL'; checked: boolean; }
export enum MemoryCategory { Life = 'Life', Milestone = 'Milestone', Romance = 'Romance', Growth = 'Growth', Experience = 'Experience', Entertainment = 'Entertainment', Travel = 'Travel' }
export interface Memory { id: string; title: string; date: string; category: MemoryCategory; description: string; images?: string[]; tags: string[]; location?: string; linkedTaskId?: string; youtubeUrl?: string; handwrittenNote?: string; }
export interface Task { id: string; title: string; owner: Owner; category: string; completed: boolean; linkedMemory?: string; }
export interface FinanceRecord { id: string; type: 'Income' | 'Expense'; owner: Owner; category: string; amount: number; date: string; accountId: string; description: string; }
export interface Account { id: string; name: string; owner: Owner; balance: number; type: 'Bank' | 'Saver' | 'Investment' | 'Cash'; }
export interface FixedExpense { id: string; title: string; amount: number; category: string; owner: Owner; }
export interface Budget { category: string; period: 'Monthly' | 'Yearly'; limit: number; usedAmount: number; }

export type BrainstormCategory = 'Finance' | 'Career' | 'Family' | 'Investment' | 'Lifestyle' | 'Other';
export type BrainstormStatus = 'Idea' | 'Analyzing' | 'Paused' | 'Decided';

export interface BrainstormTimelineUpdate {
  date: string;
  note: string;
}

export interface MindMapNode {
  id: string;
  text: string;
  children: MindMapNode[];
  x: number;
  y: number;
}

export interface BrainstormEntry {
  id: string;
  title: string;
  category: BrainstormCategory;
  owner: Owner;
  status: BrainstormStatus;
  createdAt: string;
  ideaStatement: string;
  backgroundContext: string;
  paths: string[];
  risks: string[];
  reflectionElvin: string;
  reflectionFiona: string;
  conclusion: string;
  timeline: BrainstormTimelineUpdate[];
  mindMap?: MindMapNode;
}

// Block-based document types
export type BlockType = 
  | 'paragraph' | 'h1' | 'h2' | 'h3' 
  | 'bullet-list' | 'numbered-list' | 'todo-list'
  | 'quote' | 'code' | 'divider' 
  | 'table' | 'callout' | 'toggle' 
  | 'image' | 'embed' | 'link'
  | 'mind-map';

export interface DocumentBlock {
  id: string;
  type: BlockType;
  content: string;
  properties?: {
    rows?: string[][];
    color?: string;
    icon?: string;
    isOpen?: boolean;
    url?: string;
    caption?: string;
    language?: string;
    level?: number;
    checked?: boolean;
    mindMapData?: MindMapNode;
  };
}

export interface AppState {
  customLogo?: string;
  memoriesBannerImage?: string;
  cinemaEntries: CinemaEntry[];
  exhibitEntries: ExhibitEntry[];
  cinemaMotto: string;
  memories: Memory[];
  tasks: Task[];
  finances: FinanceRecord[];
  accounts: Account[];
  fixedExpenses: FixedExpense[];
  budgets: Budget[];
  roadmap: RoadmapItem[];
  vision: VisionItem[];
  objectives: ObjectiveItem[];
  trips: Trip[];
  loveNotes: LoveNote[];
  memos: Memo[];
  bucketList: BucketListItem[];
  expenseCategories: string[];
  incomeCategories: string[];
  yearlyBudgetLimit: number;
  motivationMessage: string;
  pools: SavingsPool[];
  poolMappings: AccountPoolMapping[];
  property: Property;
  holdings: Holding[];
  savingsGoals: SavingsGoal[];
  mortgageTool: MortgageTool;
  files: FamilyFile[];
  folders: FileFolder[];
  packingTemplate: Omit<PackingItem, 'id'>[];
  elvinHealth: HealthProfile;
  fionaHealth: HealthProfile;
  workoutTypes: WorkoutType[];
  globalShoppingList: HouseholdShoppingItem[];
  maintenanceList: MaintenanceItem[];
  careerProfiles: Record<Owner, CareerProfile>;
  interests: {
    connectivityIndex: number;
    points: { Elvin: number; Fiona: number; };
    pursuits: Pursuit[];
    badges: AchievementBadge[];
    experience: ExperienceWallEntry[];
  };
  investmentLabReports: LabIntelligenceReport[];
  brainstorms: BrainstormEntry[];
  notifications: AppNotification[];
  activeDialog: null | AppDialog;
  viewingUrl?: string;
  viewingUrlTitle?: string;
}
export type Priority = 'High' | 'Medium' | 'Low';
export interface RoadmapItem { id: string; title: string; owner: Owner; date: string; priority: Priority; status: 'Planned' | 'In Progress' | 'Completed'; description: string; notes?: string; }
export interface VisionItem { id: string; title: string; horizon: string; description: string; image: string; }
export interface ObjectiveDetail { id: string; title: string; progress: number; }
export interface ObjectiveItem { id: string; title: string; progress: number; priority: Priority; details: ObjectiveDetail[]; }
export interface Skill { id: string; name: string; level: number; category: 'Technical' | 'Soft' | 'Leadership'; }
export interface LearningItem { id: string; title: string; status: 'In Progress' | 'Completed' | 'Wishlist'; provider?: string; }
export interface ExperienceEntry { id: string; role: string; company: string; period: string; achievements: string[]; }
export interface SalaryRecord { id: string; year: string; amount: number; }
export interface JobOpportunity { id: string; role: string; company: string; status: 'Wishlist' | 'Applied' | 'Interview' | 'Offer'; salary?: string; }
export interface CareerNode { id: string; timeframe: string; title: string; }
export interface CareerProfile { role: string; focus: string; roadmap: CareerNode[]; strategicGoals: ObjectiveItem[]; skills: Skill[]; learning: LearningItem[]; experience: ExperienceEntry[]; salaryHistory: SalaryRecord[]; opportunities: JobOpportunity[]; resumeUrl?: string; resumeName?: string; diagnosticHistory?: { id: string; date: string; summary: string }[]; }
export interface Pursuit { id: string; title: string; category: string; owner: Owner; status: 'Active' | 'Complete' | 'Archived'; image?: string; notes?: string; xpValue: number; completedAt?: string; currentCompletions: number; targetBadgeId?: string; }
export interface AchievementBadge { id: string; title: string; unlocked: boolean; icon: string; category: string; xpRequired: number; color: string; currentXP?: number; }
export interface ExperienceWallEntry { id: string; title: string; date: string; owner: Owner; category: string; image?: string; rating?: number; }
export type ItineraryCategory = 'Flight' | 'Accommodations' | 'Concert' | 'Transport' | 'Equipment' | 'Lessons' | 'Campsite' | 'Restaurant' | 'Shopping' | 'Sightseeing';
export interface ItineraryItem { id: string; dayOffset: number; time: string; activity: string; location?: string; cost?: number; payBy?: Owner; bookingNumber?: string; bookingLink?: string; images?: string[]; link?: string; category: ItineraryCategory; }
export interface ShoppingListItem { id: string; item: string; checked: boolean; link?: string; images?: string[]; dayOffset?: number; address?: string; purchasedBy?: 'Elvin' | 'Fiona'; }
export type PackingCategory = 'CLOTHES' | 'TOILETRIES' | 'TECH' | 'ESSENTIALS' | 'OTHERS';
export interface PackingItem { id: string; item: string; checked: boolean; category: PackingCategory; owner: 'Elvin' | 'Fiona'; }
export interface Trip { id: string; title: string; location: string; startDate: string; endDate: string; status: 'Wishlist' | 'Upcoming' | 'Past'; image?: string; itinerary: ItineraryItem[]; budget: number; budgetItems: { id: string; item: string; amount: number; category: ItineraryCategory; payBy: Owner; date?: string; time?: string; }[]; shoppingList: ShoppingListItem[]; packingList: PackingItem[]; dayMetadata?: { [key: number]: { title?: string; collapsed?: boolean } }; visaRequirements?: string; }
export interface LoveNote { id: string; from: Owner; to: Owner; content: string; date: string; }
export interface Memo { id: string; to: Owner; from: Owner; content: string; date: string; isRead: boolean; style: 'Note' | 'Love' | 'Urgent'; }
export interface BucketListItem { id: string; title: string; category: MemoryCategory; completed: boolean; description?: string; date?: string; images?: string[]; youtubeUrl?: string; tags?: string[]; location?: string; handwrittenNote?: string; }
export interface Property { name: string; address: string; value: number; mortgage: number; rate: number; term: number; image: string; }
export interface Holding { id: string; name: string; ticker: string; quantity: number; purchasePrice: number; currentPrice: number; value: number; pool: PoolType; type: string; }
export interface SavingsGoal { id: string; name: string; target: number; current: number; deadline: string; }
export interface MortgageTool { principal: number; rate: number; years: number; }
export type FileType = 'PDF' | 'DOC' | 'TXT' | 'IMAGE' | 'PAGE' | 'LINK' | 'OTHER';
export interface FamilyFile { id: string; name: string; type: FileType; owner: Owner; folderId: string | null; content?: string; details?: string; url?: string; thumbnailUrl?: string; updatedAt: string; }
export interface FileFolder { id: string; name: string; owner: Owner; parentId: string | null; }

export interface WorkoutType {
  id: string;
  label: string;
  category: 'strength' | 'cardio' | 'flex' | 'special';
  icon: string;
  owner?: Owner;
  syncToPursuits?: boolean;
}

export interface StrategicQuery {
  id: string;
  target: string;
  compatibilityScore: number;
  verdict: 'PROCEED' | 'CAUTION' | 'ABORT';
  reasoning: string;
  impactOnGoals: string;
  marketInsights: string;
  timestamp: string;
}

export interface LabIntelligenceReport {
  id: string;
  timestamp: string;
  healthScores: {
    overall: number;
    diversification: number;
    liquidity: number;
    shockResilience: number;
    goalAlignment: number;
  };
  intelligence: {
    assetAllocation: { type: string; ratio: number; insight: string }[];
    liquidityLadder: { timeframe: string; availability: string; risk: string };
    concentrationRisk: string;
    currencyExposure: string;
    correlationMap: string;
  };
  marketIntel: {
    macroSignals: { signal: string; impact: string; confidence: 'Low' | 'Medium' | 'High' }[];
    assetSpecific: { ticker: string; sentiment: string; implication: string }[];
  };
  directives: {
    title: string;
    rationale: string;
    action: string;
    tradeOff: string;
    failureRisk: string;
    priority: 'High' | 'Medium' | 'Low';
    timeframe: 'Immediate' | 'Medium-term' | 'Long-term';
  }[];
  behavioral: {
    biasesDetected: string[];
    consistencyScore: number;
    insight: string;
    disciplineProtocol: string;
  };
  riskCapacity: {
    monthsSurvivalDrawdown: number;
    monthsSurvivalIncomeLoss: number;
    compoundRiskScenario: string;
  };
  lifecycle: {
    stage: string;
    impactAnalyzer: string;
    familyMediation: string;
  };
  governance: {
    aiConfidence: number;
    riskBoundaryStatus: string;
  };
  strategicQueries: StrategicQuery[];
  summary: string;
}

export interface AccountPoolMapping { accountId: string; poolId: PoolType; ratio: number; }
export type PoolType = 'Survival' | 'Risk' | 'Goal' | 'Lifestyle';
export interface SavingsPool { id: PoolType; name: string; description: string; targetRule: string; targetAmount: number; isLocked: boolean; }
