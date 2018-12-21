import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XLink } from 'openland-x/XLink';
import { XMutation } from 'openland-x/XMutation';
import { PostIntroModal } from './PostIntroModal';
import { ReactionsRender } from './IntroReactionsRender';
import { XOverflow } from '../../../../../Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { withSetReaction, withChangeReaction } from '../../../../../../api/withSetReaction';
import IntroIcon from 'openland-icons/ic-tag-intro.svg';
import { 
    SharedRoomKind, 
    MessageFull_reactions, 
    MessageFull_urlAugmentation_user_User, 
    MessageFull_fileMetadata, 
    MessageFull_urlAugmentation 
} from 'openland-api/Types';

const SetReactionButton = withSetReaction(props => (
    <XMutation mutation={props.setReaction}>{props.children}</XMutation>
)) as React.ComponentType<{
    variables: { messageId: string; reaction: string };
    children: any;
}>;

const ChangeReactionButton = withChangeReaction(props => (
    <XMutation
        action={async () => {
            await props.switch({
                variables: {
                    messageId: (props as any).messageId,
                    from: (props as any).unset,
                    to: (props as any).set,
                },
            });
        }}
    >
        {props.children}
    </XMutation>
)) as React.ComponentType<{
    messageId: string;
    children: any;
    unset: string;
    set: string;
}>;

const Wrapper = Glamorous(XVertical)({
    paddingTop: 4,
    paddingBottom: 4,
    maxWidth: 550,
});

const Root = Glamorous(XVertical)({
    border: '1px solid #ececec',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#fcfcfc',
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
    paddingRight: 14,
});

const UserName = Glamorous(XLink)(props => ({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#121e2b',
    cursor: props.path ? 'pointer' : 'text !important',
    '&:hover': {
        color: props.path ? '#1790ff' : '#121e2b',
    },
}));

const OrgName = Glamorous.div({
    opacity: 0.5,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#121e2b',
});

const AboutText = Glamorous.div({
    display: 'inline',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    opacity: 0.9,
    fontSize: 14,
    lineHeight: 1.5,
    letterSpacing: -0.2,
    color: '#121e2b',
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
        color: '#121e2b',
    },
    '&:hover span': {
        opacity: 1,
        color: '#1790ff',
    },
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: "url('/static/X/file.svg')",
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

    return x.toFixed(x >= 10 || l < 1 ? 0 : 1) + ' ' + units[l];
}

interface MessageIntroComponentProps {
    urlAugmentation: MessageFull_urlAugmentation;
    file: string | null;
    fileMetadata: MessageFull_fileMetadata | null;
    user: MessageFull_urlAugmentation_user_User;
    reactions: MessageFull_reactions[];
    messageId: string;
    meId: string;
    senderId: string;
    conversationType?: SharedRoomKind | 'PRIVATE';
}

export class MessageIntroComponent extends React.Component<MessageIntroComponentProps> {
    render() {
        const {
            user,
            file,
            fileMetadata,
            urlAugmentation,
            messageId,
            meId,
            senderId,
            reactions,
        } = this.props;

        let fileData = null;

        if (file && fileMetadata) {
            fileData = {
                uuid: file,
                name: fileMetadata ? fileMetadata.name : null,
                size: fileMetadata ? fileMetadata.size.toString() : null,
            };
        }

        const accept = reactions.find(r => r.user.id === meId && r.reaction === 'accept');
        const pass = reactions.find(r => r.user.id === meId && r.reaction === 'pass');

        return (
            <Wrapper separator={6}>
                <Root separator={0}>
                    <Container separator={6}>
                        {user && (
                            <XHorizontal justifyContent="space-between" alignItems="center">
                                <XHorizontal separator={6} alignItems="center">
                                    <XAvatar
                                        path={
                                            accept || meId === senderId
                                                ? '/mail/u/' + user.id
                                                : undefined
                                        }
                                        objectId={user.id}
                                        objectName={user.name}
                                        photoRef={urlAugmentation.photo || undefined}
                                        style="colorus"
                                    />
                                    <XVertical separator={-1}>
                                        <UserName
                                            path={
                                                accept || meId === senderId
                                                    ? '/mail/u/' + user.id
                                                    : undefined
                                            }
                                        >
                                            {user.name}
                                        </UserName>
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
                                                {accept ? (
                                                    <ChangeReactionButton
                                                        messageId={messageId}
                                                        unset="accept"
                                                        set="pass"
                                                    >
                                                        <XMenuItem>Pass</XMenuItem>
                                                    </ChangeReactionButton>
                                                ) : null}
                                                {pass ? (
                                                    <ChangeReactionButton
                                                        messageId={messageId}
                                                        unset="pass"
                                                        set="accept"
                                                    >
                                                        <XMenuItem>Accept</XMenuItem>
                                                    </ChangeReactionButton>
                                                ) : null}
                                                {!reactions.find(r => r.user.id === meId) &&
                                                    meId !== senderId && (
                                                        <SetReactionButton
                                                            variables={{
                                                                messageId: messageId,
                                                                reaction: 'pass',
                                                            }}
                                                        >
                                                            <XMenuItem>Pass</XMenuItem>
                                                        </SetReactionButton>
                                                    )}
                                                <XMenuItem path={'/mail/u/' + user.id}>
                                                    View profile
                                                </XMenuItem>
                                                {meId === senderId && (
                                                    <>
                                                        <XMenuItem
                                                            query={{
                                                                field: 'editItro' + messageId,
                                                                value: 'true',
                                                            }}
                                                        >
                                                            Edit
                                                        </XMenuItem>
                                                        <XMenuItem
                                                            style="danger"
                                                            query={{
                                                                field: 'deleteMessage',
                                                                value: messageId,
                                                            }}
                                                        >
                                                            Delete
                                                        </XMenuItem>
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
                    {file &&
                        fileMetadata && (
                            <FileButton
                                href={
                                    'https://ucarecdn.com/' +
                                    file +
                                    '/' +
                                    (fileMetadata.name ? fileMetadata.name!! : '')
                                }
                            >
                                <XHorizontal separator={4} alignItems="center">
                                    <FileImage />
                                    <span>
                                        {fileMetadata.name}({niceBytes(fileMetadata.size)})
                                    </span>
                                </XHorizontal>
                            </FileButton>
                        )}
                </Root>
                <ReactionsRender
                    user={this.props.user}
                    meId={this.props.meId}
                    senderId={this.props.senderId}
                    reactions={this.props.reactions}
                    messageId={this.props.messageId}
                />
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
