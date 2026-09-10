'use client';

import { Box, Container, Typography, Stack, Chip } from '@mui/material';
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslations } from "next-intl";

const socials = [
  {
    href: "https://github.com/KarlUweMartin/",
    icon: GitHubIcon,
    label: "github.com/KarlUweMartin",
    ariaLabel: "GitHub"
  },
  {
    href: "mailto:KarlUweMartin@gmail.com",
    icon: EmailIcon,
    label: "KarlUweMartin@gmail.com",
    ariaLabel: "Email"
  }
];

export default function ContactPage({ id }: { id?: string }) {
  const t = useTranslations('Contact');

  return (
    <Box id={id}>
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {t("title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("head")}
          </Typography>
        </Box>
        <Box sx={{ mb: 2, bgcolor: "background.defaultLight", p: 3, borderRadius: 2 }}>
          <Stack spacing={2} gap={1}>
            {socials.map((social) => (
              <Chip
                key={social.label}
                icon={<social.icon />}
                label={social.label}
                onClick={() => window.open(social.href, '_blank')}
                clickable
                sx={{
                  backgroundColor: "#35393f",
                  color: "text.secondary",
                  boxShadow: 1,
                  "& .MuiChip-icon": {
                    color: "text.secondary"
                  },
                  ":hover": {
                    backgroundColor: "#434a53",
                    color: "#eda916",
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
