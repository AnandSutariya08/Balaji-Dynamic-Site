import { useState, useEffect } from "react";
import { staticServices } from "@/lib/servicesData";
import type { Service } from "@/lib/firestore/types";

async function fetchFromApi(): Promise<Service[] | null> {
  try {
    const res = await fetch("/api/services");
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export function useServices(initialServices: Service[] = staticServices) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromApi()
      .then((data) => {
        if (data) setServices(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}
