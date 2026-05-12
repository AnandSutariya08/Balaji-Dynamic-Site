export type Sector = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export const sectorsData: Sector[] = [
  {
    id: "automotive",
    name: "Automotive Industry",
    description: "Chassis parts, panels, brackets.",
    icon: "car",
  },
  {
    id: "aviation",
    name: "Aviation",
    description: "Precision metal parts and airport ground force equipment.",
    icon: "plane",
  },
  {
    id: "construction-architecture",
    name: "Construction and Architecture",
    description: "Metal roofing, structural supports, facade components.",
    icon: "building2",
  },
  {
    id: "energy-power",
    name: "Energy and Power",
    description: "Components for wind turbines, solar panels, and power plants.",
    icon: "zap",
  },
  {
    id: "general-manufacturing",
    name: "General Manufacturing",
    description: "Custom sheet metal parts for machinery.",
    icon: "factory",
  },
  {
    id: "agriculture-heavy-machinery",
    name: "Agriculture and Heavy Machinery",
    description: "Parts for tractors and agricultural equipment.",
    icon: "cog",
  },
  {
    id: "crushing-mining",
    name: "Crushing and Mining",
    description: "Conveyor systems, machine structures, and components.",
    icon: "hammer",
  },
  {
    id: "defense-military",
    name: "Defense and Military",
    description: "Components for tanks, aircraft, naval vessels, and protective structures.",
    icon: "shield",
  },
  {
    id: "interior-exterior-design",
    name: "Interior and Exterior Design",
    description: "CNC metal art, decorative panels, elevation facades.",
    icon: "palette",
  },
  {
    id: "marine-industry",
    name: "Marine Industry",
    description: "Shipbuilding components including hulls and interiors.",
    icon: "anchor",
  },
  {
    id: "railway-transportation",
    name: "Railway and Transportation",
    description: "Train carriage and metro system sheet metal parts.",
    icon: "train",
  },
];
