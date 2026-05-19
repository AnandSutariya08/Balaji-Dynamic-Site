export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: "Technical" | "Guide" | "Industry";
  readTime: string;
  date: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BlogInput = Omit<BlogPost, "id">;

export interface ServiceSpec {
  label: string;
  value: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs: ServiceSpec[];
  createdAt?: string;
  updatedAt?: string;
}

export type ServiceInput = Omit<Service, "id">;

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  specs: ProductSpec[];
  applications: string[];
  process: string[];
  faqs: ProductFaq[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProductInput = Omit<Product, "id">;

export type InquiryStatus = "new" | "in-progress" | "replied" | "closed";

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  quantity: string;
  material: string;
  message: string;
  source?: string;
  status: InquiryStatus;
  createdAt: string;
}

export type InquiryInput = Omit<Inquiry, "id" | "status" | "createdAt">;

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type GalleryInput = Omit<GalleryItem, "id">;
