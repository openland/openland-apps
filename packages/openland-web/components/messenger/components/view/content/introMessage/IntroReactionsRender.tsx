import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
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

const Counter = Glamorous.div<{ alignSelf?: string; accepted: boolean }>(props => ({
    display: 'flex',
    alignItems: 'center',
    alignSelf: props.alignSelf,
    height: 22,
    borderRadius: 16,
    backgroundColor: props.accepted ? '#e6f7e6' : '#f6f6f6',
    paddingLeft: 10,
    paddingRight: 10,
    '& svg': {
        marginRight: 5,
    },
    '& span': {
        opacity: props.accepted ? 0.7 : 0.5,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: -0.2,
        color: props.accepted ? '#65b969' : '#000',
    },
}));

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
                        <Counter alignSelf="flex-end" accepted={true}>
                            <CheckIconSmall />
                            <span>Accepted</span>
                        </Counter>
                    );
                }
            } else {
                return null;
            }
        } else if (conversationType !== null) {
            if (reactionsLength > 0 && acceptLength > 0) {
                return (
                    <Counter alignSelf="flex-end" accepted={true}>
                        <CheckIconSmall />
                        <span>{acceptLength} accepted</span>
                    </Counter>
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
                <XHorizontal justifyContent="space-between" alignItems="center">
                    <Counter accepted={false}>
                        <PassedIcon />
                        <span>You passed</span>
                    </Counter>
                    {reactionsLength > 0 &&
                        conversationType !== null &&
                        acceptLength > 0 && (
                            <Counter accepted={true}>
                                <CheckIconSmall />
                                <span>{acceptLength} accepted</span>
                            </Counter>
                        )}
                </XHorizontal>
            );
        } else if (reactions.find(r => r.user.id === meId && r.reaction === 'accept')) {
            return (
                <XHorizontal justifyContent="space-between" alignItems="center">
                    {reactionsLength > 0 &&
                        acceptLength > 0 && (
                            <Counter accepted={true}>
                                <CheckIconSmall />
                                {acceptLength === 1 ? (
                                    <span>You accepted</span>
                                ) : (
                                        <span>You + {acceptLength - 1} accepted</span>
                                    )}
                            </Counter>
                        )}
                </XHorizontal>
            );
        } else {
            return (
                <XHorizontal justifyContent="space-between" alignItems="center">
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
                            <Counter accepted={true}>
                                <CheckIconSmall />
                                <span>{acceptLength} accepted</span>
                            </Counter>
                        )}
                </XHorizontal>
            );
        }
    } else {
        return null;
    }
});