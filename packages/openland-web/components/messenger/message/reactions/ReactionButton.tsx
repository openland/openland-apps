import * as React from 'react';
import Glamorous from 'glamorous';
import { XPopper } from 'openland-x/XPopper';
import { useClient } from 'openland-web/utils/useClient';
import ReactionIcon from 'openland-icons/ic-reactions.svg';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { ReactionItem } from './MessageReaction';
import { MessageReactionType } from 'openland-api/Types';
import { emojifyReactions } from './emojifyReactions';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import { UserInfoContext } from 'openland-web/components/UserInfo';

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
    reactions?: FullMessage_GeneralMessage_reactions[];
    onlyLikes?: boolean;
    messageId: string;
    marginTop?: number;
    marginLeft?: number;
};

const likeClassName = css`
    cursor: pointer;
    & svg {
        height: 13.5px;
        width: 15.5px;
    }

    &:hover svg > path  {
        fill: #e11616;
        opacity: 1;
    },
`;

const activeClassName = css`
    & svg > path {
        fill: #e11616;
        opacity: 1;
    }
`;

const LikeIcon = ({
    isActive,
    onClick,
}: {
    isActive: boolean;
    onClick: (event: React.MouseEvent) => void;
}) => {
    return (
        <div onClick={onClick} className={cx(likeClassName, isActive && activeClassName)}>
            <ReactionIcon />
        </div>
    );
};

const CommentReactionButton = ({
    id,
    reactions,
}: {
    id: string;
    reactions?: FullMessage_GeneralMessage_reactions[];
}) => {
    let client = useClient();
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;
    const likeReaction = MessageReactionType.LIKE;

    let isActive =
        reactions &&
        reactions.filter(
            (userReaction: FullMessage_GeneralMessage_reactions) =>
                userReaction.user.id === myId && userReaction.reaction === likeReaction,
        ).length > 0;

    let reactionsCount = reactions ? reactions.length : 0;
    return (
        <XView flexDirection="row" alignItems="center" position="relative">
            <XView alignItems="center">
                <LikeIcon
                    isActive={!!isActive}
                    onClick={async () => {
                        if (isActive) {
                            client.mutateCommentUnsetReaction({
                                commentId: id,
                                reaction: likeReaction,
                            });
                        } else {
                            client.mutateCommentSetReaction({
                                commentId: id,
                                reaction: likeReaction,
                            });
                        }
                    }}
                />
            </XView>

            <XView alignItems="center" position="absolute" left={20}>
                <XView fontSize={12} fontWeight={'600'} opacity={0.8}>
                    {reactionsCount ? reactionsCount : null}
                </XView>
            </XView>
        </XView>
    );
};

export const ReactionButton = React.memo((props: ReactionButtonT) => {
    return <CommentReactionButton id={props.messageId} reactions={props.reactions} />;

    // return (
    //     <ReactionComponentInner
    //         handler={async it => {
    //             await client.mutateCommentSetReaction({
    //                 commentId: props.messageId,
    //                 reaction: MessageReactionType.LIKE,
    //             });
    //             // await client.mutateMessageSetReaction({
    //             //     messageId: props.messageId,
    //             //     reaction: it,
    //             // });
    //         }}
    //         onlyLikes={props.onlyLikes}
    //         messageId={props.messageId}
    //         marginTop={props.marginTop}
    //         marginLeft={props.marginLeft}
    //     />
    // );
});
