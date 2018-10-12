import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XMutation } from 'openland-x/XMutation';
import { PostIntroModal } from './PostIntroModal';
import CheckIconSmall from '../../icons/ic-check-small.svg';
import { XOverflow } from '../../../../Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { withRouter } from 'openland-x-routing/withRouter';
import { withSetReaction, withChangeReaction } from '../../../../../api/withSetReaction';
import IntroIcon from '../../icons/ic-tag-intro.svg';
import PassedIcon from '../../icons/ic-passed.svg';

const SetAccesReactionButton = withSetReaction(withRouter((props) => (
    <XMutation mutation={props.setReaction} onSuccess={() => props.router.replace('/mail/' + (props as any).userId)}>
        {props.children}
    </XMutation>
))) as React.ComponentType<{ variables: { messageId: string, reaction: string }, children: any, userId: string }>;

const SetReactionButton = withSetReaction((props) => (
    <XMutation mutation={props.setReaction}>
        {props.children}
    </XMutation>
)) as React.ComponentType<{ variables: { messageId: string, reaction: string }, children: any }>;

const ChangeReactionButton = withChangeReaction((props) => (
    <XMutation
        action={async () => {
            await props.unsetReaction({
                variables: {
                    messageId: (props as any).messageId,
                    reaction: (props as any).unset
                }
            });
            await props.setReaction({
                variables: {
                    messageId: (props as any).messageId,
                    reaction: (props as any).set
                }
            });
        }}
    >
        {props.children}
    </XMutation>
)) as React.ComponentType<{ messageId: string, children: any, unset: string, set: string }>;

const Wrapper = Glamorous(XVertical)({
    paddingTop: 4,
    paddingBottom: 4,
    maxWidth: 550
});

const Root = Glamorous(XVertical)({
    border: '1px solid #ececec',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fcfcfc'
});

const Container = Glamorous(XVertical)({
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 16,
});

const IntroTag = Glamorous(XHorizontal)({
    height: 24,
    borderRadius: 14,
    backgroundColor: 'rgba(23, 144, 255, 0.1)',
    fontSize: 12,
    fontWeight: 600,
    color: '#1790ff',
    paddingLeft: 10,
    paddingRight: 14
});

