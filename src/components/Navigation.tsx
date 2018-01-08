import * as React from 'react';
import { XLink } from './X/XLink';

export function Navigation() {
    return (
        <>
            <XLink className="x-top--tab" path="/">Home</XLink>
            <XLink className="x-top--tab" path="/projects">Projects</XLink>
            <XLink className="x-top--tab" path="/organizations" writeAccess={true}>Organizations</XLink>
            <XLink className="x-top--tab" path="/permits" writeAccess={true}>Permits</XLink>
            <XLink className="x-top--tab" path="/stats" writeAccess={true}>Stats</XLink>
        </>
    );
}