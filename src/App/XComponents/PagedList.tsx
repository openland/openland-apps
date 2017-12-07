import * as React from 'react';

export function PagedList(props: { children?: any }) {
    return (
        <div className="x-in">
            <div className="x-container is-wide">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export function PagedListItems(props: { title: string, totalProjects: number, totalProjectsVerified: number, newUnits: number, newUnitsVerified: number, children?: any }) {
    return (
        <div className="col-xs-12 col-md-9">
            <div className="x-in--title hidden-xs">
                {(props.totalProjects !== 0) && <div>{props.totalProjects}<span>Buildings</span></div>}
                {(props.newUnits !== 0) && <div>{props.newUnits}<span>Net new units</span></div>}
                {((props.totalProjectsVerified !== 0) || (props.newUnitsVerified !== 0)) && <span className="is-verified">Verified</span>}
                {(props.totalProjectsVerified !== 0) && <div>{props.totalProjectsVerified}<span>Buildings</span></div>}
                {(props.newUnitsVerified !== 0) && <div>{props.newUnitsVerified}<span>Net new units</span></div>}
            </div>
            {props.children}
        </div>
    );
}