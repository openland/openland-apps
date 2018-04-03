import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';

const heartBurst = glamor.keyframes({
    'from': { backgroundPosition: 'left' },
    'to': { backgroundPosition: 'right' }
});

let XLikeButton = Glamorous.div<{ active: boolean }>((props) => ({
    cursor: 'pointer',
    height: 50,
    width: 50,
    marginLeft: -16,
    marginRight: -16,
    backgroundImage: 'url(/static/X/likeButtonAnimation.png)',
    backgroundPosition: props.active ? 'right' : 'left',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '2900%',
    '&:hover': {
        backgroundPosition: 'right',
    },
    animation: props.active ? `${heartBurst} .8s steps(28)` : undefined
}));

export class XButtonLike extends React.Component<{ onChange?: (value: boolean) => void, value?: boolean }> {
    handler = (e: any) => {
        e.preventDefault();
        if (this.props.onChange) {
            this.props.onChange(!(this.props.value || false));
        }
    }
    render() {
        return (
            <XLikeButton active={this.props.value || false} onClick={this.handler} />
        );
    }
}