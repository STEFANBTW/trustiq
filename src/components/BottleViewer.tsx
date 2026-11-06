import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCcw, Move3d } from 'lucide-react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface BottleViewerProps {
  isPopped: boolean;
  onResetView?: () => void;
  resetSignal?: number;
}

/**
 * Generates ultra-crisp procedural 2D Canvas textures for the bespoke
 * front luxury label, back tasting-notes label, and brushed-gold neck band.
 */
function createLuxuryLabelTextures(maxAnisotropy: number) {
  // 1. Main Front Label (Obsidian & 24K Gold Foil Art-Deco Reserve Label)
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = 1024;
  frontCanvas.height = 1024;
  const ctx = frontCanvas.getContext('2d')!;

  // Rich matte obsidian charcoal base with subtle vertical warm gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  bgGrad.addColorStop(0, '#141210');
  bgGrad.addColorStop(0.5, '#0c0a09');
  bgGrad.addColorStop(1, '#161311');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle diagonal micro-guilloche luxury paper grain lines
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.045)';
  ctx.lineWidth = 2;
  for (let i = -1024; i < 2048; i += 24) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 1024, 1024);
    ctx.stroke();
  }

  // Metallic Gold Foil Linear Gradient for Borders & Typography
  const goldGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  goldGrad.addColorStop(0, '#b45309');
  goldGrad.addColorStop(0.25, '#fbbf24');
  goldGrad.addColorStop(0.5, '#fef3c7');
  goldGrad.addColorStop(0.75, '#f59e0b');
  goldGrad.addColorStop(1, '#92400e');

  // Outer Gold Foil Frame
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 10;
  ctx.strokeRect(36, 36, 952, 952);

  // Inner Hairline Gold Frame with Art-Deco Corner Accents
  ctx.lineWidth = 3;
  ctx.strokeRect(56, 56, 912, 912);

  // Corner Art-Deco geometric flourishes
  const corners = [
    [56, 56, 1, 1],
    [968, 56, -1, 1],
    [56, 968, 1, -1],
    [968, 968, -1, -1],
  ];
  corners.forEach(([cx, cy, dx, dy]) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy + dy * 48);
    ctx.lineTo(cx + dx * 48, cy + dy * 48);
    ctx.lineTo(cx + dx * 48, cy);
    ctx.stroke();
  });

  // Top Crest Emblem (Geometric Sunburst & Diamond Monogram)
  ctx.save();
  ctx.translate(512, 165);
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  for (let r = 0; r < Math.PI * 2; r += Math.PI / 12) {
    ctx.moveTo(Math.cos(r) * 28, Math.sin(r) * 28);
    ctx.lineTo(Math.cos(r) * 52, Math.sin(r) * 52);
  }
  ctx.stroke();

  //Rotated Diamond Crest
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = '#0c0a09';
  ctx.fillRect(-26, -26, 52, 52);
  ctx.lineWidth = 4;
  ctx.strokeRect(-26, -26, 52, 52);
  ctx.restore();

  // Monogram inside crest
  ctx.fillStyle = goldGrad;
  ctx.font = '900 26px "Inter", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TLP', 512, 166);

  // Top House Subtitle
  ctx.fillStyle = '#d6d3d1';
  ctx.font = '700 22px "Inter", sans-serif';
  ctx.letterSpacing = '10px';
  ctx.fillText('TRUST LIQ PALACE', 518, 265);

  // Decorative Divider with Center Diamond
  ctx.strokeStyle = goldGrad;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(220, 305);
  ctx.lineTo(485, 305);
  ctx.moveTo(539, 305);
  ctx.lineTo(804, 305);
  ctx.stroke();

  ctx.save();
  ctx.translate(512, 305);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = goldGrad;
  ctx.fillRect(-7, -7, 14, 14);
  ctx.restore();

  // Main Hero Title: GOLD LABEL
  ctx.fillStyle = goldGrad;
  ctx.font = '900 96px "Inter", Georgia, serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('GOLD LABEL', 514, 415);

  // Subtitle: WHISKEY
  ctx.fillStyle = '#fafaf9';
  ctx.font = '800 58px "Inter", sans-serif';
  ctx.letterSpacing = '18px';
  ctx.fillText('WHISKEY', 524, 498);

  // Cream / Parchment Vintage Band in Lower Middle
  ctx.fillStyle = '#f5f5f0';
  ctx.fillRect(60, 565, 904, 128);
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 3;
  ctx.strokeRect(60, 565, 904, 128);

  ctx.fillStyle = '#1c1917';
  ctx.font = '800 27px "Inter", sans-serif';
  ctx.letterSpacing = '7px';
  ctx.fillText('SINGLE BARREL RESERVE', 516, 612);

  ctx.fillStyle = '#78350f';
  ctx.font = '600 22px Georgia, serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('CHARRED AMERICAN OAK  •  SMALL BATCH', 514, 656);

  // Tasting Note Trio Pillars
  ctx.fillStyle = goldGrad;
  ctx.font = '700 23px "Inter", sans-serif';
  ctx.letterSpacing = '5px';
  ctx.fillText('SMOKY   •   OAKY   •   VANILLA', 516, 765);

  // Bottom Spec Row: Batch, ABV, Volume
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(110, 825);
  ctx.lineTo(914, 825);
  ctx.stroke();

  ctx.fillStyle = '#a8a29e';
  ctx.font = '700 22px monospace';
  ctx.letterSpacing = '2px';
  ctx.textAlign = 'left';
  ctx.fillText('BATCH NO. 01', 110, 875);

  ctx.fillStyle = goldGrad;
  ctx.font = '800 26px "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AGED 18 YEARS', 512, 875);

  ctx.fillStyle = '#a8a29e';
  ctx.font = '700 22px monospace';
  ctx.textAlign = 'right';
  ctx.fillText('750 ML  |  43% VOL', 914, 875);

  // Master Distiller Signature Callout at Footer
  ctx.fillStyle = 'rgba(251, 191, 36, 0.75)';
  ctx.font = 'italic 20px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '2px';
  ctx.fillText('Hand Selected & Bottled for Trust Liq Palace', 512, 932);

  const frontTexture = new THREE.CanvasTexture(frontCanvas);
  frontTexture.colorSpace = THREE.SRGBColorSpace;
  frontTexture.anisotropy = maxAnisotropy;
  frontTexture.needsUpdate = true;

  // 2. Neck Collar Band Texture (Obsidian & Gold Filigree Wrap)
  const neckCanvas = document.createElement('canvas');
  neckCanvas.width = 1024;
  neckCanvas.height = 256;
  const nctx = neckCanvas.getContext('2d')!;

  nctx.fillStyle = '#0c0a09';
  nctx.fillRect(0, 0, 1024, 256);

  const nGold = nctx.createLinearGradient(0, 0, 1024, 0);
  nGold.addColorStop(0, '#b45309');
  nGold.addColorStop(0.25, '#fbbf24');
  nGold.addColorStop(0.5, '#fef3c7');
  nGold.addColorStop(0.75, '#f59e0b');
  nGold.addColorStop(1, '#b45309');

  // Top & Bottom Metallic Borders
  nctx.fillStyle = nGold;
  nctx.fillRect(0, 0, 1024, 22);
  nctx.fillRect(0, 234, 1024, 22);
  nctx.fillRect(0, 34, 1024, 4);
  nctx.fillRect(0, 218, 1024, 4);

  nctx.fillStyle = nGold;
  nctx.font = '900 54px "Inter", sans-serif';
  nctx.textAlign = 'center';
  nctx.textBaseline = 'middle';
  nctx.letterSpacing = '12px';
  nctx.fillText('EST. 2024  •  RESERVE  •  EST. 2024', 512, 128);

  const neckTexture = new THREE.CanvasTexture(neckCanvas);
  neckTexture.colorSpace = THREE.SRGBColorSpace;
  neckTexture.anisotropy = maxAnisotropy;
  neckTexture.wrapS = THREE.RepeatWrapping;
  neckTexture.needsUpdate = true;

  // 3. Back Label Texture (Heritage Story & Authenticity Seal)
  const backCanvas = document.createElement('canvas');
  backCanvas.width = 768;
  backCanvas.height = 1024;
  const bctx = backCanvas.getContext('2d')!;

  bctx.fillStyle = '#0c0a09';
  bctx.fillRect(0, 0, 768, 1024);

  bctx.strokeStyle = goldGrad;
  bctx.lineWidth = 8;
  bctx.strokeRect(32, 32, 704, 960);
  bctx.lineWidth = 2;
  bctx.strokeRect(48, 48, 672, 928);

  bctx.fillStyle = goldGrad;
  bctx.font = '800 32px "Inter", sans-serif';
  bctx.textAlign = 'center';
  bctx.letterSpacing = '8px';
  bctx.fillText('GOLD LABEL', 384, 145);

  bctx.fillStyle = '#a8a29e';
  bctx.font = '600 18px "Inter", sans-serif';
  bctx.letterSpacing = '5px';
  bctx.fillText('CELLAR MASTER NOTES', 384, 195);

  // Story Lines
  bctx.fillStyle = '#e7e5e4';
  bctx.font = '400 24px Georgia, serif';
  bctx.letterSpacing = '1px';
  const lines = [
    'Matured in hand-selected American',
    'oak casks for eighteen years.',
    'Unveils warm layers of toasted',
    'vanilla bean, dark amber honey,',
    'and a lingering velvet smoke finish.',
  ];
  lines.forEach((line, idx) => {
    bctx.fillText(line, 384, 290 + idx * 50);
  });

  // Gold Foil Seal Stamp
  bctx.strokeStyle = goldGrad;
  bctx.lineWidth = 4;
  bctx.beginPath();
  bctx.arc(384, 660, 74, 0, Math.PI * 2);
  bctx.stroke();
  bctx.lineWidth = 1.5;
  bctx.beginPath();
  bctx.arc(384, 660, 62, 0, Math.PI * 2);
  bctx.stroke();

  bctx.fillStyle = goldGrad;
  bctx.font = '900 22px "Inter", sans-serif';
  bctx.fillText('AUTHENTIC', 384, 648);
  bctx.font = '700 18px monospace';
  bctx.fillText('CASK #0482', 384, 680);

  // Minimalist Barcode Graphic at bottom
  bctx.fillStyle = '#f5f5f4';
  bctx.fillRect(234, 810, 300, 95);
  bctx.fillStyle = '#0c0a09';
  for (let x = 250; x < 518; x += 9) {
    const w = (x % 27 === 0) ? 5 : (x % 18 === 0) ? 2 : 3.5;
    bctx.fillRect(x, 822, w, 62);
  }
  bctx.font = '700 15px monospace';
  bctx.fillText('5  060928  410015', 384, 898);

  const backTexture = new THREE.CanvasTexture(backCanvas);
  backTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.anisotropy = maxAnisotropy;
  backTexture.needsUpdate = true;

  return { frontTexture, neckTexture, backTexture };
}

