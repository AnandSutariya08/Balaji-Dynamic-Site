import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, orderBy, query, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { GalleryItem, GalleryInput } from "./types";

const COL = "gallery";

function fromDoc(id: string, data: any): GalleryItem {
  return {
    id,
    title: data.title ?? "",
    description: data.description ?? "",
    image: data.image ?? "",
    category: data.category ?? "General",
    order: data.order ?? 0,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => fromDoc(d.id, d.data()));
}

export async function getGalleryItem(id: string): Promise<GalleryItem | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return fromDoc(snap.id, snap.data());
}

export async function addGalleryItem(input: GalleryInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateGalleryItem(id: string, input: Partial<GalleryInput>): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
