'use client'

import * as THREE from 'three'

export type PathNode = [number, number, number]
export type PathSegment = {
    points: PathNode[]
    phase: 'PHASE1' | 'PHASE2'
}

export const TRANSIT_DATA: PathSegment[] = [
    // PHASE 2
    {
        "points": [[-12.7, 0.1, -0.2], [-3.1, 0.1, -0.2]],
        "phase": "PHASE2"
    },
    {
        "points": [[8.7, 0.1, 0], [74.9, 0.1, 0.2]],
        "phase": "PHASE2"
    },
    {
        "points": [[56.5, 0.1, 0.1], [57, 0.1, -19.1]],
        "phase": "PHASE2"
    },
    {
        "points": [[71.3, 0.1, 0.2], [71.3, 0.1, 26.8]],
        "phase": "PHASE2"
    },
    {
        "points": [[64.6, 0.1, 26.5], [64.6, 0.1, 32.7], [74.9, 0.1, 32.6], [74.6, 0.1, 39], [80.9, 0.1, 38.8], [80.7, 0.1, 43.6]],
        "phase": "PHASE2"
    },
    // PHASE 1
    {
        "points": [[-13.9, 0.1, 0], [-6.6, 0.1, -0.1]],
        "phase": "PHASE1"
    },
    {
        "points": [[15.3, 0.1, 0], [70, 0.1, 0.2]],
        "phase": "PHASE1"
    }
]

export class TransitController {
    private segments: PathSegment[]
    private activeSegmentIdx: number = 0
    private currentNodeIdx: number = 0
    private progress: number = 0 // 0 to 1 between nodes

    constructor(phase: 'PHASE1' | 'PHASE2') {
        this.segments = TRANSIT_DATA.filter(s => s.phase === phase)
    }

    public update(speed: number, delta: number, currentPos: THREE.Vector3): { pos: THREE.Vector3, finished: boolean, jumped: boolean } {
        if (this.activeSegmentIdx >= this.segments.length) {
            return { pos: currentPos, finished: true, jumped: false }
        }

        const segment = this.segments[this.activeSegmentIdx]
        if (this.currentNodeIdx >= segment.points.length - 1) {
            // Segment finished. "Jump" to next segment if exists
            this.activeSegmentIdx++
            this.currentNodeIdx = 0
            this.progress = 0

            if (this.activeSegmentIdx < this.segments.length) {
                const startPoint = this.segments[this.activeSegmentIdx].points[0]
                return {
                    pos: new THREE.Vector3(...startPoint),
                    finished: false,
                    jumped: true
                }
            }
            return { pos: currentPos, finished: true, jumped: false }
        }

        const startNode = new THREE.Vector3(...segment.points[this.currentNodeIdx])
        const endNode = new THREE.Vector3(...segment.points[this.currentNodeIdx + 1])
        const distance = startNode.distanceTo(endNode)

        const moveStep = (speed * delta * 60) / distance
        this.progress += moveStep

        if (this.progress >= 1) {
            this.progress = 0
            this.currentNodeIdx++
            return { pos: endNode, finished: false, jumped: false }
        }

        const pos = new THREE.Vector3().lerpVectors(startNode, endNode, this.progress)
        return { pos, finished: false, jumped: false }
    }

    public getInitialPosition(): THREE.Vector3 {
        if (this.segments.length > 0 && this.segments[0].points.length > 0) {
            return new THREE.Vector3(...this.segments[0].points[0])
        }
        return new THREE.Vector3(0, 0, 0)
    }
}
