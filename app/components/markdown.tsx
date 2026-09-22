import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MarkdownModalModel = {
  title: string;
  markdown: string;
};

export default function MarkdownModal({
  detail,
  open,
  onClose
}: {
  detail: MarkdownModalModel | null;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          bgcolor: "background.defaultLight",
          borderRadius: 1,
          maxHeight: "85vh",
        },
      }}
    >
      {detail && (
        <>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography component="h2" variant="h6" sx={{ flex: 1 }}>
              {detail.title}
            </Typography>
            <IconButton onClick={onClose}size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ py: 3 }}>
            <MarkdownBox markdown={detail.markdown} />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

export function MarkdownBox({ markdown }: { markdown: string }) {
  return (
    <Box
      component="article"
      sx={{
        maxWidth: 680,
        mx: "auto",
        color: "text.secondary",
        lineHeight: 1.75,
        "& h1, & h2, & h3": {
          color: "text.primary",
          lineHeight: 1.3,
          mt: 3.5,
          mb: 1.5,
        },
        "& h1": { fontSize: "1.6rem", mt: 0 },
        "& h2": { fontSize: "1.3rem" },
        "& h3": { fontSize: "1.1rem" },
        "& p": { my: 2 },
        "& ul, & ol": { pl: 3, my: 2 },
        "& a": { color: "primary.main" },
        "& blockquote": {
          m: "24px 0",
          pl: 2,
          borderLeft: "3px solid",
          borderColor: "border.secondary",
          color: "text.faded",
        },
        "& code": {
          bgcolor: "action.hover",
          borderRadius: 0.5,
          px: 0.6,
          py: 0.2,
        },
        "& pre": {
          overflowX: "auto",
          bgcolor: "action.hover",
          borderRadius: 1,
          p: 2,
        },
        "& pre code": { p: 0, bgcolor: "transparent" },
        "& img": {
          display: "block",
          maxWidth: "45%",
          maxHeight: "180px",
          height: "auto",
          borderRadius: 1,
          p: 2,
          backgroundColor: "#fff",
          my: 3,
        },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}