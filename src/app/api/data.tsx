import { getImgPath } from "@/utils/image";

export const menuItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "/#blog" },
];

export const count = [
    {
        icon: getImgPath("/images/counter/star.svg"),
        value: "4.86",
        description: "Out of 5 stars from 3896 reviews on Google platform",
    },
    {
        icon: getImgPath("/images/counter/admin.svg"),
        value: "364",
        description: "Client testimonials received in the year 2024-2025",
    },
    {
        icon: getImgPath("/images/counter/bag.svg"),
        value: "50K",
        description: "Revenue generated through new projects & marketing",
    },
];

export const Progress = [
  { title: "Web Development (React & Node.js)", Progress: 95 },
  { title: "Data Scraping & Automation", Progress: 90 },
  { title: "E-commerce Product Management", Progress: 88 },
  { title: "Virtual Assistant Services", Progress: 92 },
  { title: "Data Entry & Processing", Progress: 85 },
];

export const serviceCategories = [
  {
    id: 1,
    slug: "web-development",
    icon: "/images/services/perfomance-optimization.svg",
    title: "Web & Software Development",
    shortDescription: "Modern, fast and scalable web development solutions.",
    services: [
      "Custom Website Development",
      "Bug Fixing (Node.js & JavaScript)",
      "Landing Page Development (React & Tailwind CSS)",
      "MongoDB Code Fix & Optimization",
      "Chatbot Development",
    ],
  },
  {
    id: 2,
    slug: "virtual-assistance",
    icon: "/images/services/ux-design-product_1.svg",
    title: "Virtual Assistance & Business Support",
    shortDescription: "Daily business tasks, admin work and virtual help.",
    services: [
      "Virtual Assistant Services",
      "Data Entry",
      "Data Collection",
      "PDF to Excel Conversion",
      "Word to Excel Conversion",
    ],
  },
  {
    id: 3,
    slug: "data-services",
    icon: "/images/services/ux-design-product_2.svg",
    title: "Data & Research",
    shortDescription: "Accurate data scraping, collection & research.",
    services: [
      "Web Research",
      "Data Scraping",
      "Lead Generation",
      "LinkedIn Profile Creation & Optimization",
    ],
  },
  {
    id: 4,
    slug: "design-branding",
    icon: "/images/services/perfomance-optimization.svg",
    title: "Design & Branding",
    shortDescription: "Creative design and powerful visual brand identity.",
    services: [
      "Graphic Design",
      "Branding & Identity Design",
      "Book Cover & Interior Design",
      "Photo Editing",
      "Wedding Banner Design",
    ],
  },
  {
    id: 5,
    slug: "social-media-marketing",
    icon: "/images/services/ux-design-product_1.svg",
    title: "Social Media & Marketing",
    shortDescription: "Grow your online presence and reach new customers.",
    services: ["Social Media Management", "Facebook Ads Management"],
  },
];


export const portfolioinfo = [
    {
        image: getImgPath('/images/portfolio/cozycasa.png'),
        alt: 'Portfolio',
        title: 'Cozycasa',
        slug: 'Cozycasa',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/mars.png'),
        alt: 'Portfolio',
        title: 'Mars',
        slug: 'Mars',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/humans.png'),
        alt: 'Portfolio',
        title: 'Everyday Humans',
        slug: 'everyday-humans',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/roket-squred.png'),
        alt: 'Portfolio',
        title: 'Rocket Squared',
        slug: 'rocket-squared',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/panda-logo.png'),
        alt: 'Portfolio',
        title: 'Panda Logo',
        slug: 'panda-logo',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/humans.png'),
        alt: 'Portfolio',
        title: 'Fusion Dynamics',
        slug: 'fusion-dynamics',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/cozycasa.png'),
        alt: 'Portfolio',
        title: 'InnovateX Ventures',
        slug: 'innovate-x-ventures',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/mars.png'),
        alt: 'Portfolio',
        title: 'Nebula Holdings',
        slug: 'nebula-holdings',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    {
        image: getImgPath('/images/portfolio/panda-logo.png'),
        alt: 'Portfolio',
        title: 'Summit Partners',
        slug: 'summit-partners',
        info: 'Designation',
        Class: 'md:mt-24'
    },
    {
        image: getImgPath('/images/portfolio/roket-squred.png'),
        alt: 'Portfolio',
        title: 'Apex Strategies',
        slug: 'apex-strategies',
        info: 'Designation',
        Class: 'md:mt-0'
    },
    
]