import * as React from 'react';

export function CounterItem(props: { counter: number, name: string, verified?: number, label?: string }) {
    return (
        <div className="col-xs-12 col-lg-3">
            <div className="x-counter">
                <div className="x-counter--in">
                    <div className="x-counter--count">{props.counter}</div>
                    <div className="x-counter--name">{props.name}</div>
                </div>
                {props.verified && <div className="x-counter--label">{props.verified} verified</div>}
                {!props.verified && <div className="x-counter--label">{props.label}</div>}
            </div>
        </div>
    );
}

export function Counters(props: { children: any }) {
    return (
        <div className="x-counters">
            <div className="x-container">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
}