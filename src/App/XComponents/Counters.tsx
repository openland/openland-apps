import * as React from 'react';

export function CounterItem(props: { counter: number, name: string, verified?: number, label?: string }) {
    return (
        <div className="col-lg-3">
            <div className="sf-counter">
                <div className="sf-counter--in">
                    <div className="sf-counter--count">{props.counter}</div>
                    <div className="sf-counter--name">{props.name}</div>
                </div>
                {props.verified && <div className="sf-counter--label">{props.verified} verified</div>}
                {!props.verified && <div className="sf-counter--label">{props.label}</div>}
            </div>
        </div>
    );
}

export function Counters(props: { children: any }) {
    return (
        <div className="sf-counters">
            <div className="container">
                <div className="row">
                    {props.children}
                </div>
            </div>
        </div>
    );
}