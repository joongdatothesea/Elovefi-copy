import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import FinanceView from './components/FinanceView';
import HouseholdView from './components/HouseholdView';
import PlanningView from './components/PlanningView';
import TravelView from './components/TravelView';
import InterestsView from './components/InterestsView';
import HealthView from './components/HealthView';
import DocumentsView from './components/DocumentsView';
import DashboardView from './components/DashboardView'; 
import MemoryView from './components/MemoryView';
import AIAssistant from './components/AIAssistant';
import { useSupabaseSync } from './hooks/useSupabase';
// Changed import from ./types to ./types-1 to fix missing member errors and type mismatches
import { 
  CategoryType, UserRole, Transaction, ExpenseCategory, 
  Asset, Subscription, Chore, ShoppingItem, MaintenanceItem, OKR, Project,
  Trip, Budget, Liability, PortfolioItem, Goal, DocumentItem, RoadmapItem, LongTermGoal,
  HealthProfile, InterestProfile, PsychData, MemoryItem, Memo, BucketListItem
} from './types-1';
import { Menu, Loader2 } from 'lucide-react';

// --- DATA SEEDING (Keep for structure reference / first load) ---

const INITIAL_TRANSACTIONS: Transaction[] = []; // Empty start for DB
const INITIAL_ASSETS: Asset[] = [
    { id: '1', name: 'CommBank Savings', type: 'Bank', value: 45000, updatedAt: '2024-03-01' },
    { id: '3', name: 'Term Deposit (12mo)', type: 'Term Deposit', value: 20000, updatedAt: '2024-03-01' },
    { id: '4', name: 'Lane Cove Apartment', type: 'Real Estate', value: 850000, updatedAt: '2023-12-01' },
];
const INITIAL_LIABILITIES: Liability[] = [
    { id: '1', name: 'Home Mortgage', type: 'Mortgage', amount: 600000, totalAmount: 600000, remainingAmount: 540000, interestRate: 5.8, owner: 'Family', linkedAssetId: '4' },
];
const INITIAL_PORTFOLIO: PortfolioItem[] = [];
const INITIAL_GOALS: Goal[] = []; 
const INITIAL_BUDGETS: (Budget & { id: string })[] = [
    { id: ExpenseCategory.FOOD, category: ExpenseCategory.FOOD, limit: 1200, usedAmount: 0 },
    { id: ExpenseCategory.SHOPPING, category: ExpenseCategory.SHOPPING, limit: 500, usedAmount: 0 },
];
const INITIAL_SUBSCRIPTIONS: Subscription[] = [];
const INITIAL_CHORES: Chore[] = [
    { id: '1', title: 'Take out trash', assignee: 'Elvin', frequency: 'Weekly', completed: false },
    { id: '2', title: 'Water plants', assignee: 'Fiona', frequency: 'Weekly', completed: true },
];
const INITIAL_SHOPPING: ShoppingItem[] = [];
const INITIAL_MAINTENANCE: MaintenanceItem[] = [];
const INITIAL_OKRS: OKR[] = [];
const INITIAL_ROADMAP: RoadmapItem[] = [];
const INITIAL_LONGTERM: LongTermGoal[] = [];
const INITIAL_TRIPS: Trip[] = [];
const INITIAL_DOCUMENTS: DocumentItem[] = [];

// --- Psych Data Hardcoded Defaults ---
const ELVIN_PSYCH: PsychData = {
    summary: "The Underrated Powerhouse. Rational, Stable, High-Functioning.",
    identity: {
        id: { val: 35, title: "Healthy (Suppressed)", desc: "Natural need for relaxation & food rewards." },
        ego: { val: 55, title: "High Functioning", desc: "Strong logic & stability." },
        superego: { val: 10, title: "Gentle & Principled", desc: "Value-driven rather than rule-driven." }
    },
    traits: [
        { title: "Energy Conservationist", desc: "Protects energy for core tasks." },
        { title: "Rational", desc: "Decisions driven by data." }
    ],
    strategy: [
        { title: 'Responsibility', icon: 'Lock', desc: 'Primary Driver.' },
        { title: 'Stability', icon: 'Layers', desc: 'Seeks structure.' }
    ],
    relationship: {
        summary: "The Secure Anchor.",
        dynamics: "You speak 'Action Language'.",
    }
};

