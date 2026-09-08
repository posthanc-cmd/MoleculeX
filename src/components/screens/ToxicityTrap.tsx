import React from 'react';
import { Molecule } from '../../types';
import { ArrowRight, ShieldAlert, Skull } from 'lucide-react';

interface ToxicityTrapProps {
  molecule: Molecule;
  onNext: () => void;
}

export const ToxicityTrap: React.FC<ToxicityTrapProps> = ({ molecule, onNext }) => {
  const isToxic = molecule.toxicity >= 70;

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 w-full py-6">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 shadow-sm border border-red-200">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Toxicity Trap</h2>
        <p className="text-slate-600 text-lg leading-relaxed">
          The most potent molecule isn't always the best drug. Many highly potent compounds also bind to unintended targets in the human body, causing severe side effects or toxicity.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-12">
        <div className="p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
            <span>{molecule.name} Safety Profile</span>
            <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Target Tox &lt; 70
            </span>
          </h3>
          
          <div className="mb-8">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">Simulated Toxicity Index</span>
              <span className={isToxic ? 'text-red-600' : 'text-green-600'}>{molecule.toxicity}/100</span>
            </div>
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden relative">
              <div 
                className={`h-full transition-all duration-1000 ${isToxic ? 'bg-red-500' : 'bg-green-500'}`} 
                style={{ width: `${molecule.toxicity}%` }}
              ></div>
              <div className="absolute top-0 bottom-0 left-[70%] border-l-2 border-dashed border-slate-800 z-10" title="Safety Threshold (70)"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>0 (Safe)</span>
              <span>70 (Danger)</span>
              <span>100 (Lethal)</span>
            </div>
          </div>

          {isToxic ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-5 flex gap-4">
               <Skull className="w-8 h-8 text-red-500 shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-red-900 mb-1">Safety Gate Failed</h4>
                 <p className="text-red-800 text-sm leading-relaxed">
                   This candidate exhibits severe toxicity (Index: {molecule.toxicity}). Regardless of its potency against the bacteria, it would be unsafe to give to humans. In real pharmaceutical pipelines, this compound would be immediately halted (attrition).
                 </p>
               </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex gap-4">
               <ShieldAlert className="w-8 h-8 text-green-600 shrink-0 mt-1" />
               <div>
                 <h4 className="font-bold text-green-900 mb-1">Safety Gate Passed</h4>
                 <p className="text-green-800 text-sm leading-relaxed">
                   This candidate exhibits an acceptable safety profile (Index: {molecule.toxicity}). It is unlikely to cause severe off-target effects and could theoretically progress to in-vivo testing.
                 </p>
               </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onNext} 
          className="px-8 py-4 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-lg flex items-center gap-3 transition-all shadow-md"
        >
          Rank All Candidates
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
