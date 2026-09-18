import { Box, Button, Slider, Stack, Typography } from '@mui/material'
import { Canvas, ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Group, InstancedMesh, MathUtils, Matrix4, Quaternion, TextureLoader, Vector3 } from 'three'
import earthSpecular from '../../src/earth_specular.png'
import ForumIcon from '@mui/icons-material/Forum';

// Head-on view: camera looks straight down the z axis at the centered sphere.
const ISO_DISTANCE = 5
const ISO_POSITION: [number, number, number] = [0, 0, ISO_DISTANCE]

const POS: Coords = { x: 0, y: 0, z: 0 }
const ROT: Coords = {  x: 55.6, y: -29.9, z: 0.0 }
const SIZE: Coords = { x: 5, y: 5, z: 5 }
const ROTATION_SPEED = 3
const MAX_TILT = MathUtils.degToRad(85)
const MAX_LONGITUDE_SEGMENTS = 256
const MIN_LONGITUDE_SEGMENTS = 16
const POLAR_LONGITUDE_SEGMENTS = 3
const LATITUDE_SEGMENTS = 128

interface Coords {
  x: number;
  y: number;
  z: number;
}
type vector3 = Coords

interface PointOfInterest {
  name: string;
  language: string;
  timezone: string;
  position: vector3;
  rotation: vector3;
}

const pois: PointOfInterest[] = [
  {
    name: 'Berlin',
    language: 'German',
    timezone: 'Europe/Berlin',
    position: { x: 0.24, y: 1.92, z: 1.59 },
    rotation: { x: 49.8, y: -8.5, z: 0.0 }
  },
  {
    name: 'London',
    language: 'English',
    timezone: 'Europe/London',
    position: { x: 0.00, y: 1.99, z: 1.52 },
    rotation: { x: 52.7, y: 0.1, z: 0.0 }
  },
  {
    name: 'Shanghai',
    language: 'Mandarin Chinese',
    timezone: 'Asia/Shanghai',
    position: { x: 1.81, y: 1.37, z: -1.07 },
    rotation: { x: 33.2, y: -120.3, z: 0.0 }
  },
  {
    name: 'Dubai',
    language: 'Arabic',
    timezone: 'Asia/Dubai',
    position: { x: 1.62, y: 1.21, z: 1.49 },
    rotation: { x: 28.6, y: -47.5, z: 0.0 }
  },
  {
    name: 'Tokyo',
    language: 'Japanese',
    timezone: 'Asia/Tokyo',
    position: { x: 1.22, y: 1.57, z: -1.53 },
    rotation: { x: 38.4, y: -140.9, z: 0.0 }
  },
  {
    name: 'Johannesburg',
    language: 'English',
    timezone: 'Africa/Johannesburg',
    position: { x: 1.06, y: -1.04, z: 2.01 },
    rotation: { x: -24.7, y: -28.0, z: 0.0 }
  },
  {
    name: 'Cairo',
    language: 'Arabic',
    timezone: 'Africa/Cairo',
    position: { x: 1.03, y: 1.21, z: 1.94 },
    rotation: {  x: 28.6, y: -28.1, z: 0.0 }
  },
  {
    name: 'Sydney',
    language: 'English',
    timezone: 'Australia/Sydney',
    position: { x: 1.03, y: -1.42, z: -1.79 },
    rotation: { x: -34.4, y: -150.1, z: 0.0 }
  },  
  {
    name: 'New York',
    language: 'English',
    timezone: 'America/New_York',
    position: { x: -1.85, y: 1.61, z: 0.52 },
    rotation: { x: 39.5, y: 74.6, z: 0.0 }
  },
  {
    name: 'Los Angeles',
    language: 'English',
    timezone: 'America/Los_Angeles',
    position: { x: -1.76, y: 1.47, z: -1.02 },
    rotation: { x: 35.5, y: 119.9, z: 0.0 }
  },
  {
    name: 'Kyiv',
    language: 'Ukrainian',
    timezone: 'Europe/Kyiv',
    position: { x: 0.70, y: 2.07, z: 1.23 },
    rotation: { x: 55.6, y: -29.9, z: 0.0 }
  },
  {
    name: 'Rio de Janeiro',
    language: 'Portuguese',
    timezone: 'America/Sao_Paulo',
    position: { x: -1.59, y: -0.93, z: 1.70 },
    rotation: { x: -21.8, y: 43.0, z: 0.0 }
  },
  {
    name: "Mexico City",
    language: 'Spanish',
    timezone: 'America/Mexico_City',
    position: { x: -2.26, y: 0.99, z: -0.44 },
    rotation: { x: 22.9, y: 100.9, z: 0.0}
  },
  {
    name: "New Delhi",
    language: 'Hindi and English',
    timezone: 'Asia/Kolkata',
    position: { x: 2.17, y: 1.15, z: 0.47 },
    rotation: { x: 27.5, y: -77.9, z: 0.0 }
  },
  {
    name: "Anchorage",
    language: 'English',
    timezone: 'America/Anchorage',
    position: { x: -0.44, y: 2.28, z: -0.94 },
    rotation: {  x: 65.3, y: 154.9, z: 0.0 }
  },
    {
    name: "Singapur",
    language: 'English, Malay, Mandarin Chinese and Tamil',
    timezone: 'Asia/Singapore',
    position: { x: 2.45, y: 0.15, z: -0.52 },
    rotation: {  x: 3.4, y: -102.0, z: 0.0 }
  },
  {
    name: "Havanna",
    language: 'Spanish',
    timezone: 'America/Havana',
    position: {  x: -2.27, y: 0.93, z: 0.49 },
    rotation: { x: 21.8, y: 77.9, z: 0.0 }
  }
]

