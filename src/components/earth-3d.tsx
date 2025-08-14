'use client'

import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { countries, Country, getCountryName } from '@/lib/countries'

interface Earth3DProps {
  scrollProgress?: number
  currentCountryIndex?: number
  isNavigating?: boolean
}

// 지구본 컴포넌트
function Earth({ 
  children, 
  currentCountryIndex, 
  scrollProgress 
}: { 
  children?: React.ReactNode
  currentCountryIndex: number
  scrollProgress: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // 지구본 텍스처 로드
  const earthTexture = useTexture({
    map: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
  })

  useFrame((state) => {
    if (meshRef.current) {
      if (currentCountryIndex >= 0 && currentCountryIndex < countries.length && scrollProgress > 0.1) {
        // 특정 국가가 활성화되었을 때 해당 국가가 카메라를 향하도록 회전
        const targetCountry = countries[currentCountryIndex]
        
        if (targetCountry && targetCountry.lat !== undefined && targetCountry.lon !== undefined) {
          // 국가의 위도/경도를 3D 좌표로 변환
          const phi = (90 - targetCountry.lat) * (Math.PI / 180)
          const theta = (targetCountry.lon - 180) * (Math.PI / 180)
          
          // 해당 국가의 3D 위치 계산
          const countryX = -Math.sin(phi) * Math.cos(theta)
          const countryY = Math.cos(phi)
          const countryZ = Math.sin(phi) * Math.sin(theta)
          
          // 카메라에서 국가로의 방향 벡터 계산
          const direction = new THREE.Vector3()
          direction.subVectors(new THREE.Vector3(countryX, countryY, countryZ), state.camera.position).normalize()
          
          // 해당 방향을 향하도록 지구본 회전 계산
          const targetRotationY = Math.atan2(direction.x, direction.z)
          const targetRotationX = Math.asin(-direction.y)
          
          // 부드러운 회전 (속도 조정)
          meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.03
          meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.03
          meshRef.current.rotation.z = 0
        }
      } else {
        // 기본 자유 회전 (서쪽으로 천천히)
        meshRef.current.rotation.y += 0.002
        meshRef.current.rotation.x += (0 - meshRef.current.rotation.x) * 0.01
        meshRef.current.rotation.z += (0 - meshRef.current.rotation.z) * 0.01
      }
    }
  })

  return (
    <group ref={meshRef}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhongMaterial
          map={earthTexture.map}
          emissive={new THREE.Color('#1A237E')}
          emissiveIntensity={0.3}
          shininess={20}
        />
      </mesh>
      {children}
    </group>
  )
}

// 도시 마커 컴포넌트
function CityMarker({ city, isActive, scrollProgress }: { 
  city: Country; 
  isActive: boolean; 
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  
  // 3D 좌표 계산
  const position = useMemo(() => {
    const phi = (90 - city.lat) * (Math.PI / 180)
    const theta = (city.lon - 180) * (Math.PI / 180)
    
    return {
      x: -(1.01 * Math.sin(phi) * Math.cos(theta)),
      y: (1.01 * Math.cos(phi)),
      z: (1.01 * Math.sin(phi) * Math.sin(theta))
    }
  }, [city.lat, city.lon])

  // 마커 크기와 투명도 - 반투명하게 설정
  const scale = isActive ? 1.8 + (Math.min(scrollProgress * 1.5, 0.8) * 0.5) : 1.0
  const opacity = isActive ? 0.6 : 0.3 // 반투명하게 설정

  // 마커가 항상 카메라를 향하도록 회전
  useFrame((state) => {
    if (groupRef.current) {
      // 카메라를 향하도록 회전
      groupRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <mesh ref={meshRef} scale={[scale, scale, scale]}>
        <sphereGeometry args={[0.03, 32, 32]} />
        <meshPhongMaterial
          color={city.color}
          transparent
          opacity={opacity}
          emissive={city.color}
          emissiveIntensity={isActive ? 1.5 : 0.3}
        />
      </mesh>
      

    </group>
  )
}

// 모든 마커를 관리하는 컴포넌트
function CityMarkers({ scrollProgress, currentCountryIndex }: { 
  scrollProgress: number; 
  currentCountryIndex: number;
}) {
  return (
    <>
      {countries.map((city, index) => (
        <CityMarker 
          key={city.code} 
          city={city} 
          isActive={index === currentCountryIndex}
          scrollProgress={scrollProgress}
        />
      ))}
    </>
  )
}

// 대기권 효과
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 128, 128]} />
      <meshPhongMaterial
        color="#1A237E"
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// 글로우 효과
function Glow() {
  return (
    <mesh>
      <sphereGeometry args={[1.15, 128, 128]} />
      <meshPhongMaterial
        color="#1A237E"
        transparent
        opacity={0.05}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

// 카메라 컨트롤러
function CameraController({ scrollProgress, currentCountryIndex, isNavigating }: { 
  scrollProgress: number; 
  currentCountryIndex: number;
  isNavigating: boolean;
}) {
  const controlsRef = useRef<any>(null)
  const animationCompletedRef = useRef(false)
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })

  
  // 화면 크기 감지
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    
    return () => {
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])
  
  // 화면 크기에 따른 카메라 거리 계산
  const getCameraDistance = useCallback(() => {
    if (screenSize.width < 768) { // 모바일
      return 4.5
    } else if (screenSize.width < 1024) { // 태블릿
      return 4.0
    } else if (screenSize.width < 1440) { // 작은 데스크톱
      return 3.5
    } else { // 큰 데스크톱
      return 3.0
    }
  }, [screenSize.width])
  
  const targetPosition = useMemo(() => {
    const distance = getCameraDistance()
    
    if (isNavigating) {
      // 네비게이션 중일 때 지구로 완전히 확대 (지구 내부로)
      return {
        camera: new THREE.Vector3(0, 0, -0.5), // 지구 내부로 완전히 들어감
        target: new THREE.Vector3(0, 0, 0)
      }
    } else if (currentCountryIndex >= 0 && scrollProgress > 0.1) {
      // 특정 국가가 활성화되었을 때 해당 국가 위치로 카메라 이동
      const targetCountry = countries[currentCountryIndex]
      const phi = (90 - targetCountry.lat) * (Math.PI / 180)
      const theta = (targetCountry.lon - 180) * (Math.PI / 180)
      
      // 해당 국가의 3D 위치 계산
      const countryX = -Math.sin(phi) * Math.cos(theta)
      const countryY = Math.cos(phi)
      const countryZ = Math.sin(phi) * Math.sin(theta)
      
      // 카메라가 해당 국가를 정면에서 바라보도록 위치 조정
      // 국가 위치에서 일정 거리만큼 떨어진 위치에 카메라 배치
      const targetX = countryX * distance
      const targetY = countryY * distance
      const targetZ = countryZ * distance
      
      return {
        camera: new THREE.Vector3(targetX, targetY, targetZ),
        target: new THREE.Vector3(countryX, countryY, countryZ) // 해당 국가 위치를 바라봄
      }
    } else {
      // 기본 카메라 위치 (지구를 정면에서 바라봄)
      return {
        camera: new THREE.Vector3(0, 0, distance),
        target: new THREE.Vector3(0, 0, 0)
      }
    }
  }, [currentCountryIndex, scrollProgress, isNavigating, getCameraDistance])

  useFrame((state) => {
    if (controlsRef.current && !isUserInteracting) {
      const camera = state.camera
      
      // 네비게이션 중일 때는 빠르게 확대
      const lerpSpeed = isNavigating ? 0.12 : 0.05
      
      // 목표 위치로 부드럽게 이동 (속도 조정)
      camera.position.lerp(targetPosition.camera, lerpSpeed)
      controlsRef.current.target.lerp(targetPosition.target, lerpSpeed)
      
      // 애니메이션 진행도 추적
      if (isNavigating) {
        const distance = camera.position.distanceTo(targetPosition.camera)
        const initialDistance = getCameraDistance()
        const progress = 1 - (distance / initialDistance)
        
        // 애니메이션이 거의 완료되면 (98% 이상) 완료 이벤트 발생
        if (progress > 0.98 && !animationCompletedRef.current) {
          animationCompletedRef.current = true
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('earthZoomComplete'))
          }, 100) // 짧은 지연 후 이벤트 발생
        }
      } else {
        animationCompletedRef.current = false
      }
      
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      zoomSpeed={0.4}
      panSpeed={0.4}
      rotateSpeed={0.4}
      minDistance={getCameraDistance() * 0.6}
      maxDistance={getCameraDistance() * 2.5}
      autoRotate={!isUserInteracting && currentCountryIndex < 0}
      autoRotateSpeed={0.2}
      dampingFactor={0.08}
      enableDamping={true}
      onStart={() => setIsUserInteracting(true)}
      onEnd={() => setIsUserInteracting(false)}
    />
  )
}

