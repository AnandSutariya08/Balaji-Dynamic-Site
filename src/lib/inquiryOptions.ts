import { staticProducts } from "@/lib/productsData";
import { staticServices } from "@/lib/servicesData";

export const INQUIRY_OPTIONS = [
  ...staticServices.map((service) => ({
    value: service.id,
    label: service.title,
  })),
  ...staticProducts.map((product) => ({
    value: product.id,
    label: product.title,
  })),
  { value: "other", label: "Other / Custom Fabrication" },
] as const;

export function getInquiryLabel(value: string) {
  return INQUIRY_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
