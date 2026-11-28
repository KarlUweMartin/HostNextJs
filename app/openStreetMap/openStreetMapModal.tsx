"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Button, IconButton, Stack, ToggleButton, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UndoIcon from "@mui/icons-material/Undo";
import type { LatLng, LatLngTuple } from "leaflet";
import { useAppLocale } from "../../src/i18n/ClientIntlProvider";
import { openStreetMapColors } from "../theme";
import { IframeModal } from "../components/iframeModal";
import { OpenStreetMapSearch } from "./openStreetMapSearch";
import type { MapZoom } from "./openStreetMap";

const OpenStreetMap = dynamic(() => import("./openStreetMap"), { ssr: false });

const panelSx = {
  p: 1,
  border: 1,
  borderColor: openStreetMapColors.modal.overlayBorder,
  borderRadius: 1,
  bgcolor: openStreetMapColors.modal.surface,
  boxShadow: 3,
};

export function OpenStreetMapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { locale } = useAppLocale();
  const german = locale === "de";
  const [measuring, setMeasuring] = useState(false);
  const [points, setPoints] = useState<LatLng[]>([]);
  const [location, setLocation] = useState<LatLngTuple | null>(null);
  const [zoom, setZoom] = useState<MapZoom | null>(null);

  function adjustZoom(delta: number) {
    setZoom((current) => current && {
      ...current,
      level: Math.min(current.max, Math.max(current.min, current.level + delta)),
    });
  }

  const addPoint = useCallback((point: LatLng) => setPoints((current) => [...current, point]), []);
  const totalMeters = points.slice(1).reduce(
    (total, point, index) => total + points[index].distanceTo(point),
    0,
  );
  const distance = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: totalMeters >= 1000 ? "kilometer" : "meter",
    maximumFractionDigits: totalMeters >= 1000 ? 2 : 0,
  }).format(totalMeters >= 1000 ? totalMeters / 1000 : totalMeters);

  function closeMap() {
    setMeasuring(false);
    setPoints([]);
    setLocation(null);
    setZoom(null);
    onClose();
  }

  return (
    <IframeModal open={open} title="OSM Distance Tool" onClose={closeMap}>
      {open && (
        <>
          <OpenStreetMap
            measuring={measuring}
            points={points}
            onAddPoint={addPoint}
            location={location}
            zoomLevel={zoom?.level}
            onZoomChange={setZoom}
          />
          <Stack
            direction="column"
            alignItems="flex-start"
            spacing={1}
            sx={{
              position: "absolute",
              left: 8,
              top: 8,
              zIndex: 1,
              width: "max-content",
              maxWidth: "calc(100% - 16px)",
              maxHeight: { xs: "calc(100% - 48px)", sm: "calc(100% - 34px)" },
              overflowY: "auto",
            }}
          >
            <Box sx={{ ...panelSx, width: 320, maxWidth: "100%", minWidth: 0 }}>
              <OpenStreetMapSearch locale={locale} disabled={measuring} onSelect={setLocation} />
              <Stack  direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{  mt: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  aria-label={german ? "Verkleinern" : "Zoom out"}
                  disabled={measuring || !zoom || zoom.level <= zoom.min}
                  onClick={() => adjustZoom(-1)}
                >
                  −
                </Button>
                <Box
                  role={zoom ? "meter" : undefined}
                  aria-label={german ? "Zoomstufe" : "Zoom level"}
                  aria-valuemin={zoom?.min}
                  aria-valuemax={zoom?.max}
                  aria-valuenow={zoom?.level}
                  title={zoom ? `${german ? "Zoomstufe" : "Zoom level"} ${zoom.level}` : undefined}
                  sx={{ display: "flex", flex: 1, minWidth: 0, gap: "2px" }}
                >
                  {zoom && Array.from({ length: zoom.max - zoom.min }, (_, index) => (
                    <Box
                      key={index}
                      aria-hidden="true"
                      sx={{
                        flex: 1,
                        height: 12,
                        borderRadius: "1px",
                        bgcolor: index < zoom.level - zoom.min
                          ? openStreetMapColors.modal.zoomSegmentFilled
                          : openStreetMapColors.modal.zoomSegmentEmpty,
                      }}
                    />
                  ))}
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  aria-label={german ? "Vergrößern" : "Zoom in"}
                  disabled={measuring || !zoom || zoom.level >= zoom.max}
                  onClick={() => adjustZoom(1)}
                >
                  +
                </Button>
              </Stack>
            </Box>
            <Stack
              component="section"
              aria-label={german ? "Distanz messen" : "Measure distance"}
              spacing={0.75}
              sx={panelSx}
              width={"100%"}
            >
              <ToggleButton
                size="small"
                value="measure"
                selected={measuring}
                aria-pressed={measuring}
                onChange={() => setMeasuring((current) => !current)}
              >
                {german ? "Distanz messen" : "Measure distance"}
              </ToggleButton>

              <Typography align="center" component="output" variant="h3" aria-live="polite">
                {distance}
              </Typography>
    
              <Stack justifyContent="end" direction="row" spacing={0.75}>
                {points.length > 0 && (
                  <Typography>{`(${points.length})`}</Typography>
                )}
                <IconButton
                  size="small"
                  aria-label={"Remove last"}
                  onClick={() => setPoints((current) => current.slice(0, -1))}
                  disabled={points.length === 0}
                >
                  <UndoIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label={"Remove all"}
                  onClick={() => setPoints([])}
                  disabled={points.length === 0}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </IframeModal>
  );
}
