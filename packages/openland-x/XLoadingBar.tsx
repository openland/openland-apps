import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';

const LoadingBarKeyframes = glamor.keyframes({
    'from': {
        left: '-200px',
        width: '30%'
    },
    '50%': {
        width: '30%'
    },
    '70%': {
        width: '70%'
    },
    '80%': {
        left: '50%'
    },
    '95%': {
        left: '120%'
    },
    'to': {
        left: '100%'
    }
});

const LoadingBarContainer = Glamorous.div<{ visible: boolean }>((props) => ({
    height: '4px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#ddd',
    borderRadius: '2px',
    opacity: props.visible ? 1 : 0,
    transition: 'opacity 0.15s ease'
}));

const LoadingBarBar = Glamorous.div({
    display: 'block',
    position: 'absolute',
    content: '""',
    left: '-200px',
    width: '200px',
    height: '4px',
    backgroundColor: '#522BFF',
    animation: `${LoadingBarKeyframes} 2s linear infinite`
});

export class XLoadingBar extends React.PureComponent<{ visible?: boolean }> {
    render() {
        return (
            <LoadingBarContainer visible={this.props.visible !== undefined ? this.props.visible : true}>
                <LoadingBarBar />
            </LoadingBarContainer>
        );
    }
}