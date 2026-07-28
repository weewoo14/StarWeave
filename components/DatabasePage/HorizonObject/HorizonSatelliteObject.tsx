import Stat from "@/components/Helper/ObjectStatDisplay";
import { HorizonsDataType } from "@/types/StellarDataAPI";

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

export default function HorizonSatellitetObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {
  if (location !== "horizons") {
    return null;
  }

  if (!horizonsData || horizonsData.type !== "satellite") {
    return null;
  }

  return (
    <div
      className={`${
        horizonsData === null ? "hidden" : ""
      } mx-auto max-w-7xl p-8 text-white`}
    >
      {/* Header */}
      <div className="mb-8 rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-8 shadow-xl">
        <h1 className="text-4xl font-bold tracking-wide">
          {horizonsData?.name}
        </h1>

        <div className="mt-4 flex flex-wrap gap-3">

          <span className="rounded-full bg-nebulaAccent px-4 py-1 text-sm font-medium">
            {stellarObjectCategory[location]}
          </span>
          
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Satellite Summary */}
        <section className="rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-6 shadow-lg">
          <h2 className="mb-5 text-xl font-semibold text-yellow-400">
            Satellite Summary
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Stat
              label="Name"
              value={horizonsData?.name}
            />
            <Stat
              label="Mass"
              value={horizonsData?.mass}
            />
            <Stat
              label="Radius"
              value={horizonsData?.radius}
            />
            <Stat
              label="Density"
              value={horizonsData?.density}
            />

          </div>
        </section>

        {/* Other Facts */}
        <section className="rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-6 shadow-lg">
          <h2 className="mb-5 text-xl font-semibold text-yellow-400">
            Other Facts
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Stat
              label="Semi-Major Axis"
              value={horizonsData?.semiMajorAxis}
            />
            <Stat
              label="Orbital Period"
              value={horizonsData?.orbitalPeriod}
            />
            <Stat
              label="Eccentricity"
              value={horizonsData?.eccentricity}
            />
          </div>
        </section>
      </div>
    </div>
  );
}