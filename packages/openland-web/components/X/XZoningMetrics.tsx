import * as React from 'react';
import { XCard } from '../X/XCard';

import zoning from './zoning/zoning.json';
import metrics from './zoning/metrics.json';
import { XTitle } from './XTitle';
import { XCardProperty } from '../X/XCardProperty';

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

export function zoneData(query: string): ZoneData[] {
    let res: ZoneData[]  = [];

    for (let zoneName of Object.keys(zoning.zoning)) {
        if (zoneName.startsWith(query)) {
            let zone = zoning.zoning[zoneName];
            let zd = new ZoneData(zoneName);
            res.push(zd);
            for (let metricName of Object.keys(zone)) {
                let metric = metrics.metrics[metricName];
                if (metric) {
                    zd.data.push(new ZoneMetricValue(zone[metricName], metric));
                }
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
        zones.push( ...zoneData(itm));
    }

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
                    <XTitle >{zone.name}</XTitle>
                </XCardProperty>);

            let groupComponents = [];
            for (let group of zone.pick(toPick, false)) {
                let metricsComponents = [];

                for (let v of group.metrics!!) {
                    metricsComponents.push(
                        <XCard.Property width={240} key={zone.name  + group.title + v.meta.name + v.meta.subtype + '_prop'} title={v.meta.name + (v.meta.subtype ? ' (' + v.meta.subtype + ')' : '')}>{v.format()}</XCard.Property>);
                }
                groupComponents.push(<XCard.PropertyList subtitle={true} width={380} key={zone.name +  group.title + '_group'} title={group.title}>{metricsComponents}</XCard.PropertyList>);

            }
            components.push(<XCard.PropertyColumns wrap={true} grow={0} key={zone.name + '_zone_zontainer'}>{groupComponents}</XCard.PropertyColumns>);

        }
    }
    return <>{components}</>;

}