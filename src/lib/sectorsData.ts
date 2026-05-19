export type SectorFaq = {
  question: string;
  answer: string;
};

export type Sector = {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  headline: string;
  body: string[];
  services: string[];
  applications: string[];
  whyUs: string[];
  faqs: SectorFaq[];
};

export const sectorsData: Sector[] = [
  {
    id: "automotive",
    name: "Automotive Industry",
    description: "Chassis parts, panels, brackets, and structural assemblies for passenger vehicles, commercial trucks, and two-wheelers.",
    icon: "car",
    image: "/sector-automotive.png",
    metaTitle: "Sheet Metal Fabrication for Automotive Industry | Balaji Engineering Works",
    metaDescription: "Precision sheet metal fabrication for the automotive sector — chassis parts, body panels, brackets, guards, and structural assemblies. Serving OEMs and Tier-1 suppliers across India from Surat, Gujarat.",
    keywords: [
      "automotive sheet metal fabrication India",
      "chassis parts manufacturer Surat",
      "car body panel fabrication",
      "automotive bracket manufacturer Gujarat",
      "sheet metal auto parts OEM supplier",
      "vehicle underbody parts fabrication",
    ],
    headline: "Precision Sheet Metal Parts for Automotive OEMs and Tier-1 Suppliers",
    body: [
      "Balaji Engineering Works delivers high-accuracy sheet metal fabrication for the automotive industry, supporting passenger vehicle, commercial truck, and two-wheeler manufacturers across India. From early prototyping to high-volume production runs, we produce components that meet the strict dimensional and finish tolerances demanded by automotive quality standards.",
      "Our capabilities span CNC laser cutting, press braking, deep drawing, MIG/TIG welding, and surface treatment — enabling us to manufacture everything from underbody chassis brackets to outer body panels in a single facility. We work with CRCA, HRCA, galvanized, and stainless steel grades commonly specified by automotive engineers.",
      "With over 25 years of fabrication experience and a facility in Kamrej, Surat, we are well-positioned to serve automotive OEMs and ancillary suppliers requiring dependable quality, consistent lead times, and transparent communication throughout every order.",
    ],
    services: [
      "CNC laser cutting of body panel blanks",
      "Press brake forming of chassis brackets and mounts",
      "MIG/TIG welding of sub-assemblies and weldments",
      "Deep drawing of enclosure and housing parts",
      "Surface finishing — powder coating, zinc plating",
      "Prototype-to-production scale-up",
    ],
    applications: [
      "Chassis and sub-frame brackets",
      "Door hinges and reinforcement panels",
      "Underbody guards and skid plates",
      "Engine bay mounting brackets",
      "Fuel tank guards and covers",
      "Commercial vehicle cargo floor sections",
    ],
    whyUs: [
      "25+ years serving automotive and ancillary manufacturers across Gujarat and Maharashtra",
      "In-house laser cutting, press braking, welding, and surface treatment under one roof",
      "Prototype runs accepted — no minimum order quantity for development parts",
    ],
    faqs: [
      {
        question: "What automotive sheet metal parts can Balaji Engineering Works fabricate?",
        answer: "We fabricate chassis brackets, underbody guards, body panels, door reinforcements, engine bay mounts, fuel tank guards, and commercial vehicle floor sections. We work from customer-supplied DXF, DWG, STEP, or PDF drawings and scale from prototype to production batch.",
      },
      {
        question: "What materials do you use for automotive fabrication?",
        answer: "We work with CRCA (Cold Rolled Close Annealed), HRCA (Hot Rolled Close Annealed), galvanized steel, and SS 304/316 grades commonly specified for automotive applications. Material selection is guided by the component's structural, corrosion, and weight requirements.",
      },
      {
        question: "Do you supply to automotive OEMs and Tier-1 suppliers?",
        answer: "Yes. We supply fabricated sheet metal components to automotive OEMs and Tier-1 ancillary suppliers across Gujarat and Maharashtra, with consistent quality and reliable lead times for both prototype orders and repeat production runs.",
      },
      {
        question: "What surface finishes are available for automotive parts?",
        answer: "We offer powder coating, zinc plating coordination, epoxy primer coating, and raw steel finishes. Specific finish specifications from your engineering or quality team can be accommodated on request.",
      },
      {
        question: "What is the typical lead time for automotive sheet metal components?",
        answer: "Prototype parts typically ship within 5–10 working days after drawing approval. Production batches are scheduled based on volume and complexity — we share a committed delivery schedule before production begins.",
      },
    ],
  },
  {
    id: "aviation",
    name: "Aviation",
    description: "Precision metal parts, airside ground support equipment, hangar structures, and airport infrastructure components.",
    icon: "plane",
    image: "/sector-aviation.png",
    metaTitle: "Sheet Metal Fabrication for Aviation Sector | Balaji Engineering Works",
    metaDescription: "High-tolerance sheet metal and structural fabrication for aviation — ground support equipment, MRO parts, hangar structures, and airside infrastructure. Made in Surat, Gujarat.",
    keywords: [
      "aviation sheet metal fabrication India",
      "aircraft ground support equipment fabrication",
      "hangar structural steel Surat",
      "airport infrastructure metal parts",
      "MRO sheet metal components India",
      "precision aviation parts manufacturer Gujarat",
    ],
    headline: "High-Tolerance Fabrication for Aviation Ground Support and Infrastructure",
    body: [
      "The aviation sector demands the highest standards of dimensional precision, material traceability, and surface finish. Balaji Engineering Works supports aviation customers with CNC-controlled sheet metal fabrication and structural steel work for ground-based applications including ground support equipment (GSE), MRO workshops, hangar interiors, and airside service structures.",
      "We fabricate parts in aerospace-grade aluminium, stainless steel, and mild steel, applying laser cutting and precision press braking to maintain tight dimensional tolerances required for aviation-grade components. Our welding processes comply with documented procedures and every critical weld undergoes visual and dimensional inspection before dispatch.",
      "From a single custom ground support trolley to repeat production of hangar rack systems and service pit covers, we offer the flexibility and quality controls that aviation ground operations require.",
    ],
    services: [
      "CNC laser cutting to tight aviation tolerances",
      "Precision press braking of aluminium and SS components",
      "Structural MIG/TIG welding with procedure documentation",
      "Ground support equipment (GSE) fabrication",
      "Hangar shelving, racks, and enclosure fabrication",
      "Surface preparation and primer coating",
    ],
    applications: [
      "Ground support equipment trolleys and frames",
      "Aircraft wheel chocks and safety barriers",
      "Hangar tool storage and racking systems",
      "Airside access covers and service pit lids",
      "MRO workshop workbenches and storage",
      "Cable trays and enclosure panels for airport infrastructure",
    ],
    whyUs: [
      "Documented welding procedures and inspection records available on request",
      "Experience with aluminium, SS 304/316, and mild steel for ground-based aviation parts",
      "Quick-turnaround prototyping for MRO and retrofit projects",
    ],
    faqs: [
      {
        question: "What aviation ground support equipment does Balaji Engineering Works fabricate?",
        answer: "We fabricate ground support trolleys and frames, aircraft wheel chocks, safety barriers, airside access covers, MRO workshop workbenches, and storage racking systems for hangars and maintenance facilities.",
      },
      {
        question: "What materials are used for aviation-grade sheet metal fabrication?",
        answer: "We work with aerospace-grade aluminium (6061, 5052), SS 304/316, and mild steel as specified by the customer. Material selection depends on weight requirements, corrosion environment, and structural load for each ground-based component.",
      },
      {
        question: "Do you provide weld inspection records for aviation parts?",
        answer: "Yes. We document welding procedures and provide visual inspection records for all structural aviation components. Dimensional inspection reports can also be provided for critical parts on request.",
      },
      {
        question: "Can you fabricate custom MRO parts to our drawings?",
        answer: "Yes. We accept DXF, DWG, STEP, IGES, and PDF drawings for MRO replacement or retrofit parts. Prototype turnaround is typically 5–7 working days after drawing review and approval.",
      },
    ],
  },
  {
    id: "construction-architecture",
    name: "Construction and Architecture",
    description: "Metal roofing, structural supports, facade cladding, handrails, staircases, and architectural metalwork for commercial and residential projects.",
    icon: "building2",
    image: "/sector-construction.png",
    metaTitle: "Structural and Architectural Metal Fabrication | Balaji Engineering Works",
    metaDescription: "Custom structural steel and sheet metal fabrication for construction — roofing, facade cladding, staircases, handrails, and structural supports. Serving architects and contractors across India from Surat.",
    keywords: [
      "structural steel fabrication Surat Gujarat",
      "metal facade cladding manufacturer India",
      "architectural metalwork fabrication",
      "construction sheet metal parts",
      "metal staircase handrail manufacturer",
      "building steel structure contractor India",
    ],
    headline: "Structural Steel and Architectural Metal Fabrication for Construction Projects",
    body: [
      "From high-rise commercial towers to residential villas, Balaji Engineering Works supplies structural steel and architectural sheet metal components that combine load-bearing reliability with clean visual finishes. We work directly with architects, PMCs, and main contractors to produce custom metalwork that integrates seamlessly with project specifications.",
      "Our fabrication services cover metal roofing systems, facade cladding panels, structural columns and beams, staircases, balustrades, handrails, and canopy structures. We fabricate in mild steel, galvanized steel, stainless steel, and CORTEN-look finishes, with powder coating and zinc priming available to meet project aesthetics and weathering requirements.",
      "Located in Kamrej, Surat — a hub for both construction activity and metal processing — we offer fast turnaround from drawing to dispatch, with the capacity to manage both small custom elements and large-volume production runs for commercial projects.",
    ],
    services: [
      "Structural steel cutting, drilling, and welding",
      "Metal roof sheet profiling and gutter fabrication",
      "Facade cladding panel production",
      "Custom staircase and balustrade fabrication",
      "Handrail systems in MS, SS, and aluminium",
      "Canopy, pergola, and shade structure fabrication",
    ],
    applications: [
      "Metal roofing sheets and ridge caps",
      "Facade cladding and curtain wall panels",
      "Structural columns, beams, and purlins",
      "Internal and external staircases",
      "Balustrades, handrails, and safety railings",
      "Commercial canopies and entrance canopies",
    ],
    whyUs: [
      "Direct coordination with architects and structural engineers for design-intent compliance",
      "In-house powder coating and zinc priming for weather-resistant finishes",
      "Large-project capacity with dedicated production scheduling",
    ],
    faqs: [
      {
        question: "What structural steel and sheet metal work do you do for construction projects?",
        answer: "We fabricate metal roofing systems, facade cladding panels, structural columns and beams, staircases, balustrades, handrails, canopy structures, and purlins. We work from architect or structural engineer drawings and coordinate with main contractors on site requirements.",
      },
      {
        question: "Do you work directly with architects and PMCs?",
        answer: "Yes. We coordinate directly with architects, project management consultants, and main contractors to ensure fabricated metalwork matches design intent, project specifications, and installation requirements.",
      },
      {
        question: "What finishes are available for architectural metalwork?",
        answer: "We offer powder coating in any RAL colour, zinc priming, epoxy primer, hot-dip galvanizing coordination, and brushed or mill finishes on stainless steel. For CORTEN-effect applications, we can advise on material and finish options.",
      },
      {
        question: "Can you fabricate custom staircases and handrail systems?",
        answer: "Yes. We fabricate internal and external staircases, balustrades, and handrail systems in mild steel, stainless steel, and aluminium to architectural drawings. Both straight and curved profiles can be accommodated.",
      },
      {
        question: "What is your capacity for large construction projects?",
        answer: "We have dedicated production scheduling for large project volumes and can manage phased deliveries to match site installation timelines. Contact us with your BOQ and drawings for a capacity and timeline assessment.",
      },
    ],
  },
  {
    id: "energy-power",
    name: "Energy and Power",
    description: "Sheet metal and structural components for wind turbines, solar mounting systems, power plant infrastructure, and electrical enclosures.",
    icon: "zap",
    image: "/sector-energy.png",
    metaTitle: "Sheet Metal Fabrication for Energy and Power Sector | Balaji Engineering Works",
    metaDescription: "Precision fabrication of wind turbine parts, solar panel mounting structures, power plant enclosures, and transformer housings. Reliable steel fabrication for India's energy sector — based in Surat, Gujarat.",
    keywords: [
      "solar panel mounting structure manufacturer India",
      "wind turbine parts fabrication Surat",
      "power plant sheet metal components",
      "electrical enclosure fabrication Gujarat",
      "transformer housing manufacturer India",
      "renewable energy metal parts supplier",
    ],
    headline: "Fabrication for Wind, Solar, and Conventional Power Infrastructure",
    body: [
      "India's rapidly expanding energy sector — from solar farms and wind parks to thermal and hydro power plants — demands reliable, corrosion-resistant structural and sheet metal components at scale. Balaji Engineering Works supplies fabricated parts that perform in harsh outdoor environments including high UV, coastal salt spray, and high-temperature conditions.",
      "We manufacture solar panel mounting frames and racking systems, wind turbine nacelle covers and bracket assemblies, transformer housings, electrical panel enclosures, cable management trays, and power station structural steelwork. Hot-dip galvanizing, powder coating, and zinc-rich primer options ensure long-term durability in field-deployed conditions.",
      "Our production capability handles both low-volume custom fabrication for bespoke power projects and high-volume repeat orders for solar EPC contractors requiring consistent quality across thousands of identical parts.",
    ],
    services: [
      "Solar panel mounting frame and structure fabrication",
      "Wind turbine component fabrication",
      "Electrical enclosure and panel box fabrication",
      "Cable tray and cable management system production",
      "Transformer housing and substation enclosure fabrication",
      "Hot-dip galvanizing coordination and powder coating",
    ],
    applications: [
      "Solar ground-mount and rooftop racking frames",
      "Wind turbine nacelle and hub structural brackets",
      "HT/LT electrical panel enclosures",
      "Cable trays for power plants and substations",
      "Transformer plinth frames and protective enclosures",
      "Generator housing and canopy panels",
    ],
    whyUs: [
      "Experience with corrosion protection specifications required for outdoor energy infrastructure",
      "Volume production capability for solar EPC and wind project contractors",
      "Galvanizing, powder coating, and zinc priming in-house or through trusted partners",
    ],
    faqs: [
      {
        question: "Do you fabricate solar panel mounting structures?",
        answer: "Yes. We fabricate ground-mount and rooftop solar racking frames and structural supports for solar EPC contractors. We handle high-volume repeat orders with consistent dimensional accuracy across large batches.",
      },
      {
        question: "What corrosion protection options do you offer for energy sector parts?",
        answer: "We coordinate hot-dip galvanizing, and offer in-house powder coating and zinc-rich primer application. These protect outdoor energy infrastructure components against UV exposure, coastal salt spray, and humidity.",
      },
      {
        question: "Can you fabricate electrical panel enclosures and cable trays?",
        answer: "Yes. We fabricate HT/LT electrical panel enclosures, cable trays, transformer housings, and substation structures in mild steel and stainless steel to customer specifications.",
      },
      {
        question: "Do you supply to solar EPC contractors in India?",
        answer: "Yes. We supply solar mounting frames and structural components to EPC contractors across India. Our production capacity supports large project volumes with phased delivery schedules to match site installation timelines.",
      },
    ],
  },
  {
    id: "general-manufacturing",
    name: "General Manufacturing",
    description: "Custom sheet metal parts, enclosures, machine guards, and fabricated assemblies for diverse industrial machinery and production equipment.",
    icon: "factory",
    image: "/sector-manufacturing.png",
    metaTitle: "Custom Sheet Metal Parts for General Manufacturing | Balaji Engineering Works",
    metaDescription: "Balaji Engineering Works produces custom sheet metal enclosures, machine guards, panels, and assemblies for industrial manufacturing equipment. Job work and contract fabrication from Surat, Gujarat.",
    keywords: [
      "custom sheet metal parts manufacturer India",
      "industrial machine guard fabrication",
      "contract sheet metal fabrication Surat",
      "enclosure sheet metal manufacturer Gujarat",
      "job work sheet metal Surat India",
      "industrial equipment sheet metal parts",
    ],
    headline: "Contract Sheet Metal Fabrication for Industrial Equipment and Machinery",
    body: [
      "General manufacturing companies across India rely on Balaji Engineering Works for contract sheet metal fabrication — producing enclosures, machine guards, covers, brackets, panels, and custom assemblies to customer drawings and specifications. We handle one-off samples, short prototype runs, and recurring production batches.",
      "Whether you need a protective cover for a conveyor line, a control panel enclosure, a jig, or a mounting frame for industrial equipment, our team reviews your drawing, advises on DFM improvements if required, and delivers accurately fabricated parts on a committed timeline.",
      "We accept standard 2D drawing formats (DXF, DWG, PDF) and 3D models (STEP, IGES), and provide first-article inspection reports for new parts. Our in-house capabilities — laser cutting, press braking, welding, tapping, and finishing — minimize subcontracting and keep lead times predictable.",
    ],
    services: [
      "Laser cutting from customer-supplied drawings",
      "Press brake forming to tight angle tolerances",
      "Sheet metal enclosure and housing fabrication",
      "Machine guard and safety cover fabrication",
      "Tapping, punching, and hardware insertion",
      "First-article inspection and dimensional reporting",
    ],
    applications: [
      "Control panel and electrical enclosures",
      "Machine guards, covers, and safety screens",
      "Industrial jigs and fixture components",
      "Conveyor frame sections and covers",
      "Equipment mounting brackets and frames",
      "Custom sub-assemblies and weldments",
    ],
    whyUs: [
      "Job-work accepted — we fabricate to your drawings with no design fees",
      "DXF, DWG, STEP, IGES, PDF accepted — fast DFM review turnaround",
      "Prototype to production batch in the same facility, same quality controls",
    ],
    faqs: [
      {
        question: "Do you accept job work orders with customer-supplied drawings?",
        answer: "Yes. We accept job work orders from drawings in DXF, DWG, STEP, IGES, and PDF formats. Our team reviews every drawing for manufacturability and responds with a quote and lead time within 4–8 business hours.",
      },
      {
        question: "What is your minimum order quantity for custom sheet metal parts?",
        answer: "We accept orders from a single prototype piece up to large production batches. There is no fixed minimum order quantity — requirements are assessed based on the process, material, and complexity of each part.",
      },
      {
        question: "What types of enclosures and housings can you fabricate?",
        answer: "We fabricate control panel enclosures, electrical junction boxes, machine housings, equipment covers, and custom industrial enclosures in mild steel, stainless steel, and aluminium to your exact drawings.",
      },
      {
        question: "Can you provide first-article inspection reports?",
        answer: "Yes. For new part numbers, we provide first-article inspection (FAI) reports with dimensional verification against the supplied drawing before full production commences.",
      },
      {
        question: "Do you offer tapping, punching, and hardware insertion services?",
        answer: "Yes. In addition to cutting, bending, and welding, we offer tapping, punching, countersinking, and PEM nut or stud insertion as value-added operations on sheet metal parts.",
      },
    ],
  },
  {
    id: "agriculture-heavy-machinery",
    name: "Agriculture and Heavy Machinery",
    description: "Fabricated parts for tractors, combine harvesters, agricultural implements, and heavy earthmoving and construction equipment.",
    icon: "cog",
    image: "/sector-agriculture.png",
    metaTitle: "Sheet Metal Parts for Agriculture and Heavy Machinery | Balaji Engineering Works",
    metaDescription: "Custom sheet metal fabrication for tractors, harvesters, agricultural implements, and heavy machinery. Robust steel parts built for field conditions — supplied from Surat, Gujarat.",
    keywords: [
      "tractor sheet metal parts manufacturer India",
      "agricultural equipment fabrication Surat",
      "combine harvester parts fabrication",
      "heavy machinery sheet metal Gujarat",
      "farm equipment structural parts India",
      "earthmoving equipment sheet metal parts",
    ],
    headline: "Heavy-Duty Sheet Metal Parts for Agricultural and Heavy Equipment Manufacturers",
    body: [
      "Agricultural machinery and heavy equipment operate in demanding field conditions — high vibration, abrasive dust, UV exposure, and rough handling. Balaji Engineering Works fabricates heavy-gauge sheet metal parts and structural steel components engineered to survive these environments, supplying tractor OEMs, agricultural implement manufacturers, and construction equipment assemblers.",
      "We produce bonnet panels, fender assemblies, tool frame sections, cultivator tines, seed drill frames, chassis brackets, and cab structure parts. Materials include HRCA, CRCA, and wear-resistant steel grades, with weld quality and dimensional accuracy verified at every stage before dispatch.",
      "Our press braking capacity handles heavy-gauge bending, and our MIG welding line is experienced with structural weldments that require full-penetration joints and high fatigue resistance. We supply both individual components and pre-assembled sub-units to streamline your final assembly process.",
    ],
    services: [
      "Heavy-gauge press braking and CNC cutting",
      "Structural MIG welding for high-fatigue parts",
      "Tractor bonnet and fender panel fabrication",
      "Agricultural implement frame and chassis work",
      "Abrasion-resistant steel (AR plate) cutting and forming",
      "Sub-assembly welding to reduce your assembly time",
    ],
    applications: [
      "Tractor bonnet, hood, and fender panels",
      "Seed drill and planter frame sections",
      "Rotavator and cultivator tine assemblies",
      "Combine harvester cutter bar components",
      "Loader and backhoe bucket side plates",
      "Earthmover cab structure and canopy panels",
    ],
    whyUs: [
      "Heavy-gauge bending capability up to 8 mm mild steel",
      "Structural weld experience for vibration and high-load applications",
      "Supply to major agricultural OEMs and implement manufacturers in Gujarat",
    ],
    faqs: [
      {
        question: "What agricultural machinery parts can you fabricate?",
        answer: "We fabricate tractor bonnets, hoods, fenders, seed drill frames, rotavator tine assemblies, combine harvester cutter bar parts, planter frames, and earthmover cab panels. We work with HRCA, CRCA, and wear-resistant steel grades.",
      },
      {
        question: "Can you handle heavy-gauge steel for agricultural equipment?",
        answer: "Yes. Our press braking capacity handles heavy-gauge mild steel up to 8 mm thickness, suitable for structural brackets, chassis components, and loader bucket side plates on agricultural and earthmoving equipment.",
      },
      {
        question: "Do you fabricate sub-assemblies for agricultural OEMs?",
        answer: "Yes. We supply welded sub-assemblies and pre-assembled structural units to agricultural OEMs and implement manufacturers, reducing your final assembly time and simplifying supply chain management.",
      },
      {
        question: "What welding processes do you use for heavy agricultural parts?",
        answer: "We use MIG welding for structural agricultural weldments requiring full-penetration joints and high fatigue resistance. All critical welds undergo visual and dimensional inspection before dispatch.",
      },
    ],
  },
  {
    id: "crushing-mining",
    name: "Crushing and Mining",
    description: "Conveyor system frames, crusher liners, equipment housing, structural steelwork, and wear-resistant components for mining and mineral processing.",
    icon: "hammer",
    image: "/sector-mining.png",
    metaTitle: "Sheet Metal and Structural Fabrication for Crushing and Mining | Balaji Engineering Works",
    metaDescription: "Heavy structural fabrication for crushing, mining, and mineral processing — conveyor frames, crusher housing, chutes, hoppers, and wear-plate components. Balaji Engineering Works, Surat.",
    keywords: [
      "crusher parts fabrication India",
      "conveyor frame manufacturer Surat Gujarat",
      "mining equipment fabrication India",
      "hopper chute sheet metal manufacturer",
      "wear plate steel fabrication India",
      "mineral processing equipment parts",
    ],
    headline: "Heavy Structural Fabrication for Crushing, Conveying, and Mining Equipment",
    body: [
      "Crushing and mining environments put extreme stress on fabricated components — continuous vibration, heavy impact loads, and abrasive material flow demand heavy structural steel and wear-resistant plate fabrication executed to precise specifications. Balaji Engineering Works has extensive experience supplying fabricated components to stone crushing plants, mineral processing units, and bulk material handling contractors.",
      "We fabricate conveyor system frames and rollers supports, crusher body panels and liners, feed hoppers, discharge chutes, magnetic separator housings, and vibrating screen frames. We work with mild steel, high-tensile steel, and wear-resistant AR plate grades depending on the application, and can coordinate hot-dip galvanizing for outdoor or wet-environment installations.",
      "Our welding team is experienced with full-penetration structural welds that must withstand constant dynamic loading, and we supply dimensional inspection reports for critical structural parts to support your installation and maintenance records.",
    ],
    services: [
      "Heavy structural steel cutting, drilling, and welding",
      "Conveyor frame and support structure fabrication",
      "Hopper and chute fabrication in MS and AR plate",
      "Crusher housing and body panel fabrication",
      "Vibrating screen and feeder frame fabrication",
      "Wear liner installation and plate replacement services",
    ],
    applications: [
      "Conveyor belt frame sections and stringer supports",
      "Feed hoppers and discharge chutes",
      "Crusher side plates, access doors, and covers",
      "Vibrating screen and grizzly feeder frames",
      "Magnetic separator and dust suppression housings",
      "Belt conveyor drive and tail pulley support frames",
    ],
    whyUs: [
      "Experience with AR plate (Hardox equivalent) cutting and heavy structural welding",
      "Full-penetration weld capability with dimensional verification for critical load-bearing structures",
      "On-time supply to crushing plant and conveyor system integrators across India",
    ],
    faqs: [
      {
        question: "What crushing and mining components do you fabricate?",
        answer: "We fabricate conveyor belt frame sections, feed hoppers, discharge chutes, crusher side plates and access covers, vibrating screen frames, grizzly feeder frames, and belt conveyor drive and tail pulley support structures.",
      },
      {
        question: "Can you work with abrasion-resistant (AR) plate steel?",
        answer: "Yes. We cut and form AR plate (Hardox equivalent grades) for wear-critical applications such as hopper liners, chute liners, and conveyor impact zones. Cutting is done by CNC plasma or laser depending on plate thickness.",
      },
      {
        question: "What welding standard do you follow for structural mining components?",
        answer: "We use full-penetration MIG welding for load-bearing structural components and supply dimensional inspection reports for critical parts. Weld procedure documentation is available on request for quality audit purposes.",
      },
      {
        question: "Do you supply directly to conveyor system integrators?",
        answer: "Yes. We supply fabricated structural components directly to conveyor system integrators, crushing plant contractors, and mineral processing equipment manufacturers across India.",
      },
    ],
  },
  {
    id: "defense-military",
    name: "Defense and Military",
    description: "Fabricated structural and protective components for defense vehicles, shelters, storage systems, and military infrastructure applications.",
    icon: "shield",
    image: "/sector-defense.png",
    metaTitle: "Defense Sector Sheet Metal Fabrication | Balaji Engineering Works",
    metaDescription: "Precision structural and sheet metal fabrication for defense and military applications — vehicle components, protective enclosures, storage systems, and base infrastructure. Balaji Engineering Works, Surat Gujarat.",
    keywords: [
      "defense sheet metal fabrication India",
      "military vehicle parts fabrication",
      "defense enclosure manufacturer Gujarat",
      "military shelter structural steel India",
      "defense storage fabrication Surat",
      "armored vehicle component manufacturer India",
    ],
    headline: "Structural and Protective Fabrication for Defense and Military Applications",
    body: [
      "Defense and military applications demand fabrication that meets the highest standards of structural integrity, dimensional accuracy, and material compliance. Balaji Engineering Works supplies sheet metal and structural steel components for defense-related ground applications including vehicle ancillaries, equipment shelters, storage and transport systems, and base infrastructure.",
      "We work with high-tensile steel, MS plates, SS grades, and aluminium alloys as specified by defense customers, with full traceability of material heat numbers where required. Our welding procedures are documented and visual inspection is conducted on every structural weld before dispatch.",
      "We supply components to defense contractors and sub-contractors operating in vehicle assembly, ordnance storage, and field infrastructure. Our facility in Kamrej, Surat operates under strict quality controls with confidentiality maintained for all defense project details.",
    ],
    services: [
      "High-tensile and thick-plate cutting and forming",
      "Structural welding with documented procedures",
      "Protective enclosure and housing fabrication",
      "Vehicle body panel and bracket fabrication",
      "Storage rack and container structural fabrication",
      "Material traceability documentation on request",
    ],
    applications: [
      "Military vehicle body panels and protective covers",
      "Equipment shelter and field station structures",
      "Ammunition and equipment storage rack systems",
      "Generator and equipment protective enclosures",
      "Vehicle underbody guards and blast deflection plates",
      "Communication shelter frames and cable management",
    ],
    whyUs: [
      "Documented welding procedures and material traceability available for defense-grade components",
      "Strict project confidentiality maintained across all defense-related fabrication work",
      "Experience with high-tensile plate and heavy structural fabrication for robust applications",
    ],
    faqs: [
      {
        question: "What defense-related sheet metal components do you fabricate?",
        answer: "We fabricate military vehicle body panels and protective covers, equipment shelter frames, ammunition and storage rack systems, generator enclosures, underbody guards, communication shelter frames, and cable management systems for base infrastructure.",
      },
      {
        question: "Do you maintain project confidentiality for defense orders?",
        answer: "Yes. All defense-related fabrication projects are treated with strict confidentiality. Details of components, quantities, and customer identities are not disclosed outside our production team.",
      },
      {
        question: "Can you provide material traceability documentation for defense components?",
        answer: "Yes. We can provide material test certificates with heat number traceability, weld procedure documentation, and dimensional inspection records for critical defense-grade structural components.",
      },
      {
        question: "What steel grades do you work with for defense applications?",
        answer: "We work with high-tensile steel (HT 500, HT 550), mild steel plates, SS 304/316, and aluminium alloys as specified by defense customers. Material selection is based on structural, weight, and ballistic protection requirements of each component.",
      },
    ],
  },
  {
    id: "interior-exterior-design",
    name: "Interior and Exterior Design",
    description: "CNC laser-cut metal art, decorative facade panels, elevation cladding, pergolas, feature walls, and custom architectural metalwork.",
    icon: "palette",
    image: "/sector-interior-design.png",
    metaTitle: "Decorative Metal Fabrication for Interior and Exterior Design | Balaji Engineering Works",
    metaDescription: "Custom CNC laser-cut metal panels, decorative facades, feature walls, pergolas, and elevation cladding for interior designers and architects. Premium architectural metalwork from Surat, Gujarat.",
    keywords: [
      "CNC laser cut decorative metal panels India",
      "architectural metal facade fabrication Surat",
      "feature wall metal fabrication Gujarat",
      "decorative steel panel manufacturer India",
      "pergola metal fabrication Surat",
      "elevation cladding metal manufacturer India",
    ],
    headline: "Custom CNC Laser-Cut Decorative and Architectural Metalwork",
    body: [
      "Balaji Engineering Works bridges engineering precision and aesthetic design, producing custom decorative metalwork for interior designers, architects, and property developers across India. From intricately laser-cut feature wall panels to large-scale building elevation cladding, we translate design intent into fabricated metal with consistent quality and clean finish.",
      "We work from architect-supplied DXF or vector artwork, fabricating decorative screens, jali panels, pergola structures, privacy screens, staircase balustrades, facade cladding, and bespoke furniture frames in mild steel, stainless steel, corten steel, and aluminium. Powder coating is available in any RAL colour, and raw-steel patina finishes are achievable on request.",
      "For interior applications, we produce wall art panels, suspended ceiling elements, partition screens, and decorative door frames. For exteriors, we supply elevation panels, gate designs, facade cladding, and landscape structures. Every piece is produced to drawing, with packaging designed to protect finishes during transport and installation.",
    ],
    services: [
      "CNC laser cutting of intricate decorative patterns",
      "Powder coating in custom RAL colours",
      "Facade cladding and elevation panel fabrication",
      "Pergola and outdoor shade structure fabrication",
      "Decorative balustrade and handrail fabrication",
      "Feature wall panel and suspended element production",
    ],
    applications: [
      "Decorative laser-cut wall and ceiling panels",
      "Elevation facade cladding and rainscreen panels",
      "Hotel lobby and commercial interior feature walls",
      "Residential and commercial pergolas and canopies",
      "Privacy screens, partition panels, and room dividers",
      "Decorative gate designs and entrance features",
    ],
    whyUs: [
      "Vector artwork to fabricated panel — full in-house process from laser cutting to powder coating",
      "Custom RAL powder coating with samples available before production approval",
      "Packaging engineered to protect decorative finishes during transport to project sites",
    ],
    faqs: [
      {
        question: "Can you fabricate custom CNC laser-cut decorative panels from my design?",
        answer: "Yes. Send us your design as a DXF or vector file (AI, EPS, SVG) and we will cut the pattern precisely in your chosen material — mild steel, stainless steel, or aluminium. We can advise on minimum feature size and material thickness for your intended use.",
      },
      {
        question: "What powder coating colours are available for decorative metalwork?",
        answer: "We offer powder coating in any RAL colour. Sample pieces can be produced before full production to confirm colour and finish match your project requirements. Matte, satin, and gloss finishes are all available.",
      },
      {
        question: "What materials can be used for exterior facade cladding panels?",
        answer: "We fabricate facade cladding in mild steel (powder coated), stainless steel (brushed or powder coated), and aluminium. For outdoor applications, we recommend powder coating with a weather-resistant primer base to ensure long-term finish durability.",
      },
      {
        question: "What is the lead time for decorative laser-cut panels?",
        answer: "Standard decorative panels typically ship within 7–14 working days after design approval and material selection confirmation. Large project runs with multiple panel designs are scheduled based on total quantity and complexity.",
      },
      {
        question: "Do you fabricate pergolas and outdoor shade structures?",
        answer: "Yes. We fabricate custom pergolas, canopies, and outdoor shade structures in mild steel and aluminium, with powder coating for weather resistance. We work from customer or architect drawings and can suggest structural sizing based on span and load.",
      },
    ],
  },
  {
    id: "marine-industry",
    name: "Marine Industry",
    description: "Corrosion-resistant sheet metal and structural fabrication for shipbuilding, vessel interiors, offshore platforms, and port infrastructure.",
    icon: "anchor",
    image: "/sector-marine.png",
    metaTitle: "Marine Sheet Metal and Structural Fabrication | Balaji Engineering Works",
    metaDescription: "Marine-grade fabrication in SS 316, aluminium, and galvanized steel for shipbuilding, vessel components, port infrastructure, and offshore structures. Balaji Engineering Works, Surat Gujarat.",
    keywords: [
      "marine sheet metal fabrication India",
      "shipbuilding component manufacturer Gujarat",
      "SS 316 marine fabrication Surat",
      "offshore structural steel fabrication India",
      "vessel interior fabrication India",
      "port infrastructure metal fabrication",
    ],
    headline: "Corrosion-Resistant Fabrication for Marine and Offshore Applications",
    body: [
      "Marine environments demand corrosion-resistant materials and impeccable weld quality. Balaji Engineering Works fabricates components for shipbuilders, vessel operators, port authorities, and offshore contractors using marine-grade materials — principally SS 316, aluminium alloys, and hot-dip galvanized mild steel — to deliver parts that withstand salt spray, humidity, and immersion conditions.",
      "We produce vessel interior panels and bulkhead sections, engine room enclosures, port infrastructure metalwork, offshore safety barriers, gangways, and deck fittings. Our TIG welding capability ensures full-penetration, low-distortion welds on stainless steel and aluminium, critical for watertight and structurally demanding marine assemblies.",
      "From custom one-off vessel components to repeat production of port equipment parts, we bring the material knowledge and fabrication precision that marine customers require — with inspection records and material certificates available on every order.",
    ],
    services: [
      "SS 316 and aluminium TIG welding for marine parts",
      "Vessel interior panel and bulkhead fabrication",
      "Deck fitting and gangway structural fabrication",
      "Hot-dip galvanizing coordination for MS marine parts",
      "Engine room enclosure and ventilation panel fabrication",
      "Material certifications and weld inspection records",
    ],
    applications: [
      "Vessel hull reinforcement plates and patches",
      "Bulkhead and interior cabin panels",
      "Engine room enclosures and cable tray systems",
      "Gangways, railings, and safety barriers",
      "Port crane support structures and equipment housings",
      "Offshore platform access ladders and walkways",
    ],
    whyUs: [
      "Marine-grade material sourcing — SS 316, aluminium 5052/6061, and galvanized steel",
      "TIG welding for watertight and low-distortion marine assemblies",
      "Material test certificates and weld inspection records provided on request",
    ],
    faqs: [
      {
        question: "What marine and offshore components can you fabricate?",
        answer: "We fabricate vessel interior panels and partitions, deck fixtures and housings, offshore platform handrail systems, gangways, cable trays, and structural support frames for marine and port infrastructure applications.",
      },
      {
        question: "What materials do you use for marine-grade fabrication?",
        answer: "We work primarily with SS 304, SS 316, and SS 316L for marine environments requiring high corrosion resistance. For structural applications, we use mild steel with heavy-duty marine paint or hot-dip galvanizing as specified.",
      },
      {
        question: "Do you use TIG welding for stainless steel marine components?",
        answer: "Yes. We use TIG welding for stainless steel marine components where clean, full-penetration welds and corrosion resistance are critical. All stainless weld seams are properly passivated and inspected before dispatch.",
      },
      {
        question: "Can you provide material test certificates for marine parts?",
        answer: "Yes. We provide material test certificates (MTCs) with heat number traceability and weld inspection records for marine components on request. These are commonly required by classification societies and marine project QA teams.",
      },
    ],
  },
  {
    id: "railway-transportation",
    name: "Railway and Transportation",
    description: "Sheet metal components for train carriages, metro systems, bus bodywork, and railway station infrastructure.",
    icon: "train",
    image: "/sector-railway.png",
    metaTitle: "Sheet Metal Fabrication for Railway and Transportation | Balaji Engineering Works",
    metaDescription: "Precision sheet metal and structural fabrication for railway coaches, metro trains, bus bodywork, and rail station infrastructure. Serving Indian Railways contractors and metro project suppliers from Surat.",
    keywords: [
      "railway coach sheet metal fabrication India",
      "metro train parts manufacturer Gujarat",
      "bus body sheet metal fabrication Surat",
      "rail station infrastructure steel fabrication",
      "train carriage interior panel manufacturer",
      "transportation sheet metal supplier India",
    ],
    headline: "Precision Sheet Metal Components for Rail Coaches, Metro Systems, and Transit Infrastructure",
    body: [
      "India's expanding railway and metro networks demand fabricated sheet metal components that combine dimensional precision, consistent finish quality, and high-volume production reliability. Balaji Engineering Works supplies carriage interior panels, under-frame brackets, flooring sections, roof panels, and structural elements to coach builders, metro rolling stock contractors, and railway infrastructure companies.",
      "We fabricate in CRCA, stainless steel, and aluminium for interior and semi-structural applications, with powder coating, epoxy primer, and anodizing available to meet railway project specifications. Our laser cutting ensures consistent blank sizes across high-volume runs, and our press braking produces repeatable formed profiles with tight angle tolerances critical for modular coach interior assembly.",
      "For railway station and depot infrastructure, we supply canopy structures, platform edge panels, signage frames, seating structures, and utility enclosures — fabricated to project drawings and delivered to site with packaging that protects finished surfaces.",
    ],
    services: [
      "High-volume laser cutting for carriage panel blanks",
      "Repeatable press braking for interior profile consistency",
      "Structural welding for coach sub-frames and brackets",
      "Aluminium and SS interior panel fabrication",
      "Station infrastructure canopy and structural work",
      "Powder coating and epoxy primer for railway spec finishes",
    ],
    applications: [
      "Train and metro coach interior wall and ceiling panels",
      "Under-frame mounting brackets and support structures",
      "Roof panel sections and door frame reinforcements",
      "Platform edge cladding and signage frames",
      "Station canopy structural sections",
      "Depot tool storage and equipment enclosures",
    ],
    whyUs: [
      "High-volume production capability with consistent dimensional accuracy across large batches",
      "Experience with railway-specification powder coating and epoxy primer finishes",
      "Supply to Indian Railways contractors and metro project subcontractors",
    ],
    faqs: [
      {
        question: "What railway sheet metal components do you fabricate?",
        answer: "We fabricate train carriage interior panels, under-seat equipment housings, cable tray and conduit systems, station canopy structural supports, platform edge frames, driver's cab panels, and metro coach interior fixtures.",
      },
      {
        question: "What materials do you use for railway and metro applications?",
        answer: "We work with SS 304/316, 6061 aluminium, and mild steel as specified by the rolling stock manufacturer or railway contractor. Material selection follows the fire-resistance, weight, and structural requirements of each application.",
      },
      {
        question: "Can you supply to Indian Railways contractors and metro project vendors?",
        answer: "Yes. We supply fabricated sheet metal components to Indian Railways contractors, metro rail project subcontractors, and railway station infrastructure companies across India.",
      },
      {
        question: "Do you handle powder coating for railway interior components?",
        answer: "Yes. We offer powder coating in specified RAL or railway project standard colours, with surface prep and primer application for interior and exterior railway components. Colour and finish samples are available before full production.",
      },
      {
        question: "What volume capacity do you have for railway production orders?",
        answer: "We support both prototype and production-volume orders for railway customers. Our production scheduling accommodates phased delivery to match rolling stock assembly or infrastructure construction timelines. Contact us with your BOQ for a capacity assessment.",
      },
    ],
  },
];
