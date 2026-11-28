import type { Map as MapLibreMap } from "maplibre-gl";
import { openStreetMapColors } from "../theme";

const colors = openStreetMapColors.basemap;

const fillColors: Record<string, string> = {
  park: colors.park,
  landuse_residential: colors.residential,
  landcover_wood: colors.woodland,
  landcover_grass: colors.grass,
  landcover_wetland: colors.wetland,
  landcover_sand: colors.sand,
  landcover_ice: colors.ice,
  landuse_cemetery: colors.cemetery,
  landuse_school: colors.school,
  landuse_hospital: colors.hospital,
  landuse_pitch: colors.sportsGround,
  landuse_track: colors.runningTrack,
  water: colors.water,
  building: colors.building,
  aeroway_fill: colors.airport,
  road_area_pattern: colors.pedestrianArea,
};

export function applyOpenStreetMapColors(map: MapLibreMap) {
  for (const layer of map.getStyle().layers) {
    const { id, type } = layer;
    const source = "source-layer" in layer ? layer["source-layer"] : undefined;

    switch (type) {
      case "background":
        map.setPaintProperty(id, "background-color", colors.land);
        break;
      case "raster":
        if (id === "natural_earth") map.setLayoutProperty(id, "visibility", "none");
        break;
      case "fill":
        if (fillColors[id]) map.setPaintProperty(id, "fill-color", fillColors[id]);
        if (id === "landcover_wetland" || id === "road_area_pattern") {
          map.setPaintProperty(id, "fill-pattern", null);
        }
        if (id === "park") map.setPaintProperty(id, "fill-outline-color", colors.parkOutline);
        if (id === "building") map.setPaintProperty(id, "fill-outline-color", colors.buildingOutline);
        break;
      case "fill-extrusion":
        if (source === "building") map.setPaintProperty(id, "fill-extrusion-color", colors.building);
        break;
      case "line":
        if (source === "transportation") {
          map.setPaintProperty(id, "line-color", transportColor(id));
        }
        if (source === "park") map.setPaintProperty(id, "line-color", colors.parkOutline);
        if (source === "waterway") map.setPaintProperty(id, "line-color", colors.water);
        if (source === "aeroway") map.setPaintProperty(id, "line-color", colors.airport);
        if (source === "boundary") map.setPaintProperty(id, "line-color", colors.boundary);
        break;
      case "symbol":
        if (layer.layout?.["text-field"]) {
          const waterLabel = source === "waterway" || source === "water_name";
          map.setPaintProperty(id, "text-color", waterLabel ? colors.waterLabel : colors.label);
          map.setPaintProperty(id, "text-halo-color", colors.labelHalo);
        }
        break;
    }
  }
}

function transportColor(id: string) {
  if (id.endsWith("_casing")) return colors.roadOutline;
  if (id.endsWith("_hatching")) return colors.railHatching;
  if (id.includes("_rail")) return colors.rail;
  if (id.includes("_motorway")) return colors.motorway;
  if (id.includes("_trunk_primary") || id.includes("_secondary_tertiary")) return colors.majorRoad;
  return colors.minorRoad;
}
