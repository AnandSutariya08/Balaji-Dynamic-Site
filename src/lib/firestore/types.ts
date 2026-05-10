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
  status: InquiryStatus;
  createdAt: string;
}

export type InquiryInput = Omit<Inquiry, "id" | "status" | "createdAt">;
