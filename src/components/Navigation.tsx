import * as React from 'react';
import { XLink } from './X/XLink';

export function Navigation() {
    return (
        <ul>
            <li className="x-header--item"><XLink path="/">Insights</XLink></li>
            <li className="x-header--item"><XLink path="/projects">Construction projects</XLink></li>
            <li className="x-header--item"><XLink path="/permits">Permits</XLink></li>
            <li className="x-header--item"><XLink path="/organizations">Organizations</XLink></li>
            <li className="x-header--item"><XLink path="/parcels" writeAccess={true}>Parcels</XLink></li>
            <li className="x-header--item"><XLink path="/stats" writeAccess={true}>Stats</XLink></li>
        </ul>
    );
}

export function NavigationFooter() {
    return (
        <div className="x-footer--nav">
            <ul className="x-footer--list">
                <li><a href="/">Insights</a></li>
                <li><XLink path="/projects">Construction Projects</XLink></li>
            </ul>

            <ul className="x-footer--list">
                <li><XLink path="/permits">Permits</XLink></li>
                <li><XLink path="/organizations">Organizations</XLink></li>
            </ul>
        </div>
    );
}