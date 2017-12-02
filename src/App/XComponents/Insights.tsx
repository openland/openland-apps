import * as React from 'react';

export function InsightItem(props: { title: string, text: string }) {
    return (
        <div className="sf-insights--item">
            <div className="sf-insights--label">{props.title}</div>
            <div className="sf-insights--text">{props.text}</div>
        </div>
    );
}

export function Insights(props: { title: string, dark?: boolean, children: any }) {
    return (
        <div className={'sf-insights' + (props.dark === true ? ' with-bg' : '')}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="sf-insights--title">{props.title}</div>
                    </div>
                    <div className="col-lg-9">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
}