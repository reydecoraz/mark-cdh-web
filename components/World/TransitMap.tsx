'use client'

import { Text } from '@react-three/drei'
import { Line } from '@react-three/drei'

interface TransitMapProps {
    visible: boolean
}

interface PathData {
    id: number
    points: [number, number, number][]
    color: string
}

export function TransitMap({ visible }: TransitMapProps) {
    if (!visible) return null

    const paths: PathData[] = [
        // 1. Printer to CS Entry
        {
            id: 1,
            points: [[-11.2, 0.05, 0], [-14, 0.05, 0]],
            color: '#ffff00'
        },
        // 2. CS Entry to CS Internal Corridors
        {
            id: 2,
            points: [[-14, 0.05, 0], [5, 0.05, 0], [5, 0.05, 20]],
            color: '#ffff00'
        },
        // 3. CS Exit Path
        {
            id: 3,
            points: [[14, 0.05, 0], [20, 0.05, 0]],
            color: '#ffff00'
        },
        // 4. Omega Transit
        {
            id: 4,
            points: [[20, 0.05, 0], [34, 0.05, 0]],
            color: '#ffff00'
        },
        // 5. Yethi Entry to Main Aisle
        {
            id: 5,
            points: [[35, 0.05, 0], [70, 0.05, 0]],
            color: '#ffff00'
        },
        // 6. Yethi Secondary Exit (Lower)
        {
            id: 6,
            points: [[70, 0.05, 0], [75, 0.05, 35]],
            color: '#ffff00'
        },
        // 7. Yethi Exit to Bays
        {
            id: 7,
            points: [[75, 0.05, 35], [75, 0.05, 40]],
            color: '#ffff00'
        }
    ]

    return (
        <group>
            {paths.map((path) => {
                const origin = path.points[0]
                const destination = path.points[path.points.length - 1]
                const middle = path.points[Math.floor(path.points.length / 2)]

                return (
                    <group key={path.id}>
                        {/* The Path Line */}
                        <Line
                            points={path.points}
                            color={path.color}
                            lineWidth={2}
                            transparent
                            opacity={0.4}
                        />

                        {/* Origin Marker */}
                        <group position={[origin[0], 0.2, origin[2]]}>
                            <mesh>
                                <sphereGeometry args={[0.3]} />
                                <meshBasicMaterial color="#00ff00" />
                            </mesh>
                            <Text position={[0, 0.5, 0]} fontSize={0.8} color="white">O</Text>
                        </group>

                        {/* Destination Marker */}
                        <group position={[destination[0], 0.2, destination[2]]}>
                            <mesh>
                                <sphereGeometry args={[0.3]} />
                                <meshBasicMaterial color="#ff0000" />
                            </mesh>
                            <Text position={[0, 0.5, 0]} fontSize={0.8} color="white">D</Text>
                        </group>

                        {/* Path ID Label */}
                        <Text
                            position={[middle[0], 1, middle[2]]}
                            fontSize={1.2}
                            color="yellow"
                            outlineWidth={0.1}
                            outlineColor="black"
                        >
                            {path.id}
                        </Text>
                    </group>
                )
            })}
        </group>
    )
}
