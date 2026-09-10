import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { LocaleSwitcher } from "../components/localeSwitcher";

export default function Footer() {

  const handleScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        justifyContent: "center",
        display: "flex",
        textAlign: "center",
      }}>
      <Container
        sx={{
          px: 5,
          py: 3,
          mx: 2,
          bgcolor: "background.defaultLight",
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
          display: "flex",
          flexDirection: "column"
        }}>
        <Stack justifyContent={"center"} gap={1} direction={"row"}>
          <Link sx={{ cursor: "pointer" }} onClick={() => { handleScroll("head-section") }}>Home</Link>
          <Link sx={{ cursor: "pointer" }} onClick={() => { handleScroll("showroom-section") }} >Showroom</Link>
          <Link sx={{ cursor: "pointer" }} onClick={() => { handleScroll("skills-section") }}>Skills</Link>
          <Link sx={{ cursor: "pointer" }} onClick={() => { handleScroll("contact-section") }}>Contact</Link>
          |
          <LocaleSwitcher />
        </Stack>
        <Stack justifyContent={"center"} gap={1} direction={"row"}>            
          <Link sx={{ fontSize: "0.875rem", cursor: "pointer" }} href={"/ossPage"} color="text.faded">Open Source</Link>
        </Stack>
        <Typography alignSelf={"center"} variant="body2" color="text.faded" mt={2}>
          &copy; {new Date().getFullYear()} Karl Martin - karluwemartin.de
        </Typography>
      </Container>
    </Box>
  );
}