import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const COL = "balaji_website_cillection";

export interface VisitorRecord {
  id: string;
  timestamp: string;
  date: string;
  site: string;
  url: string;
  referrer: string;
  browser: string;
  os: string;
  device: string;
  screenW: number;
  screenH: number;
  language: string;
  timezone: string;
  ip: string;
  city: string;
  region: string;
  country: string;
  lat: number | null;
  lng: number | null;
  isp: string;
  createdAt?: string;
}

export type VisitorInput = Omit<VisitorRecord, "id" | "createdAt">;

function fromDoc(id: string, data: Record<string, unknown>): VisitorRecord {
  return {
    id,
    timestamp: String(data.timestamp ?? ""),
    date: String(data.date ?? ""),
    site: String(data.site ?? ""),
    url: String(data.url ?? ""),
    referrer: String(data.referrer ?? ""),
    browser: String(data.browser ?? ""),
    os: String(data.os ?? ""),
    device: String(data.device ?? ""),
    screenW: Number(data.screenW ?? 0),
    screenH: Number(data.screenH ?? 0),
    language: String(data.language ?? ""),
    timezone: String(data.timezone ?? ""),
    ip: String(data.ip ?? ""),
    city: String(data.city ?? ""),
    region: String(data.region ?? ""),
    country: String(data.country ?? ""),
    lat: data.lat != null ? Number(data.lat) : null,
    lng: data.lng != null ? Number(data.lng) : null,
    isp: String(data.isp ?? ""),
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString()
        : typeof data.createdAt === "string"
          ? data.createdAt
          : undefined,
  };
}

export async function saveVisitorRecord(input: VisitorInput): Promise<void> {
  await addDoc(collection(db, COL), {
    ...input,
    createdAt: serverTimestamp(),
  });
}

export async function getVisitors(): Promise<VisitorRecord[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) =>
    fromDoc(d.id, d.data() as Record<string, unknown>),
  );
}

export async function deleteVisitor(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
