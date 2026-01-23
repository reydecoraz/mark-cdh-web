import { Scenario } from '@/lib/store'
import { Factory } from './Factory'
import { Zones } from './Zones'
import { WarehouseStructure } from './WarehouseStructure'

import { StaticPathRenderer } from './StaticPathRenderer'

interface WarehouseEnvironmentProps {
    scenario: Scenario
}

export function WarehouseEnvironment({ scenario }: WarehouseEnvironmentProps) {
    return (
        <>
            <WarehouseStructure />
            <Factory />
            <Zones scenario={scenario} />
            <StaticPathRenderer scenario={scenario} />
        </>
    )
}
