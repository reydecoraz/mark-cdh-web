'use client'

import { useEffect, useState } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '@/lib/store'
import { DataBeam } from './Effects/DataBeam'
import { Pallet } from './Pallet'
import { Office, SERVER_POS, OFFICE_PC_POS } from './World/Office'
import { WarehouseEnvironment } from './World/WarehouseEnvironment'
import { NetworkInfrastructure } from './World/NetworkInfrastructure'
import { PathEditor } from './World/PathEditor'

// --- CONSTANTS ---
const FACTORY_PC_POS = new THREE.Vector3(-12.2, 1, 3)

export function Scene() {
    const [pallets, setPallets] = useState<number[]>([])
    const [beams, setBeams] = useState<{ id: string, start: THREE.Vector3, end: THREE.Vector3 }[]>([])
    const [isTopView, setIsTopView] = useState(false)

    const { scenario, pathEditorEnabled, addLog, incrementInventory, decrementInventory, incrementRead } = useStore()

    // Automated Logistic Spawner
    useEffect(() => {
        if (scenario === 'AS_IS' || scenario === 'POC') return

        let timerId: any

        const spawn = () => {
            // ONLY spawn if there isn't an active mover
            setPallets(prev => {
                if (prev.length === 0) {
                    // Use microtask to avoid updating store state during this state setter
                    queueMicrotask(() => {
                        addLog("Middleware: Intercepción ZPL - Procesando ticket RFID", 'info')
                        setTimeout(() => addLog("Zebra: Etiqueta codificada e impresa exitosamente", 'success'), 1000)
                    })
                    return [Date.now()]
                }
                return prev
            })

            const nextDelay = Math.random() * 5000 + 10000 // 10s to 15s
            timerId = setTimeout(spawn, nextDelay)
        }

        // Delay first spawn a bit
        timerId = setTimeout(spawn, 3000)

        return () => clearTimeout(timerId)
    }, [scenario])

    // Camera Animation Toggle Listener
    useEffect(() => {
        const handleToggle = () => setIsTopView(prev => !prev)
        window.addEventListener('toggle-top-view', handleToggle)
        return () => window.removeEventListener('toggle-top-view', handleToggle)
    }, [])

    const triggerBeam = (start: THREE.Vector3, end: THREE.Vector3) => {
        const id = Math.random().toString()
        setBeams(prev => [...prev, { id, start, end }])
    }

    const handleZoneChange = (zone: string) => {
        if (zone === 'COOL_STORE') {
            incrementInventory()
            addLog("WMS: Confirmación de colocación en Cool Store (-29°C)", 'success')
        }
        if (scenario === 'POC' && zone === 'OMEGA') {
            decrementInventory()
            addLog("WMS: Tarima enviada a zona de despacho Omega", 'info')
        }
        if (scenario !== 'POC' && zone === 'EXITED') {
            decrementInventory()
            addLog("Operación: Tarima ha salido del almacén mediante Bahía", 'info')
        }
    }

    const handleDataEvent = (pos: THREE.Vector3) => {
        // Bilateral Communication: Equipment -> Server
        triggerBeam(pos, SERVER_POS)

        const epc = `EPC-${Math.random().toString(16).slice(2, 6).toUpperCase()}`

        // Slight delay for the response beam: Server -> Equipment
        setTimeout(() => {
            triggerBeam(SERVER_POS, pos)
            addLog(`RFID Lectura: Tag ${epc} detectado y validado`, 'success')
        }, 300)

        // Simultaneous: Server -> Office Operator PC
        setTimeout(() => {
            triggerBeam(SERVER_POS, OFFICE_PC_POS)
            addLog("Sincronización: Datos de trazabilidad enviados a terminal", 'info')
        }, 150)

        incrementRead()
    }

    return (
        <Canvas shadows camera={{ position: [50, 70, 90], fov: 40 }}>
            <CameraController isTopView={isTopView} />
            <color attach="background" args={['#111']} />
            <gridHelper args={[250, 100, '#333', '#222']} position={[50, 0.01, 0]} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 40, 10]} intensity={1.2} castShadow shadow-mapSize={[2048, 2048]} />

            {/* Structural Elements */}
            <WarehouseEnvironment scenario={scenario} />

            {pathEditorEnabled && <PathEditor />}

            {scenario !== 'AS_IS' && (
                <>
                    <NetworkInfrastructure scenario={scenario} />
                    <Office />
                </>
            )}

            {/* Moving Pallets */}
            {pallets.map(id => (
                <Pallet
                    key={id}
                    id={id}
                    scenario={scenario}
                    onRemove={(pid: number) => setPallets(prev => prev.filter(p => p !== pid))}
                    onZoneChange={handleZoneChange}
                    onDataEvent={handleDataEvent}
                />
            ))}

            {/* Data Beams */}
            {beams.map(b => (
                <DataBeam
                    key={b.id}
                    start={b.start}
                    end={b.end}
                    onComplete={() => setBeams(prev => prev.filter(item => item.id !== b.id))}
                />
            ))}
        </Canvas>
    )
}

function CameraController({ isTopView }: { isTopView: boolean }) {
    const { camera, controls } = useThree() as any

    useFrame(() => {
        if (!controls) return

        const targetPos = isTopView ? new THREE.Vector3(50, 130, 0) : new THREE.Vector3(50, 70, 90)
        const targetLookAt = new THREE.Vector3(50, 0, 0)

        // Smooth interpolate position
        camera.position.lerp(targetPos, 0.1)

        // Update controls target smoothly
        if (controls.target) {
            controls.target.lerp(targetLookAt, 0.1)
            controls.update()
        }
    })

    return (
        <OrbitControls
            ref={(ref) => {
                if (ref) {
                    ref.maxPolarAngle = isTopView ? 0.01 : Math.PI / 2.1
                    ref.enableRotate = !isTopView
                }
            }}
            target={[50, 0, 0]}
            minDistance={10}
            maxDistance={300}
        />
    )
}
