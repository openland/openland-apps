import * as React from 'react';
import { hasChildren, filterChildren } from './utils';
import * as classnames from 'classnames';
import { XLink } from './XLink';
import { XCloudImage } from './XCloudImage';
import Glamorous from 'glamorous';
import { XRow, XColumn } from './XGrid';

export const XCardRow = Glamorous(XRow)({
    height: 82,
    borderBottom: '1px solid rgba(38,38,38,0.08)',
    '&:last-child': {
        borderBottom: 0
    }
});

export class XCardPhoto extends React.Component<{ path?: string, src?: string | null }> {
    static defaultProps = {
        _xCardPhoto: true
    };

    render() {
        return (
            <div className={classnames('x-card-s-photo')}>
                <XLink path={this.props.path} className={classnames({ 'no-photo': !this.props.src })}>
                    {this.props.src && <XCloudImage src={this.props.src} maxWidth={140} maxHeight={140} />}
                </XLink>
            </div>
        );
    }
}

export class XCardTitle extends React.Component<{ title: string, subtitle?: string | null, path?: string | null, preview?: string | null }> {
    render() {
        if (this.props.preview) {
            return (
                <div className="x-card-s-title-photo">
                    {this.props.path && (<XLink path={this.props.path}><img className="photo" src={this.props.preview} /></XLink>)}
                    {!this.props.path && (<img className="photo" src={this.props.preview} />)}

                    <div className="x-card-s-title content">
                        {this.props.path && (<XLink path={this.props.path}><div className="title">{this.props.title}</div></XLink>)}
                        {!this.props.path && (<div className="title">{this.props.title}</div>)}
                        {this.props.subtitle && <div className="subtitle">{this.props.subtitle}</div>}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="x-card-s-title">
                    {this.props.path && (<XLink path={this.props.path}><div className="title">{this.props.title}</div></XLink>)}
                    {!this.props.path && (<div className="title">{this.props.title}</div>)}
                    {this.props.subtitle && <div className="subtitle">{this.props.subtitle}</div>}
                </div>
            )
        }
    }
}

export class XCardButton extends React.Component<{ title: string, path: string }> {
    render() {
        return (
            <XLink className="x-card-s-button" path={this.props.path}>
                <span>{this.props.title}</span>
            </XLink>
        )
    }
}

export class XCardExternalLink extends React.Component<{ href: string }> {
    render() {
        return (
            <a className="x-card-s-link" href={this.props.href} target="_blank">
                <i className="icon-share" />
            </a>
        );
    }
}

export class XCard extends React.Component {

    static Row = XCardRow;
    static Col = XColumn;
    static Photo = XCardPhoto;
    static Title = XCardTitle;
    static Button = XCardButton;
    static ExternalLink = XCardExternalLink;

    render() {
        let photoComponent = hasChildren('_xCardPhoto', this.props.children);
        let otherChildren = filterChildren('_xCardPhoto', this.props.children);
        return (
            <div className={classnames('x-card-s', { 'horizontal': photoComponent !== null })}>
                {photoComponent}
                {photoComponent !== null && (
                    <div className="x-card-s-content">
                        {otherChildren}
                    </div>
                )}
                {photoComponent === null && otherChildren}
            </div>
        );
    }
}