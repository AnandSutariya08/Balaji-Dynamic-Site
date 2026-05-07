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

const STORAGE_KEY = "balaji_inquiries";

export function getInquiries(): Inquiry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveInquiry(data: Omit<Inquiry, "id" | "status" | "createdAt">): Inquiry {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...data,
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  inquiries.unshift(newInquiry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  return newInquiry;
}

export function updateInquiryStatus(id: string, status: InquiryStatus): void {
  const inquiries = getInquiries();
  const idx = inquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    inquiries[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  }
}

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "New",
  "in-progress": "In Progress",
  replied: "Replied",
  closed: "Closed",
};

export const STATUS_COLORS: Record<InquiryStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
  replied: "bg-green-100 text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-500 border-gray-200",
};
