import * as React from 'react';
import { XLink } from './X/XLink';

export function Navigation() {
    return (
        <ul>
            <li className="x-header--item"><XLink path="/">Overview</XLink></li>
            <li className="x-header--item"><XLink path="/projects">Construction projects</XLink></li>
            <li className="x-header--item"><XLink path="/organizations">Organizations</XLink></li>
            <li className="x-header--item"><XLink path="/permits">Permits</XLink></li>
            <li className="x-header--item"><XLink path="/stats" writeAccess={true}>Stats</XLink></li>
        </ul>
    );
}

export function NavigationHome() {
    return (
        <ul>
            <li className="x-header--item"><XLink path="/">Overview</XLink></li>
            <li className="x-header--item"><XLink path="/projects">Construction projects</XLink></li>
            <li className="x-header--item"><XLink path="/organizations">Organizations</XLink></li>
            <li className="x-header--item"><XLink path="/permits">Permits</XLink></li>
            <li className="x-header--item"><a href="#">About</a></li>
        </ul>
    );
}

export function NavigationFooter() {
    return (
        <div className="x-footer--nav">
            <ul className="x-footer--list">
                <li><a href="#">Housing Overview</a></li>
                <li><XLink path="/projects">Construction Projects</XLink></li>
            </ul>

            <ul className="x-footer--list">
                <li><XLink path="/organizations">Developers</XLink></li>
                <li><XLink path="/organizations">Contactors</XLink></li>
            </ul>

            <ul className="x-footer--list">
                <li><XLink path="/permits">Permits</XLink></li>
            </ul>
        </div>
    );
}