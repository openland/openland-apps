import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor'
import { CSSUtils } from './utils';
import { XLink } from './XLink';
import { XRow, XColumn } from './XGrid';
import { XCardTable } from './XCardTable';
import { XCardHeader } from './XCardHeader';
import { XCardFooter } from './XCardFooter';
import { XCardProperty, XCardPropertyList, XCardPropertyColumns } from './XCardProperty';
import { XCardGallery } from './XCardGallery';
import { XCardMap } from './XCardMap';
import { XSeparated } from './XSeparated';
import { XCardFormList, XCardFormCell } from './XCardForm';
import { XCardHint } from './XCardHint';
import { XCardWarning } from './XCardWarning';
import { XCardLoader } from './XCardLoader';
import { XCardEmpty } from './XCardEmpty';
import { XCardList, XCardListItem } from './XCardList';

//
// Basic Row
//

const loading = glamor.keyframes({
    '0%': { transform: `rotate(0deg)` },
    '100%': { transform: `rotate(360deg)` }
})

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

let XCardDiv = Glamorous.div<{ shadow?: 'none' | 'normal' | 'medium', loading?: boolean }>((props) => ({
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
    borderRadius: 4,
    position: 'relative',
    '&::before': {
        content: props.loading ? `''` : undefined,
        display: 'block',
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        background: '#fff',
        zIndex: 1
    },
    '&::after': {
        content: props.loading ? `''` : undefined,
        display: 'block',
        position: 'absolute',
        width: '20px',
        height: '20px',
        left: 'calc(50% - 10px)',
        top: 'calc(50% - 10px)',
        backgroundImage: props.loading ? 'url(/static/X/loading.svg)' : undefined,
        backgroundSize: '20px',
        animation: props.loading ? `${loading} 2s linear infinite` : undefined,
        zIndex: 2
    }
}));

let XCardDivContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12
})

let XCardSeparator = Glamorous.div({
    height: 1,
    backgroundColor: '#e6ebf1'
})

export class XCard extends React.Component<{ className?: string, shadow?: 'none' | 'normal' | 'medium', separators?: boolean, loading?: boolean }> {

    static Header = XCardHeader;
    static Footer = XCardFooter;
    static Row = XCardRow;
    static Col = XCardColumn;
    static Title = XCardTitle;
    static Button = XCardButton;
    static ExternalLink = XCardExternalLink;
    static Empty = XCardEmpty;
    static Content = XCardDivContent;
    static Table = XCardTable;
    static Property = XCardProperty;
    static PropertyList = XCardPropertyList;
    static PropertyColumns = XCardPropertyColumns;
    static Gallery = XCardGallery;
    static GalleryItem = XCardGallery.Item;
    static Map = XCardMap;
    static FormList = XCardFormList;
    static FormCell = XCardFormCell;
    static Hint = XCardHint;
    static Warning = XCardWarning;
    static Loader = XCardLoader;
    static List = XCardList;
    static ListItem = XCardListItem;

    render() {
        return (
            <XCardDiv className={this.props.className} shadow={this.props.shadow} loading={this.props.loading}>
                {this.props.separators && <XSeparated separator={XCardSeparator}>{this.props.children}</XSeparated>}
                {!this.props.separators && this.props.children}
            </XCardDiv>
        );
    }
}