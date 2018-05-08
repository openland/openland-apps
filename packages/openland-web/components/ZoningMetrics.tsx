import * as React from 'react';
import { zoneData } from './../utils/zoning/ZoningMatrix';
import { XTitle } from 'openland-x/XTitle';
import { XProperty, XPropertyList, XPropertyColumns } from 'openland-x/XProperty';

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
                <XProperty divider={true} key={zone.name + '_title'}>
                    <XTitle>{zone.name}</XTitle>
                </XProperty>);

            let groupComponents = [];
            for (let group of zone.pick(toPick, false)) {
                let metricsComponents = [];

                for (let v of group.metrics!!) {
                    metricsComponents.push(
                        <XProperty width={240} key={zone.name + group.title + v.meta.name + v.meta.subtype + '_prop'} title={v.meta.name + (v.meta.subtype ? ' (' + v.meta.subtype + ')' : '')}>{v.format()}</XProperty>);
                }
                groupComponents.push(<XPropertyList subtitle={true} width={380} key={zone.name + group.title + '_group'} title={group.title}>{metricsComponents}</XPropertyList>);

            }
            components.push(<XPropertyColumns wrap={true} grow={0} key={zone.name + '_zone_zontainer'}>{groupComponents}</XPropertyColumns>);

        }
    }
    return <>{components}</>;

}