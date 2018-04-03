import * as React from 'react';

export function PermitType(props: { type: string }) {
    let typestr = props.type;
    switch (props.type) {
        case 'NEW_CONSTRUCTION':
            typestr = 'New construction';
            break;
        case 'ADDITIONS_ALTERATIONS_REPARE':
            typestr = 'Additions, Alteration or Repair';
            break;
        case 'OTC_ADDITIONS':
            typestr = 'Additions';
            break;
        case 'DEMOLITIONS':
            typestr = 'Demolitions';
            break;
        case 'WALL_OR_PAINTED_SIGN':
            typestr = 'Wall Or Painted Sign';
            break;
        case 'SIGN_ERRECT':
            typestr = 'Sign';
            break;
        case 'GRADE_QUARRY_FILL_EXCAVATE':
            typestr = 'Grade, Quarry, Fill or Excavate';
            break;
        default:
            typestr = props.type;
            break;
    }
    return <>{typestr}</>;
}