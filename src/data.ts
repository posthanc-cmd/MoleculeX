import { Molecule, Mission, Experiment } from './types';

export const MISSIONS: Mission[] = [
  {
    id: "mission-01",
    title: "Discover a Better Antibacterial Candidate",
    description: "A novel bacterial strain has developed resistance to standard treatments. Your mission is to identify a new molecule that can effectively neutralize the bacteria without causing severe side effects in patients.",
    targetName: "Target X",
    targetDescription: "Target X is an essential enzyme used by the bacteria to build its cell wall. Blocking this enzyme prevents the bacteria from multiplying. However, the human body has a similar enzyme, so our drug must be selective."
  }
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: "exp-01",
    title: "LogP vs. Permeability",
    description: "Investigate how a molecule's lipophilicity (LogP) affects its ability to cross lipid cell membranes.",
    xAxisLabel: "LogP (Lipophilicity)",
    yAxisLabel: "Permeability (%)",
    dataPoints: [
      { name: "Mol 1", x: -1.0, y: 5 },
      { name: "Mol 2", x: 0.5, y: 25 },
      { name: "Mol 3", x: 1.5, y: 50 },
      { name: "Mol 4", x: 2.5, y: 80 },
      { name: "Mol 5", x: 3.5, y: 95 },
      { name: "Mol 6", x: 4.5, y: 90 },
      { name: "Mol 7", x: 5.5, y: 60 },
      { name: "Mol 8", x: 6.5, y: 20 },
    ]
  },
  {
    id: "exp-02",
    title: "Potency vs. Toxicity",
    description: "Explore the common trade-off between how strongly a drug binds to its target and its likelihood of causing off-target toxicity.",
    xAxisLabel: "Potency (Binding Affinity)",
    yAxisLabel: "Toxicity Index",
    dataPoints: [
      { name: "Mol 1", x: 10, y: 5 },
      { name: "Mol 2", x: 30, y: 10 },
      { name: "Mol 3", x: 50, y: 20 },
      { name: "Mol 4", x: 65, y: 35 },
      { name: "Mol 5", x: 80, y: 55 },
      { name: "Mol 6", x: 90, y: 80 },
      { name: "Mol 7", x: 95, y: 95 },
    ]
  },
  {
    id: "exp-03",
    title: "Solubility vs. Absorption",
    description: "Test how a compound's aqueous solubility limits its overall absorption into the bloodstream.",
    xAxisLabel: "Solubility (µg/mL)",
    yAxisLabel: "Absorption (%)",
    dataPoints: [
      { name: "Mol 1", x: 5, y: 10 },
      { name: "Mol 2", x: 20, y: 35 },
      { name: "Mol 3", x: 50, y: 65 },
      { name: "Mol 4", x: 100, y: 85 },
      { name: "Mol 5", x: 200, y: 95 },
      { name: "Mol 6", x: 500, y: 98 },
    ]
  }
];

// Fictional compounds with varying profiles to teach the balancing act of drug discovery
export const MOLECULE_LIBRARY: Molecule[] = [
  {
    id: "cmp-01",
    name: "Compound A",
    potency: 95,
    selectivity: 40,
    toxicity: 85, // Fails safety gate
    solubility: 60,
    permeability: 75,
    metabolicStability: 50,
    bioavailability: 45,
    molecularWeight: 410.5,
    logP: 4.2,
    hbd: 1,
    hba: 4
  },
  {
    id: "cmp-02",
    name: "Compound B",
    potency: 75,
    selectivity: 80,
    toxicity: 30, // Good safety
    solubility: 20, // Poor solubility
    permeability: 85,
    metabolicStability: 60,
    bioavailability: 35,
    molecularWeight: 385.2,
    logP: 4.8,
    hbd: 0,
    hba: 3
  },
  {
    id: "cmp-03",
    name: "Compound C",
    potency: 88,
    selectivity: 75,
    toxicity: 40,
    solubility: 80,
    permeability: 30, // Poor permeability
    metabolicStability: 40,
    bioavailability: 25,
    molecularWeight: 520.4, // High MW
    logP: 1.5, // Low LogP
    hbd: 4,
    hba: 8
  },
  {
    id: "cmp-04",
    name: "Compound D",
    potency: 92,
    selectivity: 85,
    toxicity: 35,
    solubility: 70,
    permeability: 80,
    metabolicStability: 15, // Rapidly metabolized
    bioavailability: 10,
    molecularWeight: 340.8,
    logP: 2.8,
    hbd: 2,
    hba: 5
  },
  {
    id: "cmp-05",
    name: "Compound E",
    potency: 40, // Insufficient potency
    selectivity: 95,
    toxicity: 10,
    solubility: 90,
    permeability: 90,
    metabolicStability: 85,
    bioavailability: 80,
    molecularWeight: 280.3,
    logP: 2.1,
    hbd: 1,
    hba: 2
  },
  {
    id: "cmp-06",
    name: "Compound F",
    potency: 85,
    selectivity: 82,
    toxicity: 45,
    solubility: 65,
    permeability: 70,
    metabolicStability: 75,
    bioavailability: 60,
    molecularWeight: 430.6,
    logP: 3.4,
    hbd: 2,
    hba: 6
  }
];
