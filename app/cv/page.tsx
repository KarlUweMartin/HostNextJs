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
import { useTranslations } from "next-intl";
import { useAppLocale } from "../../src/i18n/ClientIntlProvider";

import aunovisDetailsDe from "../../src/locales/articles/de/cv_details_aunovis.md";
import aunovisDetailsEn from "../../src/locales/articles/en/cv_details_aunovis.md";
import threeSpinDetailsDe from "../../src/locales/articles/de/cv_details_3spin.md";
import threeSpinDetailsEn from "../../src/locales/articles/en/cv_details_3spin.md";
import hdaDetailsDe from "../../src/locales/articles/de/cv_details_hda.md";
import hdaDetailsEn from "../../src/locales/articles/en/cv_details_hda.md";
import iconIncarDetailsDe from "../../src/locales/articles/de/cv_details_iconincar.md";
import iconIncarDetailsEn from "../../src/locales/articles/en/cv_details_iconincar.md";
import mlsDetailsDe from "../../src/locales/articles/de/cv_details_mls.md";
import mlsDetailsEn from "../../src/locales/articles/en/cv_details_mls.md";

import AssignmentIcon from '@mui/icons-material/Assignment';
import TranslateIcon from '@mui/icons-material/Translate';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';
import FactoryIcon from '@mui/icons-material/Factory';
import SearchIcon from '@mui/icons-material/Search';
import MarkdownModal, { MarkdownModalModel } from "../components/markdown";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Typography 
      component="h3" 
      sx={{        
        color: "text.secondary",
        fontWeight: 600,
        letterSpacing: "0.01em",
        mb: 3,
      }}>
      {children}
    </Typography>
  );
}

function CvSection({ period, children, icon }: { period?: string; children: React.ReactNode; icon?: React.ReactNode; }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "76px 1fr", sm: "112px 1fr" },
        gap: { xs: 2, sm: 3 },
        mb: 4,
      }}
    >
      {period && <Typography
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
      </Typography>}
      {icon && icon}
      <Box>
        {children}
      </Box>
    </Box>
  );
}

