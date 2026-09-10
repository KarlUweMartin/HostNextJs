"use client";

import { Box, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { SineWaveBox } from "../three/sineWave3d";

export default function AboutPage() {
  
  const t = useTranslations("About");

  return (
    <Box>   
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 5, alignSelf: "center", mx: "auto" }}>

        <Typography  variant="body2" color="text.secondary" paragraph>
          {t("about0")}
        </Typography>         
        <Typography variant="body2" color="text.secondary" paragraph>
          {t("about1")}
        </Typography>
      
        </Box>

        <Box sx={{      
          width: "85%", 
          mx: "auto",
          p: 6,
          border: .1,
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

        <Box width="85%" sx={{ mt: 5, textAlign: "center", alignSelf: "center", mx: "auto" }}>

        </Box>
      </Container>
    </Box>
  );
}
