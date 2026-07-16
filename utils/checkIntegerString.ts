export default function isIntegerString(str: string) {
  if (!str) return false;
  return str.trim() !== "" && Number.isInteger(Number(str));
}