export function isFirebaseConfigured(): boolean {
  return !!(
    process.env["VITE_FIREBASE_API_KEY"] &&
    process.env["VITE_FIREBASE_PROJECT_ID"]
  );
}

const projectId = () => process.env["VITE_FIREBASE_PROJECT_ID"]!;
const apiKey = () => process.env["VITE_FIREBASE_API_KEY"]!;

const BASE = () =>
  `https://firestore.googleapis.com/v1/projects/${projectId()}/databases/(default)/documents`;

function parseValue(v: any): any {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return parseInt(v.integerValue, 10);
  if ("doubleValue" in v) return parseFloat(v.doubleValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v)
    return (v.arrayValue?.values ?? []).map(parseValue);
  if ("mapValue" in v)
    return parseFields(v.mapValue?.fields ?? {});
  return null;
}

function parseFields(fields: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, val] of Object.entries(fields)) {
    result[key] = parseValue(val);
  }
  return result;
}

function parseDoc(doc: any): Record<string, any> {
  const id = doc.name?.split("/").pop() ?? "";
  return { id, ...parseFields(doc.fields ?? {}) };
}

export async function fetchCollection(collectionId: string): Promise<any[]> {
  const url = `${BASE()}/${collectionId}?key=${apiKey()}&pageSize=100`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Firestore REST error ${res.status}: ${text}`);
  }
  const data = await res.json();
  return (data.documents ?? []).map(parseDoc);
}