// Studio environment setup using RoomEnvironment for authentic glass & gold reflections
function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.38;
    gl.outputColorSpace = THREE.SRGBColorSpace;

    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    return () => {
      envTexture.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  return null;
}

// Luxury Obsidian & Brushed Gold Turntable Pedestal
function LuxuryPedestal({ isPopped }: { isPopped: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);
  const innerHaloRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outerHaloRef.current) {
      outerHaloRef.current.rotation.z += delta * 0.18;
      outerHaloRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.15;
    }
    if (innerHaloRef.current) {
      innerHaloRef.current.rotation.z -= delta * 0.25;
      innerHaloRef.current.rotation.y = Math.cos(Date.now() * 0.0006) * 0.2;
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      const targetIntensity = isPopped ? 3.2 : 1.6;
      mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, targetIntensity, 4, delta);
    }
  });

  return (
    <group position={[0, -1.12, 0]}>
      {/* Main Obsidian Podium Cylinder */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[0.72, 0.78, 0.14, 64]} />
        <meshPhysicalMaterial
          color="#141210"
          roughness={0.18}
          metalness={0.35}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Lower Stepped Plinth */}
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <cylinderGeometry args={[0.84, 0.92, 0.08, 64]} />
        <meshStandardMaterial color="#0c0a09" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Brushed Gold Upper Bevel Ring */}
      <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.715, 0.016, 24, 64]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          metalness={0.95}
          roughness={0.16}
          clearcoat={0.8}
        />
      </mesh>

      {/* Brushed Gold Lower Trim Ring */}
      <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.785, 0.01, 16, 64]} />
        <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.22} />
      </mesh>

      {/* Recessed Amber Uplight Ring on Podium Top */}
      <mesh ref={ringRef} position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.42, 0.46, 64]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner Dark Velvet/Glass Center Coaster */}
      <mesh position={[0, 0.011, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.42, 64]} />
        <meshPhysicalMaterial
          color="#1c1917"
          roughness={0.25}
          metalness={0.2}
          clearcoat={0.6}
        />
      </mesh>

      {/* Architectural Gold Orbital Halo Rings Behind Bottle */}
      <group position={[0, 1.1, -0.35]}>
        <mesh ref={outerHaloRef}>
          <torusGeometry args={[1.28, 0.007, 16, 96]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.35}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        <mesh ref={innerHaloRef} rotation={[0.3, 0.2, 0]}>
          <torusGeometry args={[1.02, 0.005, 16, 96]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#b45309"
            emissiveIntensity={0.25}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

// Effervescent Champagne / Whiskey Mist & Bubbles at Bottle Neck
function EffervescenceParticles({ isPopped }: { isPopped: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 36;

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const speed = 0.8 + Math.random() * 1.8;
      const spread = 0.15 + Math.random() * 0.45;
      return {
        vx: Math.cos(angle) * spread,
        vy: speed,
        vz: Math.sin(angle) * spread,
        scale: 0.012 + Math.random() * 0.022,
        phase: Math.random() * 2,
        isContinuous: i < 16,
      };
    });
  }, []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (isPopped) {
      elapsedRef.current = 0;
    }
  }, [isPopped]);

  useFrame((_, delta) => {
    if (!isPopped) {
      meshRefs.current.forEach((mesh) => {
        if (mesh) mesh.visible = false;
      });
      return;
    }

    elapsedRef.current += delta;
    const t = elapsedRef.current;

    particles.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;

      if (p.isContinuous) {
        const cycle = (t * 0.9 + p.phase) % 1.6;
        mesh.visible = true;
        mesh.position.set(
          Math.sin(t * 2 + i) * 0.045,
          cycle * 0.55,
          Math.cos(t * 2 + i) * 0.045
        );
        const fade = Math.sin((cycle / 1.6) * Math.PI);
        mesh.scale.setScalar(p.scale * (0.7 + fade * 0.6));
      } else {
        if (t < 1.8) {
          mesh.visible = true;
          mesh.position.set(
            p.vx * t,
            p.vy * t - 1.9 * t * t,
            p.vz * t
          );
          const life = Math.max(0, 1 - t / 1.8);
          mesh.scale.setScalar(p.scale * life * 1.3);
        } else {
          mesh.visible = false;
        }
      }
    });
  });

  return (
    <group ref={groupRef} position={[-0.0024, 1.01, -0.0023]}>
      {particles.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          visible={false}
        >
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial
            color="#fde68a"
            emissive="#f59e0b"
            emissiveIntensity={2.0}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// Bottle Model + Bespoke 3D Luxury Wrap-Around Labels + Cork Pop Physics
function BottleModel({ isPopped }: { isPopped: boolean }) {
  const { scene } = useGLTF('/fast-glb-3d.glb');
  const { gl } = useThree();
  const bottleGroupRef = useRef<THREE.Group>(null);
  const corkGroupRef = useRef<THREE.Group>(null);

  // Generate high-definition procedural label textures and dispose on unmount
  const labelTextures = useMemo(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy() || 4;
    return createLuxuryLabelTextures(maxAniso);
  }, [gl]);

  useEffect(() => {
    return () => {
      labelTextures.frontTexture.dispose();
      labelTextures.neckTexture.dispose();
      labelTextures.backTexture.dispose();
    };
  }, [labelTextures]);

  // Physics state for cork launch & bottle recoil
  const animState = useRef({
    corkPos: new THREE.Vector3(-0.0024, 1.0, -0.0023),
    corkVel: new THREE.Vector3(0, 0, 0),
    corkRot: new THREE.Vector3(0, 0, 0),
    recoilY: 0,
    recoilVelY: 0,
    recoilTilt: 0,
    recoilTiltVel: 0,
    wasPopped: false,
  });

  // Clone scene and enhance materials + compute missing vertex normals
  const enhancedBottle = useMemo(() => {
    const cloned = scene.clone(true);
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry = mesh.geometry.clone();
        mesh.geometry.computeVertexNormals();
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const origMat = mesh.material as THREE.MeshStandardMaterial;
        const origMap = origMat?.map || null;
        if (origMap) {
          origMap.colorSpace = THREE.SRGBColorSpace;
          origMap.needsUpdate = true;
        }

        // Rich dark amber reserve glass finish
        mesh.material = new THREE.MeshPhysicalMaterial({
          map: origMap,
          color: new THREE.Color('#2a180d'),
          emissive: new THREE.Color('#451a03'),
          emissiveIntensity: 0.28,
          roughness: 0.11,
          metalness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 0.98,
          ior: 1.54,
          envMapIntensity: 2.6,
        });
      }
    });
    return cloned;
  }, [scene]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const s = animState.current;
    const t = state.clock.getElapsedTime();

    if (isPopped && !s.wasPopped) {
      s.wasPopped = true;
      s.corkPos.set(-0.0024, 1.0, -0.0023);
      s.corkVel.set(0.85, 5.2, 0.45);
      s.corkRot.set(0, 0, 0);
      s.recoilVelY = -1.6;
      s.recoilTiltVel = 1.8;
    } else if (!isPopped && s.wasPopped) {
      s.wasPopped = false;
      s.corkVel.set(0, 0, 0);
    }

    const springK = 42;
    const damping = 7.5;
    s.recoilVelY += (-springK * s.recoilY - damping * s.recoilVelY) * dt;
    s.recoilY += s.recoilVelY * dt;

    s.recoilTiltVel += (-springK * s.recoilTilt - damping * s.recoilTiltVel) * dt;
    s.recoilTilt += s.recoilTiltVel * dt;

    if (bottleGroupRef.current) {
      const floatY = Math.sin(t * 1.5) * 0.035;
      bottleGroupRef.current.position.y = floatY + s.recoilY;
      bottleGroupRef.current.rotation.z = s.recoilTilt;
      bottleGroupRef.current.rotation.x = Math.sin(t * 0.9) * 0.02 - s.recoilTilt * 0.4;
      bottleGroupRef.current.rotation.y = Math.sin(t * 0.45) * 0.28;
    }

    if (corkGroupRef.current) {
      if (isPopped) {
        s.corkVel.y -= 9.2 * dt;
        s.corkPos.addScaledVector(s.corkVel, dt);
        s.corkRot.x += dt * 9;
        s.corkRot.z -= dt * 11;
        corkGroupRef.current.position.copy(s.corkPos);
        corkGroupRef.current.rotation.set(s.corkRot.x, 0, s.corkRot.z);
        corkGroupRef.current.visible = s.corkPos.y > -1.5;
      } else {
        corkGroupRef.current.visible = true;
        s.corkPos.x = THREE.MathUtils.damp(s.corkPos.x, -0.0024, 10, dt);
        s.corkPos.y = THREE.MathUtils.damp(s.corkPos.y, 1.0, 10, dt);
        s.corkPos.z = THREE.MathUtils.damp(s.corkPos.z, -0.0023, 10, dt);
        s.corkRot.x = THREE.MathUtils.damp(s.corkRot.x, 0, 10, dt);
        s.corkRot.z = THREE.MathUtils.damp(s.corkRot.z, 0, 10, dt);
        corkGroupRef.current.position.copy(s.corkPos);
        corkGroupRef.current.rotation.set(s.corkRot.x, 0, s.corkRot.z);
      }
    }
  });

  // Front label spans 140 degrees (-70° to +70° around +Z front axis)
  const frontArcLength = Math.PI * 0.78;
  const frontThetaStart = -frontArcLength / 2;

  // Back label spans 95 degrees on the rear (-Z axis)
  const backArcLength = Math.PI * 0.52;
  const backThetaStart = Math.PI - backArcLength / 2;

  return (
    <group ref={bottleGroupRef} scale={0.95}>
      <primitive object={enhancedBottle} />

      {/* ===================================================================
          BESPOKE 3D LUXURY BOTTLE LABEL ASSEMBLY (Conforms to Bottle Taper)
          =================================================================== */}
      <group position={[-0.0026, 0, -0.0023]}>
        {/* 1. Main Front Curved Reserve Label */}
        <mesh position={[0, -0.31, 0]} castShadow receiveShadow>
          <cylinderGeometry
            args={[0.2895, 0.2735, 0.72, 64, 1, true, frontThetaStart, frontArcLength]}
          />
          <meshPhysicalMaterial
            map={labelTextures.frontTexture}
            roughness={0.32}
            metalness={0.22}
            clearcoat={0.65}
            clearcoatRoughness={0.18}
            envMapIntensity={1.6}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* Upper 24K Gold Foil Embossed Trim Ring Above Main Label */}
        <mesh position={[0, 0.052, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2895, 0.0045, 16, 96]} />
          <meshPhysicalMaterial
            color="#fbbf24"
            metalness={0.96}
            roughness={0.14}
            clearcoat={0.9}
          />
        </mesh>

        {/* Lower 24K Gold Foil Embossed Trim Ring Below Main Label */}
        <mesh position={[0, -0.672, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.2735, 0.0045, 16, 96]} />
          <meshPhysicalMaterial
            color="#fbbf24"
            metalness={0.96}
            roughness={0.14}
            clearcoat={0.9}
          />
        </mesh>

        {/* 2. Rear Heritage & Barcode Label (Visible when rotated 180°) */}
        <mesh position={[0, -0.32, 0]} castShadow receiveShadow>
          <cylinderGeometry
            args={[0.2888, 0.2742, 0.64, 64, 1, true, backThetaStart, backArcLength]}
          />
          <meshPhysicalMaterial
            map={labelTextures.backTexture}
            roughness={0.36}
            metalness={0.18}
            clearcoat={0.5}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>

        {/* 3. Sculpted 3D Gold Medallion Crest on the Bottle Shoulder (Y = 0.21) */}
        <group position={[0, 0.21, 0.282]} rotation={[-0.22, 0, 0]}>
          {/* Outer Gold Rim Coin */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.062, 0.066, 0.012, 36]} />
            <meshPhysicalMaterial
              color="#f59e0b"
              metalness={0.96}
              roughness={0.14}
              clearcoat={1.0}
            />
          </mesh>
          {/* Inner Obsidian Enamel Inlay */}
          <mesh position={[0, 0, 0.005]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.048, 0.048, 0.006, 36]} />
            <meshPhysicalMaterial color="#0c0a09" roughness={0.2} metalness={0.3} clearcoat={0.9} />
          </mesh>
          {/* Center Raised Gold Diamond Star */}
          <mesh position={[0, 0, 0.009]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.006, 4]} />
            <meshStandardMaterial color="#fde68a" metalness={0.98} roughness={0.1} />
          </mesh>
        </group>

        {/* 4. Luxury Neck Collar Band & Gold Filigree Rings (Y = 0.67) */}
        <mesh position={[0, 0.67, 0]} castShadow>
          <cylinderGeometry args={[0.1038, 0.1058, 0.16, 48, 1, true]} />
          <meshPhysicalMaterial
            map={labelTextures.neckTexture}
            roughness={0.25}
            metalness={0.45}
            clearcoat={0.85}
            polygonOffset
            polygonOffsetFactor={-1}
            polygonOffsetUnits={-1}
          />
        </mesh>
        {/* Neck Top & Bottom Gold Rings */}
        <mesh position={[0, 0.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.104, 0.0035, 16, 48]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0, 0.59, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.106, 0.0035, 16, 48]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>

      {/* 3D Luxury Cork & Brushed Gold Cap Assembly at Bottle Neck */}
      <group ref={corkGroupRef} position={[-0.0024, 1.0, -0.0023]}>
        {/* Lower Natural Cork Cylinder */}
        <mesh position={[0, -0.02, 0]} castShadow>
          <cylinderGeometry args={[0.088, 0.082, 0.09, 32]} />
          <meshStandardMaterial color="#b48456" roughness={0.78} metalness={0.05} />
        </mesh>
        {/* Upper Brushed Gold Foil Cap */}
        <mesh position={[0, 0.035, 0]} castShadow>
          <cylinderGeometry args={[0.112, 0.109, 0.068, 32]} />
          <meshPhysicalMaterial
            color="#f59e0b"
            metalness={0.94}
            roughness={0.16}
            clearcoat={0.9}
          />
        </mesh>
        {/* Gold Collar Lip */}
        <mesh position={[0, 0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.111, 0.009, 16, 32]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.96} roughness={0.14} />
        </mesh>
      </group>

      {/* Effervescent Mist & Rising Golden Bubbles when Popped */}
      <EffervescenceParticles isPopped={isPopped} />
    </group>
  );
}

