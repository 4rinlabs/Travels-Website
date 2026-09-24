import { ItineraryDay } from "./types";

/**
 * Normalizes any itinerary data (legacy string array, mixed, or missing fields)
 * into a clean, strongly-typed ItineraryDay array with stable unique IDs.
 */
export function normalizeItinerary(raw: (string | ItineraryDay)[] | undefined | null): ItineraryDay[] {
  if (!Array.isArray(raw)) return [];

  return raw.map((item, idx) => {
    if (typeof item === "string") {
      return {
        id: `day-${idx + 1}`,
        title: "",
        description: item,
        activities: [],
        images: [],
        note: ""
      };
    }

    return {
      id: item?.id || `day-${idx + 1}`,
      title: item?.title || "",
      description: item?.description || "",
      activities: Array.isArray(item?.activities) ? item.activities.filter(Boolean) : [],
      images: Array.isArray(item?.images) ? item.images.filter(Boolean) : [],
      note: item?.note || ""
    };
  });
}
