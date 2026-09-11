import * as THREE from 'three'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'

interface SineWaveProps  {
  color?: string;

  xDensity?: number;
  yDensity?: number;

  xAmount?: number;
  yAmount?: number;

  startPosX?: number;
  startPosY?: number;
  startPosZ?: number;

  timeScale?: number;
}

function SineWave(props: ThreeElements['points'] & SineWaveProps & { cursorPos: [number, number] }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const xDensity = props.xDensity ?? 0.2
  const yDensity = props.yDensity ?? 0.2

  const xAmount = props.xAmount ?? 250
  const yAmount = props.yAmount ?? 16

  const startPosX = props.startPosX ?? 0
  const startPosY = props.startPosY ?? 0
  const startPosZ = props.startPosZ ?? 0

  const basePositions = useMemo(() => {
    const array = new Float32Array(xAmount * yAmount * 3)

    let i = 0

    for (
      let x = -Math.floor(xAmount / 2);
      x < Math.floor(xAmount / 2);
      x++
    ) {
      for (
        let y = -Math.floor(yAmount / 2);
        y < Math.floor(yAmount / 2);
        y++
      ) {
        array[i++] = startPosX + x * xDensity
        array[i++] = startPosY + y * yDensity
        array[i++] = startPosZ
      }
    }

    return array
  }, [])

  const animatedPositions = useMemo(() => {
    return new Float32Array(basePositions)
  }, [basePositions])

  const animatedSizes = useMemo(() => {
    return new Float32Array(xAmount * yAmount).fill(1.2)
  }, [xAmount, yAmount])

  const baseSizes = useMemo(() => {
    return new Float32Array(xAmount * yAmount).fill(1.2)
  }, [xAmount, yAmount])

  useFrame((state) => {
    const time = state.clock.elapsedTime * (props.timeScale ?? 0.1)

    const geometry = pointsRef.current.geometry
    const positionAttribute = geometry.attributes.position
    const sizeAttribute = geometry.attributes.size as THREE.BufferAttribute
    const positions = positionAttribute.array as Float32Array
    const sizes = sizeAttribute.array as Float32Array

    for (let i = 0; i < positions.length; i += 3) {
      const x = basePositions[i]
      const y = basePositions[i + 1]
      const z = basePositions[i + 2]

      const wave =
        Math.sin(x * 1.2 + time * 2.0) * 0.2 +
        Math.cos(y * 1 + time * 1.2) * 0.45

      // Calculate distance to cursor
      const dx = x - props.cursorPos[0]
      const dy = y - props.cursorPos[1]
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Apply magnet effect - attract points within radius
      let magnetEffect = 0
      const magnetRadius = 5
      const magnetStrength = 0.8

      if (distance < magnetRadius) {
        const influence = 1 - distance / magnetRadius
        magnetEffect = influence * influence * magnetStrength 
      }

      positions[i] = x
      positions[i + 1] = y
      positions[i + 2] = z + wave + magnetEffect

      // Update particle size based on magnetic effect
      const pointIndex = i / 3
      sizes[pointIndex] = baseSizes[pointIndex] + magnetEffect * 3
    }

    positionAttribute.needsUpdate = true
    sizeAttribute.needsUpdate = true
  })

  return (
    <points ref={pointsRef} {...props}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={animatedPositions.length / 3}
          array={animatedPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={animatedSizes.length}
          array={animatedSizes}
          itemSize={1}
        />
      </bufferGeometry>

      <shaderMaterial
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        transparent
        vertexShader={`
          attribute float size;
          void main() {
            gl_PointSize = size * 2.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            gl_FragColor = vec4(color, 1.0);
          }
        `}
        uniforms={{
          color: { value: new THREE.Color(props.color || "white") }
        }}
      />
    </points>
  )
}

export function SineWaveBox(props: SineWaveProps) {
  const [cursorPos, setCursorPos] = useState<[number, number]>([0, 0])

  useEffect(() => {
    const canvasElement = document.querySelector('canvas')
    if (!canvasElement) return

    const resetCursor = () => setCursorPos([0, 0])

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasElement.getBoundingClientRect()
      if (e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top || e.clientY > rect.bottom) {
        resetCursor()
        return
      }

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const normalizedX = (x / rect.width) * 2 - 1
      const normalizedY = -(y / rect.height) * 2 + 1

      const multiplier = 200
      setCursorPos([normalizedX * rect.width / multiplier, normalizedY * rect.height / multiplier])
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) {
        resetCursor()
        return
      }

      const rect = canvasElement.getBoundingClientRect()
      if (touch.clientX < rect.left || touch.clientX > rect.right ||
          touch.clientY < rect.top || touch.clientY > rect.bottom) {
        resetCursor()
        return
      }

      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      const normalizedX = (x / rect.width) * 2 - 1
      const normalizedY = -(y / rect.height) * 2 + 1

      const multiplier = 90
      setCursorPos([normalizedX * rect.width / multiplier, normalizedY * rect.height / multiplier])
    }

    canvasElement.addEventListener('mouseleave', resetCursor)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', resetCursor)
    window.addEventListener('touchcancel', resetCursor)
    return () => {
      canvasElement.removeEventListener('mouseleave', resetCursor)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', resetCursor)
      window.removeEventListener('touchcancel', resetCursor)
    }
  }, [])

  return (
    <Canvas camera={{ fov: 35 }}>
      <SineWave 
        cursorPos={cursorPos}
        timeScale={props.timeScale} 
        color={props.color} 
        yDensity={props.yDensity} 
        xDensity={props.xDensity} 
        xAmount={props.xAmount}
        yAmount={props.yAmount}
        startPosX={props.startPosX} 
        startPosY={props.startPosY}
        startPosZ={props.startPosZ} /> 
    </Canvas>
  )
}
