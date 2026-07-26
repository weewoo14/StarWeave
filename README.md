# StarWeave 🌌

StarWeave is a full-stack astronomy database built with **Next.js**, **React**, and **TypeScript** that allows users to explore celestial objects from multiple scientific data sources through a unified interface.

The project currently integrates data from:

* **NASA Exoplanet Archive** – confirmed exoplanets and host stars
* **JPL Horizons Major Body Database** – planets, natural satellites, the Sun, and other major solar system bodies

---

## Features

### 🔍 Unified Search

* Search for celestial objects across multiple astronomical databases.
* Parses and displays results from:

  * NASA Exoplanet Archive
  * JPL Horizons Major Body Database

### 🪐 Detailed Object Pages

Individual object pages dynamically display information depending on the object type.

Current supported Horizons object types include:

* Planets
* Natural Satellites (Moons)
* Stars (currently the Sun)
* Miscellaneous Horizons objects

Exoplanet pages display both planetary and host star information retrieved from the Exoplanet Archive.

---

## Data Parsing

Rather than displaying raw API responses, StarWeave converts data into strongly typed TypeScript objects.

### Exoplanet Archive

Retrieves information such as:

* Discovery method
* Discovery year
* Planet radius
* Planet mass
* Planet density
* Equilibrium temperature
* Stellar flux
* Orbital distance
* Orbital period
* Orbital eccentricity
* Host star properties

### JPL Horizons

Uses custom Regular Expressions to extract structured data from Horizons' plain-text responses.

Currently supports parsing:

#### Planets

* Name
* Mass
* Radius
* Density
* Surface gravity
* Escape velocity
* Rotation period
* Temperature
* Orbital period
* Orbital speed

#### Stars

* Name
* Mass
* Radius
* Density
* Surface gravity
* Escape velocity
* Rotation period
* Effective temperature
* Luminosity
* Photospheric depth
* Chromospheric depth
* Solar constant

#### Natural Satellites

* Name
* Mass
* Radius
* Density
* Semi-major axis
* Orbital period
* Orbital eccentricity

---

## Technologies

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js Route Handlers
* RESTful API architecture

### External APIs

* NASA Exoplanet Archive (TAP API)
* JPL Horizons API

---

## Project Structure

```
app/
 ├── api/
 │    ├── searchdata/
 │    └── stellardata/
 │
 ├── database/
 │    └── [location]/[name]
 │
components/
 ├── DatabasePage/
 ├── HorizonObject/
 └── Helper/

utils/
 ├── SearchDataAPI.ts
 └── StellarDataAPI.ts

types/
```

---

## Current Architecture

```
User
   │
   ▼
Next.js Frontend
   │
   ▼
Next.js API Routes
   │
   ├── NASA Exoplanet Archive
   └── JPL Horizons API
   │
   ▼
TypeScript Parsing Layer
   │
   ▼
Strongly Typed Objects
   │
   ▼
React Components
```

---

## Current Progress

* ✅ Search system implemented
* ✅ NASA Exoplanet Archive integration
* ✅ JPL Horizons integration
* ✅ Strongly typed data models
* ✅ Automatic parsing of Horizons text responses
* ✅ Dynamic rendering based on celestial object type
* ✅ Individual pages for planets, stars, satellites, and miscellaneous Horizons objects

---

## Future Improvements

* Database caching to reduce external API latency
* Background synchronization of astronomical datasets
* Expanded Horizons object support (spacecraft, asteroids, comets)
* Orbital visualizations
* Interactive celestial object comparisons
* Advanced filtering and search options
* Unit conversion support
* Mobile UI improvements
* User favorites and saved objects

---

## License

This project is licensed under the MIT License.
