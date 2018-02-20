import Glamorous from 'glamorous';

import * as React from 'react';
import { XLink, XLinkProps } from './XLink';
import { XCloudImage } from './XCloudImage';
import XStyled from './XStyled';

let XItemDiv = XStyled(XLink)({
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    alignSelf: 'stretch',
    height: '80px'
})

let XItemImage = Glamorous(XCloudImage)({
    border: '1px solid rgba(38,38,38,0.08)',
    borderRadius: '4px',
    overflow: 'hidden',
    width: 80,
    height: 80,
    flexShrink: 0,
    flexGrow: 0
});
XItemImage.defaultProps = {
    width: 80,
    height: 80,
    placeholder: '/static/img/no-photo.png'
} as any;

let XItemContent = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: 'center',
    marginLeft: 16
});

let XItemTitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',

    fontSize: '18px',
    lineHeight: '22px',
    fontWeight: 500,
});

let XItemSubtitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',

    color: 'rgba(38,38,38,0.6)',

    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500,
});

export class XItem extends React.Component<XLinkProps> {
    static Image = XItemImage;
    static Content = XItemContent;
    static Title = XItemTitle;
    static Subtitle = XItemSubtitle;

    render() {
        return (
            <XItemDiv
                path={this.props.path}
                query={this.props.query}
                href={this.props.href}
                anchor={this.props.anchor}
            >
                {this.props.children}
            </XItemDiv>
        );
    }
}