// 동적 조명 - 카메라와 같은 위치에서 빛을 비춤
function DynamicLighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null)
  
  useFrame((state) => {
    if (lightRef.current) {
      // 카메라와 정확히 같은 위치에 광원 배치
      const camera = state.camera
      lightRef.current.position.copy(camera.position)
      lightRef.current.intensity = 5.0
    }
  })

  return (
    <directionalLight
      ref={lightRef}
      position={[0, 0, 3.0]}
      intensity={1.5}
      castShadow={false}
    />
  )
}

// 메인 컴포넌트
export default function Earth3D({ scrollProgress = 0, currentCountryIndex = -1, isNavigating = false }: Earth3DProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })
  
  // 화면 크기 감지
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    
    return () => {
      window.removeEventListener('resize', updateScreenSize)
    }
  }, [])
  
  // 화면 크기에 따른 초기 카메라 거리 계산
  const getInitialCameraDistance = () => {
    if (screenSize.width < 768) { // 모바일
      return 4.5
    } else if (screenSize.width < 1024) { // 태블릿
      return 4.0
    } else if (screenSize.width < 1440) { // 작은 데스크톱
      return 3.5
    } else { // 큰 데스크톱
      return 3.0
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-[#0f0f23] to-[#1a1a2e]">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-900 to-blue-700 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-blue-800 rounded animate-pulse w-48 mx-auto"></div>
            <div className="h-3 bg-blue-800 rounded animate-pulse w-32 mx-auto"></div>
          </div>
          <div className="mt-6 text-blue-300 text-sm">
            지구를 로딩 중...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">

      
      <Canvas
        camera={{ position: [0, 0, getInitialCameraDistance()], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #0f0f23, #1a1a2e)' }}
      >
        <ambientLight intensity={2.0} />
        <DynamicLighting />
        <pointLight position={[-5, -5, -5]} intensity={2.0} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[0, 10, 0]} intensity={1.0} />
        
        <Earth 
          currentCountryIndex={currentCountryIndex}
          scrollProgress={scrollProgress}
        >
          <CityMarkers 
            scrollProgress={scrollProgress}
            currentCountryIndex={currentCountryIndex}
          />
        </Earth>

        <Atmosphere />
        <Glow />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <CameraController 
          scrollProgress={scrollProgress} 
          currentCountryIndex={currentCountryIndex}
          isNavigating={isNavigating}
        />
      </Canvas>
    </div>
  )
}
