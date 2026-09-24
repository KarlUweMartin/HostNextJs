"use client";

import { Box, Container, Typography, Chip, Stack, IconButton } from "@mui/material";
import CodeIcon from '@mui/icons-material/SettingsEthernet';
import { useTranslations } from "next-intl";
import { ReactElement } from "react";
import DrawIcon from '@mui/icons-material/Draw';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import Image from "next/image";
import UnityLogo from "../../public/UnityLogo_White.svg";
import { BackButton } from "../sections/backbutton";
import WebAssetIcon from '@mui/icons-material/WebAsset';
import React from "react";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import HandymanIcon from '@mui/icons-material/Handyman';
import { MarkdownBox } from "../components/markdown";
import { useAppLocale } from "../../src/i18n/ClientIntlProvider";
import uxDe from "../../src/locales/articles/de/skills_ux.md";
import uxEn from "../../src/locales/articles/en/skills_ux.md";
import managementDe from "../../src/locales/articles/de/skills_management.md";
import managementEn from "../../src/locales/articles/en/skills_management.md";
import frontendDe from "../../src/locales/articles/de/skills_frontend.md";
import frontendEn from "../../src/locales/articles/en/skills_frontend.md";
import backendDe from "../../src/locales/articles/de/skills_backend.md";
import backendEn from "../../src/locales/articles/en/skills_backend.md";
import devopsDe from "../../src/locales/articles/de/skills_devops.md";
import devopsEn from "../../src/locales/articles/en/skills_devops.md";
import unityDe from "../../src/locales/articles/de/skills_unity.md";
import unityEn from "../../src/locales/articles/en/skills_unity.md";
import aiDe from "../../src/locales/articles/de/skills_ai.md";
import aiEn from "../../src/locales/articles/en/skills_ai.md";

const skillsContentByLocale = {
  de: { ux: uxDe, management: managementDe, frontend: frontendDe, backend: backendDe, devops: devopsDe, unity: unityDe, ai: aiDe },
  en: { ux: uxEn, management: managementEn, frontend: frontendEn, backend: backendEn, devops: devopsEn, unity: unityEn, ai: aiEn },
};

