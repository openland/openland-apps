import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { TextProfiles } from 'openland-text/TextProfiles';

export const XMoreCardsWrapper = Glamorous.div<{ isShown: boolean }>(props => ({
    marginBottom: 4,

    '& *:not(:nth-child(-n+10))': {
        display: !props.isShown ? 'none !important' : undefined,
    },
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
        marginRight: 2,
    },
});

interface XMoreCardsProps {
    children?: any;
}

interface XMoreCardsState {
    isShown: boolean;
}

export const XMoreCardsButton = ({
    toggleShown,
    isShown,
}: {
    toggleShown?: () => void;
    isShown: boolean;
}) => {
    return (
        <Button
            onClick={toggleShown}
            icon={isShown ? 'expand_less' : 'expand_more'}
            text={isShown ? TextProfiles.showLess : TextProfiles.showMore}
            style="flat"
        />
    );
};

export class XMoreCards extends React.Component<XMoreCardsProps, XMoreCardsState> {
    state = {
        isShown: false,
    };

    toggleShown = () => {
        this.setState({
            isShown: !this.state.isShown,
        });
    };

    render() {
        if (React.Children.count(this.props.children) > 11) {
            return (
                <>
                    <XMoreCardsWrapper isShown={this.state.isShown}>
                        {this.props.children}
                    </XMoreCardsWrapper>
                    <XMoreCardsButton toggleShown={this.toggleShown} isShown={this.state.isShown} />
                </>
            );
        } else {
            return <>{this.props.children}</>;
        }
    }
}
