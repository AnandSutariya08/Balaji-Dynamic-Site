import { getPublicProductBySlugFromFirestore, getPublicProductsFromFirestore } from "@/lib/firestore/publicProductsServer";
import type { Product } from "@/lib/firestore/types";

export async function getProductsData(): Promise<Product[]> {
  return getPublicProductsFromFirestore();
}

export async function getProductDataById(id: string): Promise<Product | null> {
  return getPublicProductBySlugFromFirestore(id);
}
