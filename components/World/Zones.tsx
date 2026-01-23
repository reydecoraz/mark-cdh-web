import { Scenario } from '@/lib/store'
import * as THREE from 'three'
import { Label } from './Label'
import { Arch } from './Arch'
import { Sparkles } from '@react-three/drei'
import { Rack } from './Rack'
import { DynamicRack } from './DynamicRack'
import { Dock } from './Dock'
import { LabelingStation } from './LabelingStation'

interface ZonesProps {
    scenario: Scenario
}

export function Zones({ scenario }: ZonesProps) {
    return (
        <>
            {/* Cool Store (-29C) - RE-RESIZED: 4x Depth (28), 10x Width (60) */}
            <group position={[5, 0.05, 0]}> {/* Center: Start -9 + 14 = 5 */}
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[28, 60]} />
                    <meshLambertMaterial color="#0277bd" transparent opacity={0.3} side={THREE.DoubleSide} />
                </mesh>



                <Label text="Cool Store (-29°C)" position={[0, 4, -25]} color="bg-blue-800/60" />

                {/* Industrial Dynamic Rack - Centered in Cool Store */}
                <DynamicRack position={[-10, 0, 20]} rotation={[0, Math.PI / 2, 0]} rows={10} levels={8} depth={40} />

                {/* Secondary Dynamic Rack - Bottom edge (Z=30). Rotated 90deg. */}
                <DynamicRack position={[-11.25, 0, 30]} rotation={[0, Math.PI / 2, 0]} rows={15} levels={5} depth={2} />

                {/* Phase 1: Entry Arch (Start at -9 relative to 5 is -14) */}
                {(scenario === 'PHASE1' || scenario === 'PHASE2') && <Arch position={[-14, 0, 0]} label="Arco Entrada CS" />}

                {/* Phase 1 & PoC: Exit Arch (End at 19 relative to 5 is +14) */}
                {(scenario === 'POC' || scenario === 'PHASE1' || scenario === 'PHASE2') && <Arch position={[14, 0, 0]} label="Arco Salida CS" />}
            </group>

            {/* Omega (-18C) - Shifted to start at 20 (Center 27) */}
            <group position={[27, 0.05, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[14, 30]} />
                    <meshLambertMaterial color="#3949ab" transparent opacity={0.3} side={THREE.DoubleSide} />
                </mesh>



                <Label text="Omega (-18°C)" position={[0, 4, -25]} color="bg-indigo-800/60" />

                {/* Phase 1 Arch (Omega Exit: +7 relative to center) */}
                {(scenario === 'PHASE1' || scenario === 'PHASE2') && <Arch position={[7, 0, 0]} label="Arco Salida Omega" />}
            </group>


            <group position={[70, 0.05, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[70, 60]} />
                    <meshLambertMaterial color="#7b1fa2" transparent opacity={0.3} side={THREE.DoubleSide} />
                </mesh>



                <Label text="Yethi (-18°C)" position={[0, 4, -12]} color="bg-purple-800/60" />

                {/* Yethi Aisles - Reduced to 7 rows with tight spacing, shifted closer to wall */}
                {[...Array(7)].map((_, i) => (
                    <group key={i} position={[i * 7.5 - 27, 0, 0]}>
                        {/* Upper Section */}
                        <DynamicRack position={[0, 0, -28]} rows={15} levels={5} depth={2} />
                        <DynamicRack position={[2.5, 0, -28]} rows={15} levels={5} depth={2} />

                        {/* Lower Section */}
                        <DynamicRack position={[0, 0, 5]} rows={15} levels={5} depth={2} />
                        <DynamicRack position={[2.5, 0, 5]} rows={15} levels={5} depth={2} />
                    </group>
                ))}

                {/* Wall Rack - Adjacent to Omega (Interface at X=-35) */}
                <group position={[-34, 0, 0]}>
                    <DynamicRack position={[0, 0, -28]} rows={15} levels={5} depth={2} />
                    <DynamicRack position={[0, 0, 5]} rows={15} levels={5} depth={2} />
                </group>



                {/* Phase 1: Exit Yethi (+35 from center) */}
                {(scenario === 'PHASE1' || scenario === 'PHASE2') && <Arch position={[5, 0, 35]} rotation={[0, Math.PI / 2, 0]} label="Arco Salida Yethi" />}
            </group>

            {/* Loading Bays (Independent Zone) - Shifted to start at 106 (Center 109) */}
            <group position={[75, 0.05, 40]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[6, 6]} />
                    <meshLambertMaterial color="#ffffff" transparent opacity={0.4} side={THREE.DoubleSide} />
                </mesh>
                <Label text="Bahías de Carga" position={[0, 1, -2]} color="bg-gray-700/60" />

                {/* Phase 1: Dual Exit Bays */}
                {(scenario === 'PHASE1' || scenario === 'PHASE2') && (
                    <>
                        <Dock position={[6, 0, 2]} label="Rampa 1" />
                        <Dock position={[0, 0, 2]} label="Rampa 2" />
                        <LabelingStation position={[-7, 0, 2]} />
                    </>
                )}
            </group>
        </>
    )
}
