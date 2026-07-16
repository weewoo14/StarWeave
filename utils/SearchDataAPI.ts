import { horizonResultType } from "@/types/SearchDataAPI";
export function getHorizonsData(horizonsResponse: string) {
  if (horizonsResponse === undefined || horizonsResponse === "") return;

  const horizonsResponseLines = horizonsResponse.replace(/\r/g, "").split("\n");
  if (horizonsResponseLines.length === 0) return;

  const horizonsResults: horizonResultType[] = [];

  for (const line of horizonsResponseLines) {
    const match = line.match(/^\s{0,8}(-?\d+)\s{2,}([^\s].*?)(?:\s{2,}|$)/);
    let findBarycenter = false;

    if (match) {
      const barycenterIdx = match[2].trim().indexOf("Barycenter");
      if (barycenterIdx === -1) {
        findBarycenter = true;
      }
    }

    if (match && findBarycenter) {
      horizonsResults.push({
        id: match[1],
        name: match[2].trim(),
      });
    }
  }

  return horizonsResults;
}
