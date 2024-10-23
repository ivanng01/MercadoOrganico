import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  const currencySymbol = import.meta.env.VITE_CURRENCY_SYMBOL || "USD";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencySymbol,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export const generateEAN8SKUFromID = (id: number): string => {
  if (isNaN(id)) {
    return "00000000";
  }
  return String(id).padStart(8, "0");
};

export const handleUpClick = (): void => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
