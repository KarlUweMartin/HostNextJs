"use client";

import {
  Box,
  Button,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { BackButton } from "../sections/backbutton";
import React from "react";
import SearchIcon from '@mui/icons-material/Article';
import { useTranslations } from "next-intl";

const headingSx = {
  color: "text.secondary",
  fontWeight: 600,
  letterSpacing: "0.01em",
  mb: 3,
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography component="h3" sx={headingSx}>
      {children}
    </Typography>
  );
}

function TimelineItem({ period, children }: { period: string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "76px 1fr", sm: "112px 1fr" },
        gap: { xs: 2, sm: 3 },
        mb: 4,
      }}
    >
      <Typography
        sx={{
          color: "border.secondary",
          fontWeight: 800,
          lineHeight: 1.5,
          whiteSpace: "pre-line",
          borderRight: "1px solid",
          borderColor: "border.secondary",
          pr: { xs: 1.5, sm: 2 },
        }}
      >
        {period}
      </Typography>
      <Box>
        {children}
      </Box>
    </Box>
  );
}

function DetailLines({ children }: { children: string }) {
  return (
    <Typography
      sx={{
        color: "text.secondary",
        fontSize: "0.96rem",
        lineHeight: 1.6,
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </Typography>
  );
}

export default function CvPage() {
  const t = useTranslations("Cv");
  const [singlePage, setSinglePage] = React.useState(false);
  React.useEffect(() => {
    setSinglePage(window.location.pathname.toLocaleLowerCase().endsWith("/cv"));
  }, []);

  const experience = [
    { period: `${t("today")} -\n2022`, title: t("experience.0.title"), company: "Aunovis", city: "Karlsruhe", link: "https://www.aunovis.de/", detailModal: true, summary: [t("experience.0.summary.0"), t("experience.0.summary.1")] },
    { period: "2022 -\n2018", title: t("experience.1.title"), company: "3spin", city: "Darmstadt", link: "https://www.3spin-learning.com/", detailModal: true, summary: [t("experience.1.summary.0"), t("experience.1.summary.1")] },
    { period: "2018 -\n2016", title: t("experience.2.title"), company: "icon incar", city: "Ingolstadt", link: "https://www.iconincar.com/", detailModal: true, summary: [t("experience.2.summary.0"), t("experience.2.summary.1")] },
    { period: "2016 -\n2014", title: t("experience.3.title"), company: "Hochschule Darmstadt", city: "Darmstadt", link: "https://mediencampus.h-da.de/", summary: [t("experience.3.summary.0")] },
    { period: "2015 -\n2011", title: t("experience.4.title"), company: "Mountain Lane Studio", city: "Viernheim", summary: [t("experience.4.summary.0")] },
    { period: "2009", title: t("experience.5.title"), company: "Huber Verlag", city: "Mannheim", summary: [t("experience.5.summary.0")] },
    { period: "2006", title: t("experience.6.title"), company: "Erdt Artworks", city: "Viernheim", link: "https://www.erdtartworks.de/", summary: [t("experience.6.summary.0")] },
  ];

  const education = [
    { period: "2016 -\n2013", title: t("education.0.title"), company: "Hochschule Darmstadt", details: t("education.0.details") },
    { period: "2013 -\n2012", title: t("education.1.title"), company: "Hochschule der Medien Stuttgart", details: t("education.1.details") },
    { period: "2011", title: t("education.2.title"), company: "Alexander v. Humboldt Schule Viernheim", details: t("education.2.details") },
  ];

  const personalData = [
    { label: t("personal.fullName"), value: "Karl Uwe Martin" },
    { label: t("personal.dateOfBirth"), value: t("personal.dateOfBirthValue") },
    { label: t("personal.city"), value: "69181, Leimen, Germany" },
    { label: t("personal.email"), value: "KarlUweMartin@gmail.com", href: "mailto:KarlUweMartin@gmail.com" },
  ];

  return (
    <Box  id={"cv-section"} bgcolor={"background.default"}>
      <Container
        maxWidth="lg"
        >
        <BackButton title={"Curriculum Vitae"} disabled={!singlePage} />      

        <Box
          sx={{
            mt: 2,
            maxWidth: 760,
            mx: "auto",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 3,
            mb: 6,
          }}
        >
          <Box
            sx={{
              borderRadius: 1,
              width: 120,
              height: 120,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src="https://avatars.githubusercontent.com/u/12151775?v=4"
              alt={t("profilePicture")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "110px 1fr", sm: "150px 1fr" },          
              flex: 1,
              width: "100%",
            }}
          >
            {personalData.map((item) => (
              <Box key={item.label} sx={{ display: "contents" }}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.85rem",
                  }}
                >
                  {item.label}
                </Typography>
                {item.href ? (
                  <Link href={item.href}>{item.value}</Link>
                ) : (
                  <Typography>{item.value}</Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>        

      <Box mt={6} mb={3} sx={{ maxWidth: 760, mx: "auto" }}>     
        <SectionHeading>{t("workExperience")}</SectionHeading>
        {experience.map((item) => (
          <TimelineItem
            key={`${item.title}-${item.company}`}
            period={item.period}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.05rem", md: "1.15rem" },
                mb: 0.7,
              }}
            >
              {item.title}{" "}
              <Box
                component="span"
                sx={{
                  color: "text.secondary",
                }}
              >
                @ {item.company}             
              </Box>
            </Typography>
            <DetailLines>{item.summary.join("\n")}</DetailLines>
            {/*item.detailModal && <Button sx={{ width: 120, size:"sm", mt: 2 }} startIcon={<SearchIcon/>}>{t("detail")}</Button>*/}
            <Typography
              sx={{
                color: "text.faded",
                fontSize: "0.93rem",
                lineHeight: 1.65,
                my: 3,
              }}
            >   
            </Typography>
            {item.link && <Link href={item.link}>{item.link}</Link>}
            <Typography color="text.faded">{t("city", { city: item.city })}</Typography>
          </TimelineItem>
        ))}
      </Box>

      <Box sx={{ maxWidth: 760, mx: "auto" }}>
          <SectionHeading>{t("educationHeading")}</SectionHeading>
          {education.map((item) => (
            <TimelineItem
              key={item.title}
              period={item.period}
            >
              <Typography
                sx={{
                  fontSize: "1.02rem",
                  mb: 0.5,
                }}
              >
                {item.title}{" "}
                <Box
                  component="span"
                  sx={{
                    color: "text.secondary",
                  }}
                >
                  @ {item.company}
                </Box>      
              </Typography>
              <DetailLines>{item.details}</DetailLines>
            </TimelineItem>
          ))}
      </Box>
    </Container>
  </Box>
  );
}
