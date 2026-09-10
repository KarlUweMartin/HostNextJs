"use client";

import { Box, Container, Typography, Chip, Stack, Divider, IconButton } from "@mui/material";
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

export default function SkillsPage({ id }: { id?: string }){

  interface ChipRow {
    name: string;
    chips: string[];
  }

  const t = useTranslations('Skills');

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
    title,
    paragraphs,
    skillRow,
    toolRow,
    bgIcon
  }: {
    title: string;
    paragraphs: string[];
    skillRow?: ChipRow;
    toolRow?: ChipRow;
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
      }}
    >
      {bgIcon && 
        <Box
        sx={{
          position: "absolute",
          right: 25,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          opacity: 0.1       
        }}
        >         
          {bgIcon}
        </Box>
      }

      <Typography mb={1} variant="h6">
        {title}
      </Typography>

      {paragraphs.map((paragraph, index) => {
        return (
          <Typography
            key={index}
            component="p"
            variant="body2"
            color="text.secondary"    
            sx={{
              mb: 1.5,
              "& b, & strong": {
                fontWeight: 700,
                color: "text.primary",
              },
            }}
          >
            {paragraph}
          </Typography>
        );
      })}

      <Box height={15} />

      <Stack mt={2} direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Typography color="chip.primary_offset" variant="subtitle2" sx={{ mr: 1, fontWeight: 600 }}>
          {skillRow?.name}
        </Typography>
        {skillRow?.chips.map((item, index) => (
           <Chip
            size="small"
            key={index}
            label={item}
            sx={{
              backgroundColor: index % 2 === 1 ? 'chip.primary_offset' : 'chip.primary',
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
          {toolRow?.name}
        </Typography>
        {toolRow?.chips.map((item, index) => (
          <Chip
            size="small"
            key={index}
            label={item}
            sx={{
              backgroundColor: index % 2 === 1 ? 'chip.secondary' : 'chip.secondary_offset',
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
          bgIcon={<DrawIcon sx={{ color:"white", fontSize: 220 }} />}
          title="User Experience Design"
          paragraphs={[t("ux1")]}
          skillRow={skills_ux}
          toolRow={tools_ux}
        />

        <SkillArticle
          bgIcon={<AssignmentIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Project Management"         
          paragraphs={[t("management1"), t("management2")]}
          skillRow={skills_management}
          toolRow={tools_management}
        />

        <SkillArticle  
          bgIcon={<PhonelinkIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Frontend & Mobile Development"
          paragraphs={[t("frontend1"), t("frontend2")]}
          skillRow={skills_frontend}
          toolRow={tools_frontend}
        />

        <SkillArticle
          bgIcon={<CodeIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Backend Development"
          paragraphs={[t("backend1"), t("backend2")]}
          skillRow={skills_backend}
          toolRow={tools_backend}
        />

        <SkillArticle
          bgIcon={<SmartToyIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Artificial Intelligence"
          paragraphs={[t("ai1"), t("ai2")]}
          skillRow={skills_ai}
          toolRow={tools_ai}
        />

        <SkillArticle
          bgIcon={<Image width={250} src={UnityLogo} alt={"unity"}/>}
          title="Unity Development"
          paragraphs={[t("unity1"), t("unity2"), t("unity3")]}
          skillRow={skills_unity}
          toolRow={tools_unity}
        />

        <SkillArticle
          bgIcon={<HandymanIcon sx={{ color:"white", fontSize: 220 }} />}
          title="DevOps"
          paragraphs={[t("devops1")]}
          toolRow={tools_devops}
        />

        <Box sx={{ my: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t("fluentLanguages")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            🇩🇪 {t("de")}<br />
            🇬🇧 {t("en")}
          </Typography>
        </Box>      
      </Container>
    </Box>
  );
}
