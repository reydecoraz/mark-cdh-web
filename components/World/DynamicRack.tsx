'use client'

import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'

interface DynamicRackProps {
    position: [number, number, number]
    rotation?: [number, number, number]
    rows: number // Number of rows (Z direction)
    levels: number // Number of levels (Y direction)
    depth: number // Number of pallets per row (X direction)
}

export function DynamicRack({ position, rotation = [0, 0, 0], rows = 20, levels = 8, depth = 45 }: DynamicRackProps) {
    const palletSpacingX = 1.2
    const palletSpacingZ = 1.5
    const shelfSpacingY = 1.2

    const postsRef = useRef<THREE.InstancedMesh>(null)
    const beamsRef = useRef<THREE.InstancedMesh>(null)
    const palletsRef = useRef<THREE.InstancedMesh>(null)

    // Calculate instance data
    const data = useMemo(() => {
        const postInstances: THREE.Matrix4[] = []
        const beamInstances: THREE.Matrix4[] = []
        const palletInstances: { matrix: THREE.Matrix4, color: THREE.Color }[] = []

        const tempMatrix = new THREE.Matrix4()

        // 1. Structural Posts (Every 10 units for extreme simplification)
        for (let r = 0; r <= rows; r++) {
            for (let d = 0; d <= depth; d += 10) {
                const x = d * palletSpacingX
                const y = (levels * shelfSpacingY) / 2
                const z = r * palletSpacingZ
                tempMatrix.makeTranslation(x, y, z)
                postInstances.push(tempMatrix.clone())
            }
            // Last post
            if (depth % 10 !== 0) {
                tempMatrix.makeTranslation(depth * palletSpacingX, (levels * shelfSpacingY) / 2, r * palletSpacingZ)
                postInstances.push(tempMatrix.clone())
            }
        }

        // 2. Horizontal Beams (Only top and bottom for simplification)
        for (let r = 0; r <= rows; r++) {
            for (let l of [1, levels]) { // Only at level 1 and top level
                const x = (depth * palletSpacingX) / 2
                const y = l * shelfSpacingY
                const z = r * palletSpacingZ
                tempMatrix.makeTranslation(x, y, z)
                beamInstances.push(tempMatrix.clone())
            }
        }

        // 3. Pallets (80% occupancy for realistic warehouse density)
        for (let r = 0; r < rows; r++) {
            for (let l = 0; l < levels; l++) {
                for (let d = 0; d < depth; d++) {
                    if (Math.random() < 0.8) {
                        const x = d * palletSpacingX + 0.6
                        const y = l * shelfSpacingY + 0.3
                        const z = r * palletSpacingZ + 0.75
                        tempMatrix.makeTranslation(x, y, z)

                        palletInstances.push({
                            matrix: tempMatrix.clone(),
                            color: new THREE.Color().setHSL(0.6, 0.7, 0.3 + Math.random() * 0.4)
                        })
                    }
                }
            }
        }

        return { postInstances, beamInstances, palletInstances }
    }, [rows, levels, depth])

    // Apply instances
    useEffect(() => {
        if (postsRef.current) {
            data.postInstances.forEach((matrix, i) => postsRef.current!.setMatrixAt(i, matrix))
            postsRef.current.instanceMatrix.needsUpdate = true
        }
        if (beamsRef.current) {
            data.beamInstances.forEach((matrix, i) => beamsRef.current!.setMatrixAt(i, matrix))
            beamsRef.current.instanceMatrix.needsUpdate = true
        }
        if (palletsRef.current) {
            data.palletInstances.forEach((p, i) => {
                palletsRef.current!.setMatrixAt(i, p.matrix)
                palletsRef.current!.setColorAt(i, p.color)
            })
            palletsRef.current.instanceMatrix.needsUpdate = true
            if (palletsRef.current.instanceColor) palletsRef.current.instanceColor.needsUpdate = true
        }
    }, [data])

    return (
        <group position={position} rotation={rotation}>
            {/* Posts */}
            <instancedMesh ref={postsRef} args={[null as any, null as any, data.postInstances.length]}>
                <boxGeometry args={[0.1, levels * shelfSpacingY, 0.1]} />
                <meshStandardMaterial color="#444" metalness={0.5} roughness={0.5} />
            </instancedMesh>

            {/* Beams */}
            <instancedMesh ref={beamsRef} args={[null as any, null as any, data.beamInstances.length]}>
                <boxGeometry args={[depth * palletSpacingX, 0.05, 0.05]} />
                <meshStandardMaterial color="#444" metalness={0.5} roughness={0.5} />
            </instancedMesh>

            {/* Pallets */}
            <instancedMesh ref={palletsRef} args={[null as any, null as any, data.palletInstances.length]}>
                <boxGeometry args={[0.9, 0.6, 0.9]} />
                <meshStandardMaterial />
            </instancedMesh>
        </group>
    )
}