interface PointerCaptureTarget extends EventTarget {
  setPointerCapture(pointerId: number): void;
  releasePointerCapture(pointerId: number): void;
}

interface MapCell {
  position: [number, number, number]
  rotation: [number, number, number, number]
  size: number
}

function toEulerDegrees(radians: number) {
  return MathUtils.euclideanModulo(MathUtils.radToDeg(radians) + 180, 360) - 180
}

function getTimeZoneTitle(timeZone: string) {
  const parts = new Intl.DateTimeFormat(undefined, {
    timeZone,
    timeZoneName: 'short'
  }).formatToParts(new Date())

  return parts.find((part) => part.type === 'timeZoneName')?.value ?? timeZone
}

function getCurrentTime(timeZone: string, date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    timeStyle: 'medium'
  }).format(date)
}

function IsoSphere(
  { pos, size, rot, rotationRequest, onRotationChange, onCellSelect, onMoveTo, onPoiSelect }: 
  { pos: vector3; size: vector3; rot: vector3; rotationRequest: number; onRotationChange: (rot: vector3) => void; onCellSelect: (cell: MapCell) => void; onMoveTo: (target: Coords) => void; onPoiSelect: (poi: PointOfInterest) => void }) {

  const specularMap = useLoader(TextureLoader, earthSpecular.src)
  const groupRef = useRef<Group>(null)
  const targetRotationRef = useRef<{ x: number; y: number } | null>(null)
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0 })
  const blackMeshRef = useRef<InstancedMesh>(null)
  const [landCells, setLandCells] = useState<MapCell[]>([])
  const [selectedPoiPos, setSelectedPoiPos] = useState<vector3 | null>(null)

  useEffect(() => {
    targetRotationRef.current = {
      x: MathUtils.degToRad(MathUtils.clamp(rot.x, -85, 85)),
      y: MathUtils.degToRad(rot.y)
    }
  }, [rot.x, rot.y, rotationRequest])

  useEffect(() => {
    const image = specularMap.image as HTMLImageElement
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth || image.width
    canvas.height = image.naturalHeight || image.height
    const context = canvas.getContext('2d')

    if (!context || !canvas.width || !canvas.height) return

    context.drawImage(image, 0, 0)
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
    const radius = size.x / 2
    const longitudeSegments = Math.max(
      MIN_LONGITUDE_SEGMENTS,
      Math.round(MAX_LONGITUDE_SEGMENTS * (size.x / SIZE.x))
    )
    const cellSize = Math.min(
      (2 * Math.PI * radius) / longitudeSegments,
      (Math.PI * radius) / LATITUDE_SEGMENTS
    ) * 0.2
    const land: MapCell[] = []
    const water: MapCell[] = []
    const radialAxis = new Vector3(0, 0, 1)

    for (let latitudeIndex = 0; latitudeIndex < LATITUDE_SEGMENTS; latitudeIndex++) {
      const latitude = Math.PI / 2 - ((latitudeIndex + 0.5) / LATITUDE_SEGMENTS) * Math.PI
      const latitudeCosine = Math.abs(Math.cos(latitude))
      const rowLongitudeSegments = Math.max(
        POLAR_LONGITUDE_SEGMENTS,
        Math.round(longitudeSegments * latitudeCosine)
      )
      const textureY = Math.min(canvas.height - 1, Math.floor((latitudeIndex + 0.5) / LATITUDE_SEGMENTS * canvas.height))

      for (let longitudeIndex = 0; longitudeIndex < rowLongitudeSegments; longitudeIndex++) {
        const longitude = ((longitudeIndex + 0.5) / rowLongitudeSegments - 0.5) * Math.PI * 2
        const textureX = Math.min(canvas.width - 1, Math.floor((longitudeIndex + 0.5) / rowLongitudeSegments * canvas.width))
        const pixelIndex = (textureY * canvas.width + textureX) * 4
        const brightness = (pixels[pixelIndex] + pixels[pixelIndex + 1] + pixels[pixelIndex + 2]) / 3
        const isBlack = brightness < 128
        const normal = new Vector3(
          latitudeCosine * Math.sin(longitude),
          Math.sin(latitude),
          latitudeCosine * Math.cos(longitude)
        )
        const rotation = new Quaternion().setFromUnitVectors(radialAxis, normal)
        const cubeSize = cellSize * (isBlack ? 1 : 0.42)
        const position = normal.clone().multiplyScalar(radius + cubeSize * 0.42)
        const cell: MapCell = {
          position: [position.x, position.y, position.z],
          rotation: [rotation.x, rotation.y, rotation.z, rotation.w],
          size: cubeSize
        }

        if (isBlack) land.push(cell)
        else water.push(cell)
      }
    }

    setLandCells(land)

    if(!selectedPoiPos) setSelectedPoiPos(pois[10].position)

  }, [size.x, specularMap])

  useFrame((_, delta) => {
    const group = groupRef.current
    const drag = dragRef.current

    if (!group || drag.active) return

    const targetRotation = targetRotationRef.current
    if (targetRotation) {
      const interpolation = 1 - Math.exp(-ROTATION_SPEED * delta)
      group.rotation.x = MathUtils.lerp(group.rotation.x, targetRotation.x, interpolation)
      group.rotation.y = MathUtils.lerp(group.rotation.y, targetRotation.y, interpolation)
      group.rotation.z = 0

      if (
        Math.abs(group.rotation.x - targetRotation.x) < 0.001 &&
        Math.abs(group.rotation.y - targetRotation.y) < 0.001
      ) {
        group.rotation.set(targetRotation.x, targetRotation.y, 0)
        targetRotationRef.current = null
      }
      onRotationChange({ x: group.rotation.x, y: group.rotation.y, z: 0 })
    }
  })

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    const target = event.target as PointerCaptureTarget
    target.setPointerCapture(event.pointerId)
    targetRotationRef.current = null
    dragRef.current.active = true
    dragRef.current.lastX = event.clientX
    dragRef.current.lastY = event.clientY
  }
  
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const drag = dragRef.current
    if (!drag.active || !groupRef.current) return
    
    event.stopPropagation()
    const deltaX = event.clientX - drag.lastX
    const deltaY = event.clientY - drag.lastY
    const sensitivity = 0.003

    groupRef.current.rotation.y += deltaX * sensitivity
    groupRef.current.rotation.x = MathUtils.clamp(groupRef.current.rotation.x + deltaY * sensitivity, -MAX_TILT, MAX_TILT)
    groupRef.current.rotation.z = 0
    drag.lastX = event.clientX
    drag.lastY = event.clientY
    onRotationChange({ x: groupRef.current.rotation.x, y: groupRef.current.rotation.y, z: 0 })
  }

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    const target = event.target as PointerCaptureTarget
    target.releasePointerCapture(event.pointerId)
    dragRef.current.active = false
  }

  const handlePointerCancel = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    dragRef.current.active = false
  }

  return (
    <group
      ref={groupRef}
      position={[pos.x, pos.y, pos.z]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
    >
      <mesh>
        <sphereGeometry args={[size.x / 2, 64, 32]} />
        <meshBasicMaterial transparent color="#282829" opacity={.85} />
      </mesh>
      {selectedPoiPos && <mesh position={[selectedPoiPos.x, selectedPoiPos.y, selectedPoiPos.z]}>
        <sphereGeometry args={[0.15, 32, 16]} />
        <meshBasicMaterial transparent color="#188dec" opacity={.25} />
      </mesh>}
      {pois.map((poi, index) => (        
        <mesh 
          key={index} 
          position={[poi.position.x, poi.position.y, poi.position.z]}
          onClick={(event: ThreeEvent<MouseEvent>) => 
          { 
            event.stopPropagation();
            onPoiSelect(poi)
            setSelectedPoiPos(poi.position)
            onMoveTo(poi.rotation); 
          }}>
          <sphereGeometry args={[0.2, 12, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial transparent color="#188dec" />
          </mesh>
        </mesh>
      ))}     
      <instancedMesh
        ref={blackMeshRef}
        args={[undefined, undefined, landCells.length]}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation()
          const instanceId = (event.intersections[0] as { instanceId?: number } | undefined)?.instanceId
          if (instanceId !== undefined && landCells[instanceId]) {
            onCellSelect(landCells[instanceId])
          }
        }}
      >
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#db6e14" />
        <MapCells cells={landCells} meshRef={blackMeshRef} />
      </instancedMesh>
    </group>
  )
}

