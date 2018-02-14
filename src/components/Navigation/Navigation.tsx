import * as React from 'react';
import { XLink } from '../X/XLink';
import XStyled from '../X/XStyled';

const NavigationLink = XStyled(XLink)({
    display: 'flex',
    color: '#babec6',
    fontSize: '14px',
    fontWeight: 500,
    opacity: 0.72,
    marginLeft: 12,
    marginRight: 12,
    alignItems: 'center',
    '&:hover': {
        color: '#fff',
        opacity: 1.0
    },
    '&.is-active': {
        color: '#fff',
        opacity: 1.0
    }
})

export function Navigation() {
    return (
        <>
        <NavigationLink path="/sf" className="item">Insights</NavigationLink>
        <NavigationLink path="/sf/projects" className="item" activateForSubpaths={true}>Construction projects</NavigationLink>
        <NavigationLink path="/sf/permits" className="item" activateForSubpaths={true}>Permits</NavigationLink>
        <NavigationLink path="/sf/zoning" className="item" activateForSubpaths={true}>Zoning</NavigationLink>
        <NavigationLink path="/sf/organizations" className="item" activateForSubpaths={true}>Organizations</NavigationLink>
        <NavigationLink path="/sf/stats" writeAccess={true} className="item" activateForSubpaths={true}>Stats</NavigationLink>
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