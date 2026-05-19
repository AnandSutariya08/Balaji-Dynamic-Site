import { useEffect, useState } from "react";

import { isFirebaseConfigured } from "@/lib/firebase";
import { getProducts } from "@/lib/firestore/products";
import type { Product } from "@/lib/firestore/types";

const EMPTY_PRODUCTS: Product[] = [];

async function fetchFromFirestore(): Promise<Product[] | null> {
  if (!isFirebaseConfigured()) return null;

  try {
    const products = await getProducts();
    return products;
  } catch (error) {
    console.warn("Failed to fetch products from Firestore.", error);
    return null;
  }
}

export function useProducts(initialProducts: Product[] = []) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isFirebaseConfigured()) {
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setLoading(true);
    fetchFromFirestore()
      .then((data) => {
        if (cancelled) return;
        setProducts(data ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading };
}
