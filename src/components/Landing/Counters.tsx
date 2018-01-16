import * as React from 'react';
import { XLink } from '../X/XLink';
import { XContainer } from '../X/XContainer';
import { XRow } from '../X/XRow';

export function CountersItem(props: {
    counter: number | string,
    label?: string,
    name: string,
    photo?: { url: string, retina: string },
    address?: string,
    path?: string,
    href?: string,
    caption?: string
}) {
    return (
        <div className="col-xs-12 col-sm-4">
            <XLink path={props.path} href={props.href} className="x-counter">
                {props.photo !== undefined &&
                    <div className="x-counter--photo">
                        {props.address !== undefined && <div className="x-counter--address">{props.address}</div>}

                        <img src={props.photo.url} srcSet={props.photo.retina}/>
                    </div>}

                <div className="x-counter--count">
                    {props.counter}
                    {props.label !== undefined && (<span>{props.label}</span>)}
                </div>

                <div className="x-counter--name">
                    {props.name}
                </div>

                <div className="x-counter--link">
                    {props.caption}
                </div>
            </XLink>
        </div>
    );
}

export function CountersList(props: { children: any }) {
    return (
        <div className="x-counters--in">
            <div className="row sm-gutter-16">
                {props.children}
            </div>
        </div>
    );
}

export function CountersCols(props: { children: any }) {
    return (
        <div className="x-counters--cols">
            <XRow>
                {props.children}
            </XRow>
        </div>
    );
}

export function CountersText(props: {title?: string, text?: string }) {
    return (
        <div className="col-xs-12 col-sm-6 col-xlg-5">
            <div className="x-counters--stitle">
                {props.title}
            </div>
            <div className="x-counters--text">
                {props.text}
            </div>
        </div>
    );
}

export function Counters(props: {title?: string, children: any }) {
    return (
        <div className="x-counters">
            <XContainer wide={true}>
                <div className="x-counters--title">
                    {props.title}
                </div>

                {props.children}
            </XContainer>
        </div>
    );
}