import { stellarObjectResultType } from "@/types/SearchDataAPI";

export function filterSearchResult(
  stellarObjectData: stellarObjectResultType[],
  matchText: string,
  amount: number
) {
  const filteredStellarObjectData: stellarObjectResultType[] = [];
  for (const stellarObject of stellarObjectData) {
    if (
      stellarObject.name.toLowerCase().startsWith(matchText.toLowerCase()) &&
      filteredStellarObjectData.length < amount
    ) {
      filteredStellarObjectData.push({
        id: stellarObject.id,
        name: stellarObject.name,
        location: stellarObject.location,
      });
    }
  }
  return filteredStellarObjectData;
}
