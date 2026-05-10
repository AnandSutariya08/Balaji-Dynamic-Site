export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cnc-laser-cutting-tolerances",
    title: "Understanding CNC Laser Cutting Tolerances",
    category: "Technical",
    date: "March 15, 2024",
    readTime: "5 min read",
    excerpt: "Learn how CNC laser cutting achieves ±0.1mm tolerances and what factors affect precision in sheet metal cutting...",
    content: `
      <h2>The Precision of CNC Laser Cutting</h2>
      <p>CNC laser cutting has revolutionized the metal fabrication industry by providing a level of precision and speed that was previously unattainable. At Balaji Engineering Works, we utilize state-of-the-art fiber laser technology to achieve tolerances as tight as ±0.1mm. But what exactly determines these tolerances, and why do they matter for your project?</p>
      
      <h3>What are Cutting Tolerances?</h3>
      <p>In manufacturing, tolerance is the permissible limit or limits of variation in a physical dimension. In laser cutting, this refers to the difference between the designed dimension in a CAD file and the actual dimension of the finished physical part.</p>
      
      <h3>Factors Affecting Precision</h3>
      <ul>
        <li><strong>Material Type and Thickness:</strong> Thinner materials generally allow for tighter tolerances. As thickness increases, the laser beam can diverge slightly, affecting the edge quality and dimensional accuracy.</li>
        <li><strong>Machine Calibration:</strong> Regular maintenance and calibration of the CNC gantries and optical systems are crucial. A well-maintained machine ensures consistent positioning accuracy.</li>
        <li><strong>Thermal Expansion:</strong> Laser cutting is a thermal process. Heat-affected zones (HAZ) can cause minor material expansion. Proper nesting and cooling paths help mitigate this.</li>
        <li><strong>Beam Quality:</strong> The focus and quality of the laser beam determine the "kerf" (the width of the cut). Advanced controllers compensate for kerf width automatically.</li>
      </ul>

      <h3>Why ±0.1mm Matters</h3>
      <p>For industries like automotive and aerospace, even a fraction of a millimeter can be the difference between a perfect assembly and a failed component. High precision ensures that parts fit together seamlessly, reducing the need for secondary operations like grinding or filing, which ultimately saves time and costs.</p>

      <p>At Balaji Engineering, we combine two decades of experience with the latest technology to ensure every cut meets the most demanding specifications. Whether you are working with mild steel, stainless steel, or aluminum, our CNC laser cutting services provide the reliability your business depends on.</p>
    `,
    image: "/service-cnc.png"
  },
  {
    slug: "choosing-steel-grade-bending",
    title: "How to Choose the Right Steel Grade for Bending",
    category: "Guide",
    date: "February 28, 2024",
    readTime: "7 min read",
    excerpt: "Selecting the right steel grade is critical for successful bending operations. This guide covers MS, SS, and HR steel properties...",
    content: `
      <h2>Steel Selection for Precision Bending</h2>
      <p>Bending is one of the most common yet complex operations in sheet metal fabrication. One of the most critical factors in achieving a successful bend without cracking or deformation is the choice of material grade. At Balaji Engineering Works, we work with a wide variety of steels, and we've seen how the right grade can make or break a project.</p>

      <h3>Key Properties to Consider</h3>
      <p>When selecting a steel grade for bending, three main properties come into play:</p>
      <ol>
        <li><strong>Ductility:</strong> The ability of the material to undergo plastic deformation without breaking.</li>
        <li><strong>Yield Strength:</strong> The stress level at which the metal starts to deform permanently. Higher yield strength requires more force and results in more "springback."</li>
        <li><strong>Minimum Bend Radius:</strong> Every grade has a recommended minimum radius to prevent fracturing on the outer surface of the bend.</li>
      </ol>

      <h3>Common Grades and Their Bending Characteristics</h3>
      <h4>Mild Steel (MS) - Grade IS 2062</h4>
      <p>This is the workhorse of the industry. It has excellent ductility and is relatively easy to bend. It is ideal for general structural components where high corrosion resistance isn't the primary concern.</p>

      <h4>Stainless Steel (SS) - 304 & 316</h4>
      <p>Stainless steel is harder than mild steel and work-hardens quickly. It requires higher tonnages on the press brake. Grade 304 is standard for most applications, while 316 is preferred for marine or chemical environments due to its superior corrosion resistance.</p>

      <h4>Hot Rolled (HR) Steel</h4>
      <p>HR steel is cost-effective but often has a scale on the surface. It is generally ductile but its properties can be less uniform than cold-rolled steel, requiring experienced operators to maintain consistency across batches.</p>

      <h3>The Role of Grain Direction</h3>
      <p>Like wood, steel has a grain direction resulting from the rolling process. Bending "across the grain" (perpendicular to the rolling direction) is generally safer and allows for tighter radii compared to bending "with the grain."</p>

      <p>Choosing the right material involves balancing cost, strength, and fabricability. Our engineering team at Balaji is always available to help you select the optimal grade for your specific design requirements.</p>
    `,
    image: "/service-bending.png"
  },
  {
    slug: "sheet-metal-fabrication-costs",
    title: "Sheet Metal Fabrication Cost Factors in 2024",
    category: "Industry",
    date: "January 20, 2024",
    readTime: "6 min read",
    excerpt: "Breaking down the key cost drivers in sheet metal fabrication: material, machine time, complexity, and finishing...",
    content: `
      <h2>Optimizing Your Fabrication Budget</h2>
      <p>In today's competitive landscape, understanding the cost drivers of sheet metal fabrication is essential for project managers and engineers. At Balaji Engineering Works, we believe in transparent pricing and helping our clients optimize their designs for cost-effectiveness.</p>

      <h3>1. Material Costs</h3>
      <p>Material typically accounts for 30% to 50% of the total cost. Prices fluctuate based on global market conditions. The type of metal (MS, SS, Aluminum) and its thickness significantly impact the base price. Efficient nesting—how parts are arranged on a sheet—is crucial to minimize scrap and reduce costs.</p>

      <h3>2. Machine Time & Process Selection</h3>
      <p>Each process has a different cost profile. Laser cutting is fast for complex shapes but has a higher hourly rate than punching for simple holes. Bending costs are driven by the number of bends and the complexity of the setups required. Reducing the number of unique bend angles can significantly lower labor costs.</p>

      <h3>3. Geometry and Complexity</h3>
      <p>Parts with intricate details, very small tolerances, or many features require more machine time and more rigorous quality checks. "Designing for Manufacturability" (DFM) can lead to substantial savings. For example, replacing a complex welded assembly with a single bent part can reduce both time and cost.</p>

      <h3>4. Labor and Expertise</h3>
      <p>While automation handles much of the work, skilled labor is still required for setup, quality control, and complex welding. Balaji's two decades of experience mean we've optimized our workflows to provide high-quality output with maximum efficiency.</p>

      <h3>5. Finishing and Secondary Operations</h3>
      <p>Operations like powder coating, galvanizing, or deburring add to the final cost. Consider if a specific finish is necessary for the part's function or if the raw material's natural finish (like stainless steel) is sufficient.</p>

      <p>By understanding these factors, you can make informed decisions that keep your project on budget without sacrificing quality. Contact us for a detailed quote tailored to your specific needs.</p>
    `,
    image: "/service-fabrication.png"
  },
  {
    slug: "plate-rolling-techniques",
    title: "Plate Rolling Techniques for Cylinders and Cones",
    category: "Technical",
    date: "December 10, 2023",
    readTime: "8 min read",
    excerpt: "Plate rolling is used to create cylindrical and conical forms. This article covers 3-roll vs 4-roll machines and best practices...",
    content: `
      <h2>Mastering the Curve: Plate Rolling Essentials</h2>
      <p>Plate rolling is a foundational process in heavy fabrication, used to create everything from simple pipes to massive pressure vessels. At Balaji Engineering Works, our rolling capabilities allow us to transform thick steel plates into precise cylindrical and conical shapes.</p>

      <h3>How Plate Rolling Works</h3>
      <p>The process involves passing a metal plate through a set of rollers that apply pressure, gradually bending the material into a circular profile. The radius of the curve is determined by the position of the rollers relative to each other.</p>

      <h3>3-Roll vs. 4-Roll Machines</h3>
      <p>We utilize different types of rolling machines depending on the project requirements:</p>
      <ul>
        <li><strong>3-Roll Initial Pinch:</strong> Excellent for general-purpose rolling and pre-bending the ends of the plate to minimize the "flat spot."</li>
        <li><strong>3-Roll Pyramid:</strong> Often used for heavier plates, where the top roll moves vertically to apply the bending force.</li>
        <li><strong>4-Roll Double Pinch:</strong> The most precise and efficient option. The extra roll holds the plate securely, allowing for better alignment and faster production, especially for complex shapes.</li>
      </ul>

      <h3>The Challenge of Conical Rolling</h3>
      <p>Rolling a cone is significantly more difficult than rolling a cylinder. It requires the plate to be fed at an angle and the rollers to be tilted. This creates varying degrees of pressure across the width of the plate. It demands high levels of operator skill and precise machine control—areas where Balaji excels.</p>

      <h3>Quality Considerations</h3>
      <p>During rolling, it's vital to monitor for "ovality" (ensuring the circle is truly round) and "barreling" (where the center of the cylinder bulges). We use precision templates and measuring tools throughout the process to ensure the final product meets all dimensional requirements.</p>

      <p>Whether you need a single custom cylinder or a large production run of conical sections, our heavy plate rolling services are designed to deliver accuracy and durability.</p>
    `,
    image: "/service-rolling.png"
  },
  {
    slug: "structural-steel-fabrication-guide",
    title: "A Complete Guide to Structural Steel Fabrication",
    category: "Guide",
    date: "November 5, 2023",
    readTime: "10 min read",
    excerpt: "Structural steel fabrication involves cutting, bending, and assembling steel to create frameworks for buildings and infrastructure...",
    content: `
      <h2>Building the Future with Structural Steel</h2>
      <p>Structural steel is the backbone of modern infrastructure. From industrial warehouses to complex architectural designs, the fabrication of these massive components requires a blend of heavy-duty machinery and meticulous engineering. At Balaji Engineering Works, we've spent over 20 years perfecting the art of structural fabrication.</p>

      <h3>The Fabrication Workflow</h3>
      <p>A typical structural project follows a rigorous path from raw material to finished assembly:</p>
      <ol>
        <li><strong>Design and Detailing:</strong> We start with architectural drawings, translating them into detailed shop drawings that specify every cut, hole, and weld.</li>
        <li><strong>Material Sourcing:</strong> Using high-grade steel (typically IS 2062), we ensure the raw material has the necessary certifications and structural integrity.</li>
        <li><strong>Cutting and Drilling:</strong> CNC plasma or laser cutting is used for plates, while heavy-duty saws handle beams and columns. High-speed drilling ensures bolt holes are perfectly aligned.</li>
        <li><strong>Bending and Shaping:</strong> Heavy-duty press brakes and rolling machines shape the steel into the required profiles.</li>
        <li><strong>Welding and Assembly:</strong> Certified welders join the components using GMAW (MIG) or SMAW (Stick) welding. This stage is critical for the structural safety of the final product.</li>
      </ol>

      <h3>Why Choose Steel?</h3>
      <p>Steel offers an unparalleled strength-to-weight ratio, making it the most efficient material for large-span structures. It is also 100% recyclable, making it a sustainable choice for modern construction. Furthermore, steel components can be fabricated off-site in a controlled environment like ours, significantly reducing construction time on-site.</p>

      <h3>Quality Assurance</h3>
      <p>In structural work, there is no room for error. Our quality control team performs Non-Destructive Testing (NDT), including ultrasonic and dye-penetrant inspections of welds, to ensure every joint can withstand its design load.</p>

      <p>From simple platforms to complex industrial frameworks, Balaji Engineering Works provides the expertise and capacity to handle your largest structural challenges.</p>
    `,
    image: "/service-steel-cutting.png"
  },
  {
    slug: "quality-control-sheet-metal",
    title: "Quality Control Practices in Sheet Metal Manufacturing",
    category: "Industry",
    date: "October 18, 2023",
    readTime: "6 min read",
    excerpt: "ISO-compliant quality control in sheet metal shops: dimensional inspection, surface finish checks, and weld quality testing...",
    content: `
      <h2>The Standard of Excellence at Balaji</h2>
      <p>In the world of precision engineering, "good enough" is never enough. Quality control (QC) is the foundation upon which Balaji Engineering Works has built its reputation over the last two decades. We implement a multi-layered QC process that ensures every part leaving our facility exceeds client expectations.</p>

      <h3>1. Incoming Material Inspection</h3>
      <p>Quality begins with the raw material. Every batch of steel is checked against its Mill Test Certificate (MTC) to verify its chemical composition and mechanical properties. This ensures that the material will behave predictably during cutting and bending.</p>

      <h3>2. First-Article Inspection (FAI)</h3>
      <p>Before beginning a full production run, the first piece is meticulously inspected. We check every dimension against the CAD model and technical drawings using precision calipers, micrometers, and height gauges. This step identifies any necessary adjustments to the machine setup before they become costly errors.</p>

      <h3>3. In-Process Monitoring</h3>
      <p>Quality isn't just checked at the end; it's built into every step. Our machine operators are trained to perform regular checks during the production run, ensuring that factors like tool wear or thermal expansion aren't causing dimensions to drift.</p>

      <h3>4. Weld Inspection and Testing</h3>
      <p>For fabricated assemblies, weld quality is paramount. We employ certified welding inspectors who perform visual checks and, where required, Non-Destructive Testing (NDT) such as Magnetic Particle Inspection (MPI) or Dye Penetrant Inspection (DPI) to ensure the integrity of the joints.</p>

      <h3>5. Final Inspection and Documentation</h3>
      <p>The final stage involves a comprehensive review of the finished parts. This includes checking surface finishes, deburring quality, and final dimensional accuracy. We provide full documentation and inspection reports to our clients, ensuring complete traceability.</p>

      <p>Our commitment to quality is what has allowed us to serve industries with the most demanding standards for over 20 years. When you partner with Balaji, you're partnering with a team that takes your precision as seriously as you do.</p>
    `,
    image: "/service-profile.png"
  }
];

export const getBlogPost = (slug: string) => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, category: string, limit = 3) => {
  return blogPosts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
};
