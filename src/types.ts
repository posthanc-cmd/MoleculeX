export interface Molecule {
  id: string;
  name: string;
  potency: number; // 0-100 (higher is better)
  selectivity: number; // 0-100
  toxicity: number; // 0-100 (lower is better, >=70 fails safety gate)
  solubility: number; // 0-100
  permeability: number; // 0-100
  metabolicStability: number; // 0-100
  bioavailability: number; // 0-100
  molecularWeight: number; // e.g., 300-600
  logP: number; // e.g., 1-5
  hbd: number; // H-bond donors
  hba: number; // H-bond acceptors
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  targetName: string;
  targetDescription: string;
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  xAxisLabel: string;
  yAxisLabel: string;
  dataPoints: { x: number; y: number; name: string }[];
}
