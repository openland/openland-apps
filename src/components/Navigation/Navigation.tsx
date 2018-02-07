import * as React from 'react';
import { XLink } from '../X/XLink';

export function Navigation() {
    return (
        <>
        <XLink path="/sf" className="item">Insights</XLink>
        <XLink path="/sf/projects" className="item" >Construction projects</XLink>
        <XLink path="/sf/permits" className="item" >Permits</XLink>
        <XLink path="/sf/zoning" className="item">Zoning</XLink>
        <XLink path="/sf/organizations" className="item">Organizations</XLink>
        <XLink path="/sf/stats" writeAccess={true} className="item">Stats</XLink>
        </>
    );
}

export function NavigationFooter() {
    return (
        <div className="x-footer--nav">
            <ul className="x-footer--list">
                <li><a href="/sf/">Insights</a></li>
                <li><XLink path="/sf/projects">Construction Projects</XLink></li>
            </ul>

            <ul className="x-footer--list">
                <li><XLink path="/sf/permits">Permits</XLink></li>
                <li><XLink path="/sf/organizations">Organizations</XLink></li>
            </ul>
        </div>
    );
}