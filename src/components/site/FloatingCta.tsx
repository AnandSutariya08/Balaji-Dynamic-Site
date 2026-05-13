"use client";

import { useMemo } from "react";

export function FloatingCta() {
  const href = useMemo(() => {
    const phone = "919978753398";
    const message =
      "Hi Balaji Engineering Works, I’d like to request a quote. Please guide me on the required details/files.";
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_60px_rgba(37,211,102,0.35)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30 leading-none">
        <svg
          viewBox="0 0 24 24"
          className="block h-7 w-7"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.134.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347zM12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.75.454 3.458 1.312 4.97L2 22l5.146-1.318a9.96 9.96 0 0 0 4.858 1.254h.001c5.514 0 9.997-4.483 9.997-9.997 0-5.514-4.483-9.936-9.998-9.936zm0 18.12a8.28 8.28 0 0 1-4.225-1.162l-.303-.18-3.057.783.815-2.987-.194-.312A8.27 8.27 0 0 1 3.721 12c0-4.556 3.706-8.262 8.262-8.262 4.556 0 8.262 3.706 8.262 8.262 0 4.556-3.706 8.123-8.241 8.123z"
          />
        </svg>
      </div>
    </a>
  );
}
