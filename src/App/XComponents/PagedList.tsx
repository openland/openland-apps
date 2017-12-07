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

export function PagedListItems(props: { title: string, newUnits: number, newUnitsVerified: number, children?: any }) {
    return (
        <div className="col-xs-12 col-md-9">
            {(props.newUnits !== 0) && (props.newUnitsVerified === 0) && <div className="x-in--title hidden-xs">{props.newUnits}<span>Net new units</span></div>}
            {(props.newUnits !== 0) && (props.newUnitsVerified !== 0) && <div className="x-in--title hidden-xs">{props.newUnits}<span>Net new units</span><span className="is-verified">Verified</span>{props.newUnitsVerified}<span>Net new units</span></div>}
            {(props.newUnits === 0) && <div className="x-in--title hidden-xs">{props.title}</div>}
    
            {props.children}
        </div>
    );
}