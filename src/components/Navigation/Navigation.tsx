import * as React from 'react';
import { XLink } from '../X/XLink';

export function Navigation() {
    return (
        <>
        <div className="x-header-item"><XLink path="/sf">Insights</XLink></div>
        <div className="x-header-item"><XLink path="/sf/projects">Construction projects</XLink></div>
        <div className="x-header-item"><XLink path="/sf/permits">Permits</XLink></div>
        <div className="x-header-item"><XLink path="/sf/zoning">Zoning</XLink></div>
        <div className="x-header-item"><XLink path="/sf/organizations">Organizations</XLink></div>
        <div className="x-header-item"><XLink path="/sf/stats" writeAccess={true}>Stats</XLink></div>
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