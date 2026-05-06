import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Float } from '@react-three/drei'
import { useRef, useMemo, Suspense, useState, useEffect, Component } from 'react'
import type { ReactNode } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function Particles({ count = 2000 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return pos
  }, [count])
  const ref = useRef<THREE.Points>(null)
  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.03
  })
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#ffffff" size={0.03} sizeAttenuation depthWrite={false} opacity={0.4} />
    </Points>
  )
}

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1
      ref.current.rotation.y += delta * 0.15
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={[3, 0, -2]}>
        <torusKnotGeometry args={[1.5, 0.4, 200, 32]} />
        <meshStandardMaterial color="#AC3C3C" roughness={0.1} metalness={0.9} />
      </mesh>
    </Float>
  )
}

function FloatingShapes() {
  const shapes = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    pos: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8] as [number, number, number],
    scale: Math.random() * 0.3 + 0.1,
    speed: Math.random() * 0.5 + 0.2,
    type: Math.floor(Math.random() * 3)
  })), [])

  return (
    <>
      {shapes.map(s => (
        <Float key={s.id} speed={s.speed} rotationIntensity={1} floatIntensity={1}>
          <mesh position={s.pos} scale={s.scale}>
            {s.type === 0 && <boxGeometry args={[1, 1, 1]} />}
            {s.type === 1 && <cylinderGeometry args={[0.5, 0.5, 1, 32]} />}
            {s.type === 2 && <sphereGeometry args={[0.7, 32, 32]} />}
            <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.9} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

function SceneContent() {
  useFrame((state) => {
    state.camera.position.z = 8
  })
  return (
    <>
      <fog attach="fog" args={['#050505', 10, 40]} />
      <ambientLight intensity={0.3} />
      <directionalLight color="#AC3C3C" intensity={1.5} position={[5, 5, 5]} />
      <pointLight color="#1a3a6a" intensity={1} position={[-5, -3, -5]} />
      <Suspense fallback={null}>
        <Particles />
        <TorusKnot />
        <FloatingShapes />
      </Suspense>
    </>
  )
}

function CSSHeroBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.1,
    })), [])

  const shapes = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 20,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 15,
      rotate: Math.random() * 360,
      isRed: i < 3,
    })), [])

  return (
    <div className="absolute inset-0 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0000] via-[#050505] to-[#000a1a]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 70% 40%, rgba(172,60,60,0.3) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 20% 70%, rgba(0,166,153,0.15) 0%, transparent 60%)
          `,
        }}
      />
      {shapes.map(s => (
        <motion.div
          key={s.id}
          className="absolute border opacity-10"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderColor: s.isRed ? '#AC3C3C' : '#444444',
            borderRadius: s.id % 3 === 0 ? '50%' : s.id % 3 === 1 ? '0%' : '20%',
          }}
          animate={{
            rotate: [s.rotate, s.rotate + 360],
            scale: [1, 1.15, 1],
            opacity: [0.05, 0.2, 0.05],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-5"
        style={{
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'radial-gradient(circle, #AC3C3C 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 3px)',
          backgroundSize: '100% 60px',
        }}
      />
    </div>
  )
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return !!gl
  } catch {
    return false
  }
}

export function HeroScene() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)

  useEffect(() => {
    setWebglSupported(detectWebGL())
  }, [])

  if (webglSupported === null) {
    return <div className="absolute inset-0 bg-[#050505]" />
  }

  if (!webglSupported) {
    return <CSSHeroBackground />
  }

  return (
    <WebGLErrorBoundary fallback={<CSSHeroBackground />}>
      <div className="absolute inset-0 z-0 bg-[#050505]">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <SceneContent />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}
