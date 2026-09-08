import React from 'react';
import { Molecule } from '../../types';
import { ArrowRight, Trophy, ShieldAlert } from 'lucide-react';

interface CandidateRankingProps {
  molecules: Molecule[];
  onNext: () => void;
}

export const CandidateRanking: React.FC<CandidateRankingProps> = ({ molecules, onNext }) => {
  
  // Calculate scores
  const getDrugLikenessScore = (m: Molecule) => {
    let score = 100;
    if (m.molecularWeight > 500) score -= 25;
    if (m.logP > 5) score -= 25;
    if (m.hbd > 5) score -= 25;
    if (m.hba > 10) score -= 25;
    return score;
  };

  const getOverallScore = (m: Molecule) => {
    // 30% Efficacy (Potency)
    // 20% Selectivity
    // 15% Safety (100 - Toxicity)
    // 15% ADME (Avg of Bioavailability & Permeability)
    // 10% Solubility
    // 10% Drug-likeness
    
    const efficacy = m.potency * 0.30;
    const selectivity = m.selectivity * 0.20;
    const safety = Math.max(0, 100 - m.toxicity) * 0.15;
    const adme = ((m.bioavailability + m.permeability) / 2) * 0.15;
    const sol = m.solubility * 0.10;
    const likeness = getDrugLikenessScore(m) * 0.10;
    
    return Number((efficacy + selectivity + safety + adme + sol + likeness).toFixed(1));
  };

  const scoredMolecules = molecules.map(m => ({
    ...m,
    score: getOverallScore(m),
    isToxic: m.toxicity >= 70
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 w-full py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Candidate Ranking</h2>
        <p className="text-slate-600 text-lg">
          We have evaluated all original compounds using our multi-parameter scoring model. Notice how the highest scoring molecule isn't necessarily the most potent one!
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-bold">Rank</th>
              <th className="p-4 font-bold">Compound</th>
              <th className="p-4 font-bold text-center">Score</th>
              <th className="p-4 font-bold">Potency</th>
              <th className="p-4 font-bold">Toxicity</th>
              <th className="p-4 font-bold">Bioavailability</th>
              <th className="p-4 font-bold text-center">Safety Gate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scoredMolecules.map((m, index) => (
              <tr key={m.id} className={`hover:bg-slate-50 transition-colors ${index === 0 && !m.isToxic ? 'bg-blue-50/30' : ''}`}>
                <td className="p-4">
                  {index === 0 ? <Trophy className="w-6 h-6 text-amber-500" /> : <span className="text-slate-400 font-bold ml-2">#{index + 1}</span>}
                </td>
                <td className="p-4 font-bold text-slate-900">{m.name}</td>
                <td className="p-4 text-center">
                  <div className="inline-flex bg-slate-900 text-white rounded px-2.5 py-1 text-sm font-bold">
                    {m.score}
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-700">{m.potency}</td>
                <td className="p-4 text-sm text-slate-700">{m.toxicity}</td>
                <td className="p-4 text-sm text-slate-700">{m.bioavailability}%</td>
                <td className="p-4 text-center">
                  {m.isToxic ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                      <ShieldAlert className="w-3 h-3" /> FAILED
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                      PASS
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-end mt-8">
        <button 
          onClick={onNext} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          Make Scientific Decision
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
