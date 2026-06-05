import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const COL = "balaji_website_ads";

export type AdType = "image" | "text" | "full";

export interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
  footerText: string;
  type: AdType;
  active: boolean;
  duration: number; // seconds before auto-close
  createdAt?: string;
}

export type AdInput = Omit<Ad, "id" | "createdAt">;

function fromDoc(id: string, data: Record<string, unknown>): Ad {
  return {
    id,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    image: String(data.image ?? ""),
    link: String(data.link ?? ""),
    buttonText: String(data.buttonText ?? "Learn More"),
    footerText: String(data.footerText ?? ""),
    type: (data.type as AdType) ?? "full",
    active: Boolean(data.active ?? false),
    duration: Number(data.duration ?? 8),
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : typeof data.createdAt === "string"
          ? data.createdAt
          : undefined,
  };
}

export async function getAds(): Promise<Ad[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) =>
    fromDoc(d.id, d.data() as Record<string, unknown>),
  );
}

export async function getActiveAd(): Promise<Ad | null> {
  const q = query(
    collection(db, COL),
    where("active", "==", true),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return fromDoc(snap.docs[0].id, snap.docs[0].data() as Record<string, unknown>);
}

export async function addAd(input: AdInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...input,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateAd(id: string, input: Partial<AdInput>): Promise<void> {
  await updateDoc(doc(db, COL, id), { ...input });
}

export async function deleteAd(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
