import * as React from 'react';
import { XLink } from './X/XLink';

export function Navigation() {
    return (
        <React.Fragment>
            <XLink className="x-top--tab" path="/">Home</XLink>
            <XLink className="x-top--tab" path="/pipeline">Pipeline Explorer</XLink>
            <XLink className="x-top--tab" path="/developers" writeAccess={true}>Developers</XLink>
            <XLink className="x-top--tab" path="/db/permits/" writeAccess={true}>Permits</XLink>
        </React.Fragment>
    );
}