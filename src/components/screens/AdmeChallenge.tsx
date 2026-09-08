import React from 'react';
import { Molecule } from '../../types';
import { ArrowRight, Activity, Droplets, Move, Battery } from 'lucide-react';

interface AdmeChallengeProps {
  molecule: Molecule;
  onNext: () => void;
}

export const AdmeChallenge: React.FC<AdmeChallengeProps> = ({ molecule, onNext }) => {
  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 w-full py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">ADME Challenge</h2>
        <p className="text-slate-600 text-lg">
          A drug must reach its target in the body to work. ADME evaluates how the body affects the drug.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Absorption</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4 h-10">Can it cross from the gut into the bloodstream?</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">Permeability</span>
              <span className={molecule.permeability < 40 ? 'text-red-500' : 'text-green-600'}>{molecule.permeability}/100</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full ${molecule.permeability < 40 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${molecule.permeability}%` }}></div>
            </div>
            {molecule.permeability < 40 && (
              <p className="text-xs text-red-600 mt-2 font-medium">Warning: Poor permeability limits absorption.</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
              <Move className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Distribution</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4 h-10">Can it travel through blood and reach the target tissue?</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">Solubility</span>
              <span className={molecule.solubility < 40 ? 'text-red-500' : 'text-green-600'}>{molecule.solubility}/100</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full ${molecule.solubility < 40 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${molecule.solubility}%` }}></div>
            </div>
            {molecule.solubility < 40 && (
              <p className="text-xs text-red-600 mt-2 font-medium">Warning: Low solubility leads to poor distribution.</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Metabolism</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4 h-10">Does the liver destroy it too quickly?</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">Metabolic Stability</span>
              <span className={molecule.metabolicStability < 40 ? 'text-red-500' : 'text-green-600'}>{molecule.metabolicStability}/100</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full ${molecule.metabolicStability < 40 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${molecule.metabolicStability}%` }}></div>
            </div>
            {molecule.metabolicStability < 40 && (
              <p className="text-xs text-red-600 mt-2 font-medium">Warning: Rapidly degraded by the liver. Will require frequent dosing.</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Battery className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Overall Bioavailability</h3>
          </div>
          <p className="text-sm text-slate-600 mb-4 h-10">The percentage of drug that reaches circulation intact.</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-slate-700">Bioavailability</span>
              <span className={molecule.bioavailability < 30 ? 'text-red-500' : 'text-indigo-600'}>{molecule.bioavailability}%</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full ${molecule.bioavailability < 30 ? 'bg-red-500' : 'bg-indigo-500'}`} style={{ width: `${molecule.bioavailability}%` }}></div>
            </div>
            {molecule.bioavailability < 30 && (
              <p className="text-xs text-red-600 mt-2 font-medium">Warning: Poor bioavailability. Unlikely to be an effective oral drug.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm mb-8">
         <h4 className="font-bold text-blue-900 mb-3 text-lg">Critical Thinking Challenge</h4>
         <p className="text-blue-800 text-sm mb-4">
           Based on {molecule.name}'s ADME profile, what might happen if a patient took this drug as a pill?
         </p>
         <textarea 
           className="w-full border border-blue-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow min-h-[100px] resize-y" 
           placeholder={`Consider its ${molecule.bioavailability}% bioavailability and metabolic stability of ${molecule.metabolicStability}...`}
         ></textarea>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onNext} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          Check Toxicity
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
