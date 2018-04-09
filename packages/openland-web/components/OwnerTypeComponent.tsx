import * as React from 'react';
import Types from 'openland-api';

export function OwnerTypeComponent(props: { type: Types.OwnerType }) {
    return (
        <>
            {props.type === 'PRIVATE' && 'Private'}
            {props.type === 'CITY' && 'City'}
            {props.type === 'MIXED' && 'Mixed City and Private ownership'}
            {props.type === 'OTHER' && 'Public Authority, State of Federal ownership'}
            {props.type === 'EXCLUDED' && 'Mixed ownership (Tax exempt)'}
        </>
    );
}