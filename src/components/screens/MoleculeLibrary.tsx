import React from 'react';
import { Molecule } from '../../types';
import { FlaskConical, Activity, ShieldAlert, ArrowRight } from 'lucide-react';

interface MoleculeLibraryProps {
  molecules: Molecule[];
  onSelect: (moleculeId: string) => void;
}

export const MoleculeLibrary: React.FC<MoleculeLibraryProps> = ({ molecules, onSelect }) => {
  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 w-full py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Molecule Library</h2>
        <p className="text-slate-600 mt-2 text-lg">
          We have generated 6 initial hypothetical candidates. Review their baseline profiles and select one to bring into the lab for deeper investigation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {molecules.map(mol => (
          <button 
            key={mol.id}
            onClick={() => onSelect(mol.id)}
            className="text-left bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider">
                <FlaskConical className="w-3.5 h-3.5" />
                {mol.id.toUpperCase()}
              </div>
              {mol.toxicity >= 70 && (
                <div className="text-red-500 bg-red-50 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Toxic
                </div>
              )}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
              {mol.name}
            </h3>

            <div className="space-y-3 flex-1">
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-slate-500 uppercase">
                  <span>Potency</span>
                  <span className="text-slate-900 font-bold">{mol.potency}/100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${mol.potency}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-slate-500 uppercase">
                  <span>Selectivity</span>
                  <span className="text-slate-900 font-bold">{mol.selectivity}/100</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500" style={{ width: `${mol.selectivity}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-medium text-slate-500 uppercase">
                  <span>LogP (Lipophilicity)</span>
                  <span className="text-slate-900 font-bold">{mol.logP}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: `${(mol.logP / 5) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-blue-600 group-hover:text-blue-800">
              Investigate Candidate
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