// Camera Controller to smoothly reset camera position & target when requested
function CameraResetController({
  controlsRef,
  resetSignal,
  isPopped,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  resetSignal: number;
  isPopped: boolean;
}) {
  const { camera } = useThree();
  const isResetting = useRef(false);
  const defaultPos = useMemo(() => new THREE.Vector3(0, 0.25, 3.6), []);
  const poppedPos = useMemo(() => new THREE.Vector3(0, 0.45, 3.25), []);
  const defaultTarget = useMemo(() => new THREE.Vector3(0, -0.05, 0), []);

  useEffect(() => {
    isResetting.current = true;
    const timer = window.setTimeout(() => {
      isResetting.current = false;
    }, 650);
    return () => window.clearTimeout(timer);
  }, [resetSignal, isPopped]);

  useFrame((_, delta) => {
    if (!isResetting.current || !controlsRef.current) return;
    const goalPos = isPopped ? poppedPos : defaultPos;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, goalPos.x, 6, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, goalPos.y, 6, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, goalPos.z, 6, delta);

    controlsRef.current.target.x = THREE.MathUtils.damp(controlsRef.current.target.x, defaultTarget.x, 6, delta);
    controlsRef.current.target.y = THREE.MathUtils.damp(controlsRef.current.target.y, defaultTarget.y, 6, delta);
    controlsRef.current.target.z = THREE.MathUtils.damp(controlsRef.current.target.z, defaultTarget.z, 6, delta);
    controlsRef.current.update();
  });

  return null;
}

