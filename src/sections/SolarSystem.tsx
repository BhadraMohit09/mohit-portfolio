import { useRef, useState, useMemo } from "react";
import { Shell, SectionHeader } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { createPlanetTexture } from "@/utils/planetTextures";

/* ── Sarcastic space quips ──────────────────────────────────────────── */
const QUIPS: Record<string, { icon: string; line: string }> = {
  Sun:     { icon: "☀️", line: "Ah, hello! I'm only 5,500°C. Get closer. I dare you." },
  Mercury: { icon: "☿",  line: "Tiny. Airless. 430°C on one side, -180°C on the other. Make up your mind!" },
  Venus:   { icon: "♀",  line: "Hottest planet — not Mercury. Sulfuric acid clouds. Lovely weather, terrible Airbnb reviews." },
  Earth:   { icon: "🌍", line: "The only known planet with WiFi, traffic jams, and existential dread. You live here. Somehow." },
  Mars:    { icon: "♂",  line: "Red. Dusty. Abandoned. Yet Elon's dream vacation spot. Make it make sense." },
  Jupiter: { icon: "♃",  line: "95 moons. A storm wider than Earth that's been raging for 300 years. Total overachiever." },
  Saturn:  { icon: "♄",  line: "Spent 4.5 billion years growing rings. We respect the commitment to aesthetics. 💍" },
  Uranus:  { icon: "⛢",  line: "Rotates completely sideways. Got absolutely yeeted by something massive. Never recovered. Relatable." },
  Neptune: { icon: "♆",  line: "4.5 billion km away. Winds at 2,100 km/h. Takes 165 years to orbit once. Hard pass." },
};

/* ── Planet definitions ─────────────────────────────────────────────── */
const PLANETS = [
  { name: "Mercury", radius: 0.25, orbit: 2.5,   color: "#b5b5b5", period: 0.24 },
  { name: "Venus",   radius: 0.45,  orbit: 4,   color: "#e8cda0", period: 0.615 },
  { name: "Earth",   radius: 0.5, orbit: 5.5, color: "#4d94ff", period: 1 },
  { name: "Mars",    radius: 0.35, orbit: 7, color: "#c1440e", period: 1.88 },
  { name: "Jupiter", radius: 1.1,  orbit: 10, color: "#c88b3a", period: 11.86 },
  { name: "Saturn",  radius: 0.9, orbit: 13,color: "#e4d191", period: 29.46, hasRing: true },
  { name: "Uranus",  radius: 0.65, orbit: 16,  color: "#7de8e8", period: 84 },
  { name: "Neptune", radius: 0.6, orbit: 18.5,color: "#5b5ddf", period: 164.8 },
];

function OrbitPath({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.015, radius + 0.015, 64]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

function PlanetBody({ 
  data, 
  setHovered 
}: { 
  data: typeof PLANETS[0], 
  setHovered: (v: string | null) => void 
}) {
  const ref = useRef<THREE.Group>(null);
  const texture = useMemo(() => createPlanetTexture(data.name), [data.name]);
  
  useFrame(({ clock }) => {
    if (data.period === 0) return;
    const elapsedTime = clock.getElapsedTime();
    // 1 Earth year = 30 seconds
    const speed = (2 * Math.PI) / (30 * data.period); 
    const angle = elapsedTime * speed;
    if (ref.current) {
      ref.current.position.x = Math.cos(angle) * data.orbit;
      ref.current.position.z = Math.sin(angle) * data.orbit;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <OrbitPath radius={data.orbit} />
      <group ref={ref}>
        <mesh 
          onPointerOver={(e) => { e.stopPropagation(); setHovered(data.name); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
        >
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial map={texture} roughness={0.7} metalness={0.1} />
        </mesh>
        
        {/* Saturn Rings */}
        {data.hasRing && (
          <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[data.radius * 1.4, data.radius * 2.2, 64]} />
            <meshStandardMaterial color={data.color} transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function Sun({ setHovered }: { setHovered: (v: string | null) => void }) {
  const sunRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => createPlanetTexture('Sun'), []);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh 
      ref={sunRef}
      onPointerOver={(e) => { e.stopPropagation(); setHovered("Sun"); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
    >
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial map={texture} />
      {/* Sun glow effect */}
      <mesh>
        <sphereGeometry args={[1.7, 32, 32]} />
        <meshBasicMaterial color="#ff8800" transparent opacity={0.3} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial color="#ff4500" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
    </mesh>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */
export function SolarSystem() {
  const [hoveredBody, setHoveredBody] = useState<string | null>(null);
  
  const tooltip = useMemo(() => hoveredBody ? { name: hoveredBody, ...QUIPS[hoveredBody] } : null, [hoveredBody]);

  return (
    <div id="github">
      <SectionHeader title="Solar System" />
      <Shell className="px-4 py-8 sm:px-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Viewport ── */}
          <div
            className="relative w-full rounded-xl overflow-hidden border border-[var(--line)]"
            style={{
              height: 500,
              background: "radial-gradient(ellipse at 50% 50%, #0a0f1e 0%, #03050a 60%, #000000 100%)",
            }}
          >
            <Canvas camera={{ position: [0, 18, 32], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[0, 0, 0]} intensity={3.5} distance={70} decay={2} color="#ffffff" />
              
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
              
              <Sun setHovered={setHoveredBody} />
              
              {PLANETS.map((planet) => (
                <PlanetBody key={planet.name} data={planet} setHovered={setHoveredBody} />
              ))}
              
              <OrbitControls 
                enablePan={false}
                minDistance={5}
                maxDistance={40}
                maxPolarAngle={Math.PI / 2 + 0.1} // Allow looking slightly below the orbital plane
              />
            </Canvas>

            {/* ── Hint text (bottom-right) ── */}
            <div className="absolute bottom-3 right-3 z-30 font-mono text-[8px] text-white/30 pointer-events-none hidden sm:block">
              scroll to zoom · drag to rotate
            </div>

            {/* ── Sarcastic tooltip card ── */}
            <AnimatePresence>
              {tooltip && (
                <motion.div
                  key={tooltip.name}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                  style={{ width: "min(90%, 340px)" }}
                >
                  <div className="rounded-xl border border-white/10 bg-black/85 backdrop-blur-md px-4 py-3 shadow-2xl">
                    <div className="flex items-start gap-2.5">
                      <span className="text-2xl leading-none mt-0.5">{tooltip.icon}</span>
                      <div>
                        <p className="font-mono text-[11px] font-bold text-white/90 tracking-wide">{tooltip.name}</p>
                        <p className="mt-0.5 font-sans text-[11px] leading-relaxed text-white/60">{tooltip.line}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Planet legend ── */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2">
            {PLANETS.map((p) => (
              <span key={p.name} className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--soft)]">
                <span className="inline-block rounded-full shrink-0" style={{
                  width: Math.max(6, p.radius * 12), height: Math.max(6, p.radius * 12),
                  background: p.color, boxShadow: `0 0 5px 2px ${p.color}40`,
                }} />
                {p.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-center font-mono text-[10px] text-[var(--soft)]/45">
            1 Earth year = 30s · True 3D spheres · Drag anywhere to rotate
          </p>
        </motion.div>
      </Shell>
    </div>
  );
}

export default SolarSystem;
