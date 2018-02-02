import * as React from 'react';
import { XInfiniteListItem } from './withInfiniteList';
import { XLink } from './X/XLink';
import * as classnames from 'classnames';

export function ListCardContainer(props: { children: any; withImage?: boolean; className?: string }) {
    return (
        <XInfiniteListItem>
            <div className={classnames('x-card-test', props.withImage ? 'with-image' : '', props.className)}>
                {props.children}
            </div>
        </XInfiniteListItem>
    );
}

export function ListCardImageBox(props: { children?: any; path?: string; noPhoto?: boolean; wideImage?: boolean }) {
    return (
        <div className={classnames('x-card-photo', props.wideImage ? 'wide-image' : '')}>
            <XLink path={props.path} className={classnames(props.noPhoto ? 'no-photo' : '')}>
                {props.children}
            </XLink>
        </div>
    );
}

export function ListCardBox(props: {children: any}) {
    return (
        <div className="x-card-box">
            {props.children}
        </div>
    )
}

export function ListCardRow(props: { children?: any; className?: string }) {
    return (
        <div className={classnames('x-card-row', props.className)}>
            {props.children}
        </div>
    );
}

export function ListCardMainTitle(props: {
    larger?: boolean;
    titleAdditionallyClass?: string;
    link?: string;
    title: string;
    subtitle?: string | null;
}) {
    return (
        <div className={classnames('x-card-title', props.larger ? 'larger' : '')}>
            {props.larger ? (
                <div className={classnames('title', props.titleAdditionallyClass)}>
                    <XLink path={props.link}>
                        <span>{props.title}</span>
                        <span className="text">{props.subtitle}</span>
                    </XLink>
                </div>
            ) : (
                <div className={classnames('title', props.titleAdditionallyClass)}>
                    <XLink path={props.link}>
                        <span>{props.title}</span>
                    </XLink>
                    {props.subtitle && (
                        <div className="text">{props.subtitle}</div>
                    )}
                </div>
            )}
        </div>
    );
}

export function ListCardMainLink(props: { link?: string }) {
    return (
        <div className="x-card-link">
            <a className="x-card-btn" href={props.link} target="_blank">
                <i className="icon-share"/>
            </a>
        </div>
    );
}

export function ListCardCount(props: {
    children?: any;
    title?: string | number;
    subtitle: string | number;
    className?: string
}) {
    return (
        <div className={classnames('x-card-count', props.className)}>
            {props.children ? (
                <div className="title">{props.children}</div>
            ) : (
                <div className="title">{props.title}</div>
            )}
            <div className="text">{props.subtitle}</div>
        </div>
    );
}

export function ListCardDetails(props: {path: string; title: string}) {
    return (
        <XLink className="x-card-details" path={props.path}>
            <span>{props.title}</span>
        </XLink>
    )
}