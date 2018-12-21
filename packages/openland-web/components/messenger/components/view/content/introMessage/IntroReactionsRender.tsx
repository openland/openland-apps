import * as React from 'react';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { XMutation } from 'openland-x/XMutation';
import CheckIconSmall from 'openland-icons/ic-check-small.svg';
import { withRouter } from 'openland-x-routing/withRouter';
import { withSetReaction } from '../../../../../../api/withSetReaction';
import PassedIcon from 'openland-icons/ic-passed.svg';
import {
    SharedRoomKind,
    MessageFull_reactions,
    MessageFull_urlAugmentation_user_User
} from 'openland-api/Types';

const SetAccesReactionButton = withSetReaction(
    withRouter(props => (
        <XMutation
            mutation={props.setReaction}
            onSuccess={() => props.router.replace('/mail/' + (props as any).userId)}
        >
            {props.children}
        </XMutation>
    )),
) as React.ComponentType<{
    variables: { messageId: string; reaction: string };
    children: any;
    userId: string;
}>;

interface CounterProps {
    alignSelf?: "center" | "stretch" | "flex-end" | "flex-start" | null | undefined;
    accepted: boolean;
    icon: any;
    text: string;
    marginTop?: number;
}

const Counter = (props: CounterProps) => (
    <XView
        alignSelf={props.alignSelf}
        flexDirection="row"
        alignItems="center"
        height={22}
        borderRadius={16}
        backgroundColor={props.accepted ? '#e6f7e6' : '#f6f6f6'}
        paddingLeft={10}
        paddingRight={10}
        marginTop={props.marginTop}
    >
        {props.icon}
        <XView
            opacity={props.accepted ? 0.7 : 0.5}
            fontSize={12}
            fontWeight="600"
            color={props.accepted ? '#65b969' : '#000'}
            marginLeft={5}
        >
            {props.text}
        </XView>
    </XView>
);

interface ReactionsRenderProps {
    user: MessageFull_urlAugmentation_user_User;
    reactions: MessageFull_reactions[];
    messageId: string;
    meId: string;
    senderId: string;
    conversationType?: SharedRoomKind | 'PRIVATE';
}

export const ReactionsRender = React.memo<ReactionsRenderProps>(props => {
    let { user, reactions, meId, senderId, conversationType, messageId } = props;
    let reactionsMap = {};
    let reactionsLength = reactions.length;

    for (let i = 0; i < reactionsLength; i++) {
        let reaction = reactions[i];

        if (!reactionsMap[reaction.reaction]) {
            reactionsMap[reaction.reaction] = [];
        }
        reactionsMap[reaction.reaction].push(reaction);
    }
    let acceptLength = 0;
    if ((reactionsMap as any).accept && (reactionsMap as any).accept.length) {
        acceptLength = (reactionsMap as any).accept.length;
    }

    if (senderId === meId) {
        if (conversationType === null) {
            if (reactionsLength > 0) {
                if (reactions[0].reaction === 'pass') {
                    return null;
                } else {
                    return (
                        <Counter
                            alignSelf="flex-end"
                            accepted={true}
                            icon={<CheckIconSmall />}
                            text="Accepted"
                            marginTop={12}
                        />
                    );
                }
            } else {
                return null;
            }
        } else if (conversationType !== null) {
            if (reactionsLength > 0 && acceptLength > 0) {
                return (
                    <Counter
                        alignSelf="flex-end"
                        accepted={true}
                        icon={<CheckIconSmall />}
                        text={`${acceptLength} accepted`}
                        marginTop={12}
                    />
                );
            } else {
                return null;
            }
        } else {
            return null;
        }
    } else if (senderId !== meId) {
        if (reactions.find(r => r.user.id === meId && r.reaction === 'pass')) {
            return (
                <XView
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="row"
                    marginTop={12}
                >
                    <Counter
                        accepted={false}
                        icon={<PassedIcon />}
                        text="You passed"
                    />
                    {reactionsLength > 0 &&
                        conversationType !== null &&
                        acceptLength > 0 && (
                            <Counter
                                accepted={true}
                                icon={<CheckIconSmall />}
                                text={`${acceptLength} accepted`}
                            />
                        )}
                </XView>
            );
        } else if (reactions.find(r => r.user.id === meId && r.reaction === 'accept')) {
            return (
                <XView
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="row"
                    marginTop={12}
                >
                    {reactionsLength > 0 &&
                        acceptLength > 0 && (
                            <Counter
                                accepted={true}
                                icon={<CheckIconSmall />}
                                text={acceptLength === 1 ? 'You accepted' : `You + ${acceptLength - 1} accepted`}
                            />
                        )}
                </XView>
            );
        } else {
            return (
                <XView
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="row"
                    marginTop={12}
                >
                    <SetAccesReactionButton
                        variables={{
                            messageId: messageId,
                            reaction: 'accept',
                        }}
                        userId={user!.id}
                    >
                        <XButton text="Accept intro" style="primary" alignSelf="flex-start" />
                    </SetAccesReactionButton>
                    {reactionsLength > 0 &&
                        acceptLength > 0 && (
                            <Counter
                                accepted={true}
                                icon={<CheckIconSmall />}
                                text={`${acceptLength} accepted`}
                            />
                        )}
                </XView>
            );
        }
    } else {
        return null;
    }
});