export default function SkillsPage({ id }: { id?: string }){

  interface ChipRow {
    name: string;
    chips: string[];
  }

  const t = useTranslations('Skills');
  const { locale } = useAppLocale();
  const skillsContent = skillsContentByLocale[locale];

  const skills_ux: ChipRow = {
    name: t("techniques"),
    chips: ["Storytelling", "Design Thinking", "Visual Design", "Interaction Design", "Wireframing", "Usability Testing", "Prototyping"]
  }
  const tools_ux: ChipRow = {
    name: t("toolsLabel"),
    chips: ["Figma", "Adobe Creative Cloud", "Unity"]
  }

  
  const skills_management: ChipRow = {
    name: t("roles"),
    chips: ["Product Owner", "Scrum Master"]
  };
  const tools_management: ChipRow = {
    name: t("toolsLabel"),
    chips: [ "SCRUM / Secure SCRUM", "Azure DevOps", "Forgejo", "Miro", "Jira", "Confluence"]
  };
  
  const skills_frontend: ChipRow = {
    name: t("usage"),
    chips: ["Cross Platform Apps", "Responsive Layout", "Web Apps", "Mobile Apps", "Data Visualization", "AR / VR Interfaces"]
  };
  const tools_frontend: ChipRow = {
    name: t("toolsAndProgramming"),
    chips: ["React", "React Native", "Android Studio", "Flutter", "Electron", "Next.js", "HTML / CSS", "JavaScript / TypeScript", "Dart"]
  }

  const skills_backend: ChipRow = {
    name: t("usage"),
    chips: ["REST APIs", "ASP.NET"]
  };
  const tools_backend: ChipRow = {
    name: t("programming"),
    chips: ["VS & VS Code", "C# / .NET", "JavaScript / TypeScript"]
  };

  const skills_ai: ChipRow = {
    name: t("usage"),
    chips: ["Agentic-Coding", "Computer Vision", "Model Deployment", "LLM", "RAG", "OCR",]
  };
  const tools_ai: ChipRow = {
    name: t("models"),
    chips: ["YOLO", "Claude", "GPT", "Mistral"]
  };

  const skills_unity: ChipRow = {
    name: t("usage"),
    chips: ["Automotive Interfaces", "Augmented Reality", "Virtual Reality", "Realtime 3D", "Data Visualization", "Prototyping", "Game Development"]
  };
  const tools_unity: ChipRow = {
    name: t("platforms"),
    chips: ["Windows", "WebGL","UWP", "HoloLens 1, 2", "Magic Leap 1, 2", "Android", "iOS"]
  };

  const tools_devops: ChipRow = {
    name: t("toolsLabel"),
    chips: ["Git", "Azure DevOps", "Forgejo", "Kubernetes", "Docker"]
  };
  
  const SkillArticle = ({
    articleIndex,
    title,
    paragraphs,
    blueChips,
    yellowChips,
    bgIcon
  }: {
    articleIndex: number;
    title: string;
    paragraphs: string[];
    blueChips?: ChipRow;
    yellowChips?: ChipRow;
    bgIcon?: ReactElement
  }) => (
    <Box
      sx={{
        mb: 4,
        bgcolor: "background.defaultLight",
        p: 3,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        width: { xs: "100%", md: "85%" },
        ml: { xs: 0, md: articleIndex % 2 === 0 ? 0: "auto" },
      }}
    >
      {bgIcon && 
        <Box
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          opacity: 0.1
        }}
        >
          {bgIcon}
        </Box>
      }

      <Typography mb={3} variant="h6">
        {title}
      </Typography>

      <Box sx={{fontSize: "0.85em"}}>
        {paragraphs.map((paragraph, index) => <MarkdownBox key={index} markdown={paragraph} />)}
      </Box>

      <Box height={15} />

      <Stack mt={2} direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Typography color="chip.primary" variant="subtitle2" sx={{ mr: 1, fontWeight: 600 }}>
          {blueChips?.name}
        </Typography>
        {blueChips?.chips.map((item, index) => (
           <Chip
            size="small"
            key={index}
            label={item}
            sx={{
              backgroundColor: 'chip.primary_offset',
              color: 'text.secondary',
            }}
          >
            <Typography px={2} variant="body2" sx={{ fontSize: "0.75rem" }}>
              {item}
            </Typography>
          </Chip>
        ))}
      </Stack>

      <Stack mt={2} direction="row" spacing={1} flexWrap="wrap" useFlexGap>
         <Typography variant="subtitle2" sx={{ mr: 1, fontWeight: 600 }}>
          {yellowChips?.name}
        </Typography>
        {yellowChips?.chips.map((item, index) => (
          <Chip
            size="small"
            key={index}
            label={item}
            sx={{
              backgroundColor: 'chip.secondary_offset',
              color: 'text.secondary',
            }}
          >
            <Typography px={2}  variant="body2" sx={{ fontSize: "0.75rem" }}>
              {item}
            </Typography>
          </Chip>
        ))}
      </Stack>
    </Box>
  );

  const [singlePage, setSinglePage] = React.useState(false);
  React.useEffect(() => {
    setSinglePage(window.location.pathname.toLocaleLowerCase().endsWith("/skills"));
  }, []);

  return (
    <Box id={id} bgcolor={"background.default"} >
      <BackButton title={"Skills"} disabled={!singlePage} />
      <Container  maxWidth="lg" sx={{ py: singlePage ? 2 : 5 }}>
          {!singlePage && 
          <Stack mb={2} direction={"row"} alignItems={"center"}  justifyContent={"space-between"}>
            <Typography variant="h4" component="h1" gutterBottom>
              Skills
            </Typography>
            <IconButton title="Fullscreen" href={"/skills"} aria-label="Fullscreen" size="small">
              <WebAssetIcon />
            </IconButton>
          </Stack>
        }

       <SkillArticle
         articleIndex={0}
          bgIcon={<DrawIcon sx={{ color:"white", fontSize: 220 }} />}
          title="User Experience Design"
          paragraphs={[skillsContent.ux]}
          blueChips={skills_ux}
          yellowChips={tools_ux}
        />

        <SkillArticle
          articleIndex={1}
          bgIcon={<AssignmentIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Project Management"         
          paragraphs={[skillsContent.management]}
          blueChips={skills_management}
          yellowChips={tools_management}
        />

        <SkillArticle  
          articleIndex={2}
          bgIcon={<PhonelinkIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Frontend & Mobile Development"
          paragraphs={[skillsContent.frontend]}
          blueChips={skills_frontend}
          yellowChips={tools_frontend}
        />

        <SkillArticle
          articleIndex={3}
          bgIcon={<CodeIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Backend Development"
          paragraphs={[skillsContent.backend]}
          blueChips={skills_backend}
          yellowChips={tools_backend}
        />

        <SkillArticle
          articleIndex={4}
          bgIcon={<SmartToyIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Artificial Intelligence"
          paragraphs={[skillsContent.ai]}
          blueChips={skills_ai}
          yellowChips={tools_ai}
        />

        <SkillArticle
          articleIndex={5}
          bgIcon={<Image width={250} src={UnityLogo} alt={"unity"}/>}
          title="Unity Development"
          paragraphs={[skillsContent.unity]}
          blueChips={skills_unity}
          yellowChips={tools_unity}
        />

        <SkillArticle
          articleIndex={6}
          bgIcon={<HandymanIcon sx={{ color:"white", fontSize: 220 }} />}
          title="DevOps"
          paragraphs={[skillsContent.devops]}
          yellowChips={tools_devops}
        />

        {/*<Box sx={{ my: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t("fluentLanguages")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            🇩🇪 {t("de")}<br />
            🇬🇧 {t("en")}
          </Typography>
        </Box>*/}      
      </Container>
    </Box>
  );
}
