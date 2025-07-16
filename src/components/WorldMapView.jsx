// WorldMap.jsx
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Sample dummy data: country codes mapped to values
const coverageData = {
  ZAF: 24.3, // South Africa
  USA: 12.4,
  BRA: 8.3,
  IND: 6.1,
  RUS: 4.8,
  CHN: 20.0,
};

const colorScale = scaleQuantize()
  .domain([0, 25])
  .range([
    "#50a39f",
    "#b2dfdb",
    "#80cbc4",
    "#4db6ac",
    "#26a69a",
    "#009688",
    "#00796b",
  ]);



const WorldMap = () => {

    const [selectedCountry, setSelectedCountry] = React.useState("ZAF"); // ISO_A3 code for South Africa

  return (
    <ComposableMap projectionConfig={{ scale: 2000, center: [25, -28] }} width={800} height={500}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const code = geo.properties.ISO_A3;
            const value = coverageData[code] || 0;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                // fill={colorScale(value)}
                strokeWidth={0.8}
                fill={
                code === selectedCountry
                    ? "#ff7043" // Selected color
                    : colorScale(selectedCountry)
                }

                style={{
                  default: { outline: "none" },
                  hover: {
                    fill: "#ff7043",
                    outline: "none",
                  },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default WorldMap;