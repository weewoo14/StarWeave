import Stat from "@/components/Helper/ObjectStatDisplay";
import { HorizonsDataType } from "@/types/StellarDataAPI";

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

export default function HorizonPlanetObjectPage({location, horizonsData}: {location: string, horizonsData: HorizonsDataType | null}) {

  if (location !== "horizons") {
    return null;
  }

  if (!horizonsData || horizonsData.type !== "planet") {
    return null;
  }

  const [value, exponent] = horizonsData?.mass?.split(" ") ?? [];

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
        {/* Planet Summary */}
        <section className="rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-6 shadow-lg">
          <h2 className="mb-5 text-xl font-semibold text-yellow-400">
            Planet Summary
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Stat
              label="Name"
              value={horizonsData?.name}
              unit=""
            />
            <Stat
              label="Mass"
              value={`${value} x 10^${exponent}`}
              unit="KG"
            />
            <Stat
              label="Radius"
              value={horizonsData?.radius}
              unit="KM"
            />
            <Stat
              label="Density"
              value={horizonsData?.density}
              unit="GM/CM^3"
            />
            <Stat
              label="Surface Gravity"
              value={horizonsData?.surfaceGravity}
              unit="M/S^2"
            />
            <Stat
              label="Temperature"
              value={horizonsData?.temperature}
              unit="K"
            />
          </div>
        </section>

        {/* Orbital Characteristics */}
        <section className="rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-6 shadow-lg">
          <h2 className="mb-5 text-xl font-semibold text-yellow-400">
            Orbital Characteristics
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Stat
              label="Orbital Period"
              value={horizonsData?.orbitalPeriod}
              unit="YRS"
            />
            <Stat
              label="Orbital Speed"
              value={horizonsData?.orbitalSpeed}
              unit="KM/S"
            />
            <Stat
              label="Escape Velocity"
              value={horizonsData?.escapeVelocity}
              unit="KM/S"
            />
            <Stat
              label="Rotation Period"
              value={horizonsData?.rotationPeriod}
              unit=""
            />
          </div>
        </section>
      </div>
    </div>
  );
}