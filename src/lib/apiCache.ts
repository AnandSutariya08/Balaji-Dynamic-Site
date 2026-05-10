export async function triggerCacheRefresh(): Promise<void> {
  try {
    await fetch("/api/refresh", { method: "POST" });
  } catch {
    // Non-critical — public pages still read from Firestore directly as fallback
  }
}
