"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import { IframeModal } from "../components/iframeModal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { WaterLevelModal } from "../components/waterlevelModal";
import PlayIcon from '@mui/icons-material/PlayArrow';
import { BackButton } from "../sections/backbutton";
import WebAssetIcon from '@mui/icons-material/WebAsset';
import GitHubIcon from "@mui/icons-material/GitHub";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { MarkdownBox } from "../components/markdown";
import { useAppLocale } from "../../src/i18n/ClientIntlProvider";

import showroomHeadDe from "../../src/locales/articles/de/showroom_head.md";
import showroomHeadEn from "../../src/locales/articles/en/showroom_head.md";
import showroomDisclaimerDe from "../../src/locales/articles/de/showroom_disclaimer.md";
import showroomDisclaimerEn from "../../src/locales/articles/en/showroom_disclaimer.md";
import globeDescriptionDe from "../../src/locales/articles/de/globe_description.md";
import globeDescriptionEn from "../../src/locales/articles/en/globe_description.md";
import waterlevelHeadDe from "../../src/locales/articles/de/waterlevel_head.md";
import waterlevelHeadEn from "../../src/locales/articles/en/waterlevel_head.md";
import satellitesDescriptionDe from "../../src/locales/articles/de/satellites_description.md";
import satellitesDescriptionEn from "../../src/locales/articles/en/satellites_description.md";
import orbitSandboxDescriptionDe from "../../src/locales/articles/de/orbit_sandbox_description.md";
import orbitSandboxDescriptionEn from "../../src/locales/articles/en/orbit_sandbox_description.md";
import flutterDescriptionDe from "../../src/locales/articles/de/flutter_description.md";
import flutterDescriptionEn from "../../src/locales/articles/en/flutter_description.md";
import cubePuzzleDescriptionDe from "../../src/locales/articles/de/cube_puzzle_description.md";
import cubePuzzleDescriptionEn from "../../src/locales/articles/en/cube_puzzle_description.md";
import droneSimDescriptionDe from "../../src/locales/articles/de/drone_sim_description.md";
import droneSimDescriptionEn from "../../src/locales/articles/en/drone_sim_description.md";

const showroomContentByLocale = {
  de: {
    showroomHead: showroomHeadDe,
    showroomDisclaimer: showroomDisclaimerDe,
    globeDescription: globeDescriptionDe,
    waterlevelHead: waterlevelHeadDe,
    satellitesDescription: satellitesDescriptionDe,
    orbitSandboxDescription: orbitSandboxDescriptionDe,
    flutterDescription: flutterDescriptionDe,
    cubePuzzleDescription: cubePuzzleDescriptionDe,
    droneSimDescription: droneSimDescriptionDe,
  },
  en: {
    showroomHead: showroomHeadEn,
    showroomDisclaimer: showroomDisclaimerEn,
    globeDescription: globeDescriptionEn,
    waterlevelHead: waterlevelHeadEn,
    satellitesDescription: satellitesDescriptionEn,
    orbitSandboxDescription: orbitSandboxDescriptionEn,
    flutterDescription: flutterDescriptionEn,
    cubePuzzleDescription: cubePuzzleDescriptionEn,
    droneSimDescription: droneSimDescriptionEn,
  },
} as const;

function FeatureContent({ title, body }: { title: string; body: string }) {
  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography mb={3} color="text.primary" variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ fontSize: "0.8em"}}>
          <MarkdownBox markdown={body} />
        </Box>
    </Box>
  );
}

function Feature({ title, body, href, git, imgSrc, tags, selectedFilters, onOpen }: { 
  title: string; 
  body: string; 
  href?: string; 
  git?: string;
  imgSrc: string; 
  tags: string[];
  selectedFilters: string[];
  onOpen?: (href: string, title: string) => void;
}) {
  const isMobile = useMediaQuery("(max-width:1000px)", { noSsr: true });
  const showModal = onOpen && !isMobile;
  const isVisible = tags.some((tag) => selectedFilters.includes(tag));

  if (!isVisible) return null;

  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          height: { xs: "auto", sm: "100%" },
          position: "relative",
          overflow: "hidden",
          color: "common.white",
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: 1,
          borderColor: "border.faded",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            pointerEvents: "none"
          },
          "& > *": {
            position: "relative",
            zIndex: 1
          }
        }}
      >
        <FeatureContent body={body} title={title} />
        {tags && tags.length > 0 && (
          <Stack direction="row" spacing={1} m={2}>
            <Typography fontSize="0.8em" variant="body2" color="text.faded">
              {tags.join(", ")}
            </Typography>
          </Stack>
        )}
        <Stack spacing={1} m={2} direction={"row"} alignItems={"center"} justifyContent="flex-end">
          {git && (
          <IconButton
            title="GitHub"
            href={git}
            target={"_blank"}
            rel={"noopener noreferrer"}
            sx={{ boxShadow: 1, borderRadius: "50%", width: 44, height: 44 }}>
            <GitHubIcon />
          </IconButton>
          )}
          {href && (
            <IconButton
              title="Play"
              onClick={showModal ? () => onOpen(href, title) : undefined}
              href={showModal ? undefined : href}
              sx={{ boxShadow: 1, borderRadius: "50%", width: 44, height: 44}}>
              <PlayIcon />
            </IconButton>
            )}
        </Stack>
      </Card>
    </Grid>
  );
}


