export function safeImage(src?: string | null) {
  if (!src) return "/packages/default.jpg";

  const cleaned = src.replace(/\\/g, "/").trim();

  if (
    cleaned.startsWith("https://") ||
    cleaned.startsWith("http://")
  ) {
    return cleaned;
  }

  if (cleaned.startsWith("/")) {
    return cleaned;
  }

  return "/" + cleaned;
}