import { LineChart } from '@mui/x-charts/LineChart';
import { areaElementClasses } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { Box, Checkbox, FormControlLabel, Link, MenuItem,
   Select, SelectChangeEvent, Stack, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Waterlevel() {
  const t = useTranslations('Showroom');

  type Measurement = {
    timestamp: string;
    value: number | null;
  };

  const theme = useTheme();
  const [dataSpeyer, setDataSpeyer] = useState<Measurement[]>([]);
  const [dataHeidelberg, setDataHeidelberg] = useState<Measurement[]>([]);

  const [days, setDays] = useState("14");
  const handleChange = (event: SelectChangeEvent) => {
    setDays(event.target.value);
  };

  const [showRhein, setShowRhein] = useState(true);
  const [showNeckar, setShowNeckar] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [speyer, heidelberg] = await Promise.all([
        fetchMeasurements("2cb8ae5b-c5c9-4fa8-bac0-bb724f2754f4", days),
        fetchMeasurements("827b2685-47ec-44df-a90f-980f5e0c1591", days),
      ]);

      setDataSpeyer(speyer);
      setDataHeidelberg(heidelberg);
    }

    loadData();
  }, [days]);

  function limitMeasurements(data: Measurement[]): Measurement[] {
    const maxEntries = 250;

    if (data.length <= maxEntries) {
      return data;
    }

    return Array.from({ length: maxEntries }, (_, index) => {
      const position = index * (data.length - 1) / (maxEntries - 1);
      return data[Math.round(position)];
    });
  }

  async function fetchMeasurements(stationId: string, days: string): Promise<Measurement[]> {
    try {
      const response = await fetch(
        `https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/${stationId}/W/measurements.json?start=P${days}D`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: Measurement[] = await response.json();
      return limitMeasurements(data);

    } catch (error) {
      console.error("Failed to fetch measurements:", error);
      return [];
    }
  }

  const series = [
    showRhein && {
      data: dataSpeyer.map((d) => d.value),
      label: "Rhein / Speyer",
      showMark: false,
      id: "speyer",
      area: true,
    },
    showNeckar && {
      data: dataHeidelberg.map((d) => d.value),
      label: "Neckar / Heidelberg",
      showMark: false,
      id: "heidelberg",
      area: true,
    },
  ].filter(Boolean);

  const activeValues = [
    showRhein ? dataSpeyer : [],
    showNeckar ? dataHeidelberg : [],
  ]
    .flatMap((data) => data.map((measurement) => measurement.value))
    .filter((value): value is number => value !== null);
  const yAxisMin = activeValues.length > 0 ? Math.min(...activeValues) - 15 : undefined;
  const yAxisMax = activeValues.length > 0 ? Math.max(...activeValues) + 15 : undefined;

  return (
    <Box p={2} minHeight={350} height="100%" display="flex" flexDirection="column">
      <Stack gap={1} mx={1} direction={{ xs: "column", sm: "row" }}>

        <FormControlLabel
          label={t("days")}
          control={
            <Select
              size="small"
              id="daysSelect"
              value={days}
              onChange={handleChange}
              sx={{
                mr: 1,
                border: 0,
                backgroundColor: "button.default",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "button.default",
                  },
                },
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          } />

        <FormControlLabel
          label="Rhein"
          control={
            <Checkbox
              checked={showRhein}
              onChange={(e) => setShowRhein(e.target.checked)}
            />
          }
        />

        <FormControlLabel
          label="Neckar"
          control={
            <Checkbox
              checked={showNeckar}
              onChange={(e) => setShowNeckar(e.target.checked)}
            />
          }
        />

      </Stack>
      <LineChart
        colors={[theme.palette.data.cyan, theme.palette.data.blue]}
        series={series}
        sx={{
          [`& .${areaElementClasses.root}[data-series="speyer"]`]: {
            fill: 'url(#waterlevel-gradient-speyer)',
          },
          [`& .${areaElementClasses.root}[data-series="heidelberg"]`]: {
            fill: 'url(#waterlevel-gradient-heidelberg)',
          },
        }}
        slotProps={{
          tooltip: {
            sx: {    
              '& .MuiPaper-root': {
                backgroundColor: '#333333', // Change this to your desired background color
                color: '#ffffff',             // Optional: change text color
              },
            },
          },
        }}
        xAxis={[
          {
            data: dataSpeyer.map((d) => d.timestamp),
            scaleType: 'point',
            tickInterval: (value: string, index) => value.includes("T00:00"),
            valueFormatter: (value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              });
            },
          },
        ]}
        yAxis={[{ min: yAxisMin, max: yAxisMax }]}
      >
        <defs>
          <linearGradient id="waterlevel-gradient-speyer" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.data.cyan} stopOpacity={0.45} />
            <stop offset="100%" stopColor={theme.palette.data.cyan} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="waterlevel-gradient-heidelberg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.palette.data.blue} stopOpacity={0.45} />
            <stop offset="100%" stopColor={theme.palette.data.blue} stopOpacity={0} />
          </linearGradient>
        </defs>
      </LineChart>
      <Link href={"https://www.pegelonline.wsv.de"} fontSize={"0.8em"} variant="body2" mx={3}>API: pegelonline.wsv.de</Link>
    </Box>
  );
}