const UserName = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const OrgName = Glamorous.div({
    opacity: 0.5,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const AboutText = Glamorous.div({
    display: 'inline',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    opacity: 0.9,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: -0.2,
    color: '#121e2b'
});

const FileButton = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    height: 40,
    paddingLeft: 22,
    borderTop: '1px solid #eef0f2',
    '& span': {
        opacity: 0.45,
        fontSize: 13,
        fontWeight: 500,
        lineHeight: 1.54,
        letterSpacing: -0.4,
        color: '#121e2b'
    },
    '&:hover span': {
        opacity: 1,
        color: '#1790ff'
    }
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: 'url(\'/static/X/file.svg\')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

function niceBytes(x: number | undefined) {

    if (x === undefined) {
        return;
    }

    let l = 0;

    while (x >= 1024 && ++l) {
        x = x / 1024;
    }

    return (x.toFixed(x >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
}

interface MessageIntroComponentProps {
    urlAugmentation: {
        url: string,
        title: string | null,
        date: string | null,
        subtitle: string | null,
        description: string | null,
        photo: {
            uuid: string,
            crop: {
                x: number,
                y: number,
                w: number,
                h: number,
            } | null,
        } | null
    };
    file: string | null;
    fileMetadata: {
        name: string,
        mimeType: string | null,
        isImage: boolean,
        imageWidth: number | null,
        imageHeight: number | null,
        imageFormat: string | null,
        size: number
    } | null;
    user: {
        id: string,
        name: string,
        photo: string | null,
        primaryOrganization: {
            id?: string | null,
            name?: string | null,
        } | null
    } | null;
    reactions: {
        user: {
            id: string
        },
        reaction: string
    }[];
    messageId: string;
    meId: string;
    senderId: string;
    conversationType?: string;
}

const Counter = Glamorous.div<{ alignSelf?: string, accepted: boolean }>(props => ({
    display: 'flex',
    alignItems: 'center',
    alignSelf: props.alignSelf,
    height: 22,
    borderRadius: 16,
    backgroundColor: props.accepted ? '#e6f7e6' : '#f6f6f6',
    paddingLeft: 10,
    paddingRight: 10,
    '& svg': {
        marginRight: 5
    },
    '& span': {
        opacity: props.accepted ? 0.7 : 0.5,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: -0.2,
        color: props.accepted ? '#65b969' : '#000'
    }
}));

export class MessageIntroComponent extends React.Component<MessageIntroComponentProps> {

    renderReactions() {
        let { user, reactions, meId, senderId, conversationType, messageId } = this.props;
        let reactionsMap = {};

        for (let i = 0; i < reactions.length; i++) {
            let reaction = reactions[i];

            if (!reactionsMap[reaction.reaction]) {
                reactionsMap[reaction.reaction] = [];
            }
            reactionsMap[reaction.reaction].push(reaction);
        }

        if (senderId === meId) {
            if (conversationType === 'PrivateConversation') {
                if (reactions.length > 0) {
                    if (reactions[0].reaction === 'pass') {
                        return null;
                    } else {
                        return (
                            <Counter alignSelf="flex-start" accepted={true}>
                                <CheckIconSmall />
                                <span>accepted</span>
                            </Counter>
                        );
                    }
                } else {
                    return null;
                }
            } else if (conversationType !== 'PrivateConversation') {
                if (reactions.length > 0 && (reactionsMap as any).accept && (reactionsMap as any).accept.length > 0) {
                    return (
                        <Counter alignSelf="flex-end" accepted={true}>
                            <CheckIconSmall />
                            <span>{(reactionsMap as any).accept.length} accepted</span>
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
                        {(reactions.length > 0 && conversationType !== 'PrivateConversation' && (reactionsMap as any).accept && (reactionsMap as any).accept.length > 0) && (
                            <Counter accepted={true}>
                                <CheckIconSmall />
                                <span>{(reactionsMap as any).accept.length} accepted</span>
                            </Counter>
                        )}
                    </XHorizontal>
                );
            } else if (reactions.find(r => r.user.id === meId && r.reaction === 'accept')) {
                return (
                    <XHorizontal justifyContent="space-between" alignItems="center">
                        {(reactions.length > 0 && (reactionsMap as any).accept && (reactionsMap as any).accept.length > 0) && (
                            <Counter accepted={true}>
                                <CheckIconSmall />
                                {(reactionsMap as any).accept.length === 1 ?
                                    (
                                        <span>You accepted</span>
                                    ) : (
                                        <span>You + {(reactionsMap as any).accept.length - 1} accepted</span>
                                    )
                                }
                            </Counter>
                        )}
                    </XHorizontal>
                );
            } else {
                return (
                    <XHorizontal justifyContent="space-between" alignItems="center">
                        <SetAccesReactionButton variables={{ messageId: messageId, reaction: 'accept' }} userId={user!.id}>
                            <XButton
                                text="Accept intro"
                                style="primary-sky-blue"
                                size="r-default"
                                alignSelf="flex-start"
                            />
                        </SetAccesReactionButton>
                        {(reactions.length > 0 && (reactionsMap as any).accept && (reactionsMap as any).accept.length > 0) && (
                            <Counter accepted={true}>
                                <CheckIconSmall />
                                <span>{(reactionsMap as any).accept.length} accepted</span>
                            </Counter>
                        )}
                    </XHorizontal>
                );
            }
        } else {
            return null;
        }
    }

    render() {
        const { user, file, fileMetadata, urlAugmentation, messageId, meId, senderId, reactions } = this.props;

        let fileData = null;

        if (file && fileMetadata) {
            fileData = {
                uuid: file,
                name: (fileMetadata ? fileMetadata.name : null),
                size: (fileMetadata ? fileMetadata.size.toString() : null)
            };
        }

        return (
            <Wrapper separator={6}>
                <Root separator={0}>
                    <Container separator={6}>
                        {user && (
                            <XHorizontal justifyContent="space-between" alignItems="center">
                                <XHorizontal separator={6} alignItems="center">
                                    <XAvatar
                                        objectId={user.id}
                                        objectName={user.name}
                                        photoRef={urlAugmentation.photo || undefined}
                                        style="colorus"
                                    />
                                    <XVertical separator={-1}>
                                        <UserName>{user.name}</UserName>
                                        {user.primaryOrganization && (
                                            <OrgName>{user.primaryOrganization.name}</OrgName>
                                        )}
                                    </XVertical>
                                </XHorizontal>
                                <XHorizontal separator={2.5} alignItems="center">
                                    <IntroTag separator={2.5} alignItems="center">
                                        <IntroIcon />
                                        <span>Intro</span>
                                    </IntroTag>
                                    <XOverflow
                                        flat={true}
                                        placement="bottom-end"
                                        content={
                                            <>
                                                {reactions.find(r => r.user.id === meId && r.reaction === 'accept') ? (
                                                    <ChangeReactionButton messageId={messageId} unset="accept" set="pass">
                                                        <XMenuItem style="primary-sky-blue">Pass</XMenuItem>
                                                    </ChangeReactionButton>
                                                ) : null}
                                                {reactions.find(r => r.user.id === meId && r.reaction === 'pass') ? (
                                                    <ChangeReactionButton messageId={messageId} unset="pass" set="accept">
                                                        <XMenuItem style="primary-sky-blue">Accept</XMenuItem>
                                                    </ChangeReactionButton>
                                                ) : null}
                                                {!reactions.find(r => r.user.id === meId) && (meId !== senderId) && (
                                                    <SetReactionButton variables={{ messageId: messageId, reaction: 'pass' }}>
                                                        <XMenuItem style="primary-sky-blue">Pass</XMenuItem>
                                                    </SetReactionButton>
                                                )}
                                                <XMenuItem style="primary-sky-blue" path={'/mail/u/' + user.id}>View profile</XMenuItem>
                                                <XMenuItem style="primary-sky-blue" path={'/mail/' + user.id}>Direct chat</XMenuItem>
                                                {meId === senderId && (
                                                    <>
                                                        <XMenuItem style="primary-sky-blue" query={{ field: ('editItro' + messageId), value: 'true' }}>Edit</XMenuItem>
                                                        <XMenuItem style="danger" query={{ field: 'deleteMessage', value: messageId }}>Delete</XMenuItem>
                                                    </>
                                                )}
                                            </>
                                        }
                                    />
                                </XHorizontal>
                            </XHorizontal>
                        )}
                        {urlAugmentation.description && (
                            <AboutText>{urlAugmentation.description}</AboutText>
                        )}
                    </Container>
                    {(file && fileMetadata) && (
                        <FileButton href={'https://ucarecdn.com/' + file + '/' + (fileMetadata.name ? fileMetadata.name!! : '')}>
                            <XHorizontal separator={4} alignItems="center">
                                <FileImage />
                                <span>{fileMetadata.name}({niceBytes(fileMetadata.size)})</span>
                            </XHorizontal>
                        </FileButton>
                    )}
                </Root>
                {this.renderReactions()}
                {meId === senderId && (
                    <PostIntroModal
                        targetQuery={'editItro' + messageId}
                        messageId={messageId}
                        about={urlAugmentation.description || ''}
                        file={fileData}
                        user={user}
                    />
                )}
            </Wrapper>
        );
    }
}