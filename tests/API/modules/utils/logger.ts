export function logRequest(method: string, endpoint: string, status: number) {
  console.log(`[${method}] ${endpoint} → ${status}`);
}
