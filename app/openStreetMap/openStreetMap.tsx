"use client";

import "leaflet/dist/leaflet.css";
import "maplibre-gl/dist/maplibre-gl.css";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { circleMarker, layerGroup, map, polyline } from "leaflet";
import type { LatLng, LatLngTuple, LayerGroup, LeafletMouseEvent, Map } from "leaflet";
import { maplibreGL } from "@maplibre/maplibre-gl-leaflet";
import { setWorkerUrl } from "maplibre-gl";
import { openStreetMapColors } from "../theme";
import { applyOpenStreetMapColors } from "./openStreetMapBasemap";

setWorkerUrl(new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).href);

export type MapZoom = { level: number; min: number; max: number };

type OpenStreetMapProps = {
  measuring: boolean;
  points: LatLng[];
  onAddPoint: (point: LatLng) => void;
  location: LatLngTuple | null;
  zoomLevel: number | undefined;
  onZoomChange: (zoom: MapZoom) => void;
};

const axisLabelStyle: CSSProperties = {
  position: "absolute",
  padding: "2px 12px",
  borderRadius: 12,
  border: "1px solid",
  borderColor: openStreetMapColors.map.crosshairOutline,
  backgroundColor: openStreetMapColors.map.axisLabelBackground,
  color: openStreetMapColors.map.axisLabelText,
  fontSize: 12,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
};

export default function OpenStreetMap({ measuring, points, onAddPoint, location, zoomLevel, onZoomChange }: OpenStreetMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const measurementLayer = useRef<LayerGroup | null>(null);
  const [crosshair, setCrosshair] = useState<{ x: number; y: number; coordinates: LatLng } | null>(null);

  function moveCrosshair(event: PointerEvent<HTMLDivElement>) {
    const instance = mapRef.current;
    if (!measuring || !instance || event.pointerType === "touch") return;

    const position = instance.mouseEventToContainerPoint(event.nativeEvent);
    setCrosshair({
      x: position.x,
      y: position.y,
      coordinates: instance.containerPointToLatLng(position).wrap(),
    });
  }

  useEffect(() => {
    if (!container.current) return;

    const element = container.current;
    const instance = map(element, {
      zoomControl: false,
      zoomAnimation: false,
      maxZoom: 20,
      zoom: 7,
    }).fitBounds([[52.5, 13.1], [52.5, 13.6]]);
    mapRef.current = instance;

    const basemap = maplibreGL({
      style: "https://tiles.openfreemap.org/styles/liberty",
      attributionControl: {
        customAttribution: '<a href="https://openfreemap.org/">OpenFreeMap</a> · &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> · Data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    }).addTo(instance);
    const vectorMap = basemap.getMaplibreMap();
    vectorMap.on("style.load", () => applyOpenStreetMapColors(vectorMap));
    measurementLayer.current = layerGroup().addTo(instance);

    const reportZoom = () => onZoomChange({
      level: instance.getZoom(),
      min: instance.getMinZoom(),
      max: instance.getMaxZoom(),
    });
    instance.on("zoomend", reportZoom);
    reportZoom();

    const observer = new ResizeObserver(() => instance.invalidateSize({ animate: false }));
    observer.observe(element);
    return () => {
      observer.disconnect();
      instance.off("zoomend", reportZoom);
      instance.remove();
      mapRef.current = null;
      measurementLayer.current = null;
    };
  }, [onZoomChange]);

  useEffect(() => {
    const instance = mapRef.current;
    if (instance && zoomLevel !== undefined && instance.getZoom() !== zoomLevel) {
      instance.setZoom(zoomLevel, { animate: false });
    }
  }, [zoomLevel]);

  useEffect(() => {
    if (location) mapRef.current?.setView(location, 14, { animate: false });
  }, [location]);

  useEffect(() => {
    const instance = mapRef.current;
    if (!instance) return;

    const activeHandlers = [
      instance.dragging,
      instance.touchZoom,
      instance.doubleClickZoom,
      instance.scrollWheelZoom,
      instance.boxZoom,
      instance.keyboard,
    ].filter((handler) => handler?.enabled());

    if (measuring) {
      instance.stop();
      activeHandlers.forEach((handler) => handler.disable());
    } else {
      setCrosshair(null);
    }

    const addPoint = (event: LeafletMouseEvent) => onAddPoint(event.latlng);
    if (measuring) instance.on("click", addPoint);
    return () => {
      instance.off("click", addPoint);
      if (measuring && mapRef.current === instance) {
        activeHandlers.forEach((handler) => handler.enable());
      }
    };
  }, [measuring, onAddPoint]);

  useEffect(() => {
    const layer = measurementLayer.current;
    if (!layer) return;

    layer.clearLayers();
    if (points.length > 1) {
      polyline(points, { color: openStreetMapColors.map.measurement, weight: 4, interactive: false }).addTo(layer);
    }
    points.forEach((point) => {
      circleMarker(point, {
        radius: 6,
        color: openStreetMapColors.map.markerOutline,
        weight: 2,
        fillColor: openStreetMapColors.map.measurement,
        fillOpacity: 1,
        interactive: false,
      }).addTo(layer);
    });
  }, [points]);

  const visibleCrosshair = measuring ? crosshair : null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <div
        ref={container}
        role="region"
        aria-label="OpenStreetMap"
        onPointerMove={moveCrosshair}
        onPointerLeave={() => setCrosshair(null)}
        style={{ width: "100%", height: "100%", isolation: "isolate", cursor: visibleCrosshair ? "none" : undefined }}
      />
      {visibleCrosshair && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute",
            insetInline: 0,
            top: visibleCrosshair.y,
            borderTop: `1px solid ${openStreetMapColors.map.crosshair}`,
            boxShadow: `0 1px ${openStreetMapColors.map.crosshairOutline}`,
          }} />
          <div style={{
            position: "absolute",
            insetBlock: 0,
            left: visibleCrosshair.x,
            borderLeft: `1px solid ${openStreetMapColors.map.crosshair}`,
            boxShadow: `1px 0 ${openStreetMapColors.map.crosshairOutline}`,
          }} />
          <span style={{
            ...axisLabelStyle,
            left: 6,
            top: `clamp(28px, ${visibleCrosshair.y}px, calc(100% - 14px))`,
            transform: "translateY(-50%)",
            fontFamily: "monospace",
            fontWeight: 700,
          }}>
            Lat {visibleCrosshair.coordinates.lat.toFixed(5)}°
          </span>
          <span style={{
            ...axisLabelStyle,
            top: 6,
            left: `clamp(58px, ${visibleCrosshair.x}px, calc(100% - 58px))`,
            transform: "translateX(-50%)",
            fontFamily: "monospace",
            fontWeight: 700,
          }}>
            Lon {visibleCrosshair.coordinates.lng.toFixed(5)}°
          </span>
        </div>
      )}
    </div>
  );
}
