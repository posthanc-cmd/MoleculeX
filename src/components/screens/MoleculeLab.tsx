import React, { useState } from 'react';
import { Molecule } from '../../types';
import { ArrowRight, Settings2, Activity, Zap, Shield, Droplet } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface MoleculeLabProps {
  baseMolecule: Molecule;
  onNext: (modifiedMolecule: Molecule) => void;
  onBack: () => void;
}

type Modification = 'none' | 'add_fluorine' | 'add_hydroxyl' | 'add_methyl';

export const MoleculeLab: React.FC<MoleculeLabProps> = ({ baseMolecule, onNext, onBack }) => {
  const [mod, setMod] = useState<Modification>('none');

  // Apply simulated medicinal chemistry logic
  const getModifiedMolecule = (): Molecule => {
    let m = { ...baseMolecule };
    
    if (mod !== 'none') {
      m.id = `${m.id}-modified`;
    }

    switch(mod) {
      case 'add_fluorine':
        m.name = `${m.name} (+F)`;
        m.logP = Number((m.logP + 0.5).toFixed(1)); // More lipophilic
        m.metabolicStability = Math.min(100, m.metabolicStability + 20); // Fluorine blocks metabolism
        m.molecularWeight += 19;
        m.potency = Math.min(100, m.potency + 5);
        break;
      case 'add_hydroxyl':
        m.name = `${m.name} (+OH)`;
        m.logP = Number((m.logP - 1.0).toFixed(1)); // More hydrophilic (lower LogP)
        m.solubility = Math.min(100, m.solubility + 30);
        m.permeability = Math.max(0, m.permeability - 15);
        m.hbd += 1;
        m.hba += 1;
        m.molecularWeight += 17;
        break;
      case 'add_methyl':
        m.name = `${m.name} (+CH3)`;
        m.logP = Number((m.logP + 0.3).toFixed(1));
        m.molecularWeight += 15;
        m.selectivity = Math.min(100, m.selectivity + 10); // Often improves fit/selectivity
        m.toxicity = Math.max(0, m.toxicity - 5);
        break;
    }
    return m;
  };

  const currentMol = getModifiedMolecule();

  const chartData = [
    { subject: 'Potency', A: currentMol.potency, fullMark: 100 },
    { subject: 'Selectivity', A: currentMol.selectivity, fullMark: 100 },
    { subject: 'Solubility', A: currentMol.solubility, fullMark: 100 },
    { subject: 'Permeability', A: currentMol.permeability, fullMark: 100 },
    { subject: 'Metabolic Stab.', A: currentMol.metabolicStability, fullMark: 100 },
    { subject: 'Safety (100-Tox)', A: 100 - currentMol.toxicity, fullMark: 100 },
  ];

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 w-full py-6">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 flex items-center gap-1 transition-colors">
        &larr; Back to Library
      </button>

      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-900">{currentMol.name} Lab</h2>
            {mod !== 'none' && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">MODIFIED</span>}
          </div>
          <p className="text-slate-600">Simulate structural modifications and observe the property shifts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Visual & Radar */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Property Radar</h3>
          <div className="flex-1 min-h-[250px] w-full relative -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Molecule" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Mods & Stats */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-slate-400" />
              Structural Modifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button 
                onClick={() => setMod('none')}
                className={`py-2 px-3 rounded-md text-sm font-medium border transition-colors ${mod === 'none' ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
              >
                Base Molecule
              </button>
              <button 
                onClick={() => setMod('add_fluorine')}
                className={`py-2 px-3 rounded-md text-sm font-medium border transition-colors ${mod === 'add_fluorine' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                title="Adds +F. Increases LogP, prevents metabolism."
              >
                + Fluorine (F)
              </button>
              <button 
                onClick={() => setMod('add_hydroxyl')}
                className={`py-2 px-3 rounded-md text-sm font-medium border transition-colors ${mod === 'add_hydroxyl' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                title="Adds +OH. Lowers LogP, increases solubility."
              >
                + Hydroxyl (OH)
              </button>
              <button 
                onClick={() => setMod('add_methyl')}
                className={`py-2 px-3 rounded-md text-sm font-medium border transition-colors ${mod === 'add_methyl' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
                title="Adds +CH3. Slightly increases LogP, can improve selectivity."
              >
                + Methyl (CH3)
              </button>
            </div>
            {mod !== 'none' && (
              <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded text-sm text-slate-600">
                {mod === 'add_fluorine' && "Fluorine is highly electronegative and forms strong C-F bonds. It blocks metabolic enzymes from degrading the molecule and increases lipophilicity (LogP)."}
                {mod === 'add_hydroxyl' && "Adding a hydroxyl group (-OH) introduces a hydrogen bond donor and acceptor. This dramatically increases water solubility but makes it harder to cross lipid membranes (lower permeability)."}
                {mod === 'add_methyl' && "A methyl group (-CH3) adds bulk and slight lipophilicity. It can lock the molecule into a specific 3D shape, often improving selectivity for the target."}
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-b border-slate-100">
              <div className="p-4 text-center">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">MW</div>
                <div className="text-xl font-bold text-slate-900">{currentMol.molecularWeight.toFixed(1)} <span className="text-sm font-normal text-slate-500">g/mol</span></div>
              </div>
              <div className="p-4 text-center">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">LogP</div>
                <div className="text-xl font-bold text-slate-900">{currentMol.logP.toFixed(1)}</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">HBD</div>
                <div className="text-xl font-bold text-slate-900">{currentMol.hbd}</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">HBA</div>
                <div className="text-xl font-bold text-slate-900">{currentMol.hba}</div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
               <div>
                  <div className="flex justify-between text-xs mb-1 font-bold text-slate-700 uppercase">
                    <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500"/> Potency</span>
                    <span>{currentMol.potency}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${currentMol.potency}%` }}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-xs mb-1 font-bold text-slate-700 uppercase">
                    <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-red-500"/> Toxicity</span>
                    <span className={currentMol.toxicity >= 70 ? 'text-red-600' : ''}>{currentMol.toxicity}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${currentMol.toxicity >= 70 ? 'bg-red-500' : 'bg-rose-400'}`} style={{ width: `${currentMol.toxicity}%` }}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-xs mb-1 font-bold text-slate-700 uppercase">
                    <span className="flex items-center gap-1"><Droplet className="w-3.5 h-3.5 text-blue-500"/> Solubility</span>
                    <span>{currentMol.solubility}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${currentMol.solubility}%` }}></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-xs mb-1 font-bold text-slate-700 uppercase">
                    <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-teal-500"/> Metabolic Stability</span>
                    <span>{currentMol.metabolicStability}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 transition-all duration-500" style={{ width: `${currentMol.metabolicStability}%` }}></div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button 
          onClick={() => onNext(currentMol)} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          Evaluate Drug-Likeness
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
