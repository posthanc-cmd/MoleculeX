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
import { Beaker, ArrowRight, Activity, ShieldAlert, LineChart } from 'lucide-react';

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
  | 'research_report';

type AppMode = 'mission' | 'research';

const SCREEN_ORDER: Screen[] = [
  'welcome', 'choose_mission', 'understand_disease', 'meet_target', 
  'molecule_library', 'molecule_lab', 'drug_likeness', 'adme_challenge', 
  'toxicity_trap', 'candidate_ranking', 'scientific_decision', 'research_report'
];

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('mission');
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedBaseMoleculeId, setSelectedBaseMoleculeId] = useState<string | null>(null);
  const [activeMolecule, setActiveMolecule] = useState<Molecule | null>(null);
  const [finalCandidateId, setFinalCandidateId] = useState<string | null>(null);
  const [finalReasoning, setFinalReasoning] = useState<string>('');
  
  const goTo = (screen: Screen) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
    setAppMode('mission');
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
    goTo('research_report');
  };

  const baseMolecule = MOLECULE_LIBRARY.find(m => m.id === selectedBaseMoleculeId) || MOLECULE_LIBRARY[0];
  const rankingMolecules = activeMolecule 
    ? [...MOLECULE_LIBRARY.filter(m => m.id !== baseMolecule.id), activeMolecule]
    : MOLECULE_LIBRARY;
  const finalMolecule = rankingMolecules.find(m => m.id === finalCandidateId) || baseMolecule;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
       <header className="bg-white border-b border-slate-200 py-3 px-6 flex justify-between items-center sticky top-0 z-10 print:hidden">
         <div className="flex items-center gap-8">
           <button 
             onClick={() => goTo('welcome')} 
             className="flex items-center gap-2 text-blue-700 font-bold text-xl tracking-tight hover:opacity-80 transition"
           >
             <Beaker className="w-6 h-6" />
             MoleculeX
           </button>
           
           <div className="hidden md:flex bg-slate-100 p-1 rounded-lg border border-slate-200">
             <button 
               onClick={() => setAppMode('mission')}
               className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${appMode === 'mission' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
             >
               Mission Mode
             </button>
             <button 
               onClick={() => setAppMode('research')}
               className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${appMode === 'research' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
             >
               <LineChart className="w-4 h-4" />
               Research Lab
             </button>
           </div>
         </div>

         <div className="flex items-center gap-4">
           <div className="text-xs font-semibold text-slate-400 tracking-widest uppercase hidden sm:block">
             Maya's Lab
           </div>
           <PWAInstallButton />
         </div>
       </header>
       
       <div className="md:hidden flex bg-white border-b border-slate-200 p-2 print:hidden justify-center gap-2">
           <button 
             onClick={() => setAppMode('mission')}
             className={`px-4 py-2 flex-1 rounded-md text-sm font-bold transition-colors ${appMode === 'mission' ? 'bg-slate-100 text-blue-700' : 'text-slate-500'}`}
           >
             Mission
           </button>
           <button 
             onClick={() => setAppMode('research')}
             className={`flex justify-center items-center gap-2 flex-1 px-4 py-2 rounded-md text-sm font-bold transition-colors ${appMode === 'research' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500'}`}
           >
             <LineChart className="w-4 h-4" />
             Research
           </button>
       </div>

       <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6 md:p-12">
          {appMode === 'research' ? (
             <ResearchMode />
          ) : (
            <>
              {currentScreen === 'welcome' && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500 py-12">
                   <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 shadow-sm border border-blue-200">
                     <Beaker className="w-12 h-12" />
                   </div>
                   <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">MoleculeX</h1>
                   <p className="text-xl md:text-2xl text-slate-600 font-light">From Molecule &rarr; Medicine</p>
                   <div className="max-w-2xl bg-white border border-slate-200 p-6 rounded-xl shadow-sm text-left mt-8">
                     <h2 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                       <ShieldAlert className="w-5 h-5 text-amber-500" />
                       Educational Simulation
                     </h2>
                     <p className="text-sm text-slate-600 leading-relaxed">
                       This application is an educational simulation of early-stage drug discovery. 
                       Molecules, experimental results, and outcomes are hypothetical and simulated. 
                       MoleculeX is not a medical device and does not provide medical advice, diagnosis, 
                       treatment recommendations, or predictions of clinical outcomes.
                     </p>
                   </div>
                   <button 
                     onClick={() => goTo('choose_mission')}
                     className="mt-8 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg flex items-center gap-3 transition-all shadow-md hover:shadow-lg active:scale-95"
                   >
                     Enter the Lab
                     <ArrowRight className="w-5 h-5" />
                   </button>
                </div>
              )}

          {currentScreen === 'choose_mission' && (
             <div className="animate-in slide-in-from-right-8 fade-in duration-500 py-6">
                <h2 className="text-3xl font-bold mb-8 text-slate-900">Available Missions</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {MISSIONS.map(m => (
                    <div key={m.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                      <div className="flex-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Mission 01</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{m.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{m.description}</p>
                      </div>
                      <button 
                        onClick={() => goTo('understand_disease')} 
                        className="mt-6 w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-medium transition-colors border border-slate-200"
                      >
                        Accept Mission
                      </button>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {currentScreen === 'understand_disease' && (
             <div className="animate-in slide-in-from-right-8 fade-in duration-500 max-w-3xl mx-auto w-full py-6">
               <h2 className="text-3xl font-bold mb-6 text-slate-900">Understand the Disease</h2>
               <div className="prose prose-slate max-w-none">
                 <p className="text-lg text-slate-700 leading-relaxed mb-8">
                   Antibiotic resistance is one of the biggest threats to global health today. We are dealing with a fictional resistant strain that requires a completely new approach.
                 </p>
                 
                 <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
                   <h3 className="text-xl font-bold mb-6 text-slate-900">Scientific Considerations</h3>
                   <div className="space-y-6">
                     <div className="space-y-2">
                       <label className="font-medium text-slate-800 block">Why does a drug need to be selective?</label>
                       <textarea 
                         className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow min-h-[100px] resize-y" 
                         placeholder="Record your thoughts here. Why would blocking an enzyme that both humans and bacteria share be dangerous?"
                       ></textarea>
                     </div>
                     <div className="space-y-2">
                       <label className="font-medium text-slate-800 block">What happens if a drug cannot penetrate the bacterial cell wall?</label>
                       <textarea 
                         className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow min-h-[100px] resize-y" 
                         placeholder="Record your thoughts here..."
                       ></textarea>
                     </div>
                   </div>
                   <div className="mt-8 flex justify-end">
                     <button 
                       onClick={() => goTo('meet_target')} 
                       className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
                     >
                       Continue to Target
                       <ArrowRight className="w-4 h-4" />
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
            </>
          )}
       </main>
    </div>
  );
}
