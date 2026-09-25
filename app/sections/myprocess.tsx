import { useEffect, useRef, useState } from "react";
import { Box, ButtonBase, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import zIndex from "@mui/material/styles/zIndex";

const stages = [
  { label: "VISION", row: 0, column: 0, descriptionKey: "vision" },
  { label: "RESEARCH", row: 1, column: 0, descriptionKey: "research" },
  { label: "DESIGN", row: 0, column: 1, descriptionKey: "design" },
  { label: "ARCHITECTURE", row: 1, column: 1, descriptionKey: "architecture" },
  { label: "PROTOTYPING", row: 0, column: 2, descriptionKey: "prototyping" },
  { label: "DEVELOPMENT", row: 1, column: 2, descriptionKey: "development" },
  { label: "USABILITY", row: 0, column: 3, descriptionKey: "usability" },
  { label: "RELEASE", row: 1, column: 3, descriptionKey: "release" },
  { label: "FEEDBACK", row: 0, column: 4, descriptionKey: "feedback" },
  { label: "UPDATE", row: 1, column: 4, descriptionKey: "update" },
];

const chipWidth = 120;
const columnWidth = 240;
const trackWidth = columnWidth * 5;
const trackInset = 8;
const sliderPadding = 16;
const sliderWidth = trackWidth + sliderPadding * 2;

export default function MyProcess() {
  const t = useTranslations("Process");
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ pointerStart: 0, offsetStart: 0 });
  const selectedIndexRef = useRef(0);
  const automationRunRef = useRef(0);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutomating, setIsAutomating] = useState(false);
  const [automationRestartKey, setAutomationRestartKey] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateOffset = () => {
      const centeredOffset = viewport.clientWidth / 2 - trackInset - sliderPadding - (2 * columnWidth + chipWidth / 2);
      setOffset(Math.min(viewport.clientWidth / 2 - trackInset, Math.max(viewport.clientWidth / 2 - trackInset - sliderWidth, centeredOffset)));
    };

    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const runId = automationRunRef.current + 1;
    automationRunRef.current = runId;
    setIsAutomating(true);

    const waitForFrame = () => new Promise<number>((resolve) => requestAnimationFrame(resolve));

    const animateSlider = async () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? trackWidth;
      const leftOffset = viewportWidth / 2 - trackInset - sliderWidth;
      const rightOffset = viewportWidth / 2 - trackInset;

      const animateSegment = async (fromOffset: number, toOffset: number, duration: number) => {
        const startTime = performance.now();

        while (automationRunRef.current === runId) {
          await waitForFrame();
          if (automationRunRef.current !== runId) return false;

          const progress = Math.min((performance.now() - startTime) / duration, 1);
          const nextOffset = fromOffset + (toOffset - fromOffset) * progress;
          setOffset(nextOffset);
          selectClosestStage(nextOffset);

          if (progress === 1) return true;
        }

        return false;
      };

      if (automationRestartKey === 0) {
        setOffset(rightOffset);
        selectClosestStage(rightOffset);
      } else if (!(await animateSegment(offset, rightOffset, 500))) {
        return;
      }

      while (automationRunRef.current === runId) {
        if (!(await animateSegment(rightOffset, leftOffset, 45000))) return;
        if (!(await animateSegment(leftOffset, rightOffset, 500))) return;
      }
    };

    animateSlider();
    return () => {
      automationRunRef.current += 1;
      setIsAutomating(false);
    };
  }, [automationRestartKey]);

  useEffect(() => () => {
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
  }, []);

  const clampOffset = (nextOffset: number) => {
    const viewportWidth = viewportRef.current?.clientWidth ?? trackWidth;
    const maximumOffset = viewportWidth / 2 - trackInset;
    const minimumOffset = maximumOffset - sliderWidth;
    return Math.min(maximumOffset, Math.max(minimumOffset, nextOffset));
  };

  const selectClosestStage = (nextOffset: number) => {
    const viewportWidth = viewportRef.current?.clientWidth ?? trackWidth;
    const center = viewportWidth / 2;
    let closestIndex = selectedIndex;
    let closestDistance = Number.POSITIVE_INFINITY;

    stages.forEach((stage, index) => {
      const rowOffset = stage.row === 1 ? columnWidth / 2 : 0;
      const stageCenter = trackInset + nextOffset + sliderPadding + rowOffset + stage.column * columnWidth + chipWidth / 2;
      const distance = Math.abs(stageCenter - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    selectedIndexRef.current = closestIndex;
    setSelectedIndex(closestIndex);
  };

  const selectStage = (index: number) => {
    const viewportWidth = viewportRef.current?.clientWidth ?? trackWidth;
    const stage = stages[index];
    const rowOffset = stage.row === 1 ? columnWidth / 2 : 0;
    const centeredOffset = viewportWidth / 2 - trackInset - sliderPadding - rowOffset - stage.column * columnWidth - chipWidth / 2;

    setOffset(clampOffset(centeredOffset));
    selectedIndexRef.current = index;
    setSelectedIndex(index);
  };

  const pauseAutomation = () => {
    automationRunRef.current += 1;
    setIsAutomating(false);
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);

    restartTimerRef.current = setTimeout(() => {
      setAutomationRestartKey((key) => key + 1);
      restartTimerRef.current = null;
    }, 15000);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pauseAutomation();
    dragRef.current = { pointerStart: event.clientX, offsetStart: offset };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    pauseAutomation();
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
    <Container maxWidth={false} disableGutters>
 
      <Typography sx={{textAlign: "center", mb: 3}}>{t(`title`)}</Typography>
      
      <Box
        sx={{
          position: "relative",
          height: 150,
          overflow: "visible",
          border: "1px solid",
          borderColor: "border.faded",
          borderRadius: 0        
        }}>
        <Box
          sx={{
            position: "absolute",
            top: -15,
            left: "50%",
            height: 188,
            borderLeft: "1px dotted",
            borderColor: selectedIndex % 2 == 0 ? "border.main" : "border.secondary",
            zIndex: 1,
            pointerEvents: "none",
          }} />
        <Box
          ref={viewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          sx={{
            position: "absolute",
            top: 6,
            bottom: 6,
            right: 0,
            left: 0,
            overflow: "hidden",
            touchAction: "pan-y",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: trackInset,
              width: sliderWidth,
              height: 136,
              bgcolor: "border.faded",
              borderRadius: 2,
              zIndex: 0,
              transform: `translateX(${offset}px)`,
              transition: isDragging || isAutomating ? "none" : "transform 333ms ease-in-out",
            }} />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: trackInset,
              width: sliderWidth,
              height: 136,
              zIndex: 3,
              transform: `translateX(${offset}px)`,
              transition: isDragging || isAutomating ? "none" : "transform 333ms ease-in-out",
            }}>
            {stages.map((stage, index) => (
              <ButtonBase
                key={stage.label}
                type="button"
                onPointerDown={(event) => {
                  event.stopPropagation();
                  pauseAutomation();
                  selectStage(index);
                }}
                onClick={() => {
                  pauseAutomation();
                  selectStage(index);
                }}
                aria-pressed={selectedIndex === index}
                sx={{
                  zIndex: 3,
                  position: "absolute",
                  left: sliderPadding + stage.column * columnWidth + (stage.row === 1 ? columnWidth / 2 : 0),
                  top: stage.row === 0 ? 31 : 66,
                  width: chipWidth,
                  height: 35,
                  borderColor: stage.row === 0 ? "#c88c08" : "#2775b5",
                  borderRadius: 20,
                  bgcolor: stage.row === 0 ? "#352e1e" : "#1b3c59",
                  color: stage.row === 0 ? "#d89400" : "#56aaeb",
                  fontSize: "0.8rem",
                  letterSpacing: 0,
                  cursor: "pointer",
                  transition: "box-shadow 160ms ease, border-color 160ms ease",
                  ...(selectedIndex === index && {
                    border: "2px solid",
                    borderColor: "#eda916",
                    boxShadow: stage.row === 0 ? "0 0 16px 4px rgba(237, 169, 22, 0.65)" : "0 0 16px 4px rgba(107, 179, 226, 0.73)",
                    color: stage.row === 0 ? "#d89400" : "#56aaeb",
                  }),
                }}>
                {stage.label}
              </ButtonBase>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          height: 100,
          maxWidth: 600,
          mx: { xs: 2, sm: "auto"},
          my: 3,
          px: 2,
          borderRadius: 2,
          border: "1px dotted",
          borderColor: selectedIndex % 2 === 0 ? "border.main" : "border.secondary",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}>
        <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
          {t(`descriptions.${stages[selectedIndex].descriptionKey}`)}
        </Typography>
      </Box>
    </Container>
  );
}