export const contactFaqs = [
  {
    question: "How fast can you deliver a quote?",
    answer:
      "We aim to provide quotes within 4 to 8 business hours for standard jobs. Send us your DXF or DWG files and material specifications for the fastest response.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept DXF, DWG, STEP, IGES, PDF drawings, and sketched dimensions. Our engineers review every submission for manufacturability.",
  },
  {
    question: "What is your minimum order quantity?",
    answer:
      "We accept orders from 1 piece to full production runs. We support prototypes, short runs, and large production batches.",
  },
  {
    question: "Do you offer on-site pickup?",
    answer:
      "Yes. You can arrange collection from our Navagam facility, and we can also coordinate delivery across Gujarat and the rest of India.",
  },
] as const;

export const siteConfig = {
  name: "Balaji Engineering Works",
  legalName: "Balaji Engineering Works",
  shortName: "Balaji Engineering",
  alternateName: "Sheet Metal Bending Works",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sheetmetalbendingworks.com",
  ogImage: "/opengraph.jpg",
  description:
    "Balaji Engineering Works provides CNC laser cutting, sheet metal bending, plate rolling, profile cutting, and heavy steel fabrication services in Surat, Gujarat.",
  phone: "+91-7942957640",
  phoneDisplay: "+91 79429 57640",
  email: "info@balajiengineering.in",
  foundingDate: "2001",
  priceRange: "$$",
  gstNumber: "24BCUPS8314Q1ZK",
  businessType: "Manufacturer & Service Provider",
  locale: "en_IN",
  language: "en-IN",
  serviceAreas: ["Surat", "Gujarat", "Maharashtra", "Rajasthan", "India"],
  industries: [
    "Sheet Metal Fabrication",
    "Structural Steel Fabrication",
    "CNC Laser Cutting",
    "Steel Plate Bending",
    "Plate Rolling",
    "Profile Cutting",
    "Industrial Manufacturing",
  ],
  keywords: [
    "sheet metal bending works",
    "sheet metal bending Surat",
    "sheet metal fabrication Surat",
    "CNC laser cutting Surat",
    "steel fabrication Gujarat",
    "plate bending services",
    "plate rolling services",
    "profile cutting services",
    "structural steel fabrication",
    "metal fabrication company India",
    "Balaji Engineering Works",
    "custom steel fabrication",
    "industrial metal cutting",
    "laser cutting Gujarat",
    "heavy fabrication company",
  ],
  address: {
    streetAddress: "Navagam",
    locality: "Surat",
    region: "Gujarat",
    postalCode: "395009",
    country: "IN",
  },
  mapUrl: "https://maps.google.com/?q=Navagam+Surat+Gujarat",
} as const;
