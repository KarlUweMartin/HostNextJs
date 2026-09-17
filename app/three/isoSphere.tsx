import { Box, Slider, Typography } from '@mui/material'
import { Canvas, ThreeEvent, useFrame, useLoader } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { Group, InstancedMesh, Matrix4, Quaternion, TextureLoader, Vector3 } from 'three'
import { GuidGenerator } from '../utils/guidGenerator'
import earthSpecular from '../../src/earth_specular.png'

// Head-on view: camera looks straight down the z axis at the centered sphere.
const ISO_DISTANCE = 5
const ISO_POSITION: [number, number, number] = [0, 0, ISO_DISTANCE]

const POS: vector3 = { x: 0, y: 0, z: 0 }
const ROT: vector3 = { x: 0, y: 0, z: 0 }
const SIZE: vector3 = { x: 7, y: 7, z: 7 }
const LONGITUDE_SEGMENTS = 128
const LATITUDE_SEGMENTS = 64

interface vector3 {
  x: number;
  y: number;
  z: number;
}

interface PointerCaptureTarget extends EventTarget {
  setPointerCapture(pointerId: number): void;
  releasePointerCapture(pointerId: number): void;
}

interface MapCell {
  position: [number, number, number]
  rotation: [number, number, number, number]
  size: number
}

function IsoSphere({ pos, size, rot, onRotationChange }: { pos: vector3; size: vector3; rot: vector3; onRotationChange: (rot: vector3) => void }) {
  const specularMap = useLoader(TextureLoader, earthSpecular.src)
  const groupRef = useRef<Group>(null)
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0, velocityX: 0, velocityY: 0 })
  const whiteMeshRef = useRef<InstancedMesh>(null)
  const blackMeshRef = useRef<InstancedMesh>(null)
  const [whiteCells, setWhiteCells] = useState<MapCell[]>([])
  const [blackCells, setBlackCells] = useState<MapCell[]>([])

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
    const cellSize = Math.min(
      (2 * Math.PI * radius) / LONGITUDE_SEGMENTS,
      (Math.PI * radius) / LATITUDE_SEGMENTS
    ) * 0.5
    const white: MapCell[] = []
    const black: MapCell[] = []
    const radialAxis = new Vector3(0, 0, 1)

    for (let latitudeIndex = 0; latitudeIndex < LATITUDE_SEGMENTS; latitudeIndex++) {
      const latitude = Math.PI / 2 - ((latitudeIndex + 0.5) / LATITUDE_SEGMENTS) * Math.PI
      const textureY = Math.min(canvas.height - 1, Math.floor((latitudeIndex + 0.5) / LATITUDE_SEGMENTS * canvas.height))

      for (let longitudeIndex = 0; longitudeIndex < LONGITUDE_SEGMENTS; longitudeIndex++) {
        const longitude = ((longitudeIndex + 0.5) / LONGITUDE_SEGMENTS - 0.5) * Math.PI * 2
        const textureX = Math.min(canvas.width - 1, Math.floor((longitudeIndex + 0.5) / LONGITUDE_SEGMENTS * canvas.width))
        const pixelIndex = (textureY * canvas.width + textureX) * 4
        const brightness = (pixels[pixelIndex] + pixels[pixelIndex + 1] + pixels[pixelIndex + 2]) / 3
        const isBlack = brightness < 128
        const latitudeCosine = Math.cos(latitude)
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

        if (isBlack) black.push(cell)
        else white.push(cell)
      }
    }

    setWhiteCells(white)
    setBlackCells(black)
  }, [size.x, specularMap])

  useFrame((_, delta) => {
    const group = groupRef.current
    const drag = dragRef.current

    if (!group || drag.active) return

    group.rotation.y += drag.velocityX * delta
    group.rotation.x += drag.velocityY * delta
    drag.velocityX *= Math.pow(0.05, delta)
    drag.velocityY *= Math.pow(0.05, delta)
    onRotationChange({ x: group.rotation.x, y: group.rotation.y, z: group.rotation.z })
  })

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    const target = event.target as PointerCaptureTarget
    target.setPointerCapture(event.pointerId)
    dragRef.current.active = true
    dragRef.current.lastX = event.clientX
    dragRef.current.lastY = event.clientY
    dragRef.current.velocityX = 0
    dragRef.current.velocityY = 0
  }
  
  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const drag = dragRef.current
    if (!drag.active || !groupRef.current) return
    
    event.stopPropagation()
    const deltaX = event.clientX - drag.lastX
    const deltaY = event.clientY - drag.lastY
    const sensitivity = 0.01

    groupRef.current.rotation.y += deltaX * sensitivity
    groupRef.current.rotation.x += deltaY * sensitivity
    drag.velocityX = deltaX * 0.1
    drag.velocityY = deltaY * 0.1
    drag.lastX = event.clientX
    drag.lastY = event.clientY
    onRotationChange({ x: groupRef.current.rotation.x, y: groupRef.current.rotation.y, z: groupRef.current.rotation.z })
  }

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    const target = event.target as PointerCaptureTarget
    target.releasePointerCapture(event.pointerId)
    dragRef.current.active = false
  }

  return (
    <group
      ref={groupRef}
      position={[pos.x, pos.y, pos.z]}
      rotation={[rot.x, rot.y, rot.z]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <instancedMesh ref={whiteMeshRef} args={[undefined, undefined, whiteCells.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ffffff" />
        <MapCells cells={whiteCells} meshRef={whiteMeshRef} />
      </instancedMesh>
      <instancedMesh ref={blackMeshRef} args={[undefined, undefined, blackCells.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#000000" />
        <MapCells cells={blackCells} meshRef={blackMeshRef} />
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


export function IsoSphereBox() {
  const [hue, setHue] = useState(210)
  const color = `hsl(${hue}, 100%, 50%)`
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })

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
        <Typography variant="body1" color="white">
          {`x: ${rotation.x.toFixed(2)}, y: ${rotation.y.toFixed(2)}, z: ${rotation.z.toFixed(2)}`}
        </Typography>
      </Box>
      <Canvas
        style={{ height: '800px' }}
        orthographic
        camera={{ position: ISO_POSITION, zoom: 80, near: 0.1, far: 100 }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        >
        <ambientLight intensity={Math.PI / 2} />
        <directionalLight position={[10, 10, 5]} intensity={Math.PI / 2} />
        <IsoSphere
          pos={POS}
          size={SIZE}
          rot={ROT}
          onRotationChange={setRotation}
        />
      </Canvas>
    </Box>
  )
}