function TextParagraphs({ children }: { children: string }) {
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
  const { locale } = useAppLocale();
  const [singlePage, setSinglePage] = React.useState(false);
  const [selectedDetail, setSelectedDetail] = React.useState<MarkdownModalModel | null>(null);
  const articleDetailsByLocale = {
    de: {
      aunovis: aunovisDetailsDe,
      threeSpin: threeSpinDetailsDe,
      hda: hdaDetailsDe,
      iconIncar: iconIncarDetailsDe,
      mls: mlsDetailsDe
    },
    en: {
      aunovis: aunovisDetailsEn,
      threeSpin: threeSpinDetailsEn,
      hda: hdaDetailsEn,
      iconIncar: iconIncarDetailsEn,
      mls: mlsDetailsEn
    },
  } as const;
  const articleDetails = articleDetailsByLocale[locale as keyof typeof articleDetailsByLocale];

  React.useEffect(() => {
    setSinglePage(window.location.pathname.toLocaleLowerCase().endsWith("/cv"));
  }, []);

  React.useEffect(() => {
    setSelectedDetail(null);
  }, [locale]);

  const personalData = [
    {
      label: t("personal.fullName"),
      value: "Karl Uwe Martin",
    },
    {
      label: t("personal.dateOfBirth"),
      value: t("personal.dateOfBirthValue"),
    },
    {
      label: t("personal.city"),
      value: "69181, Leimen, Germany",
    },
    {
      label: t("personal.email"),
      value: "KarlUweMartin@gmail.com",
      href: "mailto:KarlUweMartin@gmail.com",
    },
  ];

  const experience = [
    {
      period: `${t("today")} -\n2022`,
      title: t("experience.0.title"),
      company: "Aunovis",
      city: "Karlsruhe",
      link: "https://www.aunovis.de/",
      details: {
        title: `${t("experience.0.title")} @ Aunovis`,
        markdown: articleDetails.aunovis,
      },
      summary: [
        t("experience.0.summary.0"),
        t("experience.0.summary.1"),
      ],
    },
    {
      period: "2022 -\n2018",
      title: t("experience.1.title"),
      company: "3spin",
      city: "Darmstadt",
      link: "https://www.3spin-learning.com/",
      details: {
        title: `${t("experience.1.title")} @ 3spin`,
        markdown: articleDetails.threeSpin,
      },
      summary: [
        t("experience.1.summary.0"),
        t("experience.1.summary.1"),
      ],
    },
    {
      period: "2018 -\n2016",
      title: t("experience.2.title"),
      company: "icon incar",
      city: "Ingolstadt",
      link: "https://www.iconincar.com/",
      details: {
        title: `${t("experience.2.title")} @ icon incar`,
        markdown: articleDetails.iconIncar,
      },
      summary: [
        t("experience.2.summary.0"),
        t("experience.2.summary.1"),
      ],
    },
    {
      period: "2016 -\n2014",
      title: t("experience.3.title"),
      company: "Hochschule Darmstadt",
      city: "Darmstadt",
      link: "https://mediencampus.h-da.de/",
      summary: [t("experience.3.summary.0")],
    },
    {
      period: "2015 -\n2011",
      title: t("experience.4.title"),
      company: "Mountain Lane Studio",
      city: "Viernheim",
      details: {
        title: `${t("experience.4.title")} @ Mountain Lane Studio`,
        markdown: articleDetails.mls,
      },
      summary: [t("experience.4.summary.0")],
    },
    {
      period: "2009",
      title: t("experience.5.title"),
      company: "Huber Verlag",
      city: "Mannheim",
      summary: [t("experience.5.summary.0")],
    },
    {
      period: "2006",
      title: t("experience.6.title"),
      company: "Erdt Artworks",
      city: "Viernheim",
      link: "https://www.erdtartworks.de/",
      summary: [t("experience.6.summary.0")],
    },
  ];

  const education = [
    {
      period: "2016 -\n2013",
      title: t("education.0.title"),
      company: "Hochschule Darmstadt",
      details: t("education.0.details"),
      detailsArticle: {
        title: `${t("experience.3.title")} @ Hochschule Darmstadt`,
        markdown: articleDetails.hda,
      },
    },
    {
      period: "2013 -\n2012",
      title: t("education.1.title"),
      company: "Hochschule der Medien Stuttgart",
      details: t("education.1.details"),
    },
    {
      period: "2011",
      title: t("education.2.title"),
      company: "Alexander v. Humboldt Schule Viernheim",
      details: t("education.2.details"),
    },
  ];

  const skills = [
    {
      period: <AssignmentIcon />,
      title: t("skills.0.title"),
      details: t("skills.0.details"),
    },
    {
      period: <CodeIcon />,
      title: t("skills.1.title"),
      details: t("skills.1.details"),
    },
    {
      period: <PeopleIcon />,
      title: t("skills.2.title"),
      details: t("skills.2.details"),
    },
    {
      period: <FactoryIcon />,
      title: t("skills.3.title"),
      details: t("skills.3.details"),
    },
    {
      period: <TranslateIcon />,
      title: t("skills.4.title"),
      details: t("skills.4.details"),
    },
  ];

  return (
    <Box  mb={10} id={"cv-section"} bgcolor={"background.default"}>
      <Container maxWidth="lg">
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
          <CvSection
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
            <TextParagraphs>{item.summary.join("\n")}</TextParagraphs>
            {item.details && (
              <Button
                size="small"
                sx={{ width: 120, mt: 2 }}
                startIcon={<SearchIcon />}
                onClick={() => setSelectedDetail(item.details)}
              >
                {t("detail")}
              </Button>
            )}
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
          </CvSection>
        ))}
      </Box>

      <Box sx={{ maxWidth: 760, mx: "auto" }}>
          <SectionHeading>{t("educationHeading")}</SectionHeading>
          {education.map((item) => (
            <CvSection
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
              <TextParagraphs>{item.details}</TextParagraphs>
              {item.detailsArticle && (
              <Button
                size="small"
                sx={{ width: 120, mt: 2 }}
                startIcon={<SearchIcon />}
                onClick={() => setSelectedDetail(item.detailsArticle)}
              >
                {t("detail")}
              </Button>
            )}
            </CvSection>
          ))}
      </Box>

      <Box sx={{ maxWidth: 760, mx: "auto" }}>
        <SectionHeading>{t("skillsHeading")}</SectionHeading>
          {skills.map((item) => (
            <CvSection
            key={`${item.title}`}
            period={item.period as any}
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
              </Box>
            </Typography>
            <TextParagraphs>{item.details}</TextParagraphs>
          </CvSection>
        ))}
        <Link href={"/skills"}>{t("skillsLink")}</Link>
      </Box>
      <MarkdownModal
        detail={selectedDetail}
        open={selectedDetail !== null}
        onClose={() => setSelectedDetail(null)}
      />
    </Container>
  </Box>
  );
}