export default function ShowroomPage({ id }: { id?: string }) {
  const filterOptions = ["Three.js", "React", "Unity/WebGL"];
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>(filterOptions);

  const [iframeOpen, setIframeOpen] = React.useState(false);
  const [iframeUrl, setIframeUrl] = React.useState<string | null>(null);
  const [iframeTitle, setIframeTitle] = React.useState<string | undefined>(undefined);

  const openIframe = (url: string, title?: string) => {
    setIframeTitle(title);
    setIframeUrl(url);
    setIframeOpen(true);
  };

  const [waterOpen, setWaterOpen] = React.useState(false);
  const [waterTitle, setWaterTitle] = React.useState<string | undefined>(undefined);

  const openWaterLevel = (title?: string) => {
    setWaterTitle(title);
    setWaterOpen(true);
  };

  const closeIframe = () => setIframeOpen(false);
  const closeWaterLevel = () => setWaterOpen(false);
  const { locale } = useAppLocale();
  const showroomContent = showroomContentByLocale[locale];

  const [singlePage, setSinglePage] = React.useState(false);
  React.useEffect(() => {
    setSinglePage(window.location.pathname.toLocaleLowerCase().endsWith("/showroom"));
  }, []);

  return (
    <Box id={id}>
      <BackButton title={"Showroom"} disabled={!singlePage} />
      <Container  maxWidth="lg" sx={{ py: singlePage ? 2 : 5 }}>
        {!singlePage && 
          <Stack direction={"row"} alignItems={"center"}  justifyContent={"space-between"}>
            <Typography variant="h4" component="h1" gutterBottom>
              Showroom
            </Typography>
            <IconButton title="Fullscreen" href={"/showroom"} aria-label="Fullscreen" size="small">
              <WebAssetIcon />
            </IconButton>
          </Stack>
        }
        <MarkdownBox markdown={showroomContent.showroomHead} />
        <Box sx={{ fontSize: "0.7em", color: "text.faded" }}>
          <MarkdownBox markdown={showroomContent.showroomDisclaimer} />
        </Box>

        <ToggleButtonGroup
          value={selectedFilters}
          onChange={(_, filters: string[]) => setSelectedFilters(filters)}
          aria-label="Showroom filters"
          size="small"
          sx={{ mt: 3, flexWrap: "wrap" }}
        >
          {filterOptions.map((filter) => (
            <ToggleButton sx={{fontSize: "0.6em"}} key={filter} value={filter} aria-label={filter}>
              {filter}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Grid container spacing={2} sx={{ mb: 3, mt: 3 }}>

          {selectedFilters.length === 0 && 
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 85
              }}
            >
              <FilterAltOffIcon sx={{ opacity: 0.3 , fontSize: { xs: 72, sm: 96 } }} />
            </Box>
          </Grid>
          }

          <Feature
              title="ThreeJS Globe"
              body={showroomContent.globeDescription}
              href="/threeGlobe"
              imgSrc={"/thumbGlobe.png"}
              tags={["Three.js", "React"]}
              selectedFilters={selectedFilters}
              onOpen={openIframe}
          />

          <Feature
              title="Water Levels"
              body={showroomContent.waterlevelHead}
              href="/waterlevelPage"
              imgSrc={"/thumbWaterlevels.png"}
              tags={["React"]}
              selectedFilters={selectedFilters}
              onOpen={openWaterLevel}
          />

          <Feature
              title="Satellites"
              body={showroomContent.satellitesDescription}
              href='/satellites/index.html'
              git={"https://github.com/KarlUweMartin/Unity_Satellites"}
              imgSrc={"/thumbSat.png"}
              tags={["Unity/WebGL"]}
              selectedFilters={selectedFilters}
              onOpen={openIframe}
          />

          <Feature
              title="Orbit Sandbox"
              body={showroomContent.orbitSandboxDescription}
              href='/orbitSandbox/index.html'
              git={"https://github.com/KarlUweMartin/Unity_OrbitParadise"}
              imgSrc={"/orbitSandbox.jpg"}
              tags={["Unity/WebGL"]}
              selectedFilters={selectedFilters}
              onOpen={openIframe}
          />

          <Feature
              title="Cube Puzzle"
              body={showroomContent.cubePuzzleDescription}
              href='/cubeGame/index.html'
              imgSrc={"/thumbCube.png"}
              git={"https://github.com/KarlUweMartin/Unity_CubePuzzle"}
              tags={["Unity/WebGL"]}
              selectedFilters={selectedFilters}
              onOpen={openIframe}
          />

          {/*<Feature
              title="Shop-App Tempate"
              body={showroomContent.flutterDescription}
              git="https://github.com/KarlUweMartin/WebApi-Flutter-Template"
              imgSrc={"/thumbFlutter.png"}
              tags={["GitHub Repo"]}
              selectedFilters={selectedFilters}
          />*/}

          <Feature
              title="Drone Simulator"
              body={showroomContent.droneSimDescription}
              href='/droneSim/index.html'
              imgSrc={"/thumbDrone.png"}
              tags={["Unity/WebGL"]}
              selectedFilters={selectedFilters}
              onOpen={openIframe}
          />
        </Grid>
      </Container>
      <IframeModal open={iframeOpen} url={iframeUrl} title={iframeTitle} onClose={closeIframe} />
      <WaterLevelModal open={waterOpen} title={"Water Levels - Rhein/Neckar"} onClose={closeWaterLevel} />
    </Box>
  );
}
