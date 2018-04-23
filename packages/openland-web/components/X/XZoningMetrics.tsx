import * as React from 'react';
import { XCard } from '../X/XCard';

var zoning = require('./../../static/data/zoning/zoning.json');
var zoningMetrics = require('./../../static/data/zoning/metrics.json');

export class ZoneMetric {
    id: string;
    metric: string;
    subtype: string;
    units: string;
}

export class ZoneData {
    name: string;
    data: {
        value: string | number;
        metric: ZoneMetric;
    }[] = [];

    constructor(zone: string) {
        this.name = zone;
    }
}

export function zoneData(zoneId: string): ZoneData | undefined {
    let res: ZoneData | undefined = undefined;

    let zoneFields = extractObjectFields(zoning.zoning, "zone", zoneId);

    if (zoneFields) {
        res = new ZoneData(zoneId)
        for (let zoneField of zoneFields) {

            let metricFields = extractObjectFields(zoningMetrics.metrics, "id", zoneField.key);

            if (metricFields) {
                let metric = new ZoneMetric();
                for (let metricField of metricFields) {
                    metric[metricField.key] = metricField.value
                }
                res.data.push({
                    value: zoneField.value,
                    metric: metric,
                })
            }
        }
    }


    return res
}

function extractObjectFields(from: any, keyField: string, key: string): { key: string; value: string }[] | undefined {
    let res: { key: string; value: string }[] | undefined = undefined
    for (let entry of from) {
        let match = false;
        for (let k of Object.keys(entry)) {

            if (!match && k === keyField && entry[k] === key) {

                match = true;
                res = [];
            }

            if (match && res) {
                res.push(
                    {
                        key: k as string,
                        value: entry[k] as string,
                    }
                )
            }

        }

        if (match) {
            break;
        }
    }

    return res
}

export function XZoningMetrics(props: { codes: string[] }) {
    let items = [...new Set(props.codes)].sort();
    let components: any[] = [];

    for (let itm of items) {
        let zone = zoneData(itm);

        components.push(
            zone && (
                <XCard.PropertyList title={zone.name}>
                    {
                        zone.data.map((v, i) => (
                            <XCard.Property title={v.metric.metric + (v.metric.subtype ? " (" + v.metric.subtype + ")" : "") + (v.metric.units ? ", " + v.metric.units : "")}>{v.value}</XCard.Property>
                        ))
                    }
                </XCard.PropertyList>
            )
        );
    }
    return <div>{components}</div>;
}