const FIONA_PSYCH: PsychData = {
    summary: "The Deep Feeler. Resilient, Empathic, Healing.",
    identity: {
        id: { val: 10, title: "Suppressed", desc: "Needs permission to 'want'." },
        ego: { val: 70, title: "Overworked", desc: "High functioning." },
        superego: { val: 80, title: "Punitive", desc: "Strong inner critic." }
    },
    traits: [
        { title: "High Sensitivity", desc: "Deep processor of emotions." },
        { title: "Resilient", desc: "Stronger than she thinks." }
    ],
    strategy: [
        { title: 'Connection', icon: 'Heart', desc: 'Primary Driver.' },
        { title: 'Safety', icon: 'Shield', desc: 'Seeks emotional security.' }
    ],
    relationship: {
        summary: "The Golden Pair (Depth).",
        dynamics: "Needs 'Safety' not 'Solutions'.",
    }
};

// --- INITIAL BUCKET LIST ---
const INITIAL_BUCKET_LIST: BucketListItem[] = [
    { id: 'b1', title: 'Travel together', category: 'Travel', completed: true },
    { id: 'b2', title: 'Climb a mountain', category: 'Travel', completed: true },
    { id: 'b3', title: 'Fly together', category: 'Travel', completed: true },
    { id: 'b4', title: 'Go to New Zealand', category: 'Travel', completed: true },
    { id: 'b5', title: 'Go to Singapore', category: 'Travel', completed: true },
    { id: 'b6', title: 'Go to Thailand', category: 'Travel', completed: true },
    { id: 'b7', title: 'Ride a Ferris Wheel', category: 'Travel', completed: true },
    { id: 'b9', title: 'Go to Japan', category: 'Travel', completed: false },
    { id: 'b11', title: 'See the Aurora', category: 'Travel', completed: true },
    { id: 'b17', title: 'Eason Chan Concert', category: 'Entertainment', completed: true },
    { id: 'b18', title: 'Coldplay Concert', category: 'Entertainment', completed: true },
    { id: 'b27', title: 'Afternoon Tea Scones', category: 'Food', completed: true },
    { id: 'b28', title: 'Fine Dining', category: 'Food', completed: true },
    { id: 'b36', title: 'Buy Flowers at Market', category: 'Romance', completed: true },
    { id: 'b59', title: 'Monthly Anniversary', category: 'Growth', completed: true },
];

