import type { Locale } from "@/contexts/LanguageContext";

export function getCvPreview(locale: Locale) {
  return {
    href:
      locale === "fr" ? "/CV-Walid-Yassine-FR.pdf" : "/CV-Walid-Yassine.pdf",
  };
}
