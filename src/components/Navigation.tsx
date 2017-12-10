import * as React from 'react';
import { Link } from './Link';

export function Navigation() {
    return (
        <React.Fragment>
            <Link className="x-top--tab" path="/">Home</Link>
            <Link className="x-top--tab" path="/pipeline">Pipeline Explorer</Link>
            <Link className="x-top--tab" path="/db/permits/" writeAccess={true}>Permits</Link>
        </React.Fragment>
    );
}