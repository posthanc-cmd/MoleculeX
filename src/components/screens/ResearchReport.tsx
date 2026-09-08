import React from 'react';
import { Molecule, Mission } from '../../types';
import { FileSignature, ShieldAlert, Award, Printer } from 'lucide-react';

interface ResearchReportProps {
  mission: Mission;
  molecule: Molecule;
  reasoning: string;
}

export const ResearchReport: React.FC<ResearchReportProps> = ({ mission, molecule, reasoning }) => {
  
  const handlePrint = () => {
    window.print();
  };

  const failureReasons: string[] = [];
  if (molecule.toxicity >= 70) failureReasons.push("Severe toxicity risks identified (Safety Gate failed).");
  if (molecule.bioavailability < 30) failureReasons.push("Extremely poor bioavailability limits oral efficacy.");
  if (molecule.potency < 50) failureReasons.push("Insufficient target binding potency for therapeutic use.");
  if (molecule.solubility < 30) failureReasons.push("Low solubility restricts absorption and distribution.");
  if (molecule.permeability < 30) failureReasons.push("Poor permeability restricts ability to cross cell membranes.");
  if (molecule.metabolicStability < 30) failureReasons.push("Rapidly degraded by liver metabolism, preventing sustained effects.");
  
  const isFailed = failureReasons.length > 0;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-4xl mx-auto py-6">
      
      <div className="flex justify-end mb-6 print:hidden">
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl text-sm font-bold transition-all border border-slate-200 shadow-sm hover:shadow active:scale-95 group"
        >
          <Printer className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          Download PDF
        </button>
      </div>

      <div className="bg-white border-2 border-slate-800 rounded-xl p-8 md:p-12 shadow-xl print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="border-b-2 border-slate-800 pb-8 mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">RESEARCH REPORT</h1>
            <h2 className="text-xl font-bold text-slate-500 uppercase tracking-widest">MoleculeX Simulation</h2>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-800 mb-1">DATE: <span className="font-mono font-normal ml-2">{new Date().toLocaleDateString()}</span></div>
            <div className="text-sm font-bold text-slate-800">LEAD SCIENTIST: <span className="font-mono font-normal ml-2 text-blue-600">Maya</span></div>
          </div>
        </div>

        {/* Mission & Target */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-2">Mission Objective</h3>
            <p className="font-semibold text-slate-900">{mission.title}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-2">Biological Target</h3>
            <p className="font-semibold text-slate-900">{mission.targetName}</p>
          </div>
        </div>

        {/* Selected Candidate */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-10">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-bold text-slate-900">Lead Candidate: {molecule.name}</h3>
             {isFailed ? (
               <div className="flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                 <ShieldAlert className="w-4 h-4" /> Rejected
               </div>
             ) : (
               <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                 <Award className="w-4 h-4" /> Advanced
               </div>
             )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-slate-100 p-3 rounded text-center shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Potency</div>
              <div className="text-lg font-mono font-medium text-slate-800">{molecule.potency}/100</div>
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded text-center shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Toxicity</div>
              <div className={`text-lg font-mono font-medium ${molecule.toxicity >= 70 ? 'text-red-600 font-bold' : 'text-slate-800'}`}>{molecule.toxicity}/100</div>
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded text-center shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bioavailability</div>
              <div className="text-lg font-mono font-medium text-slate-800">{molecule.bioavailability}%</div>
            </div>
            <div className="bg-white border border-slate-100 p-3 rounded text-center shadow-sm">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">LogP</div>
              <div className="text-lg font-mono font-medium text-slate-800">{molecule.logP.toFixed(1)}</div>
            </div>
          </div>

          {isFailed && (
             <div className="mt-4 p-5 bg-red-50 border border-red-100 rounded-md text-sm">
               <strong className="text-red-900 block mb-2 text-base">Why did this drug fail?</strong> 
               <ul className="list-disc pl-5 space-y-1 text-red-800 mb-3">
                 {failureReasons.map((reason, idx) => (
                   <li key={idx}>{reason}</li>
                 ))}
               </ul>
               <p className="text-red-700 italic border-t border-red-100 pt-2 mt-2">
                 This demonstrates that drug discovery is a balancing process—optimizing for one variable often compromises another.
               </p>
             </div>
          )}
        </div>

        {/* Scientific Reasoning */}
        <div className="mb-12">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
            <FileSignature className="w-4 h-4 text-blue-600" />
            Scientist's Rationale
          </h3>
          <div className="bg-white p-6 border border-slate-200 rounded-lg shadow-inner min-h-[150px] text-slate-700 italic leading-relaxed">
            "{reasoning}"
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t-2 border-slate-800 text-sm text-slate-500 font-medium">
          Generated by MoleculeX Simulation — Educational Purposes Only
        </div>
      </div>

    </div>
  );
};