function MapCells({ cells, meshRef }: { cells: MapCell[]; meshRef: React.RefObject<InstancedMesh | null> }) {
  useEffect(() => {
    if (!meshRef.current) return
    const matrix = new Matrix4()

    cells.forEach((cell, index) => {
      matrix.compose(
        new Vector3(...cell.position),
        new Quaternion(...cell.rotation),
        new Vector3(cell.size, cell.size, cell.size)
      )
      meshRef.current!.setMatrixAt(index, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [cells])

  return null
}

function FitCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    if (!camera.isOrthographicCamera) return

    const padding = 0.85
    camera.zoom = Math.min(size.width, size.height) * padding / SIZE.x
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height])

  return null
}


export function IsoSphereBox({ targetRotation = ROT }: { targetRotation?: Coords }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
  const [rotationTarget, setRotationTarget] = useState(targetRotation)
  const [rotationRequest, setRotationRequest] = useState(0)
  const [selectedCell, setSelectedCell] = useState<MapCell | null>(null)
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest| null>(pois[10])
  const [currentTime, setCurrentTime] = useState(() => new Date())

  useEffect(() => {
    setRotationTarget(targetRotation)
    setRotationRequest((request) => request + 1)
  }, [targetRotation.x, targetRotation.y, targetRotation.z])

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const moveTo = (target: Coords) => {
    setRotationTarget(target)
    setRotationRequest((request) => request + 1)
  }

  return (
    <Box
      position="relative"
      width="100%"
      height="min(100vh, 800px)"
      minHeight={360}
      overflow="hidden"
    >
      {selectedPoi && (
        <Box
          position="absolute"
          top="35%"
          left="15%"
          zIndex={1}
          //minWidth={285}
          p={2}
          borderRadius="12px"
          bgcolor="background.blurry"
          overflow="hidden"
          sx={{ backdropFilter: "blur(4px)" }}
        >
          <Stack direction="column" spacing={1}>
            {/*<Typography fontSize="0.8rem" variant="body1" color="white">
              {`ROT x: ${eulerDegrees.x.toFixed(1)}, y: ${eulerDegrees.y.toFixed(1)}, z: ${eulerDegrees.z.toFixed(1)}`}
            </Typography>
            {selectedCell && (
              <Typography fontSize="0.8rem" variant="body1" color="white">
                {`POS x: ${selectedCell.position[0].toFixed(2)}, y: ${selectedCell.position[1].toFixed(2)}, z: ${selectedCell.position[2].toFixed(2)}`}
              </Typography>
            )}*/}
            <Box>
              <Typography
                mb={1}
                variant="h3"
                sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem", md: "2.125rem" } }}
                color="text.secondary"
              >
                {selectedPoi.name}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Typography sx={{ fontSize:  { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }} variant="body1" color="text.secondary">
                  {getCurrentTime(selectedPoi.timezone, currentTime)}
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}  variant="body1" color="text.faded">
                  ({getTimeZoneTitle(selectedPoi.timezone)})
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" } }}  variant="body1" color="text.secondary">
                <ForumIcon sx={{ fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" }, verticalAlign: "middle", mr: 0.5 }} />
                {selectedPoi.language}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
      {/*<Box
        position="absolute"
        top="50%"
        left="50%"
        sx={{ transform: "translate(-50%, -50%)", borderRadius: "50%", border: "1px solid white" }}
        zIndex={1}
        width={24}
        height={24}
      />*/}
      <Canvas
        style={{ position: "absolute", inset: 0, width: "100%", minWidth: "500px", height: "100%", touchAction: "none" }}
        orthographic
        camera={{ position: ISO_POSITION, zoom: 1, near: 0.1, far: 100 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        >
        <FitCamera />
        <IsoSphere
          pos={POS}
          size={SIZE}
          rot={rotationTarget}
          rotationRequest={rotationRequest}
          onRotationChange={setRotation}
          onCellSelect={setSelectedCell}
          onMoveTo={moveTo}
          onPoiSelect={setSelectedPoi}
        />
      </Canvas>
    </Box>
  )
}
