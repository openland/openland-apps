import * as React from 'react';
import Glamorous from 'glamorous';
import { XCloudImage } from './XCloudImage';

const XCardGalleryDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    overflowY: 'auto',
    // paddingLeft: '8px',
    // paddingRight: '8px'
});

const XCardGalleryInnerDiv = Glamorous.div({
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '8px',
    paddingRight: '8px'
});

const XCardGalleryItemImg = Glamorous(XCloudImage)({
    height: '204px',
    width: '204px',
    margin: ' 16px'
});

export class XCardGallery extends React.Component {

    static Item = XCardGalleryItemImg;

    render() {
        return (<XCardGalleryDiv><XCardGalleryInnerDiv>{this.props.children}</XCardGalleryInnerDiv></XCardGalleryDiv>);
    }
}