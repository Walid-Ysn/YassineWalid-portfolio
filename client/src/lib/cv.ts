import type { Locale } from "@/contexts/LanguageContext";

export function getCvPreview(locale: Locale) {
  return {
    href:
      locale === "fr" ? "/CV-Walid-Yassine-FR.pdf" : "/CV-Walid-Yassine.pdf",
  };
}

/**
 * Opens a fetched CV as a blob URL so browsers render it in their PDF viewer
 * even when the hosting layer marks the original PDF response as a download.
 */
export async function openCvPreview(href: string) {
  const previewWindow = window.open("about:blank", "_blank");

  try {
    const response = await fetch(href);
    if (!response.ok) throw new Error(`Unable to load CV: ${response.status}`);

    const pdfBlob = await response.blob();
    const blobUrl = URL.createObjectURL(pdfBlob);

    if (previewWindow) {
      previewWindow.location.href = blobUrl;
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    } else {
      window.open(blobUrl, "_blank");
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    }
  } catch (error) {
    previewWindow?.close();
    // Keep the original link as a graceful fallback if the fetch is blocked.
    window.open(href, "_blank", "noopener,noreferrer");
    console.error("CV preview failed", error);
  }
}
