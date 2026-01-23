'use client'

import { motion } from 'framer-motion'
import { X, Info, Cpu, Network, Video, Bell, Terminal } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Scenario } from '@/lib/store'

interface ArchModalProps {
    scenario: Scenario
    onClose: () => void
}

export function ArchModal({ scenario, onClose }: ArchModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md pointer-events-auto"
        >
            <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                className="bg-zinc-900 border border-white/10 rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-600/30 via-blue-600/20 to-zinc-900 p-8 flex justify-between items-center border-b border-white/5">
                    <div className="flex items-center gap-5">
                        <div className="bg-cyan-500/20 p-4 rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-900/20">
                            <Info className="text-cyan-400 w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Sistema de Pórtico RFID & Visión</h2>
                            <p className="text-cyan-400/80 text-sm font-mono tracking-[0.2em] uppercase mt-1">Módulo de Control de Acceso y Trazabilidad</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-all hover:bg-white/10 p-3 rounded-full border border-white/10 flex items-center justify-center">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side: Info cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all hover:bg-purple-500/5">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-purple-500/20 p-2 rounded-xl">
                                    <Cpu className="text-purple-400 w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-white">Hardware Industrial</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Lectores <span className="text-purple-300 font-semibold">RFID Impinj R700</span> y antenas de alta ganancia capaces de leer cientos de tags por segundo con precisión quirúrgica.
                            </p>
                        </div>

                        <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all hover:bg-blue-500/5">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-blue-500/20 p-2 rounded-xl">
                                    <Network className="text-blue-400 w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-white">Conectividad Tiempo Real</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Procesamiento local vía <span className="text-blue-300 font-semibold">PoE/Ethernet</span> y sincronización inmediata con la nube o servidor local mediante protocolos industriales.
                            </p>
                        </div>

                        <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all hover:bg-green-500/5">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-green-500/20 p-2 rounded-xl">
                                    <Video className="text-green-400 w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-white">Evidencia Visual</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Activación de cámaras de alta velocidad para capturar la evidencia del paso de la tarima, <span className="text-green-300 font-semibold">vinculando foto con ID de producto</span>.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Visual Components / Phase specific */}
                    {/* Right Side: Fixed Hardware Visualization */}
                    <div className="lg:col-span-8 bg-black/40 rounded-[2rem] border border-white/5 flex flex-col relative overflow-hidden">
                        {/* 3D Visualization Area */}
                        <div className="h-[350px] w-full relative">
                            <Canvas camera={{ position: [8, 5, 8], fov: 40 }}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} intensity={1} />
                                <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={1} />

                                <group position={[0, -2, 0]}>
                                    {/* Arch Structure - Now White */}
                                    <mesh position={[-2.5, 3, 0]}>
                                        <boxGeometry args={[0.2, 6, 0.2]} />
                                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
                                    </mesh>
                                    <mesh position={[2.5, 3, 0]}>
                                        <boxGeometry args={[0.2, 6, 0.2]} />
                                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
                                    </mesh>
                                    <mesh position={[0, 6, 0]}>
                                        <boxGeometry args={[5.2, 0.2, 0.2]} />
                                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
                                    </mesh>

                                    {/* Antennas & Cameras */}
                                    {/* Left Corner: Tilted -45 towards center */}
                                    <group position={[-2.3, 6, 0]} rotation={[0, 0, Math.PI / 4]}>
                                        <mesh>
                                            <boxGeometry args={[0.6, 0.1, 0.4]} />
                                            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
                                        </mesh>
                                        <mesh position={[0, 0.15, 0]}>
                                            <boxGeometry args={[0.2, 0.2, 0.2]} />
                                            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
                                        </mesh>
                                    </group>

                                    {/* Right Corner: Tilted -45 towards center */}
                                    <group position={[2.3, 6, 0]} rotation={[0, 0, -Math.PI / 4]}>
                                        <mesh>
                                            <boxGeometry args={[0.6, 0.1, 0.4]} />
                                            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
                                        </mesh>
                                        <mesh position={[0, 0.15, 0]}>
                                            <boxGeometry args={[0.2, 0.2, 0.2]} />
                                            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
                                        </mesh>
                                    </group>

                                    {/* Center: Raised 1m */}
                                    <group position={[0, 7, 0]}>
                                        <mesh>
                                            <boxGeometry args={[0.6, 0.1, 0.4]} />
                                            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.5} />
                                        </mesh>
                                        <mesh position={[0, 0.15, 0]}>
                                            <boxGeometry args={[0.2, 0.2, 0.2]} />
                                            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
                                        </mesh>
                                        {/* Support for raised antenna */}
                                        <mesh position={[0, -0.5, 0]}>
                                            <cylinderGeometry args={[0.05, 0.05, 1]} />
                                            <meshStandardMaterial color="#ffffff" />
                                        </mesh>
                                    </group>

                                    {/* Computer & Decoder at side */}
                                    <group position={[3.5, 0.5, 0]}>
                                        {/* PC Case */}
                                        <mesh position={[0, 0.5, 0]}>
                                            <boxGeometry args={[0.8, 1, 0.6]} />
                                            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} />
                                        </mesh>
                                        {/* Decoder */}
                                        <mesh position={[0, 1.1, 0]}>
                                            <boxGeometry args={[0.6, 0.2, 0.4]} />
                                            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
                                        </mesh>
                                    </group>

                                    {/* Cabling (Simplified) */}
                                    <mesh position={[0, 3, 0]}>
                                        <planeGeometry args={[0.02, 10]} />
                                        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
                                    </mesh>
                                </group>

                                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                            </Canvas>
                            <div className="absolute top-4 left-6 pointer-events-none">
                                <h3 className="text-xl font-black text-white italic">ESQUEMA 3D DE COBERTURA</h3>
                                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-mono">Disposición Óptima de Sensores</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-6 flex-1 bg-gradient-to-t from-zinc-900 to-transparent">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {/* Antennas */}
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={`antenna-${i}`}
                                        whileHover={{ y: -3, borderColor: 'rgba(168, 85, 247, 0.4)' }}
                                        className="bg-zinc-800/50 border border-white/5 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                                            <Network className="text-purple-400 w-5 h-5" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white text-[10px] font-bold">Antena RFID #{i}</p>
                                            <p className="text-purple-400/60 text-[7px] font-mono">Cobertura Angular</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Decoder */}
                                <motion.div
                                    whileHover={{ y: -3, borderColor: 'rgba(59, 130, 246, 0.4)' }}
                                    className="bg-zinc-800/50 border border-white/5 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                                        <Cpu className="text-blue-400 w-5 h-5" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white text-[10px] font-bold">Lector R700</p>
                                        <p className="text-blue-400/60 text-[7px] font-mono">Hub de Datos</p>
                                    </div>
                                </motion.div>

                                {/* Thermal Cameras */}
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={`camera-${i}`}
                                        whileHover={{ y: -3, borderColor: 'rgba(239, 68, 68, 0.4)' }}
                                        className="bg-zinc-800/50 border border-white/5 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors"
                                    >
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                                                <Video className="text-red-400 w-5 h-5" />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-white text-[10px] font-bold">Cámara Térmica #{i}</p>
                                            <p className="text-red-400/60 text-[7px] font-mono">Evidencia Visual</p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Industrial PC */}
                                <motion.div
                                    whileHover={{ y: -3, borderColor: 'rgba(34, 197, 94, 0.4)' }}
                                    className="bg-zinc-800/50 border border-white/5 p-3 rounded-xl flex flex-col items-center gap-2 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20">
                                        <Terminal className="text-green-400 w-5 h-5" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-white text-[10px] font-bold">PC Industrial</p>
                                        <p className="text-green-400/60 text-[7px] font-mono">Procesamiento</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>


                        {/* Decoration Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
                    </div>

                </div>

                {/* Footer Action */}
                <div className="p-8 bg-black/40 border-t border-white/5 flex items-center justify-between">
                    <p className="text-gray-500 text-[10px] font-mono tracking-widest">
                        v2.4 // COMPONENT STATUS: OPTIMIZED
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-12 py-4 rounded-2xl font-black transition-all shadow-[0_10px_30px_rgba(8,145,178,0.3)] text-base hover:-translate-y-1 active:scale-95"
                    >
                        Cerrar Información
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
