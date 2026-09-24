import { useEffect, useRef, useState } from "react";
import { Box, ButtonBase, Container, Typography } from "@mui/material";

const stages = [
  { label: "VISION", row: 0, description: "Clarify the purpose, audience, and outcome before shaping the solution." },
  { label: "RESEARCH", row: 1, description: "Gather the context and evidence that keeps decisions grounded in real needs." },
  { label: "DESIGN", row: 0, description: "Turn insights into a clear structure, visual language, and interaction model." },
  { label: "ARCHITECTURE", row: 1, description: "Define the systems, information, and technical boundaries behind the experience." },
  { label: "PROTOTYPING", row: 0, description: "Make the idea tangible early enough to learn from it and change direction." },
  { label: "DEVELOPMENT", row: 1, description: "Build the experience as a robust, maintainable product rather than a static concept." },
  { label: "USABILITY", row: 0, description: "Test the details that affect clarity, confidence, and ease of use." },
  { label: "RELEASE", row: 1, description: "Ship deliberately, observe the result, and keep improving what matters." },
  { label: "FEEDBACK", row: 0, description: "Use feedback as a continuous input for the next useful iteration." },
];

const chipWidth = 116;
const columnWidth = 232;
const trackWidth = columnWidth * 5;

export default function MyProcess() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerStart: 0, offsetStart: 0 });
  const [selectedIndex, setSelectedIndex] = useState(4);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateOffset = () => {
      const centeredOffset = viewport.clientWidth / 2 - (2 * columnWidth + chipWidth / 2);
      setOffset(Math.min(0, Math.max(viewport.clientWidth - trackWidth, centeredOffset)));
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const clampOffset = (nextOffset: number) => {
    const viewportWidth = viewportRef.current?.clientWidth ?? trackWidth;
    return Math.min(0, Math.max(viewportWidth - trackWidth, nextOffset));
  };

  const selectClosestStage = (nextOffset: number) => {
    const viewportWidth = viewportRef.current?.clientWidth ?? trackWidth;
    const center = viewportWidth / 2;
    let closestIndex = selectedIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    stages.forEach((stage, index) => {
      const stageCenter = nextOffset + (index % 5) * columnWidth + chipWidth / 2;
      const distance = Math.abs(stageCenter - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setSelectedIndex(closestIndex);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { pointerStart: event.clientX, offsetStart: offset };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const nextOffset = clampOffset(dragRef.current.offsetStart + event.clientX - dragRef.current.pointerStart);
    setOffset(nextOffset);
    selectClosestStage(nextOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <Box component="section" sx={{ display: "flex", justifyContent: "center", py: 2 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Typography sx={{ color: "text.primary", fontSize: "1.25rem", mb: 3, pl: 1 }}>
          My Process
        </Typography>

        <Box
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          sx={{
            position: "relative",
            height: 148,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "text.secondary",
            borderRadius: 3,
            touchAction: "pan-y",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}>
          <Box sx={{ position: "absolute", inset: "0 auto 0 50%", borderLeft: "1px dotted rgba(243, 237, 227, 0.2)", zIndex: 2 }} />
          <Box
            sx={{
              position: "absolute",
              top: 6,
              left: 8,
              width: trackWidth,
              height: 136,
              borderRadius: 2,
              bgcolor: "#111c23",
              transform: `translateX(${offset}px)`,
              transition: isDragging ? "none" : "transform 180ms ease-out",
            }}>
            {stages.map((stage, index) => (
              <ButtonBase
                key={stage.label}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-pressed={selectedIndex === index}
                sx={{
                  position: "absolute",
                  left: (index % 5) * columnWidth + 58,
                  top: stage.row === 0 ? 31 : 66,
                  width: chipWidth,
                  height: 35,
                  border: "1px dotted",
                  borderColor: stage.row === 0 ? "#c88c08" : "#2775b5",
                  borderRadius: 20,
                  bgcolor: stage.row === 0 ? "#352e1e" : "#1b3c59",
                  color: stage.row === 0 ? "#d89400" : "#3f91d1",
                  fontSize: "0.65rem",
                  letterSpacing: 0,
                  cursor: "pointer",
                  transition: "box-shadow 160ms ease, border-color 160ms ease",
                  ...(selectedIndex === index && {
                    borderColor: "#eda916",
                    boxShadow: "0 0 16px 4px rgba(237, 169, 22, 0.65)",
                    color: "#eda916",
                  }),
                }}>
                {stage.label}
              </ButtonBase>
            ))}
          </Box>
        </Box>

        <Typography sx={{ maxWidth: 540, mx: "auto", mt: 4, px: 2, color: "text.secondary", textAlign: "center", fontSize: "0.75rem", lineHeight: 1.25 }}>
          {stages[selectedIndex].description}
        </Typography>
      </Container>
    </Box>
  );
}