import * as React from 'react';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import { XMutation } from 'openland-x/XMutation';
import { PostIntroModal } from './PostIntroModal';
import { ReactionsRender } from './IntroReactionsRender';
import { niceBytes } from '../../MessageFileComponent';
import { MessageTextComponent } from '../../MessageTextComponent';
import { XOverflow } from '../../../../../XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { withSetReaction, withChangeReaction } from '../../../../../../api/withSetReaction';
import IntroIcon from 'openland-icons/ic-tag-intro.svg';
import IcFile from 'openland-icons/ic-file.svg';
import {
    SharedRoomKind,
    MessageFull_reactions,
    MessageFull_urlAugmentation_extra_User,
    MessageFull_fileMetadata,
    MessageFull_urlAugmentation,
} from 'openland-api/Types';
import { XMemo } from 'openland-y-utils/XMemo';

const SetReactionButton = withSetReaction(props => (
    <XMutation mutation={props.setReaction}>{props.children}</XMutation>
)) as React.ComponentType<{
    variables: { messageId: string; reaction: string };
    children: any;
}>;

interface ChangeReactionButtonProps {
    messageId: string;
    children: any;
    unset: string;
    set: string;
}

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
)) as React.ComponentType<ChangeReactionButtonProps>;

interface MessageIntroComponentProps {
    urlAugmentation: MessageFull_urlAugmentation;
    file: string | null;
    fileMetadata: MessageFull_fileMetadata | null;
    user: MessageFull_urlAugmentation_extra_User;
    reactions: MessageFull_reactions[];
    messageId: string;
    meId: string;
    senderId: string;
    conversationType?: SharedRoomKind | 'PRIVATE';
}

export const MessageIntroComponent = XMemo<MessageIntroComponentProps>(props => {
    const {
        user,
        file,
        fileMetadata,
        urlAugmentation,
        messageId,
        meId,
        senderId,
        reactions,
    } = props;

    let fileData = null;
    let filePath = undefined;

    if (file && fileMetadata) {
        fileData = {
            uuid: file,
            name: fileMetadata.name,
            size: fileMetadata.size.toString(),
        };
        filePath = `'https://ucarecdn.com/'${file}/${fileMetadata.name}`;
    }

    const accept = reactions.find(r => r.user.id === meId && r.reaction === 'accept');
    const pass = reactions.find(r => r.user.id === meId && r.reaction === 'pass');

    let usrPath = undefined;

    if (user && (accept || meId === senderId)) {
        usrPath = '/mail/u/' + user.id;
    }

    return (
        <XView flexDirection="column" paddingTop={4} paddingBottom={4} maxWidth={550}>
            <XView
                flexDirection="column"
                borderColor="#ececec"
                borderWidth={1}
                borderRadius={10}
                overflow="hidden"
                position="relative"
                backgroundColor="#fcfcfc"
            >
                <XView paddingTop={16} paddingBottom={16} paddingLeft={20} paddingRight={16}>
                    {user && (
                        <XView
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection="row"
                        >
                            <XView alignItems="center" flexDirection="row" marginRight={16}>
                                <XAvatar
                                    path={usrPath}
                                    objectId={user.id}
                                    objectName={user.name}
                                    photoRef={urlAugmentation.photo || undefined}
                                    style="colorus"
                                />
                                <XView flexDirection="column" marginLeft={12}>
                                    <XView
                                        as="a"
                                        path={usrPath}
                                        fontSize={14}
                                        fontWeight="600"
                                        lineHeight={1.43}
                                        color="#121e2b"
                                        cursor={usrPath ? 'pointer' : undefined}
                                        hoverColor={usrPath ? '#1790ff' : '#121e2b'}
                                        hoverTextDecoration="none"
                                    >
                                        {user.name}
                                    </XView>
                                    {user.primaryOrganization && (
                                        <XView
                                            fontSize={12}
                                            fontWeight="600"
                                            color="rgba(18, 30, 43, 0.5)"
                                            marginTop={-2}
                                        >
                                            {user.primaryOrganization.name}
                                        </XView>
                                    )}
                                </XView>
                            </XView>
                            <XView alignItems="center" flexDirection="row">
                                <XView
                                    alignItems="center"
                                    flexDirection="row"
                                    height={24}
                                    borderRadius={14}
                                    backgroundColor="rgba(23, 144, 255, 0.1)"
                                    paddingLeft={10}
                                    paddingRight={14}
                                    marginRight={5}
                                >
                                    <IntroIcon />
                                    <XView
                                        fontSize={12}
                                        fontWeight="600"
                                        color="#1790ff"
                                        marginLeft={5}
                                    >
                                        Intro
                                    </XView>
                                </XView>
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
                                            <XMenuItem path={usrPath}>View profile</XMenuItem>
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
                            </XView>
                        </XView>
                    )}
                    {urlAugmentation.description && (
                        <XView marginTop={12} flexShrink={0}>
                            <MessageTextComponent
                                message={urlAugmentation.description}
                                isEdited={false}
                            />
                        </XView>
                    )}
                </XView>
                {fileData && (
                    <XView flexDirection="column">
                        <XView width="100%" height={1} flexShrink={0} backgroundColor="#eef0f2" />
                        <XView
                            as="a"
                            href={filePath}
                            alignItems="center"
                            height={40}
                            paddingLeft={22}
                            flexDirection="row"
                            color="rgba(18, 30, 43, 0.46)"
                            hoverColor="#1790ff"
                            hoverTextDecoration="none"
                        >
                            <IcFile />
                            <XView fontSize={13} fontWeight="600" lineHeight={1.54} marginLeft={8}>
                                {fileData.name}({niceBytes(Number(fileData.size))})
                            </XView>
                        </XView>
                    </XView>
                )}
            </XView>
            <ReactionsRender
                user={user}
                meId={meId}
                senderId={senderId}
                reactions={reactions}
                messageId={messageId}
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
        </XView>
    );
});
