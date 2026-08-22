import type { Locale } from "@/contexts/LanguageContext";

export function getCvDownload(locale: Locale) {
  const isFrench = locale === "fr";

  return {
    href: isFrench ? "/CV-Walid-Yassine-FR.pdf" : "/CV-Walid-Yassine.pdf",
    filename: isFrench ? "CV-Yassine-WALID-FR.pdf" : "CV-Yassine-WALID-EN.pdf",
  };
}
