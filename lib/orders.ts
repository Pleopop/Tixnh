export function generateOrderCode(): string {
  return "TINH-" + Date.now().toString(36).toUpperCase();
}
