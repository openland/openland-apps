import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFull_reactions } from 'openland-api/Types';
import { XPopper } from 'openland-x/XPopper';
import { MutationFunc } from 'react-apollo';
import { withSetReaction, withUnsetReaction } from '../../../api/withSetReaction';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import ReactionIcon from 'openland-icons/ic-reactions.svg';
import { emoji } from 'openland-y-utils/emoji';

const CustomPickerDiv = Glamorous(XPopper.Content)({
    padding: '4px 6px',
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
    padding: 2,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    '& span:last-child': {
        margin: '0!important',
    },
}));

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
            <XHorizontal separator={2} alignItems="center">
                {this.defaultReactions.map((r: string) => (
                    <ReactionItem
                        key={'msg_reaction' + r}
                        onClick={e => {
                            e.stopPropagation();
                            this.handleSetReaction(r);
                        }}
                    >
                        {emoji(r, 24)}
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
                showOnHover={true}
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

export const ReactionComponent = withSetReaction(props => (
    <ReactionComponentInner
        mutation={props.setReaction}
        messageId={(props as any).messageId}
        marginTop={(props as any).marginTop}
        marginLeft={(props as any).marginLeft}
    />
)) as React.ComponentType<{
    messageId: string;
    marginTop?: number;
    marginLeft?: number;
}>;

const ReactionsWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 4,
});

const ReactionsInner = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    border: '1px solid #ebebeb',
    background: '#ffffff',
    borderRadius: 18,
    padding: '0 11px 0 6px',
});

const UsersLabel = Glamorous.div({
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 12,
    paddingLeft: 5,
});

class SingleReaction extends React.PureComponent<{
    messageId: string;
    reaction: string;
    isMy: boolean;
    mutation: MutationFunc<{}>;
}> {
    handleChangeReaction = (e: any) => {
        e.stopPropagation();
        this.props.mutation({
            variables: {
                messageId: this.props.messageId,
                reaction: this.props.reaction,
            },
        });
    };
    render() {
        return (
            <ReactionItem isMy={this.props.isMy} onClick={this.handleChangeReaction}>
                {this.props.children}
            </ReactionItem>
        );
    }
}

const SingleReactionSet = withSetReaction(props => (
    <SingleReaction
        mutation={props.setReaction}
        messageId={(props as any).messageId}
        reaction={(props as any).reaction}
        isMy={(props as any).isMy}
    >
        {props.children}
    </SingleReaction>
)) as React.ComponentType<{
    messageId: string;
    reaction: string;
    isMy: boolean;
}>;

const SingleReactionUnset = withUnsetReaction(props => (
    <SingleReaction
        mutation={props.unsetReaction}
        messageId={(props as any).messageId}
        reaction={(props as any).reaction}
        isMy={(props as any).isMy}
    >
        {props.children}
    </SingleReaction>
)) as React.ComponentType<{
    messageId: string;
    reaction: string;
    isMy: boolean;
}>;

interface ReactionsInnerProps {
    messageId: string;
    meId: string;
    reactions: MessageFull_reactions[];
}

export class Reactions extends React.PureComponent<ReactionsInnerProps> {
    usersLabelRender = (usersList: string[], foundMyReaction: boolean, key?: string) => {
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
            <UsersLabel key={key}>{emoji(usersLabel, 12)}</UsersLabel>
        ) : null;
    };

    reactionsRender = () => {
        let { reactions, meId } = this.props;
        let reactionsMap = {};
        let components = [];
        let foundMyReaction = false;
        let usersList: string[] = [];

        for (let i = 0; i < reactions.length; i++) {
            let reaction = reactions[i];

            if (!reactionsMap[reaction.reaction]) {
                reactionsMap[reaction.reaction] = [];
            }
            reactionsMap[reaction.reaction].push(reaction);
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
                                    {i.user.id === meId ? 'You' : emoji(i.user.name, 12)}
                                </div>
                            );
                        })}
                    >
                        <SingleReactionUnset
                            messageId={this.props.messageId}
                            reaction={reactionsMap[k][0].reaction}
                            isMy={true}
                        >
                            {emoji(reactionsMap[k][0].reaction, 16)}
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
                                    {i.user.id === meId ? 'You' : emoji(i.user.name, 12)}
                                </div>
                            );
                        })}
                    >
                        <SingleReactionSet
                            messageId={this.props.messageId}
                            reaction={reactionsMap[k][0].reaction}
                            isMy={false}
                        >
                            {emoji(reactionsMap[k][0].reaction, 16)}
                        </SingleReactionSet>
                    </XPopper>,
                );
            }
        }

        components.push(
            this.usersLabelRender(usersList, foundMyReaction, 'reactions' + this.props.messageId),
        );

        return components;
    };

    render() {
        return this.props.reactions && this.props.reactions.length > 0 ? (
            <ReactionsWrapper className="reactions-wrapper">
                <ReactionsInner>{this.reactionsRender()}</ReactionsInner>
            </ReactionsWrapper>
        ) : null;
    }
}
