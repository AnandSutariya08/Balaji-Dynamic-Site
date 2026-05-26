import type { Service } from "@/lib/firestore/types";

export type ServiceFaq = {
  question: string;
  answer: string;
};

type ServiceSeoEntry = {
  metaTitle: string;
  metaDescription: string;
  intro: string;
  applications: string[];
  process: string[];
  keywords: string[];
  faqs: ServiceFaq[];
};

const serviceSeoMap: Record<string, ServiceSeoEntry> = {
  "cnc-plate-bending": {
    metaTitle: "CNC Plate Bending Service in Surat",
    metaDescription:
      "CNC plate bending service in Surat for mild steel and industrial plate jobs with accurate press brake forming from Balaji Engineering Works.",
    intro:
      "Balaji Engineering Works provides CNC plate bending service in Surat for industrial buyers who need repeatable angle accuracy, drawing-based bending support, and fabrication-ready output from a local manufacturing partner.",
    applications: [
      "Structural fabrication brackets and channels",
      "Machine side plates, covers, and mounting parts",
      "Frames, supports, and custom heavy bent sections",
      "Batch bending work for fabrication contractors",
    ],
    process: [
      "Drawing review and bend feasibility confirmation",
      "Material, thickness, and bend sequence planning",
      "CNC press brake setup and controlled bending",
      "Angle inspection and dispatch preparation",
    ],
    keywords: [
      "cnc plate bending service in surat",
      "press brake bending services surat",
      "mild steel plate bending service surat",
      "industrial plate bending job work gujarat",
    ],
    faqs: [
      {
        question: "Do you provide CNC plate bending service in Surat?",
        answer:
          "Yes. We provide CNC plate bending service in Surat for structural, fabrication, and industrial plate bending requirements.",
      },
      {
        question: "Can you work from CAD drawings or sample dimensions?",
        answer:
          "Yes. You can share DXF, DWG, PDF drawings, or dimension references and our team will review the job before quotation.",
      },
      {
        question: "Do you support both sample jobs and repeat production?",
        answer:
          "Yes. We support one-off fabrication jobs as well as repeat production bending depending on thickness and profile.",
      },
    ],
  },
  "sheet-metal-shearing-cutting": {
    metaTitle: "Sheet Metal Shearing Cutting Service in Surat",
    metaDescription:
      "Sheet metal shearing cutting service in Surat with hydraulic shearing capacity for cut-to-size sheets, plate blanks, and fabrication-ready material.",
    intro:
      "Balaji Engineering Works provides sheet metal shearing cutting service in Surat for buyers who need straight-line cutting, repeatable blanks, and dependable material preparation before bending, welding, or fabrication.",
    applications: [
      "Cut-to-size sheet and plate blanks",
      "Material preparation for CNC bending and fabrication",
      "Strip cutting for repeat production jobs",
      "Heavy fabrication support for industrial projects",
    ],
    process: [
      "Drawing, size, and thickness review",
      "Hydraulic shearing setup for job length and material",
      "Batch cutting with size control",
      "Inspection, stacking, and dispatch preparation",
    ],
    keywords: [
      "sheet metal shearing cutting service in surat",
      "hydraulic shearing service surat",
      "cut to size sheet metal service surat",
      "plate shearing cutting gujarat",
    ],
    faqs: [
      {
        question: "What is your shearing cutting capacity?",
        answer:
          "We provide sheet metal shearing cutting up to 32 mm thickness and up to 5 meter length depending on the material and job requirement.",
      },
      {
        question: "Is shearing suitable for fabrication-ready blanks?",
        answer:
          "Yes. Shearing is widely used for straight-line blanks, strips, and production-ready material preparation before bending, welding, or assembly.",
      },
      {
        question: "Can shearing jobs be combined with bending or fabrication?",
        answer:
          "Yes. Many customers combine shearing cutting with CNC bending, welding, and fabrication to reduce lead time and simplify coordination.",
      },
    ],
  },
  "cnc-laser-cutting": {
    metaTitle: "CNC Laser Cutting Services in Surat",
    metaDescription:
      "CNC laser cutting services in Surat for mild steel and stainless steel sheets, profile parts, production blanks, and fabrication components.",
    intro:
      "Balaji Engineering Works provides CNC laser cutting services in Surat for buyers who need clean cut quality, quick quoting, and accurate drawing-based sheet metal processing.",
    applications: [
      "Production blanks and profile parts",
      "Laser cut fabrication components",
      "Machine covers, brackets, and precision plates",
      "Custom job work for MS and SS sheet cutting",
    ],
    process: [
      "Drawing file review and nesting check",
      "Material and thickness confirmation",
      "Laser cutting and batch identification",
      "Inspection and packing for dispatch",
    ],
    keywords: [
      "cnc laser cutting services in surat",
      "laser cutting services in surat",
      "fiber laser cutting gujarat",
      "sheet laser cutting job work surat",
    ],
    faqs: [
      {
        question: "What files do you accept for CNC laser cutting?",
        answer:
          "We accept DXF, DWG, STEP, PDF, and drawing-based requirements for CNC laser cutting quotations and production review.",
      },
      {
        question: "Do you cut both mild steel and stainless steel sheets?",
        answer:
          "Yes. Our team handles MS and stainless steel cutting jobs depending on thickness and production requirement.",
      },
      {
        question: "Can laser cut parts also go for bending or fabrication?",
        answer:
          "Yes. Many jobs combine laser cutting with sheet bending or fabrication to reduce lead time and coordination.",
      },
    ],
  },
  "plate-rolling": {
    metaTitle: "Plate Rolling Service in Surat",
    metaDescription:
      "Plate rolling service in Surat for cylinders, curved sections, shells, ducts, and heavy fabrication components from Balaji Engineering Works.",
    intro:
      "Balaji Engineering Works provides plate rolling service in Surat for buyers looking for curved steel sections, shells, ducts, and heavy fabrication parts that require accurate radius control and practical manufacturing support.",
    applications: [
      "Cylinder and shell fabrication work",
      "Curved structural and industrial parts",
      "Rolling jobs for tank and duct components",
      "Project fabrication requiring formed plates",
    ],
    process: [
      "Drawing and radius review",
      "Plate thickness and width planning",
      "Rolling and forming setup",
      "Shape verification before dispatch",
    ],
    keywords: [
      "plate rolling service in surat",
      "plate rolling bending services",
      "plate bending service surat",
      "heavy plate rolling gujarat",
    ],
    faqs: [
      {
        question: "Do you handle plate rolling for custom radius jobs?",
        answer:
          "Yes. We handle custom rolling requirements based on plate thickness, width, radius, and fabrication purpose.",
      },
      {
        question: "Is plate rolling useful for heavy fabrication projects?",
        answer:
          "Yes. It is commonly used for shells, curved sections, ducts, covers, and industrial formed components.",
      },
      {
        question: "Can I send a drawing for rolling feasibility?",
        answer:
          "Yes. Share your drawing or required radius and our team can review whether the job is suitable for our rolling process.",
      },
    ],
  },
  "cnc-plasma-cutting": {
    metaTitle: "CNC Plasma Cutting Services in Surat",
    metaDescription:
      "CNC plasma cutting services in Surat for thick plate profiles, base plates, brackets, flanges, and fabrication-ready steel components.",
    intro:
      "Balaji Engineering Works provides CNC plasma cutting services in Surat for buyers who need thick plate cutting, profile-based fabrication parts, and dependable output for industrial projects.",
    applications: [
      "Base plates and mounting plates",
      "Structural brackets and support components",
      "Flanges and custom industrial profiles",
      "Heavy fabrication parts for project jobs",
    ],
    process: [
      "Drawing and profile review",
      "Material and thickness confirmation",
      "CNC plasma cutting and part marking",
      "Inspection and dispatch planning",
    ],
    keywords: [
      "cnc plasma cutting services in surat",
      "plasma profile cutting surat",
      "thick plate plasma cutting gujarat",
      "industrial plate cutting service surat",
    ],
    faqs: [
      {
        question: "Do you provide CNC plasma cutting in Surat?",
        answer:
          "Yes. We provide CNC plasma cutting for industrial buyers in Surat and nearby regions for thick plate and profile-based fabrication jobs.",
      },
      {
        question: "What kinds of parts are suitable for plasma cutting?",
        answer:
          "Plasma cutting is commonly used for base plates, flanges, brackets, structural parts, and heavy-duty profile cutting requirements.",
      },
      {
        question: "Can you work from DXF or fabrication drawings?",
        answer:
          "Yes. You can share DXF, DWG, PDF, or drawing-based requirements and our team will review the job for quotation.",
      },
    ],
  },
  assembly: {
    metaTitle: "Assembly Services in Surat for Industrial Fabrication",
    metaDescription:
      "Assembly services in Surat for welding, riveting, fit-up, and finished fabricated product integration from Balaji Engineering Works.",
    intro:
      "Balaji Engineering Works provides assembly services in Surat for buyers who need multiple fabricated parts joined into usable sub-assemblies or finished industrial products with dimensional fit-up and coordinated production support.",
    applications: [
      "Sub-assemblies from cut and bent parts",
      "Welded and riveted fabricated product build-up",
      "Machine frame and utility part integration",
      "Project fabrication ready-to-dispatch assemblies",
    ],
    process: [
      "Review part drawings and assembly sequence",
      "Fit-up and alignment of cut, bent, or rolled parts",
      "Joining through welding, riveting, or specified method",
      "Final dimensional and visual inspection before dispatch",
    ],
    keywords: [
      "assembly services in surat",
      "industrial assembly work surat",
      "fabrication assembly services gujarat",
      "sheet metal assembly job work surat",
    ],
    faqs: [
      {
        question: "Do you provide assembly services in Surat?",
        answer:
          "Yes. We provide assembly services in Surat for fabricated metal parts, welded structures, and industrial sub-assemblies.",
      },
      {
        question: "Can assembly be combined with cutting and bending?",
        answer:
          "Yes. Many jobs combine laser cutting, bending, welding, and final assembly under one manufacturing scope.",
      },
      {
        question: "Do you support project-based fabricated assemblies?",
        answer:
          "Yes. We support both custom one-off assembly jobs and repeat production assemblies depending on the requirement.",
      },
    ],
  },
  welding: {
    metaTitle: "Welding Services in Surat for Sheet Metal and Fabrication",
    metaDescription:
      "Welding services in Surat for sheet metal parts, fabricated sections, frames, supports, and industrial steel components.",
    intro:
      "Balaji Engineering Works provides welding services in Surat for buyers who need durable joints, fabrication-ready weld quality, and practical job work support for custom or repeat industrial requirements.",
    applications: [
      "Sheet metal and fabricated section joining",
      "Frames, supports, and brackets",
      "Welded machine and utility components",
      "Assembly support for industrial fabrication projects",
    ],
    process: [
      "Review joint type, part fit-up, and fabrication drawing",
      "Prepare surfaces and fixture parts for alignment",
      "Carry out welding as per fabrication requirement",
      "Inspect joint quality and prepare for next operation or dispatch",
    ],
    keywords: [
      "welding services in surat",
      "fabrication welding services surat",
      "sheet metal welding work gujarat",
      "industrial welding job work surat",
    ],
    faqs: [
      {
        question: "Do you provide welding services in Surat?",
        answer:
          "Yes. We provide welding services in Surat for sheet metal fabrication, industrial structures, and assembly jobs.",
      },
      {
        question: "Is welding available for custom fabrication jobs?",
        answer:
          "Yes. Our welding support is suitable for both one-off custom jobs and repeat fabrication work.",
      },
      {
        question: "Can welding be combined with assembly support?",
        answer:
          "Yes. Welding is often integrated with cutting, bending, and assembly as part of one project requirement.",
      },
    ],
  },
  "deep-drawing": {
    metaTitle: "Deep Drawing Service in Surat",
    metaDescription:
      "Deep drawing service in Surat for 3D formed sheet metal components, container-type parts, and repeat production requirements.",
    intro:
      "Balaji Engineering Works provides deep drawing service in Surat for buyers who need flat sheet transformed into three-dimensional formed components with repeatability and practical die-based production support.",
    applications: [
      "Container-like and deep profile components",
      "Industrial formed sheet parts",
      "Repeat production deep drawn items",
      "Press-formed utility and process components",
    ],
    process: [
      "Review drawing, depth ratio, and material suitability",
      "Confirm blank size and tooling requirement",
      "Carry out deep drawing over the die with process control",
      "Inspect formed shape and dimensional consistency",
    ],
    keywords: [
      "deep drawing service in surat",
      "sheet metal deep drawing surat",
      "deep drawn components manufacturer gujarat",
      "press formed sheet metal parts surat",
    ],
    faqs: [
      {
        question: "Do you provide deep drawing service in Surat?",
        answer:
          "Yes. We provide deep drawing service in Surat for 3D formed sheet metal components and repeat production requirements.",
      },
      {
        question: "What kind of products suit deep drawing?",
        answer:
          "Deep drawing is commonly used for container-like parts, deep profiles, and formed sheet components that require die-based shaping.",
      },
      {
        question: "Can deep drawing support repeat production?",
        answer:
          "Yes. Deep drawing is well suited for repeat and production-oriented forming jobs when the geometry is appropriate.",
      },
    ],
  },
  finishing: {
    metaTitle: "Metal Finishing Services in Surat",
    metaDescription:
      "Metal finishing services in Surat including painting, polishing, coating, and surface improvement for fabricated industrial components.",
    intro:
      "Balaji Engineering Works provides metal finishing services in Surat for buyers who need better surface appearance, corrosion protection, and product readiness after fabrication or forming operations.",
    applications: [
      "Surface-ready fabricated components",
      "Protective finishing for industrial parts",
      "Visual improvement for customer-facing metal products",
      "Post-fabrication coating and polishing jobs",
    ],
    process: [
      "Review finish requirement and component condition",
      "Prepare surfaces for the selected finishing process",
      "Coordinate finishing method such as coating, painting, or polishing",
      "Inspect finished appearance and dispatch condition",
    ],
    keywords: [
      "metal finishing services in surat",
      "industrial metal finishing surat",
      "powder coating and polishing gujarat",
      "fabricated component finishing surat",
    ],
    faqs: [
      {
        question: "Do you provide metal finishing services in Surat?",
        answer:
          "Yes. We support metal finishing services in Surat for fabricated and industrial components requiring improved surface quality or protection.",
      },
      {
        question: "What finishing types can be supported?",
        answer:
          "Depending on the job, finishing can include painting, polishing, powder coating coordination, and other protective or appearance-focused treatments.",
      },
      {
        question: "Can finishing be added after fabrication?",
        answer:
          "Yes. Finishing is commonly the last stage after cutting, bending, welding, or assembly.",
      },
    ],
  },
  stamping: {
    metaTitle: "Sheet Metal Stamping Service in Surat",
    metaDescription:
      "Sheet metal stamping service in Surat for repeat production parts, formed components, and high-volume industrial manufacturing requirements.",
    intro:
      "Balaji Engineering Works provides sheet metal stamping service in Surat for buyers searching for repeatable part production, press-based forming, and efficient output for higher-volume sheet metal requirements.",
    applications: [
      "Repeat production metal parts",
      "Automotive and appliance-type sheet components",
      "Pressed industrial items",
      "Volume-oriented manufacturing jobs",
    ],
    process: [
      "Review part drawing, volume, and tooling suitability",
      "Confirm material, blanking, and press requirement",
      "Carry out stamping with repeatability control",
      "Inspect output consistency before packing and dispatch",
    ],
    keywords: [
      "sheet metal stamping service in surat",
      "metal stamping job work surat",
      "press stamping services gujarat",
      "stamped sheet metal parts surat",
    ],
    faqs: [
      {
        question: "Do you provide sheet metal stamping service in Surat?",
        answer:
          "Yes. We support sheet metal stamping service in Surat for repeat production parts and volume-oriented manufacturing jobs.",
      },
      {
        question: "Is stamping suitable for high-volume requirements?",
        answer:
          "Yes. Stamping is commonly used where fast cycle times and repeat output matter for larger quantities.",
      },
      {
        question: "Can stamped parts go for further fabrication or finishing?",
        answer:
          "Yes. Stamped parts can be integrated into later operations such as assembly, welding, or finishing depending on the product design.",
      },
    ],
  },
  punching: {
    metaTitle: "Sheet Metal Punching Service in Surat",
    metaDescription:
      "Sheet metal punching service in Surat for holes, cutouts, mounting features, and repeat production sheet components.",
    intro:
      "Balaji Engineering Works provides sheet metal punching service in Surat for buyers looking for repeat hole patterns, cutouts, mounting features, and production-ready sheet components in Surat.",
    applications: [
      "Mounting and functional hole patterns",
      "Sheet cutouts and utility features",
      "Repeat production punched parts",
      "Industrial sheet metal component preparation",
    ],
    process: [
      "Review hole pattern, sheet layout, and production need",
      "Prepare punch tooling and part setup",
      "Carry out punching for holes and required sheet features",
      "Inspect repeatability and ready parts for next operation",
    ],
    keywords: [
      "sheet metal punching service in surat",
      "sheet punching job work surat",
      "metal hole punching services gujarat",
      "punched sheet metal parts surat",
    ],
    faqs: [
      {
        question: "Do you provide sheet metal punching service in Surat?",
        answer:
          "Yes. We provide sheet metal punching service in Surat for holes, cutouts, and repeat production sheet component requirements.",
      },
      {
        question: "Is punching suitable for mass production?",
        answer:
          "Yes. Punching is well suited for repeat jobs where the same holes or sheet features are needed across larger quantities.",
      },
      {
        question: "Can punched parts go for bending or assembly next?",
        answer:
          "Yes. Punched parts are often prepared first and then moved to bending, welding, or assembly based on the project sequence.",
      },
    ],
  },
};

export function getServiceSeoContent(service: Service): ServiceSeoEntry {
  return serviceSeoMap[service.id] ?? {
    metaTitle: `${service.title} in Surat`,
    metaDescription: `${service.title} from Balaji Engineering Works in Surat, Gujarat for fabrication and industrial job work requirements.`,
    intro: service.description,
    applications: [
      "Industrial fabrication work",
      "Project-based steel processing",
      "Custom manufacturing requirements",
      "Repeat production jobs",
    ],
    process: [
      "Requirement review",
      "Material confirmation",
      "Production planning",
      "Inspection and dispatch",
    ],
    keywords: [service.title, "Balaji Engineering Works", "Surat fabrication"],
    faqs: [
      {
        question: `Do you provide ${service.title.toLowerCase()} in Surat?`,
        answer:
          "Yes. We support Surat and Gujarat buyers with drawing-based quotations and fabrication-oriented production support.",
      },
    ],
  };
}

export function getAllServiceFaqs(): ServiceFaq[] {
  return Object.values(serviceSeoMap).map((entry) => entry.faqs[0]);
}
