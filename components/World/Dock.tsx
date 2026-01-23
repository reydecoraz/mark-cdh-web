import { Label } from './Label'

interface DockProps {
    position: [number, number, number]
    label: string
}

export function Dock({ position, label }: DockProps) {
    return (
        <group position={position}>
            {/* Wall / Frame */}
            <mesh position={[0, 2, 0]}>
                <boxGeometry args={[4, 4, 0.2]} />
                <meshStandardMaterial color="#eeeeee" />
            </mesh>

            {/* Door Shutter */}
            <mesh position={[0, 1.5, 0.15]}>
                <planeGeometry args={[2.5, 3]} />
                <meshStandardMaterial color="#ffffff" />
                {/* Add simple horizontal lines texture logic if needed, but color is fine for now */}
            </mesh>

            {/* Ramp */}
            <mesh position={[0, 0, 1.5]} rotation={[0.1, 0, 0]}>
                <boxGeometry args={[2.5, 0.2, 3]} />
                <meshStandardMaterial color="#cccccc" />
            </mesh>

            <Label text={label} position={[0, 4.5, 0]} />
        </group>
    )
}
