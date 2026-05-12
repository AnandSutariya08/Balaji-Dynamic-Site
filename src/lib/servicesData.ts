import type { Service } from "@/lib/firestore/types";

export const staticServices: Service[] = [
  {
    id: "cnc-plate-bending",
    title: "CNC Plate Bending",
    tagline: "CNC press brake bending for heavy-duty plate applications",
    description:
      "CNC plate bending uses press brakes to bend metal sheets into specific angles. CNC-controlled bending ensures accurate angles and uniform results, suitable for large-scale and heavy-duty industrial applications.",
    image: "/service-bending.png",
    features: [
      "Press brake based bending process",
      "Accurate angle control with CNC programming",
      "Uniform bends across repeat batches",
      "Supports large and heavy industrial jobs",
      "Suitable for fabrication and structural applications",
      "Consistent output for production work",
    ],
    specs: [
      { label: "Capacity", value: "Up to 10 m length at 12 mm thickness" },
      { label: "Capacity", value: "Up to 5 m length at 20 mm thickness" },
      { label: "Control", value: "CNC press brake" },
      { label: "Use Cases", value: "Large-scale heavy-duty industrial applications" },
    ],
  },
  {
    id: "cnc-laser-cutting",
    title: "CNC Laser Cutting",
    tagline: "High-precision CNC fiber laser cutting for industrial parts",
    description:
      "CNC fiber laser cutting with high precision, clean edges, minimal waste, and fast turnaround. Suitable for both standard and oversized sheets across multiple industries.",
    image: "/service-cnc.png",
    features: [
      "High-precision CNC fiber laser cutting",
      "Clean cut quality and minimal material waste",
      "Fast turnaround for production jobs",
      "Large format sheet processing",
      "Suitable for complex and repeat profiles",
      "Supports broad industrial applications",
    ],
    specs: [
      { label: "MS Cutting Capacity", value: "Up to 25 mm" },
      { label: "SS Cutting Capacity", value: "Up to 16 mm" },
      { label: "Bed Size", value: "8000 mm x 2500 mm" },
      { label: "Industries", value: "Construction, automotive, aerospace, heavy machinery, architecture" },
    ],
  },
  {
    id: "plate-rolling",
    title: "Plate Rolling",
    tagline: "Reliable rolling for curved industrial plate components",
    description:
      "Reliable plate rolling service that ensures smooth and accurate rolling for industrial applications and formed metal components.",
    image: "/service-rolling.png",
    features: [
      "Smooth and accurate rolling process",
      "Consistent curvature control",
      "Supports custom rolling requirements",
      "Useful for cylindrical and curved components",
      "Industrial job-work readiness",
      "Reliable output for fabrication lines",
    ],
    specs: [
      { label: "Capacity", value: "Up to 2.5 m length at 16 mm thickness" },
      { label: "Focus", value: "Industrial applications" },
      { label: "Output", value: "Rolled curved plate parts" },
      { label: "Process", value: "Plate rolling" },
    ],
  },
  {
    id: "assembly",
    title: "Assembly",
    tagline: "Integration of formed parts into finished products",
    description:
      "Assembly combines parts produced through different forming methods into finished products, including welding, riveting, and related joining techniques.",
    image: "/service-base-plates.png",
    features: [
      "Part integration from multiple processes",
      "Welding and riveting based assembly",
      "Sub-assembly and final assembly support",
      "Dimensional alignment and fit-up",
      "Fabrication workflow compatibility",
      "Finished product readiness",
    ],
    specs: [
      { label: "Process Scope", value: "Welding, riveting, and related assembly methods" },
      { label: "Input", value: "Parts from multiple forming operations" },
      { label: "Output", value: "Finished assemblies" },
      { label: "Use Cases", value: "Industrial fabricated products" },
    ],
  },
  {
    id: "welding",
    title: "Welding",
    tagline: "Sheet metal and fabrication welding for strong joints",
    description:
      "Welding joins metal parts using heat, pressure, or both, and is widely used in sheet metal fabrication to join sections together.",
    image: "/service-welding-unique.png",
    features: [
      "Heat and pressure joining methods",
      "Section joining for sheet metal fabrication",
      "Strong and durable welded joints",
      "Suitable for custom and production jobs",
      "Fabrication-ready weld quality",
      "Supports downstream assembly operations",
    ],
    specs: [
      { label: "Method", value: "Heat, pressure, or combined welding techniques" },
      { label: "Application", value: "Sheet metal fabrication and section joining" },
      { label: "Output", value: "Joined metal structures and components" },
      { label: "Fit", value: "Custom and industrial fabrication jobs" },
    ],
  },
  {
    id: "deep-drawing",
    title: "Deep Drawing",
    tagline: "Sheet metal forming into 3D shapes using die-based stretching",
    description:
      "Deep drawing forms flat sheet metal into 3D shapes by stretching over a die, commonly used for cans, pots, containers, and similar products.",
    image: "/service-steel-deep-drawing.jpg",
    features: [
      "Die-based sheet metal stretching",
      "3D part formation from flat blanks",
      "Suitable for container-like geometries",
      "Repeatable forming process",
      "Mass-manufacturing compatibility",
      "Good for deep profile components",
    ],
    specs: [
      { label: "Process", value: "Deep drawing over die" },
      { label: "Input", value: "Flat sheet metal" },
      { label: "Output", value: "3D formed components" },
      { label: "Common Products", value: "Cans, pots, containers" },
    ],
  },
  {
    id: "finishing",
    title: "Finishing",
    tagline: "Post-processing for appearance, durability, and protection",
    description:
      "Finishing includes powder coating, painting, anodizing, and polishing to improve product appearance and long-term durability.",
    image: "/service-finishing.jpg",
    features: [
      "Powder coating options",
      "Painting and protective treatments",
      "Anodizing support",
      "Polishing for improved surface quality",
      "Corrosion resistance enhancement",
      "Aesthetic and functional finishing",
    ],
    specs: [
      { label: "Processes", value: "Powder coating, painting, anodizing, polishing" },
      { label: "Purpose", value: "Appearance and durability improvement" },
      { label: "Output", value: "Finished and protected components" },
      { label: "Use Cases", value: "Industrial and fabricated metal products" },
    ],
  },
  {
    id: "stamping",
    title: "Stamping",
    tagline: "High-speed sheet metal part production",
    description:
      "Stamping is a high-speed manufacturing process for creating parts from metal sheets and is commonly used for automotive body panels and appliance components.",
    image: "/service-fabrication.png",
    features: [
      "High-speed sheet metal part production",
      "Repeatable shape creation",
      "Suitable for mass manufacturing",
      "Efficient for large-volume runs",
      "Automotive panel compatibility",
      "Appliance component manufacturing support",
    ],
    specs: [
      { label: "Process", value: "Sheet metal stamping" },
      { label: "Production Type", value: "High-speed and high-volume" },
      { label: "Common Uses", value: "Automotive panels and appliance parts" },
      { label: "Output", value: "Stamped production components" },
    ],
  },
  {
    id: "punching",
    title: "Punching",
    tagline: "Hole and shape creation using punch press machines",
    description:
      "Punching creates holes or shapes in sheet metal using punch press machines and is well suited for mass production environments.",
    image: "/service-profile.png",
    features: [
      "Hole and cutout creation in sheet metal",
      "Punch press based operation",
      "High repeatability for production runs",
      "Fast cycle times for bulk orders",
      "Supports functional and mounting features",
      "Mass production suitability",
    ],
    specs: [
      { label: "Process", value: "Punch press machining" },
      { label: "Output", value: "Holes and shaped sheet features" },
      { label: "Production Fit", value: "Mass production" },
      { label: "Application", value: "Industrial sheet metal parts" },
    ],
  },
];
