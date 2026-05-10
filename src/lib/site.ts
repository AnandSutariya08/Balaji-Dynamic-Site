export const contactFaqs = [
  {
    question: "How fast can you deliver a quote?",
    answer:
      "We aim to share quotes within 4 to 8 business hours for standard jobs. Send your DXF, DWG, STEP, IGES, or PDF drawings with material details for the fastest response.",
  },
  {
    question: "What file formats do you accept?",
    answer:
      "We accept DXF, DWG, STEP, IGES, PDF drawings, and hand-marked sketches. Our team reviews every submission for manufacturability before production.",
  },
  {
    question: "What is your minimum order quantity?",
    answer:
      "We support everything from one-off prototypes to repeat production batches, depending on the process, material, and delivery schedule.",
  },
  {
    question: "Do you offer on-site pickup?",
    answer:
      "Yes. You can arrange pickup from our Kamrej, Navagam facility in Surat, and we can also coordinate dispatch across Gujarat and the rest of India.",
  },
] as const;

export const siteConfig = {
  name: "Balaji Engineering Works",
  legalName: "Balaji Engineering Works",
  shortName: "Balaji Engineering",
  alternateName: "Sheet Metal Bending Works",
  url:
    process.env.NEXT_PUBLIC_SITE_URL || "https://sheetmetalbendingworks.com",
  ogImage: "/opengraph.jpg",
  description:
    "SheetMetalBendingWorks.com is the digital home of Balaji Engineering Works, a Surat-based manufacturer and service provider for sheet metal bending, CNC laser cutting, plate rolling, profile cutting, shearing, punching, and heavy fabrication.",
  phone: "+91-7942957640",
  phoneDisplay: "+91 79429 57640",
  email: "info@balajiengineering.in",
  foundingDate: "2001",
  priceRange: "$$",
  gstNumber: "24BCUPS8314Q1ZK",
  businessType: "Manufacturer and Service Provider",
  locale: "en_IN",
  language: "en-IN",
  indiaMartProfile: "https://www.balajiengineeringworks.in/",
  serviceAreas: [
    "Surat",
    "Gujarat",
    "Maharashtra",
    "Rajasthan",
    "Madhya Pradesh",
    "India",
  ],
  industries: [
    "Sheet Metal Fabrication",
    "Sheet Metal Forming",
    "Structural Steel Fabrication",
    "CNC Laser Cutting",
    "CNC Plasma Cutting",
    "Steel Shearing",
    "Steel Plate Bending",
    "Press Brake Bending",
    "Plate Rolling",
    "Profile Cutting",
    "Steel Punching",
    "Heavy Fabrication",
    "Industrial Manufacturing",
  ],
  keywords: [
    "Balaji Engineering Works",
    "Balaji Engineering Works Surat",
    "sheet metal fabrication Surat",
    "sheet metal bending Surat",
    "sheet bending service Surat",
    "CNC laser cutting Surat",
    "steel cutting services Surat",
    "plate bending services Surat",
    "plate rolling bending services",
    "plate profile cutting service Surat",
    "sheet metal cutting service Surat",
    "heavy fabrication Surat",
    "manufacturer and service provider Surat",
    "steel fabrication Gujarat",
    "mild steel plate bending service",
    "industrial steel plate cutting service",
    "stainless steel sheet cutting service",
    "CNC plasma cutting services",
    "MS base plates manufacturer",
    "foundation bolt manufacturer Surat",
    "Balaji Engineering Works",
    "custom steel fabrication",
    "industrial metal cutting",
    "laser cutting Gujarat",
    "heavy fabrication company India",
  ],
  address: {
    streetAddress:
      "Plot No. 11, 12, Soham Industrial Estate, NH 8, Kamrej, Opposite Hero Showroom, Navagam",
    locality: "Surat",
    region: "Gujarat",
    postalCode: "394185",
    country: "IN",
  },
  mapUrl:
    "https://maps.google.com/?q=Balaji+Engineering+Works+Plot+No.+11+12+Soham+Industrial+Estate+NH+8+Kamrej+Navagam+Surat+394185",
} as const;
