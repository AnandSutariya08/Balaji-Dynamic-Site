import type { Product } from "@/lib/firestore/types";
import { staticServices } from "@/lib/servicesData";

export type InquiryOption = {
  value: string;
  label: string;
};

export function getInquiryOptions(products: Product[] = []): InquiryOption[] {
  const baseOptions: InquiryOption[] = [
    ...staticServices.map((service) => ({
      value: service.id,
      label: service.title,
    })),
    ...products.map((product) => ({
      value: product.id,
      label: product.title,
    })),
    { value: "other", label: "Other / Custom Fabrication" },
  ];

  const seen = new Set<string>();
  return baseOptions.filter((option) => {
    if (seen.has(option.value)) return false;
    seen.add(option.value);
    return true;
  });
}

export const INQUIRY_OPTIONS = getInquiryOptions([]);

export function getInquiryLabel(
  value: string,
  options: InquiryOption[] = INQUIRY_OPTIONS,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}
