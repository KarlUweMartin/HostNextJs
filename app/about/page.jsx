"use client";

import { Box, Container, Typography, Stack } from "@mui/material";
import { SineWaveBox } from "../three/sineWave3d";
import { cursorBorderHandlers, cursorBorderSx } from "../components/cursorBorder";
import { MarkdownBox } from "../components/markdown";
import MyProcess from "../sections/myprocess";
import { useAppLocale } from "../../src/i18n/ClientIntlProvider";
import about0De from "../../src/locales/articles/de/about_about0.md";
import about0En from "../../src/locales/articles/en/about_about0.md";
import about1De from "../../src/locales/articles/de/about_about1.md";
import about1En from "../../src/locales/articles/en/about_about1.md";
import about2De from "../../src/locales/articles/de/about_about2.md";
import about2En from "../../src/locales/articles/en/about_about2.md";
import about3De from "../../src/locales/articles/de/about_about3.md";
import about3En from "../../src/locales/articles/en/about_about3.md";

const aboutContentByLocale = {
  de: { about0: about0De, about1: about1De, about2: about2De, about3: about3De },
  en: { about0: about0En, about1: about1En, about2: about2En, about3: about3En },
};

export default function AboutPage() {
  const { locale } = useAppLocale();
  const aboutContent = aboutContentByLocale[locale];

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box {...cursorBorderHandlers} sx={{
          ...cursorBorderSx,
          width: "85%", 
          mx: "auto",
          p: 6,
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          borderTopRightRadius: 100,
          overflow: "hidden" }}>
          <Typography 
              color="text.secondary"
              variant="h6" 
              sx={{ 
                textAlign: "center",
                fontStyle: "italic",
                position: "relative",
                zIndex: 1 
              }}>
            " Every <span style={{ fontWeight: 'bold', color: '#eda916' }}>THING</span> is an interface! "
          </Typography>
          <Box sx={{ 
                textAlign: "center",
                fontSize: "0.8em",
                fontStyle: "italic",
                position: "relative",
                zIndex: 1,         
              }}>
          <MarkdownBox markdown={aboutContent.about3} />
          </Box>
          <Box sx={{ background: "rgb(15, 15, 15)", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
            <SineWaveBox 
              color="#2e7197"
              xDensity={0.15} 
              yDensity={0.15} 
              xAmount={350}
              yAmount={50}
              timeScale={.1}
            />
          </Box>
        </Box>
        <Box sx={{ opacity: 0.7, fontStyle: "italic", fontSize: "0.75em", mx: "auto",  width: {xs: "100%", md: "85%"} }}>
   
        </Box>
        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={3} 
          sx={{
            fontSize: "0.8em",
            mx: "auto",
            mb: 1,
            p: 3, 
            width: {xs: "100%", md: "85%"} 
          }}>                 
          <MarkdownBox markdown={aboutContent.about0} />
          <MarkdownBox markdown={aboutContent.about1} />
        </Stack>
      </Container>

      <Box mb={8}>
        <MyProcess/>
      </Box>

    </Box>
  );
}