function App() {
  // Persistence for active category
  const [activeCategory, setActiveCategory] = useState<CategoryType>(() => {
      const saved = localStorage.getItem('app_active_category');
      return (saved as CategoryType) || CategoryType.DASHBOARD;
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Removed unused state aiOpen to resolve prop mismatch in AIAssistant usage below
  
  // Local only state (User Preference)
  const [currentUser, setCurrentUser] = useState<UserRole>(() => {
      return (localStorage.getItem('app_current_user') as UserRole) || 'Elvin';
  });

  // Persist state changes
  useEffect(() => {
      localStorage.setItem('app_active_category', activeCategory);
  }, [activeCategory]);

  useEffect(() => {
      localStorage.setItem('app_current_user', currentUser);
  }, [currentUser]);

  // --- SUPABASE SYNC HOOKS ---
  // We use specific "Collections" to sync different types of data rows
  const { items: transactions, saveItem: saveTransaction, removeItem: deleteTransaction } = useSupabaseSync<Transaction>('transactions', INITIAL_TRANSACTIONS);
  const { items: assets, saveItem: saveAsset, removeItem: deleteAsset } = useSupabaseSync<Asset>('assets', INITIAL_ASSETS);
  const { items: liabilities, saveItem: saveLiability, removeItem: deleteLiability } = useSupabaseSync<Liability>('liabilities', INITIAL_LIABILITIES);
  const { items: budgets, saveItem: saveBudget } = useSupabaseSync<Budget & { id: string }>('budgets', INITIAL_BUDGETS);
  const { items: portfolio, saveItem: savePortfolio, removeItem: deletePortfolio } = useSupabaseSync<PortfolioItem>('portfolio', INITIAL_PORTFOLIO);
  const { items: subscriptions, saveItem: saveSubscription, removeItem: deleteSubscription } = useSupabaseSync<Subscription>('subscriptions', INITIAL_SUBSCRIPTIONS);
  const { items: documents, saveItem: saveDoc, removeItem: deleteDoc } = useSupabaseSync<DocumentItem>('documents', INITIAL_DOCUMENTS);
  
  const { items: chores, saveItem: saveChore, removeItem: deleteChore } = useSupabaseSync<Chore>('chores', INITIAL_CHORES);
  const { items: shopping, saveItem: saveShopping, removeItem: deleteShopping } = useSupabaseSync<ShoppingItem>('shopping', INITIAL_SHOPPING);
  const { items: maintenance, saveItem: saveMaintenance, removeItem: deleteMaintenance } = useSupabaseSync<MaintenanceItem>('maintenance', INITIAL_MAINTENANCE);
  
  const { items: okrs, saveItem: saveOKR, updateItem: updateOKRItem } = useSupabaseSync<OKR>('okrs', INITIAL_OKRS);
  const { items: roadmap, saveItem: saveRoadmap, removeItem: deleteRoadmap } = useSupabaseSync<RoadmapItem>('roadmap', INITIAL_ROADMAP);
  const { items: longTerm, saveItem: saveLongTerm } = useSupabaseSync<LongTermGoal>('longterm', INITIAL_LONGTERM);
  
  const { items: trips, saveItem: saveTrip } = useSupabaseSync<Trip>('trips', INITIAL_TRIPS);
  
  const { items: memories, saveItem: saveMemory, removeItem: deleteMemory, loading: memoryLoading } = useSupabaseSync<MemoryItem>('memories', []);
  const { items: memos, saveItem: saveMemo, removeItem: deleteMemo } = useSupabaseSync<Memo>('memos', []);
  const { items: bucketList, saveItem: saveBucketItem } = useSupabaseSync<BucketListItem>('bucketlist', INITIAL_BUCKET_LIST);

  // Health & Interest Profiles are stored as individual items in a 'profiles' collection
  // ID structure: 'health_Elvin', 'health_Fiona', 'interest_Elvin', 'interest_Fiona'
  const { items: profileItems, saveProfileItem } = useSupabaseSync<any>('profiles', []);

  // Settings (Logo, Covers)
  const { items: settingsItems, saveItem: saveSetting } = useSupabaseSync<{id: string, value: string}>('settings', []);

  // --- DERIVED STATE ---
  
  const goals = useMemo(() => INITIAL_GOALS, []); // Not using goals yet

  const appLogo = settingsItems.find(i => i.id === 'app_logo')?.value || null;
  const bucketListCover = settingsItems.find(i => i.id === 'bucket_cover')?.value || '';

  // Construct Health Profiles from synced items or defaults
  const healthProfiles: Record<UserRole, HealthProfile> = useMemo(() => {
      const elvin = profileItems.find(i => i.id === 'health_Elvin')?.data || { role: 'Elvin', age: 30, height: 178, weight: 75, metrics: [], habits: [], medicalRecords: [], insurance: { provider: '', memberNumber: '', level: '', renewalDate: '' }, fitnessGoals: [], psych: ELVIN_PSYCH };
      const fiona = profileItems.find(i => i.id === 'health_Fiona')?.data || { role: 'Fiona', age: 28, height: 165, weight: 55, metrics: [], habits: [], medicalRecords: [], insurance: { provider: '', memberNumber: '', level: '', renewalDate: '' }, fitnessGoals: [], psych: FIONA_PSYCH };
      const family = profileItems.find(i => i.id === 'health_Family')?.data || { role: 'Family', age: 0, height: 0, weight: 0, metrics: [], habits: [], medicalRecords: [], insurance: { provider: '', memberNumber: '', level: '', renewalDate: '' }, fitnessGoals: [], psych: ELVIN_PSYCH };
      return { 'Elvin': elvin, 'Fiona': fiona, 'Family': family };
  }, [profileItems]);

  const interests: Record<UserRole, InterestProfile> = useMemo(() => {
      const elvin = profileItems.find(i => i.id === 'interest_Elvin')?.data || { role: 'Elvin', items: [] };
      const fiona = profileItems.find(i => i.id === 'interest_Fiona')?.data || { role: 'Fiona', items: [] };
      const family = profileItems.find(i => i.id === 'interest_Family')?.data || { role: 'Family', items: [] };
      return { 'Elvin': elvin, 'Fiona': fiona, 'Family': family };
  }, [profileItems]);


  // --- HANDLERS WRAPPED FOR SUPABASE ---

  const handleUpdateLogo = (logo: string) => saveSetting({ id: 'app_logo', value: logo });
  const handleUpdateBucketCover = (url: string) => saveSetting({ id: 'bucket_cover', value: url });

  // Finance
  const handleAddTransaction = (t: Transaction) => {
    saveTransaction(t);
    // Smart Update Logic
    if (t.type === 'Expense' && t.linkedLiabilityId) {
        const liab = liabilities.find(l => l.id === t.linkedLiabilityId);
        if (liab) saveLiability({ ...liab, remainingAmount: Math.max(0, liab.remainingAmount - t.amount) });
    }
    if (t.type === 'Income' && t.linkedAssetId) {
        const asset = assets.find(a => a.id === t.linkedAssetId);
        if (asset) saveAsset({ ...asset, value: asset.value + t.amount });
    }
    if (t.type === 'Expense' && t.linkedAssetId) {
        const asset = assets.find(a => a.id === t.linkedAssetId);
        if (asset) saveAsset({ ...asset, value: asset.value - t.amount });
    }
  };

  const handleUpdateTransaction = (id: string, updates: Partial<Transaction>) => {
      const t = transactions.find(x => x.id === id);
      if(t) saveTransaction({ ...t, ...updates });
  };

  const handleUpdateBudget = (category: ExpenseCategory, limit: number) => {
      saveBudget({ id: category, category, limit, usedAmount: 0 });
  };

  const handleUpdateAsset = (id: string, updates: number | Partial<Asset>) => {
      const a = assets.find(x => x.id === id);
      if(!a) return;
      if (typeof updates === 'number') saveAsset({ ...a, value: updates, updatedAt: new Date().toISOString().split('T')[0] });
      else saveAsset({ ...a, ...updates, updatedAt: new Date().toISOString().split('T')[0] });
  };

  const handleUpdateLiability = (id: string, updates: Partial<Liability>) => {
      const l = liabilities.find(x => x.id === id);
      if(l) saveLiability({ ...l, ...updates });
  };

  const handleUpdatePortfolio = (id: string, updates: Partial<PortfolioItem>) => {
      const p = portfolio.find(x => x.id === id);
      if(p) savePortfolio({ ...p, ...updates });
  };

  // Household
  const toggleChore = (id: string) => {
      const c = chores.find(x => x.id === id);
      if(c) saveChore({ ...c, completed: !c.completed });
  };
  const toggleShopping = (id: string) => {
      const s = shopping.find(x => x.id === id);
      if(s) saveShopping({ ...s, completed: !s.completed });
  };
  const addShopping = (name: string) => saveShopping({ id: Date.now().toString(), name, category: 'General', completed: false });

  // Planning
  const handleUpdateOKR = (id: string, title: string) => {
      updateOKRItem(id, (prev) => ({ ...prev, objective: title }));
  };
  const handleAddKeyResult = (okrId: string, title: string) => {
      updateOKRItem(okrId, (prev) => ({ ...prev, keyResults: [...prev.keyResults, { id: Date.now().toString(), title, progress: 0 }] }));
  };
  const handleUpdateKeyResult = (okrId: string, krId: string, updates: any) => {
      updateOKRItem(okrId, (prev) => ({ ...prev, keyResults: prev.keyResults.map(k => k.id === krId ? {...k, ...updates} : k) }));
  };
  
  const handleUpdateRoadmapItem = (id: string, updates: Partial<RoadmapItem>) => {
      const r = roadmap.find(x => x.id === id);
      if(r) saveRoadmap({ ...r, ...updates });
  };
  const handleUpdateLongTerm = (id: string, updates: Partial<LongTermGoal>) => {
      const l = longTerm.find(x => x.id === id);
      if(l) saveLongTerm({ ...l, ...updates });
  };

  // Travel
  const handleUpdateTrip = (id: string, updates: Partial<Trip>) => {
      const t = trips.find(x => x.id === id);
      if(t) saveTrip({ ...t, ...updates });
  };

  // Profile Updates (Complex Object Storage)
  const handleUpdateProfile = (role: UserRole, updates: Partial<HealthProfile>) => {
      const current = healthProfiles[role];
      const updated = { ...current, ...updates };
      saveProfileItem({ id: `health_${role}`, data: updated });
  };

  const handleUpdateInterest = (role: UserRole, items: any[]) => {
      const current = interests[role];
      const updated = { ...current, items };
      saveProfileItem({ id: `interest_${role}`, data: updated });
  };

  // Documents
  const handleUpdateDoc = (id: string, updates: Partial<DocumentItem>) => {
      const d = documents.find(x => x.id === id);
      if(d) saveDoc({ ...d, ...updates });
  };

  // Memory & Bucket List Logic
  const handleUpdateMemory = (id: string, updates: Partial<MemoryItem>) => {
      const m = memories.find(x => x.id === id);
      if(m) saveMemory({ ...m, ...updates });
  };

  const handleUpdateBucketItem = (id: string, updates: Partial<BucketListItem>) => {
      const b = bucketList.find(x => x.id === id);
      if(b) {
          saveBucketItem({ ...b, ...updates });
      }
  };

  // Unused legacy handlers removed to prevent confusion
  const handleCompleteBucketItem = () => {}; 
  const handleUncompleteBucketItem = () => {};

  // AI Context
  const buildContextData = () => {
     return JSON.stringify({
        currentUser,
        budgetSummary: {
            income: transactions.filter(t => t.type === 'Income').reduce((s,t) => s + t.amount, 0),
            expense: transactions.filter(t => t.type === 'Expense').reduce((s,t) => s + t.amount, 0),
        },
        upcomingTrip: trips.find(t => t.status === 'Upcoming'),
        pendingChores: chores.filter(c => !c.completed),
        memories: memories.slice(0, 3)
     });
  };

  // Global Loading State
  if (memoryLoading && memories.length === 0) {
      return (
          <div className="flex h-screen w-screen items-center justify-center bg-white flex-col gap-4">
              <Loader2 className="animate-spin text-slate-900" size={48} />
              <h2 className="text-xl font-light text-slate-600 tracking-widest">Loading Family OS...</h2>
          </div>
      );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-slate-900 font-sans">
      
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 right-4 z-50">
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="bg-slate-900 text-white p-2 rounded-full shadow-lg">
            <Menu size={24} />
         </button>
      </div>

      {/* Sidebar */}
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={(cat) => { setActiveCategory(cat); setMobileMenuOpen(false); }} 
        // Fix: Changed callback to trigger custom event 'open-elf-ai' expected by AIAssistant.tsx
        onOpenAI={() => window.dispatchEvent(new CustomEvent('open-elf-ai'))}
        customLogo={appLogo}
        onUploadLogo={handleUpdateLogo}
        currentUser={currentUser}
        onSwitchUser={setCurrentUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-x-hidden min-h-screen">
        
        {activeCategory === CategoryType.DASHBOARD && (
          <DashboardView 
             currentUser={currentUser}
             transactions={transactions}
             assets={assets}
             liabilities={liabilities}
             trips={trips}
             chores={chores}
             subscriptions={subscriptions}
             okrs={okrs}
             maintenance={maintenance}
             habits={healthProfiles[currentUser === 'Family' ? 'Elvin' : currentUser].habits}
             metrics={healthProfiles[currentUser === 'Family' ? 'Elvin' : currentUser].metrics}
             memos={memos}
             onQuickAdd={() => setActiveCategory(CategoryType.FINANCE)}
             onNavigate={(view) => setActiveCategory(view)}
             onAddMemo={saveMemo}
             onDeleteMemo={deleteMemo}
          />
        )}

        {activeCategory === CategoryType.MEMORY && (
            <MemoryView 
                memories={memories}
                bucketList={bucketList}
                onAddMemory={saveMemory}
                onUpdateMemory={handleUpdateMemory}
                onDeleteMemory={deleteMemory}
                onCompleteBucketItem={handleCompleteBucketItem} // No-op props passed for compatibility
                onUncompleteBucketItem={handleUncompleteBucketItem}
                bucketListCover={bucketListCover}
                onUpdateBucketListCover={handleUpdateBucketCover}
                onUpdateBucketItem={handleUpdateBucketItem}
                onAddBucketItem={saveBucketItem}
            />
        )}

        {activeCategory === CategoryType.FINANCE && (
          <FinanceView 
            transactions={transactions}
            goals={goals}
            assets={assets}
            liabilities={liabilities}
            portfolio={portfolio}
            budgets={budgets}
            subscriptions={subscriptions}
            onAddTransaction={handleAddTransaction}
            onUpdateTransaction={handleUpdateTransaction}
            onDeleteTransaction={deleteTransaction}
            onUpdateBudget={handleUpdateBudget}
            onAddSubscription={saveSubscription}
            onDeleteSubscription={deleteSubscription}
            onAddAsset={saveAsset}
            onUpdateAsset={handleUpdateAsset}
            onDeleteAsset={deleteAsset}
            onAddLiability={saveLiability}
            onUpdateLiability={handleUpdateLiability}
            onDeleteLiability={deleteLiability}
            onAddPortfolioItem={savePortfolio}
            onUpdatePortfolioItem={handleUpdatePortfolio}
            onDeletePortfolioItem={deletePortfolio}
          />
        )}

        {activeCategory === CategoryType.HOUSEHOLD && (
          <HouseholdView 
             chores={chores}
             shoppingList={shopping}
             maintenance={maintenance}
             onToggleChore={toggleChore}
             onAddChore={saveChore}
             onDeleteChore={deleteChore}
             onToggleShopping={toggleShopping}
             onAddShoppingItem={addShopping}
             onDeleteShopping={deleteShopping}
             onAddMaintenance={saveMaintenance}
             onDeleteMaintenance={deleteMaintenance}
          />
        )}

        {activeCategory === CategoryType.PLANNING && (
           <PlanningView 
              okrs={okrs}
              roadmap={roadmap}
              longTermGoals={longTerm}
              onAddOKR={saveOKR}
              onUpdateOKR={handleUpdateOKR}
              onAddKeyResult={handleAddKeyResult}
              onUpdateKeyResult={handleUpdateKeyResult}
              onAddRoadmapItem={saveRoadmap}
              onUpdateRoadmapItem={handleUpdateRoadmapItem}
              onDeleteRoadmapItem={deleteRoadmap}
              onUpdateLongTermGoal={handleUpdateLongTerm}
              onAddMemory={saveMemory} // Pass saveMemory for Archival
           />
        )}

        {activeCategory === CategoryType.TRAVEL && (
           <TravelView 
              trips={trips}
              onUpdateTrip={handleUpdateTrip}
              onAddTrip={saveTrip}
           />
        )}
        
        {activeCategory === CategoryType.INTERESTS && (
           <InterestsView 
              profiles={interests} 
              onUpdateInterest={handleUpdateInterest}
            />
        )}

        {activeCategory === CategoryType.HEALTH && (
           <HealthView 
              profiles={healthProfiles}
              onUpdateProfile={handleUpdateProfile}
           />
        )}

        {activeCategory === CategoryType.DOCUMENTS && (
            <DocumentsView 
                documents={documents}
                onAddDocument={saveDoc}
                onUpdateDocument={handleUpdateDoc}
                onDeleteDocument={deleteDoc}
            />
        )}

      </main>

      {/* AI Assistant Overlay */}
      {/* Fix: Passed required state and updateState props to AIAssistant, and removed legacy props.
          Constructed a partial state from App-1's individual hooks to satisfy the AIAssistant's AppState requirement.
          Fixed: Cast health profiles to any to resolve incompatibility between types-1.ts and types.ts HealthProfile interfaces. */}
      <AIAssistant 
         state={{
           finances: transactions,
           accounts: [], 
           liabilities: liabilities,
           budgets: budgets,
           roadmap: roadmap,
           trips: trips,
           loveNotes: [],
           tasks: chores.map(c => ({ id: c.id, title: c.title, completed: c.completed, owner: c.assignee, category: 'Household' })),
           memories: memories,
           memos: memos,
           bucketList: bucketList,
           expenseCategories: [],
           incomeCategories: [],
           yearlyBudgetLimit: 0,
           motivationMessage: '',
           pools: [],
           poolMappings: [],
           property: {} as any,
           holdings: [],
           savingsGoals: [],
           mortgageTool: {} as any,
           files: [],
           folders: [],
           packingTemplate: [],
           // Fix: Cast health profiles to any to resolve incompatibility between types-1.ts and types.ts
           elvinHealth: healthProfiles.Elvin as any,
           fionaHealth: healthProfiles.Fiona as any,
           globalShoppingList: [],
           maintenanceList: [],
           careerProfiles: {} as any,
           interests: { connectivityIndex: 0, points: { Elvin: 0, Fiona: 0 }, pursuits: [], badges: [], experience: [] },
           notifications: [],
           activeDialog: null
         } as any}
         updateState={() => {}} 
      />
      
    </div>
  );
}

export default App;