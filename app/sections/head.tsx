import { Typography, Stack, Link, Box, Container } from "@mui/material";
import { LocaleSwitcher } from "../components/localeSwitcher";
import { useTranslations } from "next-intl";


function NavScrollButton({ targetId, label }: { targetId: string; label: string }) {
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Link
      sx={{ cursor: "pointer", alignSelf: "center" }}
      onClick={handleScroll}
    >
      {label}
    </Link>
  );
}

function NavLinkButton({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      sx={{ cursor: "pointer", alignSelf: "center" }}
    >
      {label}
    </Link>
  );
}

export default function Head({ id }: { id?: string }) {
  
  const t = useTranslations('Nav');  

  return (<Box id={id} 
        sx={{ 
          justifyContent: "center",
          display: "flex",
          bgcolor: "background.default" }}>

        <Container
          maxWidth="lg"
          sx={{
            py: 2,
            bgcolor: "background.defaultLight",
            borderBottomRightRadius: 32,
            borderBottomLeftRadius: 32,
            gap: 2,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between"      
          }}>

          <Stack sx={{ flexDirection: "row", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                borderRadius: 1,
                width: 130,
                height: 85,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center"
              }}
            > 
              <img
                src="https://avatars.githubusercontent.com/u/12151775?v=4"
                alt="ProfilePicture"
                style={{ 
                  width: "100%", 
                  height: "100%",
                  objectFit: "cover" 
                  }}
              />
            </Box>

            <Stack>
              <Typography
                sx={{
                  color: "text.primary",     
                }}
                variant="h5"
              >
                Karl Martin
              </Typography>
      
              <Typography 
                variant="body2"
                sx={{ color:"text.faded" }}>
                  UX Technologist | Senior Developer
              </Typography>
            </Stack>
            </Stack>

          <Stack sx={{ px: 3, justifyContent: "center", alignSelf: { xs: "flex-end", sm: "center" } }} direction={"row"} gap={1}>
            <NavScrollButton targetId="showroom-section" label="Showroom" />
            <NavScrollButton targetId="skills-section" label="Skills" />
            <NavScrollButton targetId="contact-section" label={t("contact")} />
            <NavLinkButton href="/cv" label={"CV"} />
            |
            <LocaleSwitcher />
          </Stack>
        </Container>         
      </Box>
  );
}

