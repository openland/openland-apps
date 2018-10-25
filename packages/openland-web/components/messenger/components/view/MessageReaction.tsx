import * as React from 'react';
import Glamorous from 'glamorous';
import { emojify } from 'react-emojione';
import { MessageFull_reactions } from 'openland-api/Types';
import { XPopper } from 'openland-x/XPopper';
import { Picker } from 'emoji-mart';
import { MutationFunc } from 'react-apollo';
import { withSetReaction, withUnsetReaction } from '../../../../api/withSetReaction';
import ReactionIcon from '../icons/ic-emoji2.svg';

const CustomContentDiv = Glamorous(XPopper.Content)({
    padding: 0,
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
});

const ReactionButton = Glamorous.div<{ marginTop?: number, marginLeft?: number }>(props => ({
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: props.marginTop,
    marginLeft: props.marginLeft,
    '&:hover svg > path': {
        fill: '#1790ff',
        opacity: 1
    }
}));

class ReactionComponentInner extends React.PureComponent<{ messageId: string, marginTop?: number, marginLeft?: number, mutation: MutationFunc<{}> }> {

    state = {
        show: false
    };

    onClickOutside = () => {
        this.setState({
            show: false
        });
    }
    switch = () => {
        this.setState({
            show: !this.state.show
        });
    }

    handleSetReaction = (emj: any) => {
        this.props.mutation({
            variables: {
                messageId: this.props.messageId,
                reaction: emj.native
            }
        });
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <XPopper
                content={(
                    <Picker
                        set="twitter"
                        emojiSize={16}
                        onSelect={(emj) => this.handleSetReaction(emj)}
                    />
                )}
                show={this.state.show}
                placement="bottom"
                animation={null}
                onClickOutside={this.onClickOutside}
                contentContainer={(
                    <CustomContentDiv />
                )}
            >
                <ReactionButton className="reaction-button" onClick={this.switch} marginTop={this.props.marginTop} marginLeft={this.props.marginLeft}>
                    <ReactionIcon />
                </ReactionButton>
            </XPopper>
        );
    }
}

export const ReactionComponent = withSetReaction((props) => (
    <ReactionComponentInner
        mutation={props.setReaction}
        messageId={(props as any).messageId}
        marginTop={(props as any).marginTop}
        marginLeft={(props as any).marginLeft}
    />
)) as React.ComponentType<{ messageId: string, marginTop?: number, marginLeft?: number }>;

const ReactionsWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 4
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

const ReactionItem = Glamorous.div<{ isMy: boolean }>(props => ({
    display: 'flex',
    alignItems: 'center',
    height: 28,
    padding: '6px 4px 2px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    '& span:last-child': {
        margin: '0!important',
    }
}));

const UsersLabel = Glamorous.div({
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 12,
    paddingLeft: 5,
});

class SingleReaction extends React.PureComponent<{ messageId: string, reaction: string, isMy: boolean, mutation: MutationFunc<{}> }> {
    handleChangeReaction = () => {
        this.props.mutation({
            variables: {
                messageId: this.props.messageId,
                reaction: this.props.reaction
            }
        });
    }
    render() {
        return (
            <ReactionItem isMy={this.props.isMy} onClick={this.handleChangeReaction}>
                {this.props.children}
            </ReactionItem>
        );
    }
}

const SingleReactionSet = withSetReaction((props) => (
    <SingleReaction mutation={props.setReaction} messageId={(props as any).messageId} reaction={(props as any).reaction} isMy={(props as any).isMy}>
        {props.children}
    </SingleReaction>
)) as React.ComponentType<{ messageId: string, reaction: string, isMy: boolean }>;

const SingleReactionUnset = withUnsetReaction((props) => (
    <SingleReaction mutation={props.unsetReaction} messageId={(props as any).messageId} reaction={(props as any).reaction} isMy={(props as any).isMy}>
        {props.children}
    </SingleReaction>
)) as React.ComponentType<{ messageId: string, reaction: string, isMy: boolean }>;

interface ReactionsInnerProps {
    messageId: string;
    meId: string;
    reactions: MessageFull_reactions[];
}

export class Reactions extends React.PureComponent<ReactionsInnerProps> {
    usersLabelRender = (usersList: string[], foundMyReaction: boolean) => {
        let uniqueUsersList = usersList.filter((item: string, pos: number) => (usersList.indexOf(item) === pos));
        let usersLabel = '';

        if (foundMyReaction) {
            usersLabel = 'You';

            if (uniqueUsersList[0]) {
                usersLabel += ', ' + uniqueUsersList[0];
            }

            if (uniqueUsersList.length > 1) {
                usersLabel += ' and ' + (uniqueUsersList.length - 1) + ' more';
            }
        } else {
            if (uniqueUsersList.length > 0) {
                usersLabel = uniqueUsersList[0];

                if (uniqueUsersList[1]) {
                    usersLabel += ', ' + uniqueUsersList[1];
                }

                if (uniqueUsersList.length > 2) {
                    usersLabel += ' and ' + (uniqueUsersList.length - 2) + ' more';
                }
            }
        }

        return (usersLabel.length > 0) ? <UsersLabel>{usersLabel}</UsersLabel> : null;
    }

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

                            return (<div key={k + '-' + i.user.name}>{i.user.id === meId ? 'You' : i.user.name}</div>);
                        })}
                    >
                        <SingleReactionUnset
                            messageId={this.props.messageId}
                            reaction={reactionsMap[k][0].reaction}
                            isMy={true}
                        >
                            {emojify(reactionsMap[k][0].reaction, { style: { height: 16, backgroundImage: 'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)' } })}
                        </SingleReactionUnset>
                    </XPopper>
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

                            return (<div key={k + '-' + i.user.name}>{i.user.id === meId ? 'You' : i.user.name}</div>);
                        })}
                    >
                        <SingleReactionSet
                            messageId={this.props.messageId}
                            reaction={reactionsMap[k][0].reaction}
                            isMy={false}
                        >
                            {emojify(reactionsMap[k][0].reaction, { style: { height: 16, backgroundImage: 'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)' } })}
                        </SingleReactionSet>
                    </XPopper>
                );
            }
        }

        components.push(this.usersLabelRender(usersList, foundMyReaction));

        return components;
    }

    render() {
        return (
            this.props.reactions && this.props.reactions.length > 0 ? (
                <ReactionsWrapper className="reactions-wrapper">
                    <ReactionsInner>
                        {this.reactionsRender()}
                    </ReactionsInner>
                    <ReactionComponent messageId={this.props.messageId} marginTop={6} marginLeft={10} />
                </ReactionsWrapper>
            ) : null
        );
    }
}