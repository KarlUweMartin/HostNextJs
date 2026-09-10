"use client";

import { Box, Container, Typography,  Chip, Stack, Divider, Grid, IconButton } from "@mui/material";
import HandymanIcon from '@mui/icons-material/Handyman';
import CodeIcon from '@mui/icons-material/SettingsEthernet';
import BrushIcon from '@mui/icons-material/Brush';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
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

export default function SkillsPage({ id }: { id?: string }){
  const devTools = [
    { name: "Visual Studio / VS Code", url: "https://code.visualstudio.com/" },
    { name: "React", url: "https://react.dev/" },
    { name: "React Native", url: "https://reactnative.dev/" },
    { name: "Android Studio", url: "https://developer.android.com/studio" },
    { name: "Flutter", url: "https://flutter.dev/" },
    { name: "Next.js", url: "https://nextjs.org/" },
    { name: "Unity", url: "https://unity.com/" }
  ];

  const languages = [
    { name: "C# / .NET", url: "https://dotnet.microsoft.com/" }, 
    { name: "HTML / CSS", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/" }, 
    { name: "JavaScript / TypeScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/" },
    { name: "Dart", url: "https://dart.dev/" },
  ];

  const platforms = [
    { name: "Windows", url: "https://www.microsoft.com/en-us/windows" },
    { name: "Universal Windows Platform", url: "https://learn.microsoft.com/en-us/windows/uwp/" },
    { name: "HoloLens 1, 2", url: "https://www.microsoft.com/en-us/hololens/" },
    { name: "Magic Leap 2", url: "https://www.magicleap.com/" },
    { name: "Android", url: "https://www.android.com/" },
    { name: "iOS", url: "https://www.apple.com/ios/" },
    { name: "Android VR", url: "https://developer.android.com/distribute/play-services/play-vr" },
    { name: "Web", url: "https://www.w3.org/" },
  ];

  const creativeTools = [
    { name: "Figma", url: "https://www.figma.com/" },
    { name: "Adobe Creative Cloud", url: "https://www.adobe.com/products/photoshop.html" },
    { name: "Cinema 4D", url: "https://www.maxon.net/en/cinema-4d" },
    { name: "Blender", url: "https://www.blender.org/" },
    { name: "Office 365", url: "https://www.microsoft.com/en-us/microsoft-365/" }
  ];

  const devOps = [
    { name: "Git", url: "https://git-scm.com/" },
    { name: "Azure DevOps", url: "https://azure.microsoft.com/en-us/products/devops/" },
    { name: "SCRUM / Secure SCRUM", url: "https://www.scrum.org/" },
    { name: "Kubernetes", url: "https://kubernetes.io/" },
    { name: "Docker", url: "https://www.docker.com/" }
  ];
  
  const ChipSection = ({ title, items, icon }) => (
    <Box sx={{ bgcolor: "background.defaultLight", p: 3, borderRadius: 2 }}>
      <Stack spacing={2} direction="row" alignItems="center" mb={2}>
        {icon}
        <Typography variant="h6">{title}</Typography>
      </Stack>

      <Divider
        sx={{
          my: 2,
          border: 0,
          height: 2,
          background: 'linear-gradient(90deg, rgba(59, 134, 219, 0.95) 0%, rgba(103, 192, 255, 1) 100%)',
          opacity: 1,
        }}
      />
      
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {items.map((item, index) => {
          const itemName = typeof item === 'string' ? item : item.name;
          const itemUrl = typeof item === 'string' ? null : item.url;
          const isDarkChip = index % 2 === 1;
          
          return (
            <Chip           
              key={itemName} 
              label={itemName}
              onClick={() => itemUrl && window.open(itemUrl, '_blank')}
              sx={{
                cursor: itemUrl ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                backgroundColor: isDarkChip ? 'rgba(59, 134, 219, 0.72)' : undefined,
                color: 'text.secondary',
                ...(itemUrl && {
                  '&:hover': {
                    bgcolor: "#eda916",
                    color: '#111',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }
                })
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
  
  const SkillArticle = ({
    title,
    paragraphs,
    chips = [],
    bgIcon
  }: {
    title: string;
    paragraphs: string[];
    chips?: string[];
    bgIcon?: ReactElement
  }) => (
    <Box
      sx={{
        mb: 2,
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

      <Divider
        sx={{
          my: 3,
          border: 0,
          height: 2,
          background: 'linear-gradient(90deg, rgba(31, 89, 173, 0.95) 0%, rgba(79, 163, 255, 1) 100%)',
          opacity: 1,
        }}
      />

      <Stack mt={2} direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {chips.map((item, index) => (
          <Chip
            key={index}
            label={item}
            sx={{
              backgroundColor: index % 2 === 1 ? 'rgba(59, 134, 219, 0.72)' : undefined,
              color: 'text.secondary',
            }}
          />
        ))}
      </Stack>
    </Box>
  );

  const t = useTranslations('Skills');

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
          chips={["Storytelling", "Design Thinking", "Visual Design", "Interaction Design", "Wireframing", "Usability Testing" ]}
        />

        <SkillArticle
          bgIcon={<AssignmentIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Project Management"         
          paragraphs={[t("management1"), t("management2")]}
          chips={["Product Owner", "Scrum Master"]}
        />

        <SkillArticle  
          bgIcon={<PhonelinkIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Frontend & Mobile Development"
          paragraphs={[t("frontend1"), t("frontend2")]}
          chips={["Cross Platform", "Responsive Layout", "Web Apps", "Mobile Apps", "Data Visualization"]}
        />

        <SkillArticle
          bgIcon={<CodeIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Backend Development"
          paragraphs={[t("backend1"), t("backend2")]}
          chips={["REST APIs", "ASP.NET", "Docker", "DevOps", "CI/CD"]}
        />

        <SkillArticle
          bgIcon={<SmartToyIcon sx={{ color:"white", fontSize: 220 }} />}
          title="Artificial Intelligence"
          paragraphs={[t("ai1"), t("ai2")]}
          chips={["Agentic-Coding", "Model Deployment", "LLM", "RAG", "OCR", "Computer Vision"]}
        />

        <SkillArticle
          bgIcon={<Image width={250} src={UnityLogo} alt={"unity"}/>}
          title="Unity Development"
          paragraphs={[t("unity1"), t("unity2"), t("unity3")]}
          chips={["Automotive Interfaces", "Mixed Reality", "Realtime 3D", "Data Visualization", "Prototyping", "Game Development"]}
        />



        <Typography mt={6} mb={2} variant="h5" component="h1">
          {t("tools")}
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ChipSection icon={<HandymanIcon sx={{color: "white"}}  />} title={t("devTools")} items={devTools} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChipSection icon={<CodeIcon sx={{color: "white"}} />} title={t("programming")} items={languages} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChipSection icon={<DevicesOtherIcon sx={{color: "white"}}  />} title={t("platforms")} items={platforms} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChipSection icon={<BrushIcon sx={{color: "white"}}  />} title={t("creativeTools")} items={creativeTools} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ChipSection icon={<CloudSyncIcon sx={{color: "white"}}  />} title="DevOps" items={devOps} />
          </Grid>
        </Grid>

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
