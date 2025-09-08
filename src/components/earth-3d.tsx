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

// 지구본 컴포넌트 - 마커가 화면 정가운데 오도록 회전
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

  // 지구 회전 - 국가별 최적화된 위치에서 정지
  useFrame((state) => {
    if (meshRef.current) {
      if (currentCountryIndex >= 0 && currentCountryIndex < countries.length && scrollProgress > 0.1) {
        // 활성화된 국가의 지정된 회전각으로 이동
        const targetCountry = countries[currentCountryIndex]
        if (targetCountry && targetCountry.earthRotation) {
          const targetRotation = targetCountry.earthRotation
          
          // 부드럽게 목표 회전각으로 이동
          const rotationSpeed = 0.03
          meshRef.current.rotation.x += (targetRotation.x - meshRef.current.rotation.x) * rotationSpeed
          meshRef.current.rotation.y += (targetRotation.y - meshRef.current.rotation.y) * rotationSpeed
          
          // 국가 페이지에 멈춰있을 때는 지구 회전 정지
          // scrollProgress가 높을수록 더 정지 (0.8 이상에서 완전 정지)
          const rotationSpeedMultiplier = Math.max(0, 1 - scrollProgress * 1.25)
          meshRef.current.rotation.y += 0.001 * rotationSpeedMultiplier
        }
        
      } else {
        // 기본 상태에서만 천천히 자전
        meshRef.current.rotation.y += 0.002
        // 기본 상태에서는 X축 회전을 -15도로 유지
        const targetTilt = -15 * Math.PI / 180
        meshRef.current.rotation.x += (targetTilt - meshRef.current.rotation.x) * 0.02
      }
    }
  })

  return (
    <group ref={meshRef} rotation={[0, 0, 0]}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
        rotation={[-15 * Math.PI / 180, 0, 0]} // 지구를 -15도 기울임
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

// 도시 마커 컴포넌트 - 화면 중앙 정렬 최적화
function CityMarker({ city, isActive, scrollProgress }: { 
  city: Country; 
  isActive: boolean; 
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  
  // 마커 위치 계산 - 지구 표면보다 약간 위에 배치 (원본 좌표 사용)
  const position = useMemo(() => {
    const pos = latLonTo3D(city.lat, city.lon, 1.02) // 지구 표면보다 약간 위
    return pos
  }, [city.lat, city.lon])

  // 마커 크기와 투명도 - 활성 상태에 따라 조정
  const scale = isActive ? 2.5 + (Math.min(scrollProgress * 1.5, 0.8) * 0.5) : 1.2
  const opacity = isActive ? 1.0 : 0.7

  // 마커 회전 및 애니메이션 처리
  useFrame((state) => {
    if (groupRef.current) {
      // 마커가 항상 카메라를 바라보도록 설정 (billboard 효과)
      // 카메라의 월드 위치를 가져와서 마커가 정확히 카메라를 향하도록 설정
      const cameraWorldPosition = new THREE.Vector3()
      state.camera.getWorldPosition(cameraWorldPosition)
      
      // 마커의 현재 위치
      const markerPosition = new THREE.Vector3()
      groupRef.current.getWorldPosition(markerPosition)
      
      // 카메라에서 마커로의 방향 벡터 계산
      const direction = new THREE.Vector3()
      direction.subVectors(markerPosition, cameraWorldPosition)
      direction.normalize()
      
      // 마커가 카메라를 정확히 바라보도록 회전 설정
      // 카메라의 up 벡터를 사용하여 올바른 방향으로 회전
      const up = new THREE.Vector3(0, 1, 0)
      const matrix = new THREE.Matrix4()
      matrix.lookAt(markerPosition, cameraWorldPosition, up)
      groupRef.current.quaternion.setFromRotationMatrix(matrix)
    }
    
    // 활성 마커에 펄스 효과 추가
    if (meshRef.current && isActive) {
      const time = state.clock.getElapsedTime()
      const pulse = 1 + Math.sin(time * 4) * 0.15
      meshRef.current.scale.setScalar(scale * pulse)
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(scale)
    }
    
    // 링 회전 애니메이션
    if (ringRef.current && isActive) {
      const time = state.clock.getElapsedTime()
      ringRef.current.rotation.z = time * 3
    }
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* 메인 마커 */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.04, 32, 32]} />
        <meshPhongMaterial
          color={city.color}
          transparent
          opacity={opacity}
          emissive={city.color}
          emissiveIntensity={isActive ? 2.5 : 0.8}
        />
      </mesh>
      
      {/* 활성 마커에 특별한 효과 추가 */}
      {isActive && (
        <>
          {/* 글로우 효과 */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial
              color={city.color}
              transparent
              opacity={0.4}
            />
          </mesh>
          
          {/* 카메라를 향한 방향 표시 (화살표) */}
          <group position={[0, 0, 0.08]}>
            {/* 화살표 머리 (원뿔) - 카메라 방향으로 향하도록 회전 */}
            <mesh position={[0, 0, 0.025]} rotation={[0, 0, 0]}>
              <coneGeometry args={[0.02, 0.04, 8]} />
              <meshPhongMaterial
                color={city.color}
                emissive={city.color}
                emissiveIntensity={2.0}
              />
            </mesh>
            {/* 화살표 몸통 (원통) - 카메라 방향으로 향하도록 회전 */}
            <mesh position={[0, 0, -0.015]} rotation={[0, 0, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.03, 8]} />
              <meshPhongMaterial
                color={city.color}
                emissive={city.color}
                emissiveIntensity={1.5}
              />
            </mesh>
          </group>
          
          {/* 펄스 링 효과 */}
          <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.08, 0.1, 20]} />
            <meshBasicMaterial
              color={city.color}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* 추가 글로우 링 */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.12, 0.14, 20]} />
            <meshBasicMaterial
              color={city.color}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
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

// 위도/경도를 3D 좌표로 변환하는 유틸리티 함수 (-15도 기울임 적용)
function latLonTo3D(lat: number, lon: number, radius: number = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  
  // 기본 3D 좌표 계산
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  
  // -15도 X축 회전 적용 (지구와 동일한 기울임)
  const tiltAngle = -15 * Math.PI / 180
  const cosTilt = Math.cos(tiltAngle)
  const sinTilt = Math.sin(tiltAngle)
  
  return {
    x: x,
    y: y * cosTilt - z * sinTilt,
    z: y * sinTilt + z * cosTilt
  }
}

// 카메라 컨트롤러 - 마커가 화면 정가운데 오도록 최적화
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
  
  // 화면 크기에 따른 기본 카메라 거리 계산
  const getBaseDistance = useCallback(() => {
    if (screenSize.width < 768) return 4.5
    if (screenSize.width < 1024) return 4.0
    if (screenSize.width < 1440) return 3.5
    return 3.0
  }, [screenSize.width])

  // 카메라 위치와 타겟 계산 - 각 국가별 지정된 위치 사용
  const getCameraPositions = useCallback(() => {
    const baseDistance = getBaseDistance()
    
    if (isNavigating) {
      // 네비게이션 중일 때 지구 내부로 확대
      return {
        position: new THREE.Vector3(0, 0, -0.5),
        target: new THREE.Vector3(0, 0, 0)
      }
    }
    
    if (currentCountryIndex >= 0 && currentCountryIndex < countries.length && scrollProgress > 0.1) {
      const country = countries[currentCountryIndex]
      
      // 각 국가별로 지정된 카메라 위치와 타겟 사용
      if (country && country.cameraPosition && country.cameraTarget) {
        return {
          position: new THREE.Vector3(
            country.cameraPosition.x,
            country.cameraPosition.y,
            country.cameraPosition.z
          ),
          target: new THREE.Vector3(
            country.cameraTarget.x,
            country.cameraTarget.y,
            country.cameraTarget.z
          )
        }
      }
    }
    
    // 기본 위치 (지구를 정면에서)
    return {
      position: new THREE.Vector3(0, 0, baseDistance),
      target: new THREE.Vector3(0, 0, 0)
    }
  }, [currentCountryIndex, scrollProgress, isNavigating, getBaseDistance])

  useFrame((state) => {
    if (controlsRef.current && !isUserInteracting) {
      const { position: targetPos, target: targetLookAt } = getCameraPositions()
      
      // 애니메이션 속도
      const lerpSpeed = isNavigating ? 0.15 : 0.06
      
      // 카메라 위치와 타겟 부드럽게 이동
      state.camera.position.lerp(targetPos, lerpSpeed)
      controlsRef.current.target.lerp(targetLookAt, lerpSpeed)
      
      // 네비게이션 애니메이션 완료 체크
      if (isNavigating) {
        const distance = state.camera.position.distanceTo(targetPos)
        if (distance < 0.1 && !animationCompletedRef.current) {
          animationCompletedRef.current = true
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('earthZoomComplete'))
          }, 100)
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
      zoomSpeed={0.5}
      panSpeed={0.5}
      rotateSpeed={0.5}
      minDistance={getBaseDistance() * 0.6}
      maxDistance={getBaseDistance() * 2.5}
      autoRotate={!isUserInteracting && currentCountryIndex < 0}
      autoRotateSpeed={0.3}
      dampingFactor={0.1}
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
      return 3.0
    } else if (screenSize.width < 1024) { // 태블릿
      return 2.5
    } else if (screenSize.width < 1440) { // 작은 데스크톱
      return 2.2
    } else { // 큰 데스크톱
      return 2.0
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
