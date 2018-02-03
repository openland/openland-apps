import * as React from 'react';
import { XContainer } from '../X/XContainer';

export function TrendsChart(props: { children: any }) {
    return (
        <div className="col-xs-12 col-sm-8">
            <div className="x-trends--chart">
                {props.children}
            </div>
        </div>
    );
}

export function TrendsText(props: { title: string, children: any }) {
    return (
        <div className="col-xs-12 col-sm-4">
            <div className="x-trends--stitle">
                {props.title}
            </div>
            <div className="x-trends--text">
                {props.children}
            </div>
        </div>
    );
}

export function TrendsItem(props: {children: any }) {
    return (
        <div className="x-trends--item">
            <div className="row">
                {props.children}
            </div>
        </div>
    );
}

export function Trends(props: { id?: string, title: string, children: any }) {
    return (
        <div className="x-trends" id={props.id}>
            <XContainer wide={true}>
                <div className="x-trends--title">
                    {props.title}
                </div>

                {props.children}
            </XContainer>
        </div>
    );
}