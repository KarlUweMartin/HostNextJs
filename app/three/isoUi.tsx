import { Box, Slider } from '@mui/material'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { GuidGenerator } from '../utils/guidGenerator'

// True isometric view: camera sits on the (1,1,1) diagonal, giving a 45° azimuth
// and a ~35.264° elevation - the classic "isometric" look.
const ISO_DISTANCE = 10
const ISO_POSITION: [number, number, number] = [ISO_DISTANCE, ISO_DISTANCE, ISO_DISTANCE]

const SPAWN_INTERVAL_MS = 33
const MAX_RECTS = 100
const POS: boxCoords = { x: 0, y: 0, z: 15 }
const ROT: boxCoords = { x: 0, y: 0, z: 0 }
const SIZE: boxCoords = { x: 4, y: 0.2, z: 0.2 }

// Direction pointing straight away from the camera, so shifting along it
// recedes blocks into the distance without drifting sideways on screen.
const AWAY_STEP = ISO_POSITION.map((v) => v / ISO_DISTANCE) as [number, number, number]

interface boxCoords {
  x: number;
  y: number;
  z: number;
}

interface RectData {
  id: string;
  pos: boxCoords;
  rot: boxCoords;
  size: boxCoords;  
  col: string;
}

function IsoRectangle({ pos, size, rot, col }: { pos: boxCoords; size: boxCoords; rot: boxCoords; col: string }) {
  return (
    <mesh position={[pos.x, pos.y, pos.z]} rotation={[rot.x, rot.y, rot.z]}>
      <boxGeometry args={[size.x, size.y, size.z]} />
      <meshStandardMaterial color={col} />
    </mesh>
  )
}

function IsoRectangleStream({ pos, size, rot, col }: { pos: boxCoords; rot: boxCoords; size: boxCoords; col: string }) {
  const [rects, setRects] = useState<RectData[]>([])
  let total = 0;
  const short = () => GuidGenerator.short();

  useEffect(() => {
    const interval = setInterval(() => {
      total++;
      setRects((prev) => [
        ...prev.map((r) => ({ ...r, pos: { ...r.pos, z: r.pos.z - 1 } })),
        { id: short(), pos, rot, size, col: col }
      ].slice(-MAX_RECTS))
    }, SPAWN_INTERVAL_MS)
    
    return () => clearInterval(interval)
  }, [rects])

  return (
    <>
      {rects.map((r) => (
        <IsoRectangle key={r.id} pos={r.pos} size={r.size} rot={r.rot} col={r.col} />
      ))}
    </>
  )
}

export function IsoUiBox() {
  const [hue, setHue] = useState(210)
  const color = `hsl(${hue}, 100%, 50%)`
  const [width, setWidth] = useState(4)
  const [rotation, setRotation] = useState(0)

  return (
    <Box position="relative">
      <Box
        position="absolute"
        top={16}
        left={16}
        zIndex={1}
        width={240}
        p={2}
        borderRadius={2}
        bgcolor="rgba(0, 0, 0, 0.5)"
      >
        <Slider
          value={hue}
          min={0}
          max={360}
          step={1}
          onChange={(_, value) => setHue(value as number)}
          sx={{
            color: 'transparent',
            height: 12,
            '& .MuiSlider-rail': {
              opacity: 1,
              background: 'linear-gradient(to right, ' +
                'hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), ' +
                'hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))'
            },
            '& .MuiSlider-track': {
              border: 'none',
              background: 'transparent'
            },
            '& .MuiSlider-thumb': {
              bgcolor: color,
              border: '2px solid white'
            }
          }}
        />
        <Slider
          value={width}
          min={0.5}
          max={10}
          step={0.1}
          onChange={(_, value) => setWidth(value.toFixed(2))}
        />
        <Slider
          value={rotation}
          min={0}
          max={180}
          step={1}
          onChange={(_, value) => setRotation(value as number)}
        />
      </Box>
      <Canvas
        style={{ height: '800px' }}
        orthographic
        camera={{ position: ISO_POSITION, zoom: 80, near: 0.1, far: 100 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        >
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[10, 10, 5]} intensity={Math.PI / 2} />
        <IsoRectangleStream
          col={color}
          pos={POS}
          size={{ x: width, y: SIZE.y, z: SIZE.z }}
          rot={{ x: ROT.x, y: ROT.y, z: (rotation * Math.PI) / 180 }}
        />
      </Canvas>
    </Box>
  )
}
