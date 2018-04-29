import zoning from './zoning.json';
import metrics from './metrics.json';
import * as React from 'react';

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
    maximumFARNarrow?: number;
    densityFactor?: number;

    constructor(zoneName: string) {
        this.name = zoneName;

        let zone = zoning.zoning[zoneName];
        if (zone) {
            for (let metricName of Object.keys(zone)) {
                let metric = metrics.metrics[metricName];
                if (metric) {
                    this.addValue(new ZoneMetricValue(zone[metricName], metric));
                }
            }
        }

    }

    addValue(value: ZoneMetricValue) {
        this.data.push(value);

        if (value.meta.name === 'Maximum FAR' && value.meta.subtype === 'Narrow Street' && typeof value.value === 'number') {
            this.maximumFARNarrow = value.value;
        }

        if (value.meta.name === 'Density Factor' && typeof value.value === 'number') {
            this.densityFactor = value.value;
        }
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

    unitCapacity(parcelArea: number): { unitCapacity: number, parcelArea: number , maximumFARNarrow: number, densityFactor: number} | undefined {

        if (this.maximumFARNarrow === undefined || this.densityFactor === undefined) {
            return undefined;
        }

        parcelArea = parcelArea * 10.7639;

        let res = parcelArea * this.maximumFARNarrow / this.densityFactor;

        // Round down for .74
        // Round up for .75+
        res = res % 1 >= 0.75 ? Math.ceil(res) : Math.floor(res);

        // Additional rule: If area < 1700 sf > max units <= 2    
        res = parcelArea < 1700 ? Math.min(2, res) : res;

        return { unitCapacity: res, maximumFARNarrow: this.maximumFARNarrow, densityFactor: this.densityFactor, parcelArea: parcelArea };
    }

}

export function unitCapacity(zones: string[], parcelArea: number): { unitCapacity: number, parcelArea: number, maximumFARNarrow: number, densityFactor: number } | undefined {
    let res: { unitCapacity: number, parcelArea: number, maximumFARNarrow: number, densityFactor: number } | undefined = undefined;
    for (let z of exectZoneData(zones)) {

        let uc = z.unitCapacity(parcelArea);

        if (res === undefined || (uc !== undefined && uc.unitCapacity > res.unitCapacity)) {
            res = uc;
        }
    }

    return res;
}

export function zoneData(zones: string[]): ZoneData[] {
    let res: ZoneData[] = [];
    let zonesNorm = normilizeZones(zones);

    for (let query of zonesNorm) {
        for (let zoneName of Object.keys(zoning.zoning)) {
            if (zoneName.startsWith(query)) {
                let zd = new ZoneData(zoneName);
                res.push(zd);
            }
        }
    }

    return res;
}

export function exectZoneData(zones: string[]): ZoneData[] {
    let res = [];
    let zonesNorm = normilizeZones(zones);

    for (let z of zonesNorm) {
        let zone = zoning.zoning[z];
        if (zone) {
            res.push(new ZoneData(z));
        }
    }

    return res;
}

function normilizeZones(zones: string[]) {
    let zonesNorm = [];
    for (let zonesRaw of zones) {
        zonesNorm.push(...zonesRaw.split('/').map(zoneNamingHacks));
    }
    return zonesNorm;
}

function zoneNamingHacks(z: string) {
    z = zoning.map[z] ? zoning.map[z].equivalent : z;
    z = z === 'R1' ? 'R1-1' : z;
    z = z === 'R6' ? 'R6QH' : z;

    return z;
}