import * as React from 'react';
import Glamorous from 'glamorous';
import { FullMessage_GeneralMessage_reactions } from 'openland-api/Types';
import { XPopper } from 'openland-x/XPopper';
import { MutationFunc } from 'react-apollo';
import { withSetReaction, withUnsetReaction } from '../../../api/withSetReaction';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import ReactionIcon from 'openland-icons/ic-reactions.svg';
import { emoji } from 'openland-y-utils/emoji';
import { renderDevPortal } from 'openland-web/pages/dev/components/renderDevPortal';
import { XMemo } from 'openland-y-utils/XMemo';

const CustomPickerDiv = Glamorous(XPopper.Content)({
    padding: '4px 10px',
    borderRadius: 18,
});

const ReactionButton = Glamorous.div<{
    marginTop?: number;
    marginLeft?: number;
}>(props => ({
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
    paddingTop: 6,
    '&:hover svg > path': {
        fill: '#d75454',
        opacity: 1,
    },
}));

const ReactionItem = Glamorous.div<{ isMy?: boolean }>(props => ({
    display: 'flex',
    alignItems: 'center',
    height: 28,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    '& span:last-child': {
        margin: '0!important',
    },
}));

const emojifyReactions = ({ src, size }: { src: string; size: 25 | 18 }) => {
    if (src === '👍') {
        // margin-right: -2px;
        // margin-left: -2px;
        return emoji({
            src,
            size,
            crop:
                size === 25
                    ? {
                          figureStyle: {
                              width: 20,
                              marginBottom: -4,
                          },
                          imgStyle: {
                              marginLeft: -3,
                              marginRight: -1,
                          },
                      }
                    : {
                          figureStyle: {
                              width: 14,
                              marginBottom: -4,
                          },
                          imgStyle: {
                              marginLeft: -2,
                              marginRight: -2,
                          },
                      },
        });
    } else if (src === '😱') {
        return emoji({
            src,
            size,
            crop:
                size === 25
                    ? {
                          figureStyle: {
                              width: 23,
                              marginBottom: -2,
                          },
                          imgStyle: {
                              marginLeft: -1,
                          },
                      }
                    : undefined,
        });
    }

    return emoji({
        src,
        size,
    });
};
class ReactionPicker extends React.Component<{ onRef: any; setReaction: any }> {
    defaultReactions = ['❤️', '👍', '😂', '😱', '😢', '🤬'];
    state = {
        show: false,
    };

    onClickOutside = () => {
        this.setState({
            show: false,
        });
    };

    switch = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    handleSetReaction = (emj: any) => {
        this.props.setReaction(emj);
        this.setState({
            show: false,
        });
    };

    render() {
        return (
            <XHorizontal separator={6} alignItems="center">
                {this.defaultReactions.map((src: string) => (
                    <ReactionItem
                        key={'msg_reaction' + src}
                        onClick={e => {
                            e.stopPropagation();
                            this.handleSetReaction(src);
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
    messageId: string;
    marginTop?: number;
    marginLeft?: number;
    mutation: MutationFunc<{}>;
}> {
    inner = 0;

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    };

    handleSetReaction = (emj: any) => {
        this.props.mutation({
            variables: {
                messageId: this.props.messageId,
                reaction: typeof emj === 'string' ? emj : emj.native,
            },
        });
    };

    handleClick = () => {
        this.handleSetReaction('❤️');
    };

    render() {
        return (
            <XPopper
                content={
                    <ReactionPicker onRef={this.onInner} setReaction={this.handleSetReaction} />
                }
                showOnHover
                placement="top"
                contentContainer={<CustomPickerDiv />}
                marginBottom={6}
            >
                <ReactionButton
                    className="reaction-button"
                    onClick={this.handleClick}
                    marginTop={this.props.marginTop}
                    marginLeft={this.props.marginLeft}
                >
                    <ReactionIcon />
                </ReactionButton>
            </XPopper>
        );
    }
}

type ReactionComponentT = {
    messageId: string;
    marginTop?: number;
    marginLeft?: number;
};

export const ReactionComponent = withSetReaction(props => {
    const typedProps = props as typeof props & ReactionComponentT;
    return (
        <ReactionComponentInner
            mutation={props.setReaction}
            messageId={typedProps.messageId}
            marginTop={typedProps.marginTop}
            marginLeft={typedProps.marginLeft}
        />
    );
}) as React.ComponentType<ReactionComponentT>;

const ReactionsWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 4,
});

const ReactionsInnerWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 18,
    padding: '0 10px 0 10px',
});

const UsersLabel = Glamorous.div({
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 12,
    paddingLeft: 7,
});

class SingleReaction extends React.PureComponent<{
    messageId: string;
    reaction: string;
    isMy: boolean;
    mutation: MutationFunc<{}>;
    unset: boolean;
}> {
    handleChangeReaction = (e: any) => {
        const { reaction, messageId } = this.props;
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
            this.props.mutation({
                variables: {
                    messageId: messageId,
                    reaction: r,
                },
            });
        } else {
            this.props.mutation({
                variables: {
                    messageId: messageId,
                    reaction: reaction,
                },
            });
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
};

const SingleReactionSet = withSetReaction(props => {
    const typedProps = props as typeof props & SingleReactionSetT;
    return (
        <SingleReaction
            mutation={props.setReaction}
            messageId={typedProps.messageId}
            reaction={typedProps.reaction}
            isMy={typedProps.isMy}
            unset={false}
        >
            {typedProps.children}
        </SingleReaction>
    );
}) as React.ComponentType<SingleReactionSetT>;

type SingleReactionUnsetT = {
    messageId: string;
    reaction: string;
    isMy: boolean;
};

const SingleReactionUnset = withUnsetReaction(props => {
    const typedProps = props as typeof props & SingleReactionUnsetT;
    return (
        <SingleReaction
            mutation={props.unsetReaction}
            messageId={typedProps.messageId}
            reaction={typedProps.reaction}
            isMy={typedProps.isMy}
            unset={true}
        >
            {typedProps.children}
        </SingleReaction>
    );
}) as React.ComponentType<SingleReactionUnsetT>;

interface ReactionsInnerProps {
    messageId: string;
    meId: string;
    reactions: FullMessage_GeneralMessage_reactions[];
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
            foundMyReaction = true;
            components.push(
                <XPopper
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
                        {emojifyReactions({
                            src: reactionsMap[k][0].reaction,
                            size: 18,
                        })}
                    </SingleReactionUnset>
                </XPopper>,
            );
        } else {
            components.push(
                <XPopper
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
                        {emojifyReactions({
                            src: reactionsMap[k][0].reaction,
                            size: 18,
                        })}
                    </SingleReactionSet>
                </XPopper>,
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
        const { reactions, meId, messageId } = this.props;
        return (
            <>
                {reactions && reactions.length > 0 ? (
                    <ReactionsWrapper className="reactions-wrapper">
                        <ReactionsInnerWrapper>
                            <ReactionsInner
                                reactions={reactions}
                                meId={meId}
                                messageId={messageId}
                            />
                        </ReactionsInnerWrapper>
                    </ReactionsWrapper>
                ) : null}
            </>
        );
    }
}
