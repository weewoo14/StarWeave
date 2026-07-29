import { HorizonsDataType } from "@/types/StellarDataAPI";

export default function HorizonMiscellaneousObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {

  if (location !== "horizons") {
    return null;
  }

  if (!horizonsData || horizonsData.type !== "miscellaneous") {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#4C46A3] bg-[#211B4A] shadow-lg">
    <div className="border-b border-[#4C46A3] px-6 py-4">
      <h2 className="text-xl font-semibold text-white">
        Raw Horizons Output
      </h2>

      <p className="mt-1 text-sm text-gray-400">
        This object does not have a standardized structure and is displayed as
        returned by the JPL Horizons system.
      </p>
    </div>

    <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-words p-6 font-mono text-sm leading-7 text-gray-200">
      {horizonsData.data}
    </pre>
  </div>
  );
}