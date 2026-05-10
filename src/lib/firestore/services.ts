import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc,
  serverTimestamp, orderBy, query, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Service, ServiceInput } from "./types";

const COL = "services";

function fromDoc(id: string, data: any): Service {
  return {
    id,
    title: data.title ?? "",
    tagline: data.tagline ?? "",
    description: data.description ?? "",
    image: data.image ?? "",
    features: data.features ?? [],
    specs: data.specs ?? [],
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
  };
}

export async function getServices(): Promise<Service[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => fromDoc(d.id, d.data()));
}

export async function addService(input: ServiceInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateService(id: string, input: Partial<ServiceInput>): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteService(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
