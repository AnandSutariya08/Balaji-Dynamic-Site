import { useState, useEffect } from "react";
import { getServices } from "@/lib/firestore/services";
import { staticServices } from "@/lib/servicesData";
import { isFirebaseConfigured } from "@/lib/firebase";
import type { Service } from "@/lib/firestore/types";

export function useServices() {
  const [services, setServices] = useState<Service[]>(staticServices);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    setLoading(true);
    getServices()
      .then((data) => {
        if (data.length > 0) setServices(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}
