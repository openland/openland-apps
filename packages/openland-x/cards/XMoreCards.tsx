import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';

const Wrapper = Glamorous.div<{ isShown: boolean }>((props) => ({
    marginBottom: 4,
        
    '& *:not(:nth-child(1)):not(:nth-child(2)):not(:nth-child(3))': {
        display: !props.isShown ? 'none !important' : undefined
    }
}));

const Button = Glamorous(XButton)({
    display: 'inline-block!important',
    background: 'none!important',
    border: 'none!important',
    fontSize: 14,
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.5)',

    '& > div': {
        paddingLeft: '0!important',
        paddingRight: '0!important',
    },

    '& .icon.material': {
        marginLeft: -2,
        marginRight: 2
    }
});

interface XMoreCardsProps {
    children?: any;
}

interface XMoreCardsState {
    isShown: boolean;
}

export class XMoreCards extends React.Component<XMoreCardsProps, XMoreCardsState> {
    state = {
        isShown: false
    };

    toggleShown = () => {
        this.setState({
            isShown: !this.state.isShown
        });
    }

    render () {
        if (React.Children.count(this.props.children) > 4) {
            return (
                <>
                    <Wrapper isShown={this.state.isShown}>
                        {this.props.children}
                    </Wrapper>
    
                    <Button
                        onClick={this.toggleShown}
                        icon={this.state.isShown ? 'expand_less' : 'expand_more'}
                        text={this.state.isShown ? 'Show less' : 'Show more'}
                        style="flat"
                    />
                </>
            );
        } else {
            return (
                <>
                    {this.props.children}
                </>
            );
        }
    }
}