import * as React from 'react';
import Glamorous from 'glamorous';
import * as PropTypes from 'prop-types';

const XCardWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '> :not(:last-child)': {
        borderBottom: '1px solid #f6f9fc'
    }
});

const XCardItemWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'stretch',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#f6f9fc'
    }
});

export class XListItem extends React.Component<{ path?: string }> {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    mouseDownHandler = () => {
        // if (this.props.path) {
        //     Router.pushRoute(this.props.path);
        // }
    }

    render() {
        return (
            <XCardItemWrapper
                onMouseDown={this.mouseDownHandler}
            >
                {this.props.children}
            </XCardItemWrapper>
        );
    }
}

export function XList(props: { children: any }) {
    return (<XCardWrapper>{props.children}</XCardWrapper>);
}