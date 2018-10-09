import * as React from 'react';
import Glamorous from 'glamorous';
import { MessageFull_reactions } from 'openland-api/Types';
import { XPopper } from 'openland-x/XPopper';
import { Picker } from 'emoji-mart';
import { MutationFunc } from 'react-apollo';
import { withSetReaction, withUnsetReaction } from '../../../../api/withSetReaction';
import ReactionIcon from '../icons/ic-reaction.svg';

const CustomContentDiv = Glamorous(XPopper.Content)({
    padding: 0,
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
});

const ReactionButton = Glamorous.div<{marginTop?: number}>(props => ({
    display: 'flex',
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    marginTop: props.marginTop,
    '&:hover svg > g': {
        fill: '#1790ff'
    }
}));

class ReactionComponentInner extends React.PureComponent<{ messageId: string, marginTop?: number, mutation: MutationFunc<{}> }> {

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
                        onSelect={(emj) => this.handleSetReaction(emj)}
                    />
                )}
                show={this.state.show}
                placement="bottom-end"
                animation={null}
                onClickOutside={this.onClickOutside}
                contentContainer={(
                    <CustomContentDiv />
                )}
            >
                <ReactionButton onClick={this.switch} marginTop={this.props.marginTop}>
                    <ReactionIcon />
                </ReactionButton>
            </XPopper>
        );
    }
}

export const ReactionComponent = withSetReaction((props) => (
    <ReactionComponentInner mutation={props.setReaction} messageId={(props as any).messageId} marginTop={(props as any).marginTop} />
)) as React.ComponentType<{ messageId: string, marginTop?: number }>;

const ReactionsWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
});

const ReactionItem = Glamorous.div<{ isMy: boolean }>(props => ({
    display: 'flex',
    alignItems: 'center',
    height: 26,
    borderRadius: 15,
    paddingLeft: 6,
    paddingRight: 6,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    lineHeight: 1.95,
    color: props.isMy ? '#1790ff' : '#4A4A4A',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }
}));

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
    reactionsRender = () => {
        let { reactions, meId } = this.props;
        let reactionsMap = {};
        let components = [];

        for (let i = 0; i < reactions.length; i++) {
            let reaction = reactions[i];

            if (!reactionsMap[reaction.reaction]) {
                reactionsMap[reaction.reaction] = [];
            }
            reactionsMap[reaction.reaction].push(reaction);
        }

        for (let k in reactionsMap) {
            if (reactionsMap[k].find((r: any) => r.user.id === meId)) {
                components.push(
                    <SingleReactionUnset
                        messageId={this.props.messageId}
                        reaction={reactionsMap[k][0].reaction}
                        key={'reaction' + reactionsMap[k][0].reaction}
                        isMy={true}
                    >
                        {reactionsMap[k][0].reaction + reactionsMap[k].length}
                    </SingleReactionUnset>
                );
            } else {
                components.push(
                    <SingleReactionSet
                        messageId={this.props.messageId}
                        reaction={reactionsMap[k][0].reaction}
                        key={'reaction' + reactionsMap[k][0].reaction}
                        isMy={false}
                    >
                        {reactionsMap[k][0].reaction + reactionsMap[k].length}
                    </SingleReactionSet>
                );
            }
        }

        return components;
    }
    render() {
        return (
            this.props.reactions && this.props.reactions.length > 0 ? (
                <ReactionsWrapper>
                    {this.reactionsRender()}
                    <ReactionComponent messageId={this.props.messageId} marginTop={2} />
                </ReactionsWrapper>
            ) : null
        );
    }
}