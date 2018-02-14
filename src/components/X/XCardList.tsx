import * as React from 'react';
import Glamorous from 'glamorous';
import * as PropTypes from 'prop-types';
import { RouterState } from '../../utils/withRouter';

import { Router } from '../../routes';

const XCardWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch'
})

const XCardItemWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    height: '32px',
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'stretch',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f6f9fc'
    }
})

export function XCardList(props: { children: any }) {
    return (<XCardWrapper>{props.children}</XCardWrapper>);
}

export class XCardListItem extends React.Component<{ path?: string }> {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    mouseDownHandler = () => {
        if (this.props.path) {
            Router.pushRoute(this.props.path);
        }
    }

    render() {
        return (
            <XCardItemWrapper
                onMouseDown={this.mouseDownHandler}
            >
                {this.props.children}
            </XCardItemWrapper>
        )
    }
}