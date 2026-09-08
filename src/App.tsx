import { useState } from 'react';
import { MISSIONS, MOLECULE_LIBRARY } from './data';
import { Molecule } from './types';
import { PWAInstallButton } from './components/PWAInstallButton';
import { MeetTarget } from './components/screens/MeetTarget';
import { MoleculeLibrary } from './components/screens/MoleculeLibrary';
import { MoleculeLab } from './components/screens/MoleculeLab';
import { DrugLikeness } from './components/screens/DrugLikeness';
import { AdmeChallenge } from './components/screens/AdmeChallenge';
import { ToxicityTrap } from './components/screens/ToxicityTrap';
import { CandidateRanking } from './components/screens/CandidateRanking';
import { ScientificDecision } from './components/screens/ScientificDecision';
import { ResearchReport } from './components/screens/ResearchReport';
import { ResearchMode } from './components/screens/ResearchMode';
import { Beaker, ArrowRight, Activity, ShieldAlert, LineChart, Home, ClipboardList, Plus, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Screen = 
  | 'welcome' 
  | 'choose_mission' 
  | 'understand_disease' 
  | 'meet_target' 
  | 'molecule_library'
  | 'molecule_lab'
  | 'drug_likeness'
  | 'adme_challenge'
  | 'toxicity_trap'
  | 'candidate_ranking'
  | 'scientific_decision'
  | 'research_report'
  | 'view_history_report';

type AppMode = 'mission' | 'research';

interface CompletedMission {
  id: string;
  date: number;
  missionId: string;
  molecule: Molecule;
  reasoning: string;
}

const SCREEN_ORDER: Screen[] = [
  'welcome', 'choose_mission', 'understand_disease', 'meet_target', 
  'molecule_library', 'molecule_lab', 'drug_likeness', 'adme_challenge', 
  'toxicity_trap', 'candidate_ranking', 'scientific_decision', 'research_report'
];

const MISSION_STEPS = [
  { id: 1, label: 'Context', screens: ['choose_mission', 'understand_disease', 'meet_target'] },
  { id: 2, label: 'Library', screens: ['molecule_library'] },
  { id: 3, label: 'Lab', screens: ['molecule_lab', 'drug_likeness'] },
  { id: 4, label: 'Analysis', screens: ['adme_challenge', 'toxicity_trap', 'candidate_ranking'] },
  { id: 5, label: 'Report', screens: ['scientific_decision', 'research_report'] }
];

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('mission');
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedBaseMoleculeId, setSelectedBaseMoleculeId] = useState<string | null>(null);
  const [activeMolecule, setActiveMolecule] = useState<Molecule | null>(null);
  const [finalCandidateId, setFinalCandidateId] = useState<string | null>(null);
  const [finalReasoning, setFinalReasoning] = useState<string>('');
  
  const [missionHistory, setMissionHistory] = useState<CompletedMission[]>(() => {
    const saved = localStorage.getItem('moleculeX_mission_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [historyViewId, setHistoryViewId] = useState<string | null>(null);
  
  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50); // Light haptic feedback
    }
  };
  
  const goTo = (screen: Screen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
    setAppMode('mission');
  };

  const handleBack = () => {
    if (currentScreen === 'choose_mission') {
      goTo('welcome');
    } else if (currentScreen === 'view_history_report') {
      goTo('choose_mission');
    } else {
      const idx = SCREEN_ORDER.indexOf(currentScreen);
      if (idx > 0) goTo(SCREEN_ORDER[idx - 1]);
    }
  };

  const handleNextStage = () => {
    const idx = SCREEN_ORDER.indexOf(currentScreen);
    if (idx < SCREEN_ORDER.length - 1) {
      goTo(SCREEN_ORDER[idx + 1]);
    }
  };

  const handleMoleculeSelect = (id: string) => {
    setSelectedBaseMoleculeId(id);
    goTo('molecule_lab');
  };

  const handleLabNext = (modified: Molecule) => {
    setActiveMolecule(modified);
    goTo('drug_likeness');
  };

  const handleFinalDecision = (id: string, reasoning: string) => {
    setFinalCandidateId(id);
    setFinalReasoning(reasoning);
    
    const bMol = MOLECULE_LIBRARY.find(m => m.id === selectedBaseMoleculeId) || MOLECULE_LIBRARY[0];
    const rMols = activeMolecule 
      ? [...MOLECULE_LIBRARY.filter(m => m.id !== bMol.id), activeMolecule]
      : MOLECULE_LIBRARY;
    const fMol = rMols.find(m => m.id === id) || bMol;
    
    const newHistory: CompletedMission = {
      id: Date.now().toString(),
      date: Date.now(),
      missionId: MISSIONS[0].id,
      molecule: fMol,
      reasoning
    };
    
    const updatedHistory = [newHistory, ...missionHistory];
    setMissionHistory(updatedHistory);
    localStorage.setItem('moleculeX_mission_history', JSON.stringify(updatedHistory));
    
    goTo('research_report');
  };

  const baseMolecule = MOLECULE_LIBRARY.find(m => m.id === selectedBaseMoleculeId) || MOLECULE_LIBRARY[0];
  const rankingMolecules = activeMolecule 
    ? [...MOLECULE_LIBRARY.filter(m => m.id !== baseMolecule.id), activeMolecule]
    : MOLECULE_LIBRARY;
  const finalMolecule = rankingMolecules.find(m => m.id === finalCandidateId) || baseMolecule;

  const currentStepObj = MISSION_STEPS.find(s => s.screens.includes(currentScreen));
  const currentStepId = currentStepObj ? currentStepObj.id : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row pb-20 md:pb-0">
       
       {/* Top Header - Mobile & Desktop Sidebar */}
       <header className="bg-[#0f172a] text-white py-4 px-4 flex justify-between items-center sticky top-0 z-30 print:hidden md:w-64 md:fixed md:h-full md:flex-col md:justify-start md:items-start md:px-6 shadow-md">
         <div className="flex items-center gap-3 md:mb-10 w-full">
           {((currentScreen !== 'welcome' && appMode === 'mission') || appMode === 'research') && (
             <button 
               onClick={() => {
                 if (appMode === 'research') {
                   setAppMode('mission');
                   goTo('welcome');
                 } else {
                   handleBack();
                 }
               }} 
               className="md:hidden p-1.5 hover:bg-slate-800 rounded-md transition-colors -ml-2"
             >
               <ArrowLeft className="w-6 h-6" />
             </button>
           )}
           <Beaker className="w-6 h-6 text-blue-400 shrink-0" />
           <h1 className="text-xl font-bold tracking-tight truncate">MoleculeX</h1>
         </div>
         
         {/* Desktop Sidebar Nav */}
         <nav className="hidden md:flex flex-col gap-2 w-full mt-4">
           <button onClick={() => { setAppMode('mission'); goTo('welcome'); }} className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition font-medium ${currentScreen === 'welcome' && appMode === 'mission' ? 'bg-blue-600 shadow-sm' : 'hover:bg-slate-800 text-slate-300'}`}><Home className="w-5 h-5"/> Home</button>
           <button onClick={() => { setAppMode('mission'); if(currentScreen === 'welcome') goTo('choose_mission'); }} className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition font-medium ${appMode === 'mission' && currentScreen !== 'welcome' ? 'bg-blue-600 shadow-sm' : 'hover:bg-slate-800 text-slate-300'}`}><ClipboardList className="w-5 h-5"/> Missions</button>
           <button onClick={() => setAppMode('research')} className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition font-medium ${appMode === 'research' ? 'bg-blue-600 shadow-sm' : 'hover:bg-slate-800 text-slate-300'}`}><LineChart className="w-5 h-5"/> Research Lab</button>
         </nav>
         
         <div className="hidden md:block mt-auto w-full pt-6 border-t border-slate-800">
           <PWAInstallButton />
         </div>
       </header>

       {/* Main Content Wrapper */}
       <div className="flex-1 flex flex-col w-full md:ml-64 print:ml-0 print:md:ml-0 relative">
         
         {/* Top Stepper (Only show in mission mode when not on welcome) */}
         {appMode === 'mission' && currentScreen !== 'welcome' && (
           <div className="bg-white border-b border-slate-200 py-4 px-2 sticky top-[60px] md:top-0 z-20 print:hidden shadow-sm">
             <div className="flex justify-between items-center max-w-3xl mx-auto min-w-[320px] px-2 relative">
               {/* Connecting Line behind steps */}
               <div className="absolute top-4 left-6 right-6 h-[2px] bg-slate-100 z-0"></div>
               {MISSION_STEPS.map((step) => {
                 const isActive = currentStepId === step.id;
                 const isPast = currentStepId > step.id;
                 return (
                   <div key={step.id} className="flex flex-col items-center flex-1 z-10">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-colors ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-50' : isPast ? 'bg-[#0f172a] text-white' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                       {step.id}
                     </div>
                     <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider mt-2 font-bold transition-colors ${isActive ? 'text-blue-600' : isPast ? 'text-[#0f172a]' : 'text-slate-400'}`}>
                       {step.label}
                     </span>
                   </div>
                 );
               })}
             </div>
           </div>
         )}

         <main className="flex-1 w-full mx-auto p-4 md:p-8 max-w-4xl">
           {appMode === 'research' ? (
             <ResearchMode />
           ) : (
             <>
               {currentScreen === 'welcome' && (
                 <motion.div 
                   key="welcome"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                   className="max-w-md mx-auto mt-2 md:mt-12"
                 >
                   <div className="bg-gradient-to-br from-blue-50 to-white -mx-4 -mt-4 p-8 mb-6 border-b border-slate-100 md:rounded-3xl md:border md:m-0 md:mb-8 shadow-sm text-center md:text-left relative overflow-hidden">
                     {/* Decorative background element */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
                     
                     {/* Abstract Molecule Graphic */}
                     <div className="absolute right-[-20%] top-[-10%] opacity-30 pointer-events-none hidden md:block">
                        <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="100" y1="100" x2="150" y2="60" stroke="#3b82f6" strokeWidth="3"/>
                            <line x1="100" y1="100" x2="50" y2="130" stroke="#3b82f6" strokeWidth="3"/>
                            <line x1="100" y1="100" x2="130" y2="160" stroke="#3b82f6" strokeWidth="3"/>
                            <line x1="100" y1="100" x2="60" y2="50" stroke="#3b82f6" strokeWidth="3"/>
                            <line x1="150" y1="60" x2="180" y2="90" stroke="#93c5fd" strokeWidth="3"/>
                            <line x1="50" y1="130" x2="30" y2="90" stroke="#93c5fd" strokeWidth="3"/>
                            <circle cx="100" cy="100" r="14" fill="#2563eb"/>
                            <circle cx="150" cy="60" r="18" fill="#3b82f6"/>
                            <circle cx="50" cy="130" r="16" fill="#60a5fa"/>
                            <circle cx="130" cy="160" r="12" fill="#93c5fd"/>
                            <circle cx="60" cy="50" r="10" fill="#3b82f6"/>
                            <circle cx="180" cy="90" r="8" fill="#bfdbfe"/>
                            <circle cx="30" cy="90" r="8" fill="#bfdbfe"/>
                        </svg>
                     </div>
                     
                     <motion.h2 
                       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                       className="text-4xl font-serif font-bold text-[#0f172a] mb-3 tracking-tight relative z-10"
                     >
                       Welcome, Maya
                     </motion.h2>
                     <motion.p 
                       initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                       className="text-slate-600 text-lg mb-8 relative z-10 pr-0 md:pr-16"
                     >
                       Your AI-powered research assistant for pharmaceutical science.
                     </motion.p>
                     
                     <motion.div 
                       initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
                       className="text-center mb-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-blue-100 shadow-sm inline-block w-full relative z-10"
                     >
                       <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-5 shadow-lg shadow-blue-600/20">
                         <Beaker className="w-8 h-8" />
                       </div>
                       <p className="font-serif font-bold text-slate-800 text-xl leading-relaxed">Better questions.<br/>Deeper insights.<br/>Greater impact.</p>
                     </motion.div>

                     <motion.button 
                       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                       onClick={() => goTo('choose_mission')} 
                       className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-2xl py-4 flex justify-center items-center gap-2 font-bold transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] text-lg relative z-10"
                     >
                       <Plus className="w-6 h-6" /> Start New Mission
                     </motion.button>
                   </div>

                   <motion.div 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
                     className="space-y-4 px-1 md:px-0 mb-8"
                   >
                     <button onClick={() => goTo('choose_mission')} className="w-full bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all group">
                       <div className="flex items-center gap-5">
                         <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                           <ClipboardList className="w-5 h-5" />
                         </div>
                         <div className="text-left">
                           <h3 className="font-bold text-slate-900 text-base">My Missions</h3>
                           <p className="text-sm text-slate-500 mt-0.5">View and manage discovery pipelines</p>
                         </div>
                       </div>
                       <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                     </button>

                     <button onClick={() => setAppMode('research')} className="w-full bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:border-indigo-300 hover:shadow-md transition-all group mb-4">
                       <div className="flex items-center gap-5">
                         <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                           <LineChart className="w-5 h-5" />
                         </div>
                         <div className="text-left">
                           <h3 className="font-bold text-slate-900 text-base">Research Lab</h3>
                           <p className="text-sm text-slate-500 mt-0.5">Analyze data and run experiments</p>
                         </div>
                       </div>
                       <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                     </button>
                     
                     <div className="md:hidden mt-6">
                       <PWAInstallButton />
                     </div>
                   </motion.div>
                 </motion.div>
               )}

               {currentScreen === 'choose_mission' && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500 py-4">
                     <h2 className="text-3xl font-serif font-bold mb-6 text-slate-900 tracking-tight">Available Missions</h2>
                     <div className="grid gap-6 md:grid-cols-2 mb-12">
                       {MISSIONS.map(m => (
                         <div key={m.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow">
                           <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                           <div className="flex-1 pl-3">
                             <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 flex items-center gap-2">
                               <ShieldAlert className="w-4 h-4" /> Mission 01
                             </div>
                             <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{m.title}</h3>
                             <p className="text-slate-600 text-sm leading-relaxed">{m.description}</p>
                           </div>
                           <button 
                             onClick={() => goTo('understand_disease')} 
                             className="mt-6 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-sm active:scale-[0.98] flex justify-center items-center gap-2 ml-3"
                             style={{width: 'calc(100% - 12px)'}}
                           >
                             Accept Mission <ArrowRight className="w-4 h-4" />
                           </button>
                         </div>
                       ))}
                     </div>

                     {missionHistory.length > 0 && (
                       <>
                         <h2 className="text-2xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                           <ClipboardList className="w-6 h-6 text-slate-400" /> Mission History
                         </h2>
                         <div className="space-y-4">
                           {missionHistory.map(historyItem => {
                             const mission = MISSIONS.find(m => m.id === historyItem.missionId) || MISSIONS[0];
                             const dateStr = new Date(historyItem.date).toLocaleDateString();
                             
                             return (
                               <button 
                                 key={historyItem.id}
                                 onClick={() => { setHistoryViewId(historyItem.id); goTo('view_history_report'); }}
                                 className="w-full bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                               >
                                 <div>
                                   <div className="text-xs font-bold text-slate-500 mb-1">{dateStr} &bull; {mission.title}</div>
                                   <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Lead: {historyItem.molecule.name}</h4>
                                 </div>
                                 <div className="flex items-center gap-4">
                                   <div className="text-right">
                                     <div className="text-xs text-slate-500">Overall Score</div>
                                     <div className="text-lg font-bold text-blue-600">{historyItem.molecule.overallScore || 'N/A'}/100</div>
                                   </div>
                                   <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                 </div>
                               </button>
                             )
                           })}
                         </div>
                       </>
                     )}
                  </div>
               )}

               {currentScreen === 'understand_disease' && (
                  <div className="animate-in slide-in-from-right-8 fade-in duration-500 max-w-2xl mx-auto w-full py-4">
                    <h2 className="text-3xl font-serif font-bold mb-6 text-slate-900 tracking-tight">Understand the Disease</h2>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-lg text-slate-700 leading-relaxed mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        Antibiotic resistance is one of the biggest threats to global health today. We are dealing with a fictional resistant strain that requires a completely new approach.
                      </p>
                      
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h3 className="text-xl font-serif font-bold mb-6 text-slate-900 border-b border-slate-100 pb-4">Scientific Considerations</h3>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="font-bold text-slate-800 block text-sm">Why does a drug need to be selective?</label>
                            <textarea 
                              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px] resize-y" 
                              placeholder="Record your thoughts here. Why would blocking an enzyme that both humans and bacteria share be dangerous?"
                            ></textarea>
                          </div>
                          <div className="space-y-2">
                            <label className="font-bold text-slate-800 block text-sm">What happens if a drug cannot penetrate the bacterial cell wall?</label>
                            <textarea 
                              className="w-full border border-slate-200 bg-slate-50 rounded-xl p-4 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px] resize-y" 
                              placeholder="Record your thoughts here..."
                            ></textarea>
                          </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                          <button 
                            onClick={() => goTo('meet_target')} 
                            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm active:scale-95"
                          >
                            Continue to Target
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
               )}

               {currentScreen === 'meet_target' && (
                  <MeetTarget mission={MISSIONS[0]} onNext={() => goTo('molecule_library')} />
               )}

               {currentScreen === 'molecule_library' && (
                  <MoleculeLibrary molecules={MOLECULE_LIBRARY} onSelect={handleMoleculeSelect} />
               )}

               {currentScreen === 'molecule_lab' && (
                  <MoleculeLab 
                     baseMolecule={baseMolecule} 
                     onNext={handleLabNext} 
                     onBack={() => goTo('molecule_library')} 
                  />
               )}

               {currentScreen === 'drug_likeness' && activeMolecule && (
                  <DrugLikeness molecule={activeMolecule} onNext={() => goTo('adme_challenge')} />
               )}

               {currentScreen === 'adme_challenge' && activeMolecule && (
                  <AdmeChallenge molecule={activeMolecule} onNext={() => goTo('toxicity_trap')} />
               )}

               {currentScreen === 'toxicity_trap' && activeMolecule && (
                  <ToxicityTrap molecule={activeMolecule} onNext={() => goTo('candidate_ranking')} />
               )}

               {currentScreen === 'candidate_ranking' && (
                  <CandidateRanking molecules={rankingMolecules} onNext={() => goTo('scientific_decision')} />
               )}

               {currentScreen === 'scientific_decision' && (
                  <ScientificDecision molecules={rankingMolecules} onComplete={handleFinalDecision} />
               )}

               {currentScreen === 'research_report' && (
                  <ResearchReport 
                    mission={MISSIONS[0]} 
                    molecule={finalMolecule} 
                    reasoning={finalReasoning} 
                  />
               )}

               {currentScreen === 'view_history_report' && historyViewId && (
                 (() => {
                   const h = missionHistory.find(x => x.id === historyViewId);
                   if (!h) return null;
                   return (
                     <div className="animate-in fade-in duration-500">
                        <button onClick={() => goTo('choose_mission')} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors print:hidden">
                          <ArrowLeft className="w-4 h-4" /> Back to Missions
                        </button>
                        <ResearchReport 
                          mission={MISSIONS.find(m => m.id === h.missionId) || MISSIONS[0]} 
                          molecule={h.molecule} 
                          reasoning={h.reasoning} 
                        />
                     </div>
                   );
                 })()
               )}
             </>
           )}
         </main>
       </div>

       {/* Bottom Navigation for Mobile */}
       <nav 
         className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 flex justify-around pb-4 pt-2 z-40 print:hidden shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]"
         style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
       >
         {[
           { id: 'home', label: 'Home', icon: Home, isActive: currentScreen === 'welcome' && appMode === 'mission', onClick: () => { triggerHaptic(); setAppMode('mission'); goTo('welcome'); }, activeColor: 'text-blue-600', activeBg: 'bg-blue-50' },
           { id: 'missions', label: 'Missions', icon: ClipboardList, isActive: currentScreen !== 'welcome' && appMode === 'mission', onClick: () => { triggerHaptic(); setAppMode('mission'); if(currentScreen === 'welcome') goTo('choose_mission'); }, activeColor: 'text-blue-600', activeBg: 'bg-blue-50' },
           { id: 'research', label: 'Research', icon: LineChart, isActive: appMode === 'research', onClick: () => { triggerHaptic(); setAppMode('research'); }, activeColor: 'text-indigo-600', activeBg: 'bg-indigo-50' }
         ].map((tab) => {
           const Icon = tab.icon;
           return (
             <button 
               key={tab.id}
               onClick={tab.onClick} 
               className={`relative flex flex-col items-center p-2 flex-1 transition-colors z-10 ${tab.isActive ? tab.activeColor : 'text-slate-400 hover:text-slate-600'}`}
             >
               {tab.isActive && (
                 <motion.div
                   layoutId="mobile-nav-active"
                   className={`absolute inset-1 rounded-xl ${tab.activeBg} -z-10`}
                   transition={{ type: "spring", stiffness: 300, damping: 25 }}
                 />
               )}
               <motion.div
                 animate={{ scale: tab.isActive ? 1.15 : 1, y: tab.isActive ? -2 : 0 }}
                 transition={{ type: "spring", stiffness: 400, damping: 17 }}
               >
                 <Icon className="w-6 h-6 mb-1" />
               </motion.div>
               <span className="text-[10px] font-bold">{tab.label}</span>
             </button>
           )
         })}
       </nav>
    </div>
  );
}
