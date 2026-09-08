import React, { useState } from 'react';
import { Molecule } from '../../types';
import { ArrowRight, FileCheck } from 'lucide-react';

interface ScientificDecisionProps {
  molecules: Molecule[];
  onComplete: (selectedMoleculeId: string, reasoning: string) => void;
}

export const ScientificDecision: React.FC<ScientificDecisionProps> = ({ molecules, onComplete }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [reasoning, setReasoning] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedId && reasoning.trim()) {
      onComplete(selectedId, reasoning);
    }
  };

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 max-w-3xl mx-auto w-full py-6">
      <div className="mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 shadow-sm border border-blue-200">
          <FileCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Scientific Decision</h2>
        <p className="text-slate-600 text-lg">
          It's time to select a lead candidate to advance to in-vivo (animal) trials. As the lead scientist, you must justify your choice.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
            Select Lead Candidate
          </label>
          <select 
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
            className="w-full md:w-1/2 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white shadow-sm"
          >
            <option value="" disabled>-- Select a molecule --</option>
            {molecules.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} {m.toxicity >= 70 ? '(Safety Warning)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">
            Scientific Reasoning
          </label>
          <p className="text-sm text-slate-500 mb-3">
            Explain why you chose this molecule. Mention its strengths (e.g., potency, ADME profile) and why you rejected others (e.g., toxicity, poor solubility).
          </p>
          <textarea 
            value={reasoning}
            onChange={(e) => setReasoning(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg p-4 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[150px] resize-y shadow-sm"
            placeholder="I selected Compound X because..."
          ></textarea>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button 
            type="submit"
            disabled={!selectedId || !reasoning.trim()}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-md font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            Generate Final Report
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
