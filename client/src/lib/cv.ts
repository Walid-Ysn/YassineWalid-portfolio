import type { Locale } from "@/contexts/LanguageContext";

export function getCvPreview(locale: Locale) {
  return {
    href: locale === "fr" ? "/CV-preview-fr.html" : "/CV-preview-en.html",
  };
}
