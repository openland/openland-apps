import * as React from 'react';
import Glamorous from 'glamorous';

let Separator = Glamorous.span({
    opacity: 0.4
});

export function ParcelNumber(props: {
    id: {
        borough: string | null,
        boroughId: string | null,
        block: string | null,
        blockPadded: string | null,
        lot: string | null,
        lotPadded: string | null,
        title: string,
    },
    compact?: boolean,
    city?: string
}) {
    if (props.id.borough && props.id.block && props.id.lot) {
        if (props.compact) {
            return (<>{props.city ? `${props.city} ` : ''}{props.id.boroughId}-{props.id.blockPadded || props.id.block}-{props.id.lotPadded || props.id.lot}</>);
        } else {
            return (<>{props.city ? [`${props.city} `, <Separator key="s">|</Separator>, ' '] : ''}{props.id.borough}{props.id.boroughId && ` (Borough ${props.id.boroughId})`} <Separator>|</Separator> Block {props.id.block} <Separator>|</Separator> Lot {props.id.lot}</>);
        }
    } else if (props.id.block && props.id.lot) {
        if (props.compact) {
            return <>{props.city ? `${props.city} | ` : ''}{props.id.blockPadded || props.id.block}-{props.id.lotPadded || props.id.lot}</>;
        } else {
            return <>{props.city ? [`${props.city} `, <Separator key="s">|</Separator>, ' '] : ''}{props.id.blockPadded || props.id.block}-{props.id.lotPadded || props.id.lot}</>;
        }
    } else {
        if (props.compact) {
            return <>{props.city ? `${props.city} | ` : ''}{props.id.title}</>;
        } else {
            return <>{props.city ? [`${props.city} `, <Separator key="s">|</Separator>, ' '] : ''}{props.id.title}</>;
        }
    }
}    