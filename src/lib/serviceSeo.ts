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
  "bending-services": {
    metaTitle: "Mild Steel Plate Bending Service in Surat",
    metaDescription:
      "Get mild steel and stainless steel plate bending service in Surat from Balaji Engineering Works for fabrication, structural, and industrial component jobs.",
    intro:
      "Our bending services are designed for buyers looking for repeatable angle accuracy, practical job work support, and dependable delivery for fabrication-ready steel parts.",
    applications: [
      "Structural fabrication brackets and channels",
      "Industrial machine side plates and covers",
      "Frames, supports, and custom metal sections",
      "Batch bending work for fabrication contractors",
    ],
    process: [
      "Drawing review and bend feasibility check",
      "Material and thickness confirmation",
      "Tooling and press brake setup",
      "Inspection before dispatch",
    ],
    keywords: [
      "mild steel plate bending service surat",
      "stainless steel plate bending service surat",
      "press brake bending surat",
      "plate bending job work gujarat",
    ],
    faqs: [
      {
        question: "Do you handle job work for mild steel plate bending in Surat?",
        answer:
          "Yes. We support mild steel plate bending job work for fabrication companies, industrial buyers, and project contractors in Surat and nearby regions.",
      },
      {
        question: "Can you work from CAD drawings or sample dimensions?",
        answer:
          "Yes. You can share DXF, DWG, PDF drawings, or dimension references and our team will review the job before quotation.",
      },
      {
        question: "Do you accept small quantities as well as production batches?",
        answer:
          "Yes. We support both sample quantities and repeat production requirements depending on the material and bend profile.",
      },
    ],
  },
  "sheet-bending": {
    metaTitle: "Sheet Bending Service in Surat for MS and SS Parts",
    metaDescription:
      "Professional sheet bending service in Surat for MS and stainless steel parts, enclosures, brackets, profiles, and custom fabricated components.",
    intro:
      "This page targets buyers who need sheet metal bending service with fast quotation, practical manufacturability review, and reliable output for custom and repeat jobs.",
    applications: [
      "Electrical and control panel parts",
      "HVAC brackets and formed channels",
      "Automotive and transport body components",
      "Custom fabrication parts from laser cut blanks",
    ],
    process: [
      "Component drawing verification",
      "Bend sequence planning",
      "Sheet forming with press brake support",
      "Dimensional check and packing",
    ],
    keywords: [
      "sheet bending service surat",
      "sheet metal bending service surat",
      "ms sheet bending surat",
      "stainless steel sheet bending gujarat",
    ],
    faqs: [
      {
        question: "What materials do you handle for sheet bending service?",
        answer:
          "We commonly handle mild steel and stainless steel sheet jobs based on the drawing, thickness, and forming requirement.",
      },
      {
        question: "Can sheet bending be combined with laser cutting?",
        answer:
          "Yes. Many buyers send laser cut blanks and combine cutting with bending for faster project completion.",
      },
      {
        question: "Is this suitable for custom fabricated parts?",
        answer:
          "Yes. We support custom profiles, brackets, channels, and formed parts for project-based industrial requirements.",
      },
    ],
  },
  "steel-cutting": {
    metaTitle: "Steel Cutting Services in Surat for Plate and Sheet Jobs",
    metaDescription:
      "Balaji Engineering Works offers steel cutting services in Surat for mild steel plate, stainless steel sheet, hydraulic shearing, and CNC plasma cutting work.",
    intro:
      "Our steel cutting service is positioned for buyers searching for fast plate cutting, sheet cutting, and fabrication support from a local manufacturing partner in Surat.",
    applications: [
      "Plate blanks for fabrication shops",
      "Structural parts and machine plates",
      "Stainless steel sheet cutting jobs",
      "Project-based industrial steel processing",
    ],
    process: [
      "Material and size confirmation",
      "Process selection between shearing and profile cutting",
      "Cutting and identification by job batch",
      "Inspection and dispatch planning",
    ],
    keywords: [
      "steel cutting services surat",
      "industrial steel plate cutting service surat",
      "stainless steel sheet cutting service surat",
      "hydraulic shearing service gujarat",
    ],
    faqs: [
      {
        question: "Do you provide both sheet cutting and plate cutting?",
        answer:
          "Yes. We handle both cut-to-size sheet jobs and thicker industrial plate cutting depending on the job requirement.",
      },
      {
        question: "What is the benefit of local steel cutting service in Surat?",
        answer:
          "A local vendor reduces coordination time, simplifies pickup and transport, and helps buyers move fabrication jobs faster.",
      },
      {
        question: "Can you support repeat industrial cutting orders?",
        answer:
          "Yes. We support one-time jobs as well as recurring production schedules for fabricators and OEM buyers.",
      },
    ],
  },
  "plate-bending": {
    metaTitle: "Plate Rolling and Plate Bending Service in Surat",
    metaDescription:
      "Plate rolling and heavy plate bending service in Surat for cylinders, curved sections, shells, and fabrication-ready industrial components.",
    intro:
      "This service page is built for buyers looking for plate rolling and bending support for curved steel sections, shells, and heavy fabrication parts.",
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
      "plate rolling service surat",
      "plate bending service surat",
      "heavy plate bending services gujarat",
      "plate rolling bending services india",
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
  "laser-cutting": {
    metaTitle: "CNC Laser Cutting Services in Surat for MS and SS Sheets",
    metaDescription:
      "CNC laser cutting services in Surat for mild steel and stainless steel sheets, custom profiles, production blanks, and fabrication parts.",
    intro:
      "Our CNC laser cutting page targets high-intent searches from buyers who need clean profile cutting, quick repeat work, and industrial sheet processing support in Surat.",
    applications: [
      "Production blanks and profile parts",
      "Laser cut fabrication components",
      "Machine covers, brackets, and plates",
      "Custom job work for MS and SS sheet cutting",
    ],
    process: [
      "Drawing file review and nesting check",
      "Material and thickness confirmation",
      "Laser cutting and batch identification",
      "Inspection and packing for dispatch",
    ],
    keywords: [
      "cnc laser cutting services surat",
      "mild steel laser cutting service surat",
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
  "base-plate": {
    metaTitle: "MS Base Plates and Foundation Bolt Work in Surat",
    metaDescription:
      "MS base plates, mounting plates, and foundation bolt fabrication work in Surat for structural, machinery, and industrial installation requirements.",
    intro:
      "This service page is optimized for buyers searching for base plate manufacturing, custom plate drilling, and project fabrication support in Surat.",
    applications: [
      "Column and structural base plates",
      "Machinery mounting plates",
      "Custom drilled industrial plates",
      "Project-specific fabricated supports",
    ],
    process: [
      "Plate size and hole layout review",
      "Cutting and drilling setup",
      "Fabrication as per project need",
      "Final check and job dispatch",
    ],
    keywords: [
      "ms base plates manufacturer surat",
      "base plate fabrication surat",
      "foundation bolt work surat",
      "structural base plate supplier gujarat",
    ],
    faqs: [
      {
        question: "Do you manufacture custom MS base plates in Surat?",
        answer:
          "Yes. We provide custom MS base plates based on project size, hole pattern, material, and fabrication requirement.",
      },
      {
        question: "Are these plates suitable for structural and machinery use?",
        answer:
          "Yes. Base plates are commonly used for structural supports, equipment mounting, and industrial installation work.",
      },
      {
        question: "Can you handle project quantities for base plate supply?",
        answer:
          "Yes. We support both custom one-off fabrication and larger project-oriented quantity requirements.",
      },
    ],
  },
  "profile-cutting": {
    metaTitle: "Plate Profile Cutting Service in Surat",
    metaDescription:
      "Plate profile cutting service in Surat using CNC plasma and oxy-fuel cutting for thick plate components, flanges, brackets, and custom industrial shapes.",
    intro:
      "Our profile cutting page is designed for industrial buyers searching for thick plate shape cutting, drawing-based custom parts, and fabrication support in Gujarat.",
    applications: [
      "Flanges, brackets, and machine plates",
      "Thick plate structural shapes",
      "Project-specific profile cut components",
      "Fabrication-ready industrial steel parts",
    ],
    process: [
      "Profile drawing review",
      "Process selection between plasma and oxy-fuel",
      "Cutting and part identification",
      "Edge check and dispatch support",
    ],
    keywords: [
      "plate profile cutting service surat",
      "cnc plasma profile cutting surat",
      "oxy fuel cutting service gujarat",
      "thick plate cutting surat",
    ],
    faqs: [
      {
        question: "What kinds of parts are made through profile cutting?",
        answer:
          "Profile cutting is commonly used for flanges, brackets, support plates, machine parts, and custom structural shapes.",
      },
      {
        question: "Do you handle thick plate profile cutting?",
        answer:
          "Yes. We support thick plate jobs through CNC plasma and oxy-fuel processing based on material and design.",
      },
      {
        question: "Can you work from sample drawings or dimensions?",
        answer:
          "Yes. Share the drawing, CAD file, or dimensional reference and we can review the profile cutting requirement.",
      },
    ],
  },
  "sheet-cutting": {
    metaTitle: "Sheet Metal Cutting Service in Surat",
    metaDescription:
      "Sheet metal cutting service in Surat for cut-to-size sheets, production blanks, strip cutting, and fabrication support for industrial buyers.",
    intro:
      "This page focuses on recurring buyer searches for sheet metal cutting service, production-ready blanks, and quick material processing support in Surat.",
    applications: [
      "Cut-to-size industrial sheet supply",
      "Blank preparation for fabrication",
      "Strip cutting and repeat production jobs",
      "Material preparation for downstream bending work",
    ],
    process: [
      "Sheet size and thickness review",
      "Cut planning for material use efficiency",
      "Hydraulic shearing and batch control",
      "Packing and dispatch",
    ],
    keywords: [
      "sheet metal cutting service surat",
      "cut to size sheet service surat",
      "hydraulic shearing sheet cutting gujarat",
      "industrial sheet cutting job work",
    ],
    faqs: [
      {
        question: "Do you provide cut-to-size sheet metal in Surat?",
        answer:
          "Yes. We process sheets to customer size for fabrication, machine shops, and general industrial use.",
      },
      {
        question: "Can sheet cutting jobs be repeated on a regular basis?",
        answer:
          "Yes. We support repeat production orders for buyers who need the same sizes and quantities on a scheduled basis.",
      },
      {
        question: "Can sheet cutting be combined with bending work?",
        answer:
          "Yes. Buyers often combine sheet cutting and bending to simplify project execution and reduce vendor coordination.",
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

