import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { useClient } from 'openland-web/utils/useClient';
import ReactionIcon from 'openland-icons/ic-reactions.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { ReactionItem } from './MessageReaction';
import { emojifyReactions } from './emojifyReactions';

const CustomPickerDiv = Glamorous(XPopper.Content)({
    padding: '4px 10px',
    borderRadius: 18,
});

const ReactionButtonInner = Glamorous.div<{
    marginTop?: number;
    marginLeft?: number;
    hovered: boolean;
}>(props => ({
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
    paddingTop: 6,
    '& svg > path': {
        fill: props.hovered ? '#d75454' : undefined,
        opacity: props.hovered ? 1 : undefined,
    },
    '&:hover svg > path': {
        fill: '#d75454',
        opacity: 1,
    },
}));

class ReactionPicker extends React.PureComponent<{
    setReaction: (src: any) => void;
    onHover: (hover: boolean) => void;
}> {
    componentWillUnmount() {
        this.props.onHover(false);
    }

    render() {
        const { props } = this;
        const defaultReactions = ['❤️', '👍', '😂', '😱', '😢', '🤬'];

        return (
            <XHorizontal separator={6} alignItems="center" onMouseEnter={() => props.onHover(true)}>
                {defaultReactions.map((src: string) => (
                    <ReactionItem
                        key={'msg_reaction' + src}
                        onClick={e => {
                            e.stopPropagation();
                            props.setReaction(src);
                        }}
                    >
                        {emojifyReactions({
                            src,
                            size: 25,
                        })}
                    </ReactionItem>
                ))}
            </XHorizontal>
        );
    }
}

class ReactionComponentInner extends React.PureComponent<{
    onlyLikes?: boolean;
    messageId: string;
    marginTop?: number;
    marginLeft?: number;
    handler: (reaction: string) => void;
}> {
    state = {
        hovered: false,
    };
    handleSetReaction = (emj: any) => {
        this.props.handler(typeof emj === 'string' ? emj : emj.native);
    };

    handleClick = () => {
        this.handleSetReaction('❤️');
    };

    onReactionsHover = (data: boolean) => {
        this.setState({
            hovered: data,
        });
    };

    render() {
        const onlyLikes = this.props.onlyLikes;
        if (onlyLikes) {
            return (
                <ReactionButtonInner
                    className="reaction-button"
                    onClick={this.handleClick}
                    marginTop={this.props.marginTop}
                    marginLeft={this.props.marginLeft}
                    hovered={this.state.hovered}
                >
                    <ReactionIcon />
                </ReactionButtonInner>
            );
        }

        return (
            <XPopper
                content={
                    <ReactionPicker
                        setReaction={this.handleSetReaction}
                        onHover={this.onReactionsHover}
                    />
                }
                showOnHover
                placement="top"
                contentContainer={<CustomPickerDiv />}
                marginBottom={6}
            >
                <ReactionButtonInner
                    className="reaction-button"
                    onClick={this.handleClick}
                    marginTop={this.props.marginTop}
                    marginLeft={this.props.marginLeft}
                    hovered={this.state.hovered}
                >
                    <ReactionIcon />
                </ReactionButtonInner>
            </XPopper>
        );
    }
}

type ReactionButtonT = {
    onlyLikes?: boolean;
    messageId: string;
    marginTop?: number;
    marginLeft?: number;
};

export const ReactionButton = React.memo((props: ReactionButtonT) => {
    let client = useClient();
    return (
        <ReactionComponentInner
            handler={it =>
                client.mutateMessageSetReaction({ messageId: props.messageId, reaction: it })
            }
            onlyLikes={props.onlyLikes}
            messageId={props.messageId}
            marginTop={props.marginTop}
            marginLeft={props.marginLeft}
        />
    );
});
