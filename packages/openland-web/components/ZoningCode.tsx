import * as React from 'react';
import Glamorous from 'glamorous';
import { XLinkExternal } from 'openland-x/XLinkExternal';
const Links = {
    'RH-1': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.1',
    'RH-3': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.1',
    'RH-2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.1',
    'RH-1(D)': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.1',
    'RH-1(S)': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.1',
    'RM-1': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.2',
    'RM-2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.2',
    'RM-3': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.2',
    'RM-4': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.2',
    'RC-3': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.3',
    'RC-4': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.3',
    'RTO': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.4',
    'RTO-M': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_209.4',
    'P': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_211',
    'C-3-O': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.2',
    'C-3-G': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.2',
    'C-3-S': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.2',
    'C-3-O(SD)': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.2',
    'C-3-R': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.2',
    'PDR-1-D': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.3',
    'PDR-1-G': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.3',
    'PDR-1-B': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.3',
    'PDR-2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.3',
    'M-1': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.4',
    'M-2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.4',
    'C-2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_210.1',
    'NC-1': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_710.1',
    'NCT-1': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_750',
    'NC-S': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_713.1',
    'NC-2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_711.1',
    'NC-3': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_712.1',
    'PM-CF': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_249.64',
    'PM-MU1': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_249.64',
    'PM-MU2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_249.64',
    'PM-OS': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_249.64',
    'PM-R': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_249.64',
    'PM-S': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article2usedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_249.64',
    'WMUG': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_844',
    'RCD': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_744.1',
    'NCT': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?#JD_760',
    'NCD': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts#JD_732',
    'MUG': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_840',
    'MUR': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_841',
    'NCT-2': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?#JD_751',
    'MUO': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_842',
    'WMUO': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_845',
    'SALI': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_846',
    'CCB': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_810.1',
    'CVR': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_811.1',
    'CRNC': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_812.1',
    'UMU': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_843',
    'RED-MX': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_847',
    'RED': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_813',
    'MB-O': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article9missionbaydistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_912',
    'MB-OS': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article9missionbaydistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_916',
    'SPD': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_814',
    'SLI': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_817',
    'SSO': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_818',
    'RH DTR': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?#JD_827',
    'TB DTR': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_828',
    'SB-DTR': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article8mixedusedistricts?f=templates$fn=default.htm$3.0$vid=amlegal:sanfrancisco_ca$anc=JD_829',
    'NCT-3': 'http://library.amlegal.com/nxt/gateway.dll/California/planning/article7neighborhoodcommercialdistricts?#JD_752',
    'HP-RA': 'http://www.sfocii.org/index.aspx?page=57',
    'MB-RA': 'http://www.sfocii.org/index.aspx?page=61',
};

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'row'
});

export function ZoningCode(props: { codes: string[] }) {
    let items = [...new Set(props.codes)].sort();
    let components: any[] = [];
    let isFirst = true;
    for (let itm of items) {
        if (isFirst) {
            isFirst = false;
        } else {
            components.push(',\u00A0');
        }
        if (Links[itm]) {
            components.push(<XLinkExternal key={'zoning_' + itm} href={Links[itm]} content={itm} />);
        } else {
            components.push(itm);
        }
    }
    return <Container>{components}</Container>;
}