"use client";

import { Box, Container, Typography, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { SineWaveBox } from "../three/sineWave3d";

export default function AboutPage() {

  const t = useTranslations("About");

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{
          width: "85%", 
          mx: "auto",
          p: 6,
          border: "0.1rem solid",
          borderColor: "border.secondary",
          borderBottomLeftRadius: 100,
          borderBottomRightRadius: 100,
          borderTopRightRadius: 100,
          position: "relative",
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
          <Typography sx={{ 
                textAlign: "center",
                fontStyle: "italic",
                position: "relative",
                zIndex: 1,
                mt: 3
              }} variant="body2" color="text.secondary" paragraph>
            {t("about3")}
          </Typography>     
          <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
            <SineWaveBox 
              color="#6e95b9"
              xDensity={0.12} 
              yDensity={0.12} 
              xAmount={350}
              yAmount={50}
              timeScale={.1}
            />
          </Box>
        </Box>

        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={5} 
          sx={{
            mx: "auto", 
            mt: 3, 
            mb: 6,
            bgcolor: "background.defaultLight", 
            p: 3, 
            borderRadius: 2, 
            width: {xs: "100%", md: "85%"} 
          }}>
          <Typography  variant="body2" color="text.secondary" paragraph>
            {t("about0")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("about1")}
          </Typography>
        </Stack>

      </Container>
    </Box>
  );
}
