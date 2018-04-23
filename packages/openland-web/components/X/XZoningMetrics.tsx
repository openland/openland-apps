import * as React from 'react';
import { XCard } from '../X/XCard';

import zoning from './zoning/zoning.json';
import metrics from './zoning/metrics.json';

export interface ZoneMetric {
    name: string;
    subtype: string | undefined;
    units: string | undefined;
}
class ZoneMetricValue {
    value: string | number;
    meta: ZoneMetric;
}

export class ZoneData {
    name: string;
    data: ZoneMetricValue[] = [];

    constructor(zone: string) {
        this.name = zone;
    }

    pick(metricsToPick: string[], showEmpty?: boolean): ZoneMetricValue[] {
        let res: ZoneMetricValue[] = [];

        for (let nameToPick of metricsToPick) {
            for (let metric of this.data) {
                if (metric.meta.name === nameToPick && (showEmpty === undefined || showEmpty || (metric.value != null && metric.value !== '-'))) {
                    res.push(metric);
                }
            }
        }
        return res;
    }
}

export function zoneData(zoneId: string): ZoneData | undefined {
    let res: ZoneData | undefined = undefined;

    let zone = zoning.zoning[zoneId];
    if (zone) {
        res = new ZoneData(zoneId);
        for (let metricName of Object.keys(zone)) {
            let metric = metrics.metrics[metricName];
            if (metric) {
                res.data.push({
                    meta: metric,
                    value: zone[metricName]
                });
            }
        }
    }

    return res;
}

export function XZoningMetrics(props: { codes: string[] }) {
    let items = [...new Set(props.codes)].sort();
    let components: any[] = [];

    for (let itm of items) {
        let zone = zoneData(itm);

        let toPick = ['Minimum Lot Width',
            'Minimum Lot Area',
            'Density Factor',
            'Side Yard: Combined',
            'Side Yard: Each',
            'Minimum Rear Yard',
            'Minimum Setback',
            'Maximum Units',
            'Minimum Unit Size',
            'Maximum FAR',
            'Maximum Lot Coverage',
            'Minimum Parking',
            'Height: Perimiter Wall',
            'Height: Building',
            'Height: Base (min-max)',
            'Minimum Open Space'];

        components.push(
            zone && (
                <XCard.PropertyList title={zone.name}>{
                    zone.pick(toPick, false).map((v, i) => (
                        <XCard.Property key={v.meta.name + v.meta.subtype + zone!!.name} title={v.meta.name + (v.meta.subtype ? ' (' + v.meta.subtype + ')' : '')}>{v.value + (v.meta.units && v.value !== '-' ? ' ' + v.meta.units : '')}</XCard.Property>))}
                </XCard.PropertyList>
            )
        );
    }
    return components.length === 1 ? components[0] : <React.Fragment>{components}</React.Fragment>;
}