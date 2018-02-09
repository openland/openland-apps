import * as React from 'react';
import { hasChildren, filterChildren, CSSUtils } from './utils';
import * as classnames from 'classnames';
import { XLink } from './XLink';
import { XCloudImage } from './XCloudImage';
import Glamorous from 'glamorous';
import { XRow, XColumn } from './XGrid';
import { XCardTable } from './XCardTable';
import { XCardProperty, XCardPropertyList } from './XCardProperty';
import { XCardGallery } from './XCardGallery';
import { XCardMap } from './XCardMap';
//
// Basic Row
//

export const XCardRowDiv = Glamorous(XRow)({
    height: 82,
    borderBottom: '1px solid rgba(38,38,38,0.08)',
    '&:last-child': {
        borderBottom: 0
    }
});

export const XCardRowDivVert = Glamorous(XCardRowDiv)({
    height: 'auto',
    [CSSUtils.forXS]: {
        flexDirection: 'column',
    }
});

export class XCardRow extends React.Component<{ verticalize?: boolean }> {
    render() {
        let Wrapper = this.props.verticalize === true ? XCardRowDivVert : XCardRowDiv;
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}

export const XCardColumn = Glamorous(XColumn)({
    height: 82,
});

export class XCardPhoto extends React.Component<{ path?: string, src?: string | null }> {
    static defaultProps = {
        _xCardPhoto: true
    };

    render() {
        return (
            // <div className={classnames('x-card-s-photo')}>
            <XLink path={this.props.path} className={classnames({ 'no-photo': !this.props.src })}>
                {this.props.src && <XCloudImage src={this.props.src} maxWidth={140} maxHeight={140} />}
            </XLink>
            // </div>
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

export class XCardTitleLarge extends React.Component<{ title: string, subtitle?: string | null, path?: string | null }> {
    render() {
        return (
            <div className="x-card-s-title">
                {this.props.path && (<XLink path={this.props.path}><div className="title">{this.props.title}</div></XLink>)}
                {!this.props.path && (<div className="title">{this.props.title}</div>)}
                {this.props.subtitle && <div className="subtitle">{this.props.subtitle}</div>}
            </div>
        );
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

let XCardDiv = Glamorous.div<{ shadow?: 'none' | 'normal' | 'medium' }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    background: '#ffffff',
    border: (props.shadow === 'none' || props.shadow === undefined) ? '1px solid rgba(38,38,38,0.08)' : undefined,
    boxShadow: props.shadow === 'normal'
        ? '0 2px 15px rgba(84,96,103,.25)'
        : props.shadow === 'medium'
            ? '0 7px 14px 0 rgba(50,50,93,.1), 0 3px 6px 0 rgba(0,0,0,.07)'
            : undefined,
    color: '#262626',
    overflow: 'hidden',
    borderRadius: 4
}));

let XCardDivIconized = Glamorous(XCardDiv)({
    flexDirection: 'row',
    [CSSUtils.forXS]: {
        flexDirection: 'column',
    }
});

let XCardDivIcon = Glamorous.div({
    width: 168,
    maxHeight: 164,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    [CSSUtils.forXS]: {
        width: '100%'
    }
});

let XCardDivContent = Glamorous.div({
    padding: 24
})

export class XCard extends React.Component<{ className?: string, shadow?: 'none' | 'normal' | 'medium' }> {

    static Row = XCardRow;
    static Col = XCardColumn;
    static Photo = XCardPhoto;
    static Title = XCardTitle;
    static Button = XCardButton;
    static ExternalLink = XCardExternalLink;
    static Content = XCardDivContent;
    static Table = XCardTable;
    static Property = XCardProperty;
    static PropertyList = XCardPropertyList;
    static Gallery = XCardGallery;
    static GalleryItem = XCardGallery.Item;
    static Map = XCardMap;

    render() {
        let photoComponent = hasChildren('_xCardPhoto', this.props.children);
        let otherChildren = filterChildren('_xCardPhoto', this.props.children);
        let Wrapper = photoComponent !== null ? XCardDivIconized : XCardDiv;
        return (
            <Wrapper className={this.props.className} shadow={this.props.shadow}>
                {/* <div className={classnames('x-card-s', { 'horizontal': photoComponent !== null })}> */}
                {photoComponent !== null && (<XCardDivIcon>{photoComponent}</XCardDivIcon>)}
                {photoComponent !== null && (
                    <div className="x-card-s-content">
                        {otherChildren}
                    </div>
                )}
                {photoComponent === null && otherChildren}
                {/* </div> */}
            </Wrapper>
        );
    }
}