import { HorizonsMiscellaneousType, HorizonsPlanetType, HorizonsSatelliteType, HorizonsStarType } from "@/types/StellarDataAPI";

function getString(text: string, regexFormula: RegExp) {
  const matchData = text.match(regexFormula);
  return matchData ? matchData[1] : null;
}

function getMass(text: string, regexFormula: RegExp) {
  const matchData = text.match(regexFormula);
  return matchData ? matchData[2] + " " + matchData[1] : null;
}

/* Planet Regular Expression Formulas */
const planetNameRegex = /Revised:\s+.*?\s{2,}(.+?)\s+\d+\s*$/m;
const planetMassRegex = /Mass(?:\s*x)?\s*10\^(\d+).*?=\s*~?([+-]?\d+(?:\.\d+)?)/;
const planetRadiusRegex = /Vol\.\s*Mean\s*Radius.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const planetDensityRegex = /Density.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const planetGravityRegex = /Equ\.\s*grav.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const planetEscapeVelocityRegex = /Escape speed.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const planetRotationPeriodRegex = /Sid\.\s*rot\.\s*period.*?=\s*([^\n]+)/;
const planetTemperatureRegex = /Atmos\.\s*temp.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const planetOrbitalPeriodRegex = /Sidereal orbit period\s*=\s*([+-]?\d+(?:\.\d+)?)\s*y/;
const planetOrbitalSpeedRegex = /Mean orbit speed.*?=\s*([+-]?\d+(?:\.\d+)?)/;

function getHorizonsPlanetData(horizonsData: string) {

  /* Creating the Horizons Planet Data object */
  const horizonsPlanetData: HorizonsPlanetType = {
    type: "planet",
    name: getString(horizonsData, planetNameRegex),
    mass: getMass(horizonsData, planetMassRegex),
    radius: getString(horizonsData, planetRadiusRegex),
    density: getString(horizonsData, planetDensityRegex),
    surfaceGravity: getString(horizonsData, planetGravityRegex),
    escapeVelocity: getString(horizonsData, planetEscapeVelocityRegex),
    rotationPeriod: getString(horizonsData, planetRotationPeriodRegex),
    temperature: getString(horizonsData, planetTemperatureRegex),
    orbitalPeriod: getString(horizonsData, planetOrbitalPeriodRegex),
    orbitalSpeed: getString(horizonsData, planetOrbitalSpeedRegex),
  }

  return horizonsPlanetData;
  
}


/* Star Regular Expression Formulas */
const starNameRegex = /Revised:\s+.*?\s{2,}(.+?)\s+\d+\s*$/m;
const starMassRegex = /Mass(?:\s*x)?\s*10\^(\d+).*?=\s*~?([+-]?\d+(?:\.\d+)?)/;
const starRadiusRegex = /Vol\.\s*mean\s*radius.*?=\s*([+-]?\d+(?:\.\d+)?)/i;
const starDensityRegex = /Mean density.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const starGravityRegex = /Surface gravity.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const starEscapeVelocityRegex = /Escape speed.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const starRotationPeriodRegex = /Adopted sid\.\s*rot\.\s*per\.\s*=\s*([+-]?\d+(?:\.\d+)?)/;
const starTemperatureRegex = /Effective temp.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const starLuminosityRegex = /Luminosity.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const starPhotosphericDepthRegex = /Photospheric depth.*?=\s*~?([+-]?\d+(?:\.\d+)?)/;
const starChromosphericDepthRegex = /Chromospheric depth.*?=\s*~?([+-]?\d+(?:\.\d+)?)/;
const starSolarConstant = /Solar constant.*?=\s*([+-]?\d+(?:\.\d+)?)/;

function getHorizonsStarData(horizonsData: string) {

  /* Creating the Horizons Star Data object */
  const horizonsStarData: HorizonsStarType = {
    type: "star",
    name: getString(horizonsData, starNameRegex),
    mass: getMass(horizonsData, starMassRegex),
    radius: getString(horizonsData, starRadiusRegex),
    density: getString(horizonsData, starDensityRegex),
    surfaceGravity: getString(horizonsData, starGravityRegex),
    escapeVelocity: getString(horizonsData, starEscapeVelocityRegex),
    rotationPeriod: getString(horizonsData, starRotationPeriodRegex),
    temperature: getString(horizonsData, starTemperatureRegex),
    luminosity: getString(horizonsData, starLuminosityRegex),
    photosphericDepth: getString(horizonsData, starPhotosphericDepthRegex),
    chromosphericDepth: getString(horizonsData, starChromosphericDepthRegex),
    solarConstant: getString(horizonsData, starSolarConstant),
  }

  return horizonsStarData;
}


/* Satellite Regular Expression Formulas */
const satelliteNameRegex = /Revised:\s+.*?\s{2,}(.+?)\s+\d+\s*$/m;
const satelliteMassRegex = /Mass\s*\(10\^(\d+)\s*kg\s*\)\s*=\s*([+-]?\d+(?:\.\d+)?)/;
const satelliteRadiusRegex = /(?:Mean\s+)?Radius\s*\(km\)\s*=\s*([^\n]+)/;
const satelliteDensityRegex = /Density\s*\(g(?:\/|\s)cm(?:\^?-?3)?\)\s*=\s*([+-]?\d+(?:\.\d+)?)/;
const satelliteSemiMajorAxisRegex = /Semi-major axis.*?=\s*([+-]?\d+(?:\.\d+)?)/;
const satelliteOrbitalPeriodRegex = /Orbital period\s*=\s*([+-]?\d+(?:\.\d+)?)/;
const satelliteEccentricityRegex = /Eccentricity.*?=\s*([+-]?\d+(?:\.\d+)?)/;

function getHorizonsSatelliteData(horizonsData: string) {

  /* Creating the Horizons Satellite Data object */
  const horizonsSatelliteData: HorizonsSatelliteType = {
    type: "satellite",
    name: getString(horizonsData, satelliteNameRegex),
    mass: getMass(horizonsData, satelliteMassRegex),
    radius: getString(horizonsData, satelliteRadiusRegex),
    density: getString(horizonsData, satelliteDensityRegex),
    semiMajorAxis: getString(horizonsData, satelliteSemiMajorAxisRegex),
    orbitalPeriod: getString(horizonsData, satelliteOrbitalPeriodRegex),
    eccentricity: getString(horizonsData, satelliteEccentricityRegex),
  }

  return horizonsSatelliteData;
}

function getHorizonsMiscellaneousData(horizonsData: string) {

  /* Creating the Horizons Satellite Data object */
  const horizonsMiscellaneousData: HorizonsMiscellaneousType = {
    type: "miscellaneous",
    data: horizonsData,
  }

  return horizonsMiscellaneousData;
}

export function getHorizonsData(id: string, horizonsData: string) {
  const numericID = Number(id);
  const lastTwo = numericID % 100;

  if (numericID === 10) {
    return getHorizonsStarData(horizonsData);

  } else if (numericID >= 199 && numericID <= 999 && numericID % 100 === 99) {
    return getHorizonsPlanetData(horizonsData);

  } else if (numericID >= 101 && numericID <= 998 && lastTwo >= 1 && lastTwo < 99) {
    return getHorizonsSatelliteData(horizonsData);

  } else {
    return getHorizonsMiscellaneousData(horizonsData);
  }
}