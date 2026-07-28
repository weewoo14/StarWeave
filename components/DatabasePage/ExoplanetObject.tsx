import { ExoplanetDataType } from "@/types/StellarDataAPI";

import Stat from "../Helper/ObjectStatDisplay";

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

export default function ExoplanetObjectPage({location, exoplanetData}: {location: string, exoplanetData: ExoplanetDataType | null}) {

  if (location !== "exoplanet") {
    return null;
  }

  if (!exoplanetData) {
    return null;
  }

  return (
    <div
      className={`${
        exoplanetData === null ? "hidden" : ""
      } mx-auto max-w-7xl p-8 text-white`}
    >
      {/* Header */}
      <div className="mb-8 rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-8 shadow-xl">
        <h1 className="text-4xl font-bold tracking-wide">
          {exoplanetData?.planetName}
        </h1>

        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-nebulaAccent px-4 py-1 text-sm font-medium">
            {stellarObjectCategory[location]}
          </span>
          
          <span className="rounded-full bg-sky-600 px-4 py-1 text-sm font-medium">
            {exoplanetData?.discoveryMethod}
          </span>

          <span className="rounded-full bg-nebulaObjectCardAccent px-4 py-1 text-sm">
            Discovered {exoplanetData?.discoveryYear}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Planet Summary */}
          <section className="rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-6 shadow-lg">
            <h2 className="mb-5 text-xl font-semibold text-sky-400">
              Planet Summary
            </h2>

            <div className="space-y-4">
              <Stat
                label="Radius"
                value={exoplanetData?.planetRadius}
              />
              <Stat
                label="Mass"
                value={exoplanetData?.planetMass}
              />
              <Stat
                label="Density"
                value={exoplanetData?.planetDensity}
              />
              <Stat
                label="Temperature"
                value={exoplanetData?.planetTemperature}
              />
              <Stat
                label="Stellar Flux"
                value={exoplanetData?.planetStellarFlux}
              />
            </div>
          </section>
      </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Orbit */}
          <section className="rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-6 shadow-lg">
            <h2 className="mb-5 text-xl font-semibold text-sky-400">
              Orbital Characteristics
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Stat
                label="Orbital Distance"
                value={exoplanetData?.planetOrbitalDistance}
              />
              <Stat
                label="Orbital Period"
                value={exoplanetData?.planetOrbitalPeriod}
              />
              <Stat
                label="Eccentricity"
                value={exoplanetData?.planetOrbitalEccentricity}
              />
            </div>
          </section>

          {/* Star */}
          <section className="rounded-2xl border border-nebulaObjectCardAccent bg-nebulaObjectCardBG p-6 shadow-lg">
            <h2 className="mb-5 text-xl font-semibold text-yellow-400">
              Host Star
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <Stat
                label="Name"
                value={exoplanetData?.starName}
              />
              <Stat
                label="Classification"
                value={exoplanetData?.starClassification}
              />
              <Stat
                label="Temperature"
                value={exoplanetData?.starTemperature}
              />
              <Stat
                label="Radius"
                value={exoplanetData?.starRadius}
              />
              <Stat
                label="Luminosity"
                value={exoplanetData?.starLuminosity}
              />
              <Stat
                label="Age"
                value={exoplanetData?.starAge}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}