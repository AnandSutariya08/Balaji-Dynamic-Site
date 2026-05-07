import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  serverTimestamp, orderBy, query, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost, BlogInput } from "./types";

const COL = "blog-posts";

function fromDoc(id: string, data: any): BlogPost {
  return {
    id,
    slug: data.slug ?? "",
    title: data.title ?? "",
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    image: data.image ?? "",
    category: data.category ?? "Technical",
    readTime: data.readTime ?? "",
    date: data.date ?? "",
    author: data.author ?? "",
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : data.createdAt,
    updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate().toISOString() : data.updatedAt,
  };
}

export async function getBlogs(): Promise<BlogPost[]> {
  const q = query(collection(db, COL), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => fromDoc(d.id, d.data()));
}

export async function getBlog(id: string): Promise<BlogPost | null> {
  const snap = await getDoc(doc(db, COL, id));
  if (!snap.exists()) return null;
  return fromDoc(snap.id, snap.data());
}

export async function addBlog(input: BlogInput): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateBlog(id: string, input: Partial<BlogInput>): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...input,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBlog(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id));
}
