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

    constructor(value: string | number, meta: ZoneMetric) {
        this.value = value;
        this.meta = meta;
    }

    format() {
        if (typeof this.value === 'number') {
            let units: any = this.meta.units;
            if (units === 'sq ft') {
                units = <span>ft < sup > 2</sup ></span>;
            }
            return <span>{Math.round(this.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} {units}</span>;
        } else {
            return this.value;
        }
    }
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
            if (addGroup) {
                res.push(group);
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
                res.data.push(new ZoneMetricValue(zone[metricName], metric));
            }
        }
    }

    return res;
}

export function XZoningMetrics(props: { codes: string[] }) {
    let items = [...new Set(props.codes)].sort();
    let components: any[] = [];

    let zones = [];

    for (let itm of items) {
        let zone = zoneData(itm);
        if (zone) {
            zones.push(zone);
        }
    }

    let single = zones.length === 1;

    for (let zone of zones) {

        const zoneHeader = 'ZONE_HEADER';
        let toPick = [
            {
                title: zoneHeader,
                names: [
                    'Density Factor',
                    'Minimum Rear Yard',
                    'Minimum Setback',
                    'Maximum Units',
                    'Minimum Unit Size',
                    'Minimum Open Space']
            },
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
                    'Height: Perimiter Wall',
                    'Height: Building',
                    'Height: Base (min-max)']
            }
        ];

        if (zone) {
            let groupComponents = single ? components : [];
            for (let group of zone.pick(toPick, false)) {
                let metricsComponents = [];

                for (let v of group.metrics!!) {
                    metricsComponents.push(
                        <XCard.Property key={v.meta.name + v.meta.subtype + zone!!.name} title={v.meta.name + (v.meta.subtype ? ' (' + v.meta.subtype + ')' : '')}>{v.format()}</XCard.Property>);
                }
                groupComponents.push(<XCard.PropertyList width={300} key={zone.name} title={group.title === zoneHeader ? zone.name : group.title}>{metricsComponents}</XCard.PropertyList>);

            }
            if (!single) {
                components.push(<XCard.PropertyList>{groupComponents}</XCard.PropertyList>);
            }

        }
    }
    return <XCard.PropertyColumns wrap={true} grow={0}>{components}</XCard.PropertyColumns>;

}