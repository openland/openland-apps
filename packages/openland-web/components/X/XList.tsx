import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from './XVertical';

let XListDiv = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
});

export let XListItem = Glamorous.div({

});

export class XList extends React.Component {
    static Item = XListItem;

    render() {
        return (
            <XListDiv>
                <XVertical>
                    {this.props.children}
                </XVertical>
            </XListDiv>
        );
    }
}