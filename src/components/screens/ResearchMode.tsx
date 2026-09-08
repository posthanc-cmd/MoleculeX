import React, { useState } from 'react';
import { EXPERIMENTS } from '../../data';
import { Experiment } from '../../types';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ZAxis } from 'recharts';
import { LineChart, Play, ArrowLeft, FlaskConical, Lightbulb, CheckCircle2 } from 'lucide-react';

export const ResearchMode: React.FC = () => {
  const [selectedExp, setSelectedExp] = useState<Experiment | null>(null);
  const [hypothesis, setHypothesis] = useState('');
  const [interpretation, setInterpretation] = useState('');
  const [isRun, setIsRun] = useState(false);

  const handleSelect = (exp: Experiment) => {
    setSelectedExp(exp);
    setHypothesis('');
    setInterpretation('');
    setIsRun(false);
  };

  const handleRun = () => {
    if (hypothesis.trim()) {
      setIsRun(true);
    }
  };

  if (!selectedExp) {
    return (
      <div className="animate-in fade-in py-6">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-sm border border-indigo-200">
            <LineChart className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Research Mode</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Run simulated experiments to understand the relationships between different molecular properties. Form a hypothesis, run the simulation, and interpret the data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {EXPERIMENTS.map(exp => (
            <button
              key={exp.id}
              onClick={() => handleSelect(exp)}
              className="text-left bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col h-full group"
            >
              <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider mb-4 w-fit">
                <FlaskConical className="w-3.5 h-3.5" />
                SIMULATION
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">{exp.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">{exp.description}</p>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-sm font-medium text-indigo-600">
                Setup Experiment &rarr;
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500 py-6 max-w-4xl mx-auto">
      <button 
        onClick={() => setSelectedExp(null)} 
        className="text-slate-500 hover:text-slate-800 text-sm font-medium mb-6 flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Experiments
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">{selectedExp.title}</h2>
        <p className="text-slate-600 mb-8 pb-6 border-b border-slate-100">{selectedExp.description}</p>

        {!isRun ? (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Formulate Hypothesis
              </h3>
              <p className="text-blue-800 text-sm mb-4">
                Before running the simulation, what do you think the relationship is between <strong>{selectedExp.xAxisLabel}</strong> and <strong>{selectedExp.yAxisLabel}</strong>?
              </p>
              <textarea 
                value={hypothesis}
                onChange={(e) => setHypothesis(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-4 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white min-h-[120px] resize-y shadow-sm"
                placeholder="I hypothesize that as..."
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={handleRun}
                disabled={!hypothesis.trim()}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-md font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                Run Simulation
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-700">
            
            {/* Results Graph */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
              <h3 className="font-bold text-slate-800 mb-6 text-center">Simulation Results</h3>
              <div className="w-full h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                    <XAxis 
                      type="number" 
                      dataKey="x" 
                      name={selectedExp.xAxisLabel} 
                      label={{ value: selectedExp.xAxisLabel, position: 'insideBottom', offset: -10, fill: '#475569', fontSize: 14, fontWeight: 500 }} 
                      tick={{fill: '#64748b'}}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="y" 
                      name={selectedExp.yAxisLabel} 
                      label={{ value: selectedExp.yAxisLabel, angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 14, fontWeight: 500 }}
                      tick={{fill: '#64748b'}}
                    />
                    <ZAxis type="number" range={[100, 100]} />
                    <RechartsTooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Scatter name="Molecules" data={selectedExp.dataPoints} fill="#4f46e5" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Interpretation */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Interpret Results
              </h3>
              
              <div className="mb-6 p-4 bg-slate-50 rounded border border-slate-100 text-sm text-slate-600 italic">
                <strong className="text-slate-800 not-italic block mb-1">Your Hypothesis:</strong>
                "{hypothesis}"
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-800 block">Does the data support your hypothesis? What does this mean for drug discovery?</label>
                <textarea 
                  value={interpretation}
                  onChange={(e) => setInterpretation(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white min-h-[120px] resize-y shadow-sm"
                  placeholder="The graph shows that..."
                ></textarea>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};
