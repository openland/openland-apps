import * as React from 'react';
import { XCard } from '../X/XCard';

import zoning from './zoning/zoning.json';
import metrics from './zoning/metrics.json';

export interface ZoneMetric {
    name: string;
    subtype: string | undefined;
    units: string | undefined;
}

class ZoneMetricValueGroup {
    title: string;
    names: string[];
    metrics?: ZoneMetricValue[];
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

    pick(metricsToPick: ZoneMetricValueGroup[], showEmpty?: boolean): ZoneMetricValueGroup[] {
        let res: ZoneMetricValueGroup[] = [];

        for (let group of metricsToPick) {
            let addGroup = false;
            for (let nameToPick of group.names) {
                for (let metric of this.data) {
                    if (metric.meta.name === nameToPick && (showEmpty === undefined || showEmpty || (metric.value != null && metric.value !== '-'))) {
                        if (addGroup === false) {
                            addGroup = true;
                            group.metrics = [];
                        }
                        group.metrics!!.push(metric);
                    }
                }
            }
            res.push(group);
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

        let toPick = [{
            title: '', names: ['Minimum Lot Width',
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
                'Minimum Open Space']
        },
        {
            title: 'Height',
            names: [
                'Height: Perimiter Wall',
                'Height: Building',
                'Height: Base (min-max)']
        }
        ];

        if (zone) {
            let metricsComponents = [];

            for (let group of zone.pick(toPick, false)) {
                if (group.title && group.metrics!!.length > 1) {
                    metricsComponents.push(
                        <XCard.Property key={group.title} title={group.title}>{''}</XCard.Property>);
                }
                for (let v of group.metrics!!) {
                    metricsComponents.push(
                        <XCard.Property key={v.meta.name + v.meta.subtype + zone!!.name} title={v.meta.name + (v.meta.subtype ? ' (' + v.meta.subtype + ')' : '')}>{v.value + (v.meta.units && v.value !== '-' ? ' ' + v.meta.units : '')}</XCard.Property>);
                }
            }
            components.push(<XCard.PropertyList key={zone.name} title={'Zoning: ' + zone.name}>{metricsComponents}</XCard.PropertyList>);

        }
        return components.length === 1 ? components[0] : <React.Fragment>{components}</React.Fragment>;
    }
}