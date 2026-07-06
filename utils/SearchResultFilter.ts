import { stellarObjectResultType } from "@/types/SearchDataAPI";

export function filterSearchResult(stellarObjectData: stellarObjectResultType[], matchText: string) {
    const filteredStellarObjectData: stellarObjectResultType[] = [];
    for (const stellarObject of stellarObjectData) {
        if (stellarObject.name.toLowerCase().startsWith(matchText) && filteredStellarObjectData.length < 10) {
            filteredStellarObjectData.push({
                name: stellarObject.name,
                location: stellarObject.location
            })
        } 
    }
    return filteredStellarObjectData;
}