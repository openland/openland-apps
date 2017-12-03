import * as React from 'react';

export function InsightItem(props: { title: string, text: string }) {
    return (
        <div className="x-insights--item">
            <div className="x-insights--label">{props.title}</div>
            <div className="x-insights--text">{props.text}</div>
        </div>
    );
}

export function Insights(props: { title: string, dark?: boolean, children: any }) {
    return (
        <div className={'x-insights' + (props.dark === true ? ' with-bg' : '')}>
            <div className="x-container">
                <div className="row">
                    <div className="col-xs-12 col-lg-3">
                        <div className="x-insights--title">{props.title}</div>
                    </div>
                    <div className="col-xs-12 col-lg-9">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}