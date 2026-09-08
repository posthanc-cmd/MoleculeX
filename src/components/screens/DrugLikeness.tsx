import React from 'react';
import { Molecule } from '../../types';
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface DrugLikenessProps {
  molecule: Molecule;
  onNext: () => void;
}

export const DrugLikeness: React.FC<DrugLikenessProps> = ({ molecule, onNext }) => {
  // Lipinski's Rule of 5 evaluations
  const isMwPass = molecule.molecularWeight <= 500;
  const isLogPPass = molecule.logP <= 5;
  const isHbdPass = molecule.hbd <= 5;
  const isHbaPass = molecule.hba <= 10;

  const violations = [!isMwPass, !isLogPPass, !isHbdPass, !isHbaPass].filter(Boolean).length;
  const passesAll = violations === 0;

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 w-full py-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Drug-Likeness Evaluation</h2>
        <p className="text-slate-600 text-lg">
          Not all active molecules make good oral drugs. We use "Lipinski's Rule of 5" as a general guideline to predict if a molecule will be orally active in humans.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8">
        <div className={`p-6 border-b ${passesAll ? 'bg-green-50 border-green-100' : violations <= 1 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100'}`}>
          <div className="flex items-center gap-4">
            {passesAll ? (
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            ) : violations <= 1 ? (
              <AlertTriangle className="w-10 h-10 text-amber-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-600" />
            )}
            <div>
              <h3 className={`text-xl font-bold ${passesAll ? 'text-green-900' : violations <= 1 ? 'text-amber-900' : 'text-red-900'}`}>
                {passesAll ? 'Candidate Passes Guidelines' : violations <= 1 ? 'Marginal Candidate (1 Violation)' : `Poor Drug-Likeness (${violations} Violations)`}
              </h3>
              <p className={passesAll ? 'text-green-700' : violations <= 1 ? 'text-amber-700' : 'text-red-700'}>
                {passesAll 
                  ? "This molecule has properties typical of orally bioavailable drugs." 
                  : "Molecules with multiple violations are highly likely to suffer from poor absorption or permeation."}
              </p>
            </div>
          </div>
        </div>

        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">Property</th>
                <th className="p-4 font-bold">Guideline</th>
                <th className="p-4 font-bold">Candidate Value</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">Molecular Weight</td>
                <td className="p-4 text-slate-600">&le; 500 g/mol</td>
                <td className="p-4 font-mono font-medium text-slate-800">{molecule.molecularWeight.toFixed(1)}</td>
                <td className="p-4">
                  {isMwPass ? <span className="inline-flex items-center gap-1 text-green-600 font-bold text-sm"><CheckCircle2 className="w-4 h-4"/> Pass</span> 
                            : <span className="inline-flex items-center gap-1 text-red-600 font-bold text-sm"><XCircle className="w-4 h-4"/> Fail</span>}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">Lipophilicity (LogP)</td>
                <td className="p-4 text-slate-600">&le; 5</td>
                <td className="p-4 font-mono font-medium text-slate-800">{molecule.logP.toFixed(1)}</td>
                <td className="p-4">
                  {isLogPPass ? <span className="inline-flex items-center gap-1 text-green-600 font-bold text-sm"><CheckCircle2 className="w-4 h-4"/> Pass</span> 
                            : <span className="inline-flex items-center gap-1 text-red-600 font-bold text-sm"><XCircle className="w-4 h-4"/> Fail</span>}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">H-Bond Donors</td>
                <td className="p-4 text-slate-600">&le; 5</td>
                <td className="p-4 font-mono font-medium text-slate-800">{molecule.hbd}</td>
                <td className="p-4">
                  {isHbdPass ? <span className="inline-flex items-center gap-1 text-green-600 font-bold text-sm"><CheckCircle2 className="w-4 h-4"/> Pass</span> 
                            : <span className="inline-flex items-center gap-1 text-red-600 font-bold text-sm"><XCircle className="w-4 h-4"/> Fail</span>}
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900">H-Bond Acceptors</td>
                <td className="p-4 text-slate-600">&le; 10</td>
                <td className="p-4 font-mono font-medium text-slate-800">{molecule.hba}</td>
                <td className="p-4">
                  {isHbaPass ? <span className="inline-flex items-center gap-1 text-green-600 font-bold text-sm"><CheckCircle2 className="w-4 h-4"/> Pass</span> 
                            : <span className="inline-flex items-center gap-1 text-red-600 font-bold text-sm"><XCircle className="w-4 h-4"/> Fail</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-100 border border-slate-200 p-5 rounded-lg text-sm text-slate-700 leading-relaxed mb-8">
        <strong>Educational Note:</strong> A drug must dissolve in the gut (requires hydrophilicity) and cross the lipid cell membranes into the bloodstream (requires lipophilicity). Lipinski's Rule of 5 helps chemists find that perfect balance. <em>Do not interpret this as a clinical prediction.</em>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onNext} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          Proceed to ADME Challenge
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
