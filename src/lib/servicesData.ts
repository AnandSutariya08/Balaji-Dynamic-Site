import type { Service } from "@/lib/firestore/types";

export const staticServices: Service[] = [
  {
    id: "bending-services",
    title: "Bending Services",
    tagline: "Press brake bending for sheet and plate jobs",
    description:
      "Balaji Engineering Works provides bending services for mild steel, stainless steel, and industrial plate components using hydraulic and CNC press brake setups for repeatable angle control and production consistency.",
    image: "/service-bending.png",
    features: [
      "Mild Steel Plate Bending Service",
      "Industrial SS Plate Bending Service",
      "Press Brake Bending",
      "Custom Angle Bending",
      "Production and Job Work Support",
      "Fabrication-Ready Components",
    ],
    specs: [
      { label: "Max Length", value: "10000 mm" },
      { label: "Max Thickness", value: "20 mm" },
      { label: "Materials", value: "MS and SS" },
      { label: "Use Cases", value: "Industrial Parts" },
    ],
  },
  {
    id: "sheet-bending",
    title: "Sheet Bending Service",
    tagline: "Accurate forming for sheet metal components",
    description:
      "Our sheet bending service supports brackets, enclosures, frames, channels, and formed components for automotive, construction, HVAC, and general engineering applications.",
    image: "/service-bending.png",
    features: [
      "Sheet Metal Bending",
      "Laser Cut and Bend Jobs",
      "Tipper Truck Components",
      "Multi-Bend Profiles",
      "Small and Bulk Orders",
      "Drawing-Based Manufacturing",
    ],
    specs: [
      { label: "Min Thickness", value: "0.5 mm" },
      { label: "Max Thickness", value: "12 mm" },
      { label: "Batch Size", value: "Prototype to Production" },
      { label: "Lead Time", value: "Fast Quotation" },
    ],
  },
  {
    id: "steel-cutting",
    title: "Steel Cutting Services",
    tagline: "Industrial cutting for plates, sheets, and custom parts",
    description:
      "We offer steel cutting services for mild steel and stainless steel jobs through hydraulic shearing, CNC plasma cutting, and profile cutting support for fabrication and manufacturing customers.",
    image: "/service-steel-cutting.png",
    features: [
      "Stainless Steel Sheet Cutting Service",
      "Industrial Steel Plate Cutting Service",
      "Hydraulic Shearing",
      "CNC Plasma Cutting",
      "Custom Plate Cutting",
      "Fabrication Batch Support",
    ],
    specs: [
      { label: "Max Shear Length", value: "5000 mm" },
      { label: "Max Shear Thickness", value: "38 mm" },
      { label: "Processes", value: "Shear and Plasma" },
      { label: "Output", value: "Cut-to-Size Parts" },
    ],
  },
  {
    id: "plate-bending",
    title: "Plate Bending and Rolling",
    tagline: "Rolling and forming for heavy plate fabrication",
    description:
      "Balaji Engineering Works handles plate bending and rolling jobs for cylinders, curved sections, shells, and heavy fabrication components required in industrial and structural projects.",
    image: "/service-plate-bending.png",
    features: [
      "Heavy Plate Bending Services",
      "Plate Rolling Bending Services",
      "Curved Plate Components",
      "Cone and Shell Work",
      "Structural Rolling Jobs",
      "Fabrication Preparation",
    ],
    specs: [
      { label: "Rolling Width", value: "2500 mm" },
      { label: "Rolling Thickness", value: "16 mm" },
      { label: "Job Type", value: "Custom Fabrication" },
      { label: "Material", value: "MS and Steel Plate" },
    ],
  },
  {
    id: "laser-cutting",
    title: "CNC Laser Cutting Services",
    tagline: "Fiber laser cutting for precise industrial parts",
    description:
      "Our CNC fiber laser cutting setup processes mild steel and stainless steel parts for industrial production, custom blanks, fabrication jobs, and intricate profile cutting requirements.",
    image: "/service-cnc.png",
    features: [
      "Mild Steel Laser Cutting Service",
      "CNC Laser Cutting Services",
      "Fiber Laser Processing",
      "Profile and Nesting Work",
      "Complex Geometry Cutting",
      "Production Quantity Support",
    ],
    specs: [
      { label: "Bed Size", value: "8000 x 2500 mm" },
      { label: "Laser Source", value: "6 kW Fiber" },
      { label: "MS Thickness", value: "Up to 25 mm" },
      { label: "SS Thickness", value: "Up to 16 mm" },
    ],
  },
  {
    id: "base-plate",
    title: "Base Plates and Foundation Bolts",
    tagline: "Fabricated base plates for structural and industrial use",
    description:
      "We manufacture MS base plates, custom mounting plates, and foundation bolt-related fabrication work for structural steel, equipment installation, and industrial projects.",
    image: "/service-base-plates.png",
    features: [
      "MS Base Plates",
      "Foundation Bolt Work",
      "Structural Mounting Plates",
      "Custom Hole Patterns",
      "Fabrication-Ready Assemblies",
      "Project-Based Supply",
    ],
    specs: [
      { label: "Material", value: "MS Plate" },
      { label: "Use Cases", value: "Structural and Machinery" },
      { label: "Process", value: "Cut, Drill and Fabricate" },
      { label: "Supply", value: "Custom Sizes" },
    ],
  },
  {
    id: "profile-cutting",
    title: "Plate Profile Cutting Service",
    tagline: "CNC profile cutting for custom plate shapes",
    description:
      "Our plate profile cutting service supports flanges, brackets, machine parts, and structural shapes using CNC plasma and oxy-fuel systems for thick plate jobs.",
    image: "/service-profile.png",
    features: [
      "Plate Profile Cutting Service",
      "CNC Oxy-Fuel Cutting",
      "CNC Plasma Profiles",
      "Thick Plate Components",
      "Drawing-Based Shapes",
      "Structural Part Production",
    ],
    specs: [
      { label: "Table Size", value: "8000 x 2500 mm" },
      { label: "Oxy Thickness", value: "Up to 100 mm" },
      { label: "Plasma Thickness", value: "Up to 25 mm" },
      { label: "Output", value: "Custom Profiles" },
    ],
  },
  {
    id: "sheet-cutting",
    title: "Sheet Metal Cutting Service",
    tagline: "Cut-to-size sheet processing for regular production",
    description:
      "We provide sheet metal cutting service for blanks, strips, and production-ready parts used in fabrication, panel work, machinery, and industrial component manufacturing.",
    image: "/service-steel-cutting.png",
    features: [
      "Sheet Metal Cutting Service",
      "Hydraulic Shearing",
      "Cut-to-Size Sheets",
      "Production Blanks",
      "Quick Repeat Orders",
      "Material Utilization Support",
    ],
    specs: [
      { label: "Max Length", value: "5000 mm" },
      { label: "Material", value: "MS and SS Sheets" },
      { label: "Order Type", value: "Job Work and Supply" },
      { label: "Delivery", value: "Factory Dispatch" },
    ],
  },
];
