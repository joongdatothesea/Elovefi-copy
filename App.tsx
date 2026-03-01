
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_STATE } from './constants';
import { AppState, AppNotification, AppDialog } from './types';
import { supabase } from './lib/supabase';
import Layout from './components/Layout';
import DashboardView from './views/DashboardView';
import MemoriesView from './views/MemoriesView';
import FinanceView from './views/FinanceView';
import PlanningView from './views/PlanningView';
import TravelView from './views/TravelView';
import HouseholdView from './views/HouseholdView';
import HealthView from './views/HealthView'; 
import DocumentsView from './views/DocumentsView';
import CareerView from './views/CareerView';
import InterestsView from './views/InterestsView';
import AIAssistant from './components/AIAssistant';
import { X, AlertCircle, RefreshCw, CheckCircle2, Info, AlertTriangle, Cloud, Zap } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'elf_home_v1_state';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({ 
    ...INITIAL_STATE, 
    notifications: [], 
    activeDialog: null 
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'offline' | 'error' | 'too-large'>('synced');
  const [showRawInspector, setShowRawInspector] = useState(false);
  
  const lastSyncedFingerprint = useRef<string>('');

  // 初始化：优先从 localStorage 加载，然后再从 Supabase 同步
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      
      // 1. 尝试从本地存储秒速恢复
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (localData) {
        try {
          const parsedLocal = JSON.parse(localData);
          setState(prev => ({ ...prev, ...parsedLocal }));
          lastSyncedFingerprint.current = JSON.stringify(parsedLocal);
        } catch (e) {
          console.error("Local Restore Failed", e);
        }
      }

      // 2. 从云端拉取最新状态
      let cloudData: any = null;
      try {
        if (supabase) {
          const { data, error } = await supabase.from('app_state').select('data').eq('owner_id', 'family-main').maybeSingle();
          if (error) throw error;
          if (data?.data) cloudData = data.data;
        }
      } catch (e) {
        console.error("Cloud Access Error:", e);
        setSyncStatus('error');
      }

      if (cloudData) {
        setState(prev => ({
          ...prev,
          ...cloudData,
          notifications: [], 
          activeDialog: null
        }));
        lastSyncedFingerprint.current = JSON.stringify(cloudData);
        // 更新本地备份
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cloudData));
      }
      
      setIsInitialized(true);
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  // 同步逻辑：变动时立即存本地，延迟存云端
  useEffect(() => {
    if (!isInitialized || isLoading) return;
    
    const { notifications, activeDialog, ...syncableState } = state;
    const currentStateString = JSON.stringify(syncableState);
    const payloadSize = currentStateString.length;
    
    // 如果没有实质性变化，跳过
    if (currentStateString === lastSyncedFingerprint.current) return;

    // 关键：立即更新本地存储，防止刷新丢失
    localStorage.setItem(LOCAL_STORAGE_KEY, currentStateString);

    if (payloadSize > 15 * 1024 * 1024) {
      setSyncStatus('too-large');
      return;
    }

    setSyncStatus('saving');
    const syncTask = async () => {
      if (supabase) {
        try {
          const { error } = await supabase.from('app_state').upsert({ 
            owner_id: 'family-main', 
            data: syncableState, 
            updated_at: new Date().toISOString() 
          });
          
          if (!error) {
            lastSyncedFingerprint.current = currentStateString;
            setSyncStatus('synced');
          } else {
            setSyncStatus('error');
          }
        } catch (e) {
          setSyncStatus('error');
        }
      } else {
        setSyncStatus('offline');
      }
    };

    // 缩短延迟，从 1500ms 降至 800ms
    const timer = setTimeout(syncTask, 800);
    return () => clearTimeout(timer);
  }, [state, isInitialized, isLoading]);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, { id, message, type }]
    }));
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        notifications: prev.notifications.filter(n => n.id !== id)
      }));
    }, 4500);
  }, []);

  const showConfirm = useCallback((config: Omit<AppDialog, 'onConfirm'> & { onConfirm: () => void }) => {
    setState(prev => ({
      ...prev,
      activeDialog: {
        ...config,
        onConfirm: () => {
          config.onConfirm();
          setState(p => ({ ...p, activeDialog: null }));
        },
        onCancel: () => {
          if (config.onCancel) config.onCancel();
          setState(p => ({ ...p, activeDialog: null }));
        }
      }
    }));
  }, []);

  const enhancedUpdateState = useCallback((updater: (prev: AppState) => AppState) => {
    setState(prev => updater(prev));
  }, []);

  useEffect(() => {
    (window as any).openInAppBrowser = (url: string, title?: string) => {
      enhancedUpdateState(p => ({ ...p, viewingUrl: url, viewingUrlTitle: title }));
    };
    return () => { delete (window as any).openInAppBrowser; };
  }, [enhancedUpdateState]);

  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        if (importedData && typeof importedData === 'object') {
          showConfirm({
            title: "Authorize System Overwrite",
            message: "Restore system from archive? This will replace all current data. This process is irreversible.",
            confirmLabel: "Restore Archive",
            onConfirm: () => {
              enhancedUpdateState(prev => ({
                ...prev,
                ...importedData,
                notifications: [],
                activeDialog: null
              }));
              showNotification("System Archive Restored", "success");
            }
          });
        }
      } catch (err) {
        showNotification("Corrupted Archive File", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleExportData = () => {
    try {
      const { notifications, activeDialog, ...cleanState } = state;
      const dataStr = JSON.stringify(cleanState, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elf-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showNotification("Archive Exported Successfully", "success");
    } catch (e) {
      showNotification("Export Failed: Critical Logic Error", "error");
    }
  };

  const renderView = () => {
    if (isLoading && !localStorage.getItem(LOCAL_STORAGE_KEY)) return (
      <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
        <RefreshCw className="animate-spin text-indigo-600" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Synchronizing Universal State...</p>
      </div>
    );

    const props = { state, updateState: enhancedUpdateState, showNotification, showConfirm };

    return (
      <div key={activeTab} className="animate-fadeIn">
        {activeTab === 'dashboard' && <DashboardView {...props} setActiveTab={setActiveTab} />}
        {activeTab === 'memories' && <MemoriesView {...props} />}
        {activeTab === 'finance' && <FinanceView {...props} />}
        {activeTab === 'career' && <CareerView {...props} />}
        {activeTab === 'planning' && <PlanningView {...props} />}
        {activeTab === 'travel' && <TravelView {...props} />}
        {activeTab === 'tasks' && <HouseholdView {...props} />}
        {activeTab === 'health' && <HealthView {...props} />}
        {activeTab === 'interests' && <InterestsView {...props} />}
        {activeTab === 'documents' && <DocumentsView {...props} />}
      </div>
    );
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      customLogo={state.customLogo} 
      onUploadLogo={(url) => enhancedUpdateState(p => ({ ...p, customLogo: url }))}
      syncStatus={syncStatus}
      isCloudConnected={!!supabase}
      statePayloadSize={JSON.stringify(state).length / 1024}
      showNotification={showNotification}
      onExportData={handleExportData}
      onImportData={handleImportData}
      onShowInspector={() => setShowRawInspector(true)}
    >
      {renderView()}

      {/* Raised z-index to 9500 for global notifications */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9500] flex flex-col items-center gap-3 pointer-events-none w-full max-w-md px-6">
         {state.notifications.map(n => (
           <div key={n.id} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-xl animate-fadeIn pointer-events-auto transition-all ${
             n.type === 'error' ? 'bg-rose-600/95 border-rose-500 text-white' : 
             n.type === 'info' ? 'bg-indigo-600/95 border-indigo-500 text-white' :
             'bg-slate-900/95 border-white/10 text-white'
           }`}>
              {n.type === 'success' && <CheckCircle2 size={18} className="text-emerald-400" />}
              {n.type === 'error' && <AlertCircle size={18} className="text-white" />}
              {n.type === 'info' && <Info size={18} className="text-indigo-200" />}
              <p className="text-[11px] font-black uppercase tracking-widest flex-1">{n.message}</p>
              <button onClick={() => setState(p => ({ ...p, notifications: p.notifications.filter(x => x.id !== n.id) }))} className="opacity-40 hover:opacity-100 transition-opacity"><X size={14}/></button>
           </div>
         ))}
      </div>

      {/* Raised z-index to 9000 for confirmation dialogs to be on top of Workspace Editor */}
      {state.activeDialog && (
        <div className="fixed inset-0 z-[9000] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
           <div className="bg-white rounded-3xl w-[92%] max-w-[320px] shadow-2xl overflow-hidden border border-slate-100">
              <div className="p-6 text-center space-y-5">
                 <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-slate-900"><AlertTriangle size={24} /></div>
                 <div className="space-y-1.5"><h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">{state.activeDialog.title}</h3><p className="text-[10px] font-bold text-slate-400 leading-relaxed italic px-2">{state.activeDialog.message}</p></div>
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2">
                 <button onClick={state.activeDialog.onCancel} className="flex-1 py-3 bg-white border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all shadow-sm">Cancel</button>
                 <button onClick={state.activeDialog.onConfirm} className="flex-1 py-3 bg-slate-950 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-rose-600 shadow-xl transition-all active:scale-95">{state.activeDialog.confirmLabel || 'Confirm'}</button>
              </div>
           </div>
        </div>
      )}

      {showRawInspector && (
        <div className="fixed inset-0 z-[8000] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-8">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl h-full flex flex-col overflow-hidden shadow-2xl">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3"><Cloud size={24} className="text-indigo-600" /><h3 className="text-sm font-black uppercase tracking-widest">Cloud Engine Diagnostic</h3></div>
                <button onClick={() => setShowRawInspector(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-all"><X size={20}/></button>
             </div>
             <div className="flex-1 overflow-auto p-8 bg-slate-50">
               <pre className="text-[10px] font-mono leading-relaxed text-slate-600 bg-slate-100 p-6 rounded-2xl border border-slate-200 overflow-auto">{JSON.stringify(state, null, 2)}</pre>
             </div>
          </div>
        </div>
      )}
      
      <AIAssistant state={state} updateState={enhancedUpdateState} />

      {state.viewingUrl && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-4 animate-fadeIn" onClick={() => enhancedUpdateState(p => ({ ...p, viewingUrl: undefined, viewingUrlTitle: undefined }))}>
          <div className="w-full h-full md:w-[92vw] md:h-[92vh] bg-white rounded-none md:rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-cinemaSmooth relative border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 md:p-5 bg-slate-900 text-white shrink-0 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Globe size={16} />
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] italic truncate max-w-[200px] md:max-w-[500px]">{state.viewingUrlTitle || 'Intelligence Node'}</h3>
                  <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-0.5">Secure Protocol Active</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href={state.viewingUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all border border-white/5"><ExternalLink size={16} /></a>
                <button onClick={() => enhancedUpdateState(p => ({ ...p, viewingUrl: undefined, viewingUrlTitle: undefined }))} className="p-2 bg-white/10 hover:bg-rose-600 rounded-xl text-white transition-all shadow-xl"><X size={20} /></button>
              </div>
            </div>
            <div className="flex-1 bg-white relative overflow-hidden">
               <iframe 
                 src={state.viewingUrl} 
                 className="w-full h-full border-none" 
                 allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" 
                 referrerPolicy="no-referrer" 
                 sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation" 
               />
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/10 shadow-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">{state.viewingUrl}</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
