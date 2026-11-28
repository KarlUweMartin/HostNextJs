"use client";

import * as React from "react";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { openStreetMapColors } from "../theme";
import WebAssetIcon from '@mui/icons-material/WebAsset';

type IframeModalProps = {
  open: boolean;
  url?: string | null;
  title?: string;
  onClose: () => void;
  unmountOnClose?: boolean;
  children?: React.ReactNode;
};

export function IframeModal({
  open,
  url = null,
  title,
  onClose,
  unmountOnClose = true,
  children,
}: IframeModalProps) {
  const [loading, setLoading] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && url) setLoading(true);
  }, [open, url]);

  const shouldRenderIframe = open || !unmountOnClose;

  function useFullscreen() {
    if (children) {
      contentRef.current?.requestFullscreen?.();
      return;
    }
    if (!iframeRef.current) return;

    try {
      const canvas = iframeRef.current.contentDocument?.querySelector("#unity-canvas");
      if (canvas?.requestFullscreen) {
        canvas.requestFullscreen();
        return;
      }
    } catch (e) {
      // Cross-origin iframe, try iframe fullscreen instead
    }

    if (iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  }

  return (
   <Dialog
    open={open}
    onClose={onClose}
    slotProps={{
      backdrop: {
        sx: {
          backgroundColor: openStreetMapColors.modal.backdrop,
          backdropFilter: "blur(6px)",
        },
      },
    }}
    PaperProps={{
      sx: {
        minWidth: "min(1000px, calc(100% - 64px))",
        height: "85vh",
        backgroundColor: openStreetMapColors.modal.surface,
        borderRadius: 1,
        overflow: "hidden",
      },
    }}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          variant="body1"     
          sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}
          title={title ?? url ?? ""}
        >
          {title ?? url ?? "Iframe"}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton 
              sx={{ backgroundColor: openStreetMapColors.modal.surface }}
              onClick={useFullscreen} 
              aria-label="Fullscreen" 
              size="small">
            <WebAssetIcon />
          </IconButton>
          <IconButton 
              sx={{ backgroundColor: openStreetMapColors.modal.surface }}
              onClick={onClose} 
              aria-label="Close" 
              size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0, display: "flex", minHeight: 0 }}>
        <Box ref={contentRef} sx={{ position: "relative", flex: 1, minWidth: 0, minHeight: 0 }}>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: openStreetMapColors.modal.surface,
                zIndex: 1,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {children ?? (shouldRenderIframe && url ? (
            <Box<'iframe'>
              component="iframe"
              ref={iframeRef}
              key={url}
              src={url}
              title={title ?? "Embedded content"}
              onLoad={() => setLoading(false)}
              sx={{ width: "100%", height: "100%", border: "none", display: "block", backgroundColor: openStreetMapColors.modal.iframeBackground }}
              allow="clipboard-read; clipboard-write; fullscreen"
            />
          ) : (
            <Box sx={{ p: 3 }}>
              <Typography color={openStreetMapColors.modal.emptyText}>No URL selected.</Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
