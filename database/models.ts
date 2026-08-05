import { Schema, model, models } from "mongoose";

const searchDataSchema = new Schema({
  id: {type: String, unique: true},
  name: {type: String, required: true},
  location: {type: String, required: true},
})

const exoplanetDataSchema = new Schema({
  discoveryMethod: String,
  discoveryYear: {type: Number, required: false},

  planetName: {type: String, required: true, unique: true},
  planetRadius: {type: Number, required: false},
  planetMass: {type: Number, required: false},
  planetDensity: {type: Number, required: false},
  planetTemperature: {type: Number, required: false},
  planetStellarFlux: {type: Number, required: false},

  planetOrbitalDistance: {type: Number, required: false},
  planetOrbitalPeriod: {type: Number, required: false},
  planetOrbitalEccentricity: {type: Number, required: false},

  starName: {type: String, required: false},
  starClassification: {type: String, required: false},
  starTemperature: {type: Number, required: false},
  starRadius: {type: Number, required: false},
  starLuminosity: {type: Number, required: false},
  starAge: {type: Number, required: false},
})

const horizonsPlanetSchema = new Schema({
  type: {type: String, required: false},
  name: {type: String, required: true, unique: true},
  mass: {type: String, required: false},
  radius: {type: String, required: false},
  density: {type: String, required: false},
  surfaceGravity: {type: String, required: false},
  escapeVelocity: {type: String, required: false},
  rotationPeriod: {type: String, required: false},
  temperature: {type: String, required: false},
  orbitalPeriod: {type: String, required: false},
  orbitalSpeed: {type: String, required: false},
})

const horizonsStarSchema = new Schema({
  type: {type: String, required: false},
  name: {type: String, required: true, unique: true},
  mass: {type: String, required: false},
  radius: {type: String, required: false},
  density: {type: String, required: false},
  surfaceGravity: {type: String, required: false},
  escapeVelocity: {type: String, required: false},
  rotationPeriod: {type: String, required: false},
  temperature: {type: String, required: false},
  luminosity: {type: String, required: false},
  photosphericDepth: {type: String, required: false},
  chromosphericDepth: {type: String, required: false},
  solarConstant: {type: String, required: false},
})

const horizonsSatelliteSchema = new Schema({
  type: {type: String, required: false},
  name: {type: String, required: true, unique: true},
  mass: {type: String, required: false},
  radius: {type: String, required: false},
  density: {type: String, required: false},
  semiMajorAxis: {type: String, required: false},
  orbitalPeriod: {type: String, required: false},
  eccentricity: {type: String, required: false},
})

const horizonsMiscellaneousSchema = new Schema({
  type: {type: String, required: false},
  data: {type: String, required: false},
})

const Models = {
  SEARCHDATA:
    models.SEARCHDATA ||
    model("SearchData", searchDataSchema, "SearchData"),
  EXOPLANETDATAMODEL:
    models.EXOPLANETDATAMODEL ||
    model("ExoplanetStellarData", exoplanetDataSchema, "ExoplanetStellarData"),
  HORIZONSPLANETMODEL:
    models.HORIZONSPLANETMODEL ||
    model("HorizonsPlanetData", horizonsPlanetSchema, "HorizonsPlanetData"),
  HORIZONSSTARMODEL:
    models.HORIZONSSTARMODEL ||
    model("HorizonsStarData", horizonsStarSchema, "horizonsStarData"),
  HORIZONSSATELLITEMODEL:
    models.HORIZONSSATELLITEMODEL ||
    model("HorizonsSatelliteData", horizonsSatelliteSchema, "HorizonsSatelliteData"),
  HORIZONSMISCELLANEOUSMODEL:
    models.HORIZONSMISCELLANEOUSMODEL ||
    model("HorizonsMiscellaneousData", horizonsMiscellaneousSchema, "HorizonsMiscellaneousData"),
}

export default Models;
