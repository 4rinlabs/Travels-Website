import type { ItineraryDay } from "./types";

/**
 * Normalizes itinerary data into a clean, strongly-typed ItineraryDay array.
 * Legacy unformatted raw strings from past demo packages are treated as empty,
 * ensuring demo text does not create broken or messy days. Only structured
 * ItineraryDay objects are preserved.
 */
export function normalizeItinerary(raw: (string | ItineraryDay)[] | undefined | null): ItineraryDay[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((item): item is ItineraryDay => typeof item !== "string" && Boolean(item && typeof item === "object"))
    .map((item, idx) => ({
      id: item.id || `day-${idx + 1}`,
      title: item.title || "",
      description: item.description || "",
      activities: Array.isArray(item.activities) ? item.activities.filter(Boolean) : [],
      images: Array.isArray(item.images) ? item.images.filter(Boolean) : [],
      note: item.note || ""
    }));
}
