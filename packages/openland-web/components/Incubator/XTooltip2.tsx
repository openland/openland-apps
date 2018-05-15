import * as React from 'react';
import { XPopper2, XPopper2Props } from './XPopper2';

export class XTooltip2 extends React.Component<XPopper2Props> {

    render() {
        return ( 
            <XPopper2 {...this.props} show="hover" groupId="tooltip"/>
        );
    }
}