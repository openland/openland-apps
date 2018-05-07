import * as React from 'react';
import { XCard } from './X/XCard';
import { zoneData } from './../utils/zoning/ZoningMatrix';
import { XCardProperty } from './X/XCardProperty';
import { XTitle } from 'openland-x/XTitle';

export function ZoningMetrics(props: { codes: string[] }) {
    let items = [...new Set(props.codes)].sort();
    let components: any[] = [];

    let zones = [];

    zones.push(...zoneData(items));

    for (let zone of zones) {

        let toPick = [
            {
                title: 'Maximum FAR',
                names: [
                    'Maximum FAR']
            },
            {
                title: 'Maximum Lot Coverage',
                names: [
                    'Maximum Lot Coverage']
            },
            {
                title: 'Minimum Parking',
                names: [
                    'Minimum Parking']
            },
            {
                title: 'Minimum Lot',
                names: [
                    'Minimum Lot Width',
                    'Minimum Lot Area']
            },
            {
                title: 'Side Yard',
                names: [
                    'Side Yard: Combined',
                    'Side Yard: Each']
            },

            {
                title: 'Height',
                names: [
                    'Perimiter Wall',
                    'Building',
                    'Base (min-max)']
            },
            {
                title: 'Other',
                names: [
                    'Density Factor',
                    'Minimum Rear Yard',
                    'Minimum Setback',
                    'Maximum Units',
                    'Minimum Unit Size',
                    'Minimum Open Space']
            },
        ];

        if (zone) {
            components.push(
                <XCardProperty divider={true} key={zone.name + '_title'}>
                    <XTitle>{zone.name}</XTitle>
                </XCardProperty>);

            let groupComponents = [];
            for (let group of zone.pick(toPick, false)) {
                let metricsComponents = [];

                for (let v of group.metrics!!) {
                    metricsComponents.push(
                        <XCard.Property width={240} key={zone.name + group.title + v.meta.name + v.meta.subtype + '_prop'} title={v.meta.name + (v.meta.subtype ? ' (' + v.meta.subtype + ')' : '')}>{v.format()}</XCard.Property>);
                }
                groupComponents.push(<XCard.PropertyList subtitle={true} width={380} key={zone.name + group.title + '_group'} title={group.title}>{metricsComponents}</XCard.PropertyList>);

            }
            components.push(<XCard.PropertyColumns wrap={true} grow={0} key={zone.name + '_zone_zontainer'}>{groupComponents}</XCard.PropertyColumns>);

        }
    }
    return <>{components}</>;

}