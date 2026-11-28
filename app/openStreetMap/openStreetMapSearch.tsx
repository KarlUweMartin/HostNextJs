import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button, IconButton, List, ListItemButton, ListItemText, Stack, TextField, Typography } from "@mui/material";
import type { LatLngTuple } from "leaflet";
import SearchIcon from '@mui/icons-material/Search';

type SearchResult = { name: string; context: string; position: LatLngTuple };

type PhotonResponse = {
  features: {
    geometry: { coordinates: [longitude: number, latitude: number] };
    properties: Partial<Record<"name" | "street" | "city" | "state" | "country", string>>;
  }[];
};

export function OpenStreetMapSearch({
  locale,
  disabled,
  onSelect,
}: {
  locale: "de" | "en";
  disabled: boolean;
  onSelect: (position: LatLngTuple) => void;
}) {
  const german = locale === "de";
  const label = german ? "Ort suchen" : "Search for a place";
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "empty" | "error">("idle");
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = query.trim();
    if (!name || disabled || request.current) return;

    const controller = new AbortController();
    request.current = controller;
    setResults([]);
    setStatus("loading");

    try {
      const params = new URLSearchParams({ q: name, lang: locale, limit: "5" });
      const response = await fetch(`https://photon.komoot.io/api/?${params}`, { signal: controller.signal });
      if (!response.ok) throw new Error(`Place search returned HTTP ${response.status}`);

      const data: PhotonResponse = await response.json();
      const matches = data.features.flatMap(({ geometry, properties }): SearchResult[] => {
        const [longitude, latitude] = geometry.coordinates;
        const title = properties.name || properties.street || properties.city;
        if (!title || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return [];

        const context = [...new Set([properties.city, properties.state, properties.country])]
          .filter((part) => part && part !== title)
          .join(", ");
        return [{ name: title, context, position: [latitude, longitude] }];
      });
      setResults(matches);
      setStatus(matches.length ? "idle" : "empty");
    } catch {
      if (!controller.signal.aborted) setStatus("error");
    } finally {
      request.current = null;
    }
  }

  const statusText = {
    idle: "",
    loading: german ? "Suche läuft …" : "Searching…",
    empty: german ? "Keine Orte gefunden." : "No places found.",
    error: german ? "Suche fehlgeschlagen. Versuche es erneut." : "Search failed. Try again.",
  }[status];

  return (
    <Stack component="form" onSubmit={search} aria-label={label} spacing={0.75}>
      <Stack direction="row" spacing={0.75}>
        <TextField
          type="search"
          size="small"
          label={label}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={disabled || status === "loading"}
          fullWidth
        />
        <IconButton type="submit" disabled={disabled || !query.trim() || status === "loading"}>
          <SearchIcon />
        </IconButton>
      </Stack>     
      {statusText && <Typography variant="body2" role="status">{statusText}</Typography>}
      {results.length > 0 && (
        <List disablePadding sx={{ maxHeight: 160, overflowY: "auto" }}>
          {results.map((result, index) => (
            <ListItemButton
              key={index}
              dense
              disabled={disabled}
              onClick={() => {
                setQuery(result.name);
                setResults([]);
                onSelect(result.position);
              }}
            >
              <ListItemText primary={result.name} secondary={result.context} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Stack>
  );
}