export default function BottleViewer({ isPopped, onResetView, resetSignal = 0 }: BottleViewerProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const [internalReset, setInternalReset] = React.useState(0);

  const handleFullReset = () => {
    setInternalReset((c) => c + 1);
    if (onResetView) {
      onResetView();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden select-none bg-[radial-gradient(circle_at_50%_38%,rgba(245,158,11,0.22)_0%,rgba(120,53,15,0.16)_38%,rgba(12,10,9,0.98)_85%)] border border-amber-500/20 shadow-[inset_0_0_60px_rgba(0,0,0,0.75)]">
      {/* Subtle Ambient Studio Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-16 rounded-full bg-amber-600/20 blur-2xl pointer-events-none" />

      {/* Top HUD Bar - Minimal Icons Only */}
      <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
        <div
          title="360° Interactive View"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black/55 border border-white/10 text-amber-400"
        >
          <Move3d size={15} />
        </div>

        <button
          type="button"
          onClick={handleFullReset}
          title="Reset to Normal View"
          aria-label="Reset to Normal View"
          className="pointer-events-auto inline-flex items-center justify-center w-8 h-8 rounded-lg bg-black/65 hover:bg-amber-900/80 border border-white/15 hover:border-amber-500/40 text-amber-400 hover:text-white transition-all cursor-pointer"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0.25, 3.6]} fov={38} />
        <StudioEnvironment />

        {/* 4-Point Luxury Studio Lighting Rig */}
        <ambientLight intensity={0.85} color="#fffbeb" />
        {/* Warm Golden Key Light */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.8}
          color="#fef3c7"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Crisp Frontal Label Fill Light */}
        <directionalLight position={[0, 1.5, 6]} intensity={2.1} color="#ffffff" />
        {/* Cool Ice-Blue Rim Backlight for Glass Edges */}
        <directionalLight position={[-4, 4, -4]} intensity={2.2} color="#38bdf8" />
        {/* Warm Amber Pedestal Uplight */}
        <pointLight position={[0, -0.85, 0.9]} intensity={isPopped ? 3.2 : 1.8} color="#f59e0b" distance={4} />

        {/* Hero Bottle + Luxury Labels + Cork + Effervescence */}
        <BottleModel isPopped={isPopped} />

        {/* Luxury Obsidian & Brushed Gold Turntable Pedestal */}
        <LuxuryPedestal isPopped={isPopped} />

        {/* Grounding Contact Shadows on Pedestal */}
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.65}
          scale={2.5}
          blur={1.8}
          far={2.5}
          color="#000000"
        />

        {/* Chilled Cellar Golden Dust Motes */}
        <Sparkles
          count={isPopped ? 55 : 28}
          scale={[2.4, 2.8, 2.4]}
          size={isPopped ? 2.2 : 1.4}
          speed={isPopped ? 0.8 : 0.25}
          opacity={0.55}
          color="#fbbf24"
        />

        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={2.1}
          maxDistance={5.2}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.85}
          target={[0, -0.05, 0]}
        />

        <CameraResetController
          controlsRef={controlsRef}
          resetSignal={resetSignal + internalReset}
          isPopped={isPopped}
        />
      </Canvas>

      {/* Bottom Interactive Hint */}
      <div className="absolute bottom-3 left-3.5 z-20 pointer-events-none text-[10px] text-stone-400/90 tracking-wide">
        {isPopped ? 'Uncorked · Click "Normal View" to reseal' : 'Drag to rotate · Scroll to zoom'}
      </div>
    </div>
  );
}

useGLTF.preload('/fast-glb-3d.glb');
