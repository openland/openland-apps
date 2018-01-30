import * as React from 'react';
import { XLink } from './X/XLink';

export function Navigation() {
    return (
        <ul>
            <li className="x-header--item"><XLink path="/sf">Insights</XLink></li>
            <li className="x-header--item"><XLink path="/sf/projects">Construction projects</XLink></li>
            <li className="x-header--item"><XLink path="/sf/permits">Permits</XLink></li>
            <li className="x-header--item"><XLink path="/sf/zoning">Zoning</XLink></li>
            <li className="x-header--item"><XLink path="/sf/organizations">Organizations</XLink></li>
            <li className="x-header--item"><XLink path="/sf/stats" writeAccess={true}>Stats</XLink></li>
        </ul>
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