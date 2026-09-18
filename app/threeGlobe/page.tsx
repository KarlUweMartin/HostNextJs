'use client';

import { Container } from "@mui/material";
import { BackButton } from "../sections/backbutton";
import { IsoSphereBox } from "../three/isoSphere";
import React from "react";

export default function ThreeGlobePage() {

  const [singlePage, setSinglePage] = React.useState(false);
  React.useEffect(() => {
    setSinglePage(window.location.pathname.toLocaleLowerCase().endsWith("/threeGlobe"));
  }, []);

  return (
    <Container maxWidth="lg">
      <BackButton title={"Three Globe"} disabled={!singlePage} />
      <IsoSphereBox />
    </Container>
  )
}