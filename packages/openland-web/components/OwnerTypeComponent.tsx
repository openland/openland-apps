import * as React from 'react';
import * as Types from '../api/Types';

export function OwnerTypeComponent(props: { type: Types.OwnerType }) {
    return (
        <>
            {props.type === 'PRIVATE' && 'Private Owner'}
            {props.type === 'CITY' && 'City'}
            {props.type === 'MIXED' && 'Mixed City and Private ownership'}
            {props.type === 'OTHER' && 'Public Authority, State of Federal ownership'}
            {props.type === 'EXCLUDED' && 'Mixed ownership (Tax exempt)'}
        </>
    );
}