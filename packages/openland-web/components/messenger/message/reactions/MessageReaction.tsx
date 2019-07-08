import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';
import CommentLikeChannelIcon from 'openland-icons/ic-like-channel.svg';
import CommentLikeEmptyChannelIcon from 'openland-icons/ic-like-empty-channel.svg';
import ReactionIcon from 'openland-icons/ic-reactions.svg';
import { emojifyReactions } from './emojifyReactions';
import { trackEvent } from 'openland-x-analytics';
import { reactionEmojiMap } from './ReactionButton';

const LikeIconClassName = css`
    width: 18px;
    height: 18px;
    & > path {
        fill: #f6564e;
        opacity: 1;
    }
`;

const ThumbIconClassName = css`
    width: 20px;
    height: 20px;
    background-image: url('https://cdn.openland.com/shared/web/ic-reaction-thumbsup.png');
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: -3px;
`;

export const ReactionItem = Glamorous.div<{
    isMy?: boolean;
    marginRight?: number;
    marginLeft?: number;
}>(props => ({
    display: 'flex',
    alignItems: 'center',
    height: 28,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    marginRight: `${props.marginRight} !important`,
    marginLeft: `${props.marginLeft} !important`,
    '& span:last-child': {
        margin: '0!important',
    },
}));

const UsersLabel = Glamorous.div({
    color: '#7A7A7A',
    fontSize: 12,
    paddingLeft: 7,
});

class SingleReaction extends React.PureComponent<{
    reaction: string;
    isMy: boolean;
    handler: (reaction: string) => void;
    unset: boolean;
}> {
    handleChangeReaction = (e: any) => {
        const { reaction } = this.props;
        e.stopPropagation();
        if (this.props.unset) {
            let r: string = reaction;
            if (reaction === 'LIKE') {
                r = '❤️';
            } else if (reaction === 'THUMB_UP') {
                r = '👍';
            } else if (reaction === 'JOY') {
                r = '😂';
            } else if (reaction === 'SCREAM') {
                r = '😱';
            } else if (reaction === 'CRYING') {
                r = '😢';
            } else if (reaction === 'ANGRY') {
                r = '🤬';
            }
            this.props.handler(r);
        } else {
            this.props.handler(reaction);
        }
    };
    render() {
        return (
            <ReactionItem isMy={this.props.isMy} onClick={this.handleChangeReaction}>
                {this.props.children}
            </ReactionItem>
        );
    }
}

type SingleReactionSetT = {
    messageId: string;
    reaction: string;
    isMy: boolean;
    children?: any;
};

const SingleReactionSetInner = (props: SingleReactionSetT) => {
    let client = useClient();
    return (
        <SingleReaction
            handler={it => {
                trackEvent('reaction_sent', {
                    reaction_type: reactionEmojiMap[it].toLowerCase(),
                    double_tap: 'not',
                });

                client.mutateMessageSetReaction({ messageId: props.messageId, reaction: it });
            }}
            reaction={props.reaction}
            isMy={props.isMy}
            unset={false}
        >
            {props.children}
        </SingleReaction>
    );
};

class SingleReactionSet extends React.PureComponent<SingleReactionUnsetT> {
    render() {
        return <SingleReactionSetInner {...this.props} />;
    }
}

type SingleReactionUnsetT = {
    messageId: string;
    reaction: string;
    isMy: boolean;
    children?: any;
};

const SingleReactionUnsetInner = (props: SingleReactionUnsetT) => {
    const client = useClient();
    return (
        <SingleReaction
            handler={it =>
                client.mutateMessageUnsetReaction({ messageId: props.messageId, reaction: it })
            }
            reaction={props.reaction}
            isMy={props.isMy}
            unset={true}
        >
            {props.children}
        </SingleReaction>
    );
};

class SingleReactionUnset extends React.PureComponent<SingleReactionUnsetT> {
    render() {
        return <SingleReactionUnsetInner {...this.props} />;
    }
}

interface ReactionsInnerProps {
    messageId: string;
    meId: string;
    reactions: FullMessage_GeneralMessage_reactions[];
    onlyLikes?: boolean;
}

const Label = XMemo(
    ({ usersList, foundMyReaction }: { usersList: string[]; foundMyReaction: boolean }) => {
        let uniqueUsersList = usersList.filter(
            (item: string, pos: number) => usersList.indexOf(item) === pos,
        );
        let usersLabel = '';

        if (foundMyReaction) {
            uniqueUsersList.unshift('You');
        }

        if (uniqueUsersList.length > 0) {
            usersLabel = uniqueUsersList[0];

            if (uniqueUsersList.length === 2) {
                usersLabel += ' and ' + uniqueUsersList[1];
            }

            if (uniqueUsersList.length === 3) {
                usersLabel += ', ' + uniqueUsersList[1] + ' and ' + uniqueUsersList[2];
            }

            if (uniqueUsersList.length > 3) {
                usersLabel +=
                    ', ' + uniqueUsersList[1] + ' and ' + (uniqueUsersList.length - 2) + ' more';
            }
        }

        return usersLabel.length > 0 ? (
            <UsersLabel>
                {emoji({
                    src: usersLabel,
                    size: 12,
                })}
            </UsersLabel>
        ) : null;
    },
);

const OnlyLikesReactionsInner = React.memo(
    ({ reactions, meId, messageId }: ReactionsInnerProps) => {
        let text = 'Like';
        if (reactions.length === 1) {
            text = `${reactions.length} like`;
        } else if (reactions.length > 1) {
            text = `${reactions.length} likes`;
        }

        const textElem = (
            <XView marginLeft={4} color="#000000" opacity={0.8} fontSize={13} fontWeight={'400'}>
                {text}
            </XView>
        );

        if (reactions.find((r: any) => r.user.id === meId)) {
            return (
                <>
                    <SingleReactionUnset messageId={messageId} reaction={'❤️'} isMy={true}>
                        <CommentLikeChannelIcon />
                        {textElem}
                    </SingleReactionUnset>
                </>
            );
        }
        return (
            <>
                <SingleReactionSet messageId={messageId} reaction={'❤️'} isMy={false}>
                    <CommentLikeEmptyChannelIcon />
                    {textElem}
                </SingleReactionSet>
            </>
        );
    },
);

const ReactionsInner = React.memo(({ reactions, meId, messageId }: ReactionsInnerProps) => {
    let reactionsMap = {};
    let components = [];
    let foundMyReaction = false;
    let usersList: string[] = [];

    for (let i = 0; i < reactions.length; i++) {
        let r = reactions[i];
        let reaction: any = reactions[i];

        if (r.reaction === 'LIKE') {
            reaction.reaction = '❤️';
        } else if (r.reaction === 'THUMB_UP') {
            reaction.reaction = '👍';
        } else if (r.reaction === 'JOY') {
            reaction.reaction = '😂';
        } else if (r.reaction === 'SCREAM') {
            reaction.reaction = '😱';
        } else if (r.reaction === 'CRYING') {
            reaction.reaction = '😢';
        } else if (r.reaction === 'ANGRY') {
            reaction.reaction = '🤬';
        }

        if (!reactionsMap[r.reaction]) {
            reactionsMap[r.reaction] = [];
        }
        reactionsMap[r.reaction].push(reaction);
    }

    for (let k in reactionsMap) {
        if (reactionsMap[k].find((r: any) => r.user.id === meId)) {
            let content = emojifyReactions({
                src: reactionsMap[k][0].reaction,
                size: 18,
            });

            if (k === '❤️') {
                content = <ReactionIcon className={LikeIconClassName} />;
            }
            if (k === '👍') {
                content = <div className={ThumbIconClassName} />;
            }
            foundMyReaction = true;
            components.push(
                <XPolitePopper
                    key={'reaction' + reactionsMap[k][0].reaction}
                    placement="bottom"
                    style="dark"
                    showOnHover={true}
                    content={reactionsMap[k].map((i: any) => {
                        if (i.user.id !== meId) {
                            usersList.push(i.user.name);
                        }

                        return (
                            <div key={k + '-' + i.user.name}>
                                {i.user.id === meId
                                    ? 'You'
                                    : emoji({
                                          src: i.user.name,
                                          size: 13,
                                      })}
                            </div>
                        );
                    })}
                >
                    <SingleReactionUnset
                        messageId={messageId}
                        reaction={reactionsMap[k][0].reaction}
                        isMy={true}
                    >
                        {content}
                    </SingleReactionUnset>
                </XPolitePopper>,
            );
        } else {
            let content = emojifyReactions({
                src: reactionsMap[k][0].reaction,
                size: 18,
            });

            if (k === '❤️') {
                content = <ReactionIcon className={LikeIconClassName} />;
            }
            if (k === '👍') {
                content = <div className={ThumbIconClassName} />;
            }
            components.push(
                <XPolitePopper
                    key={'reaction' + reactionsMap[k][0].reaction}
                    placement="bottom"
                    style="dark"
                    showOnHover={true}
                    content={reactionsMap[k].map((i: any) => {
                        if (i.user.id !== meId) {
                            usersList.push(i.user.name);
                        }

                        return (
                            <div key={k + '-' + i.user.name}>
                                {i.user.id === meId
                                    ? 'You'
                                    : emoji({
                                          src: i.user.name,
                                          size: 13,
                                      })}
                            </div>
                        );
                    })}
                >
                    <SingleReactionSet
                        messageId={messageId}
                        reaction={reactionsMap[k][0].reaction}
                        isMy={false}
                    >
                        {content}
                    </SingleReactionSet>
                </XPolitePopper>,
            );
        }
    }

    return (
        <>
            <XHorizontal separator={3} alignItems="center">
                {components}
            </XHorizontal>
            <Label
                usersList={usersList}
                foundMyReaction={foundMyReaction}
                key={'reactions' + messageId}
            />
        </>
    );
});

export class Reactions extends React.PureComponent<ReactionsInnerProps> {
    render() {
        let { reactions, meId, messageId, onlyLikes } = this.props;

        onlyLikes = false;

        return (
            <XView flexWrap="wrap" alignItems="center">
                {onlyLikes && (
                    <>
                        <XView
                            flexWrap="wrap"
                            alignItems="center"
                            backgroundColor="#f4f4f4"
                            borderRadius={18}
                            paddingRight={13}
                            paddingLeft={10}
                        >
                            <OnlyLikesReactionsInner
                                reactions={reactions}
                                meId={meId}
                                messageId={messageId}
                            />
                        </XView>
                    </>
                )}
                {!onlyLikes && reactions && reactions.length > 0 ? (
                    <XView
                        flexWrap="wrap"
                        alignItems="center"
                        backgroundColor="#f4f4f4"
                        borderRadius={18}
                        flexDirection="row"
                        paddingHorizontal={10}
                    >
                        <ReactionsInner reactions={reactions} meId={meId} messageId={messageId} />
                    </XView>
                ) : null}
            </XView>
        );
    }
}
