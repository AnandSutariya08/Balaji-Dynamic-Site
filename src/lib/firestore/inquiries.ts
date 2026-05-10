import {
  collection, doc, getDocs, addDoc, updateDoc,
  serverTimestamp, orderBy, query, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Inquiry, InquiryInput, InquiryStatus } from "./types";

const COL = "inquiries";

function fromDoc(id: string, data: any): Inquiry {
  return {
    id,
    name: data.name ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    service: data.service ?? "",
    quantity: data.quantity ?? "",
    material: data.material ?? "",
    message: data.message ?? "",
    status: data.status ?? "new",
    createdAt: data.createdAt instanceof Timestamp
      ? data.createdAt.toDate().toISOString()
      : (data.createdAt ?? new Date().toISOString()),
  };
}

export async function getInquiries(): Promise<Inquiry[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => fromDoc(d.id, d.data()));
}

export async function addInquiry(input: InquiryInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...input,
    status: "new",
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<void> {
  await updateDoc(doc(db, COL, id), { status, updatedAt: serverTimestamp() });
}
