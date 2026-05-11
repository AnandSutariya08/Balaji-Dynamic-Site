import { useState, useEffect } from "react";
import { staticServices } from "@/lib/servicesData";
import type { Service } from "@/lib/firestore/types";

export function useServices(initialServices: Service[] = staticServices) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setServices(initialServices);
  }, [initialServices]);

  return { services, loading };
}
