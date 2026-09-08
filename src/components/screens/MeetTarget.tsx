import React from 'react';
import { ArrowRight, Dna } from 'lucide-react';
import { Mission } from '../../types';

interface MeetTargetProps {
  mission: Mission;
  onNext: () => void;
}

export const MeetTarget: React.FC<MeetTargetProps> = ({ mission, onNext }) => {
  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 max-w-3xl mx-auto w-full py-6">
      <h2 className="text-3xl font-bold mb-6 text-slate-900">Meet the Target</h2>
      
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
          {/* Abstract protein visualization */}
          <div className="absolute inset-0 opacity-20 flex items-center justify-center">
            <div className="w-64 h-64 border-[40px] border-blue-500 rounded-full blur-3xl mix-blend-screen"></div>
            <div className="w-64 h-64 border-[40px] border-indigo-500 rounded-full blur-3xl mix-blend-screen -ml-16"></div>
          </div>
          
          <Dna className="w-20 h-20 text-blue-400 mb-4 relative z-10" />
          <h3 className="text-4xl font-black relative z-10 tracking-tight">{mission.targetName}</h3>
          <p className="text-slate-300 font-medium uppercase tracking-widest mt-2 relative z-10 text-sm">
            Essential Bacterial Enzyme
          </p>
        </div>
        
        <div className="p-6 sm:p-8">
          <h4 className="text-xl font-bold text-slate-900 mb-4">Biological Mechanism</h4>
          <p className="text-slate-700 leading-relaxed mb-6">
            {mission.targetDescription}
          </p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8 text-blue-900 text-sm leading-relaxed">
            <strong>The Hypothesis:</strong> By designing a molecule that fits precisely into the active site of {mission.targetName}, we can disable it. This will prevent the bacteria from building their cell walls, causing them to rupture and die, effectively curing the infection.
          </div>

          <div className="flex justify-end">
            <button 
              onClick={onNext} 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors shadow-sm"
            >
              Examine Molecule Library
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
