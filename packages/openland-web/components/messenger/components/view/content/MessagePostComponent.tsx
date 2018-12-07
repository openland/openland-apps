import * as React from 'react';
import Glamorous from 'glamorous';
import {
    MessageFull_alphaAttachments,
    MessageFull_alphaButtons,
    MessageFull_reactions
} from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { XMutation } from 'openland-x/XMutation';
import { MessageTextComponent } from './MessageTextComponent';
import { niceBytes } from '../../view/content/MessageFileComponent';
import { withRespondPostMessage } from '../../../../../api/withRespondPostMessage';
import {
    withSetReaction,
    withUnsetReaction,
} from '../../../../../api/withSetReaction';
import ReplyIcon from '../../icons/ic-reply1.svg';
import ReactionIcon from '../../icons/ic-reactions.svg';

const Wrapper = Glamorous(XVertical)({
    paddingTop: 4,
    paddingBottom: 4
});

const Root = Glamorous(XVertical)({
    border: '1px solid #ececec',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative'
});

const Container = Glamorous(XVertical)({
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
});

const PostTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.8)'
});

const FilesWrapper = Glamorous(XVertical)({
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderTop: '1px solid #ececec'
});

const FileItem = Glamorous(XLink)({
    opacity: 0.5,
    fontSize: 13,
    lineHeight: 1.54,
    color: '#000',
    '&:hover': {
        '& .icon': {
            opacity: 0.5
        },
        opacity: 1,
        color: '#1790ff'
    }
});

const FileImage = Glamorous.div({
    width: 11,
    height: 14,
    flexShrink: 0,
    backgroundImage: "url('/static/X/file.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
});

const CoverWrapper = Glamorous.div({
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    flexShrink: 0,
    width: 134,
    height: 134,
    '& > img': {
        display: 'block'
    }
});

const RespondWrapper = Glamorous(XHorizontal)({
    cursor: 'pointer',
    height: 23,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 6,
    '&:hover': {
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    '&:hover.like svg > path': {
        fill: '#d75454',
        opacity: 1
    },
    '& > div': {
        opacity: 0.3,
        fontSize: 13,
        color: '#000'
    },
    '&.active > div': {
        opacity: 0.8
    },
    '&.active svg > path': {
        fill: '#d75454',
        opacity: 1
    }
});

const SetLike = withSetReaction(props => (
    <XMutation
        action={async () => {
            await props.setReaction({
                variables: {
                    messageId: (props as any).messageId,
                    reaction: 'like'
                }
            });
        }}
    >
        {props.children}
    </XMutation>
)) as React.ComponentType<{ messageId: string, children: any }>;

const UnsetLike = withUnsetReaction(props => (
    <XMutation
        action={async () => {
            await props.unsetReaction({
                variables: {
                    messageId: (props as any).messageId,
                    reaction: 'like'
                }
            });
        }}
    >
        {props.children}
    </XMutation>
)) as React.ComponentType<{ messageId: string, children: any }>;

const RespondPost = withRespondPostMessage(props => (
    <XMutation
        action={async () => {
            await props.respondPostMessage({
                variables: {
                    messageId: (props as any).messageId,
                    buttonId: (props as any).buttonId,
                    reaction: 'respondPost'
                }
            });
        }}
        onSuccess={() =>
            props.router.replace('/mail/' + (props as any).userId)
        }
    >
        {props.children}
    </XMutation>
)) as React.ComponentType<{
    messageId: string;
    buttonId: string;
    children: any;
    userId: string;
}>;

interface MessagePostComponentProps {
    messageId: string;
    userId: string;
    meId: string;
    message: string;
    alphaTitle: string;
    alphaButtons: (MessageFull_alphaButtons[] | null)[];
    alphaAttachments: MessageFull_alphaAttachments[];
    reactions: MessageFull_reactions[];
    edited: boolean;
}

export class MessagePostComponent extends React.PureComponent<MessagePostComponentProps> {
    render() {
        let { props } = this;
        let cover: MessageFull_alphaAttachments[] | MessageFull_alphaAttachments | null = null;
        let moreFiles: MessageFull_alphaAttachments[] | null = null;

        if (props.alphaAttachments.length > 0) {
            cover = props.alphaAttachments.filter(i => i.fileMetadata && i.fileMetadata.isImage);
            if (cover[0]) {
                cover = cover[0]
            }
            if ((cover as MessageFull_alphaAttachments).fileId) {
                moreFiles = props.alphaAttachments.filter(i => i.fileId !== (cover as MessageFull_alphaAttachments).fileId);
            }
        }

        let { reactions } = props;

        let respondUsers = reactions.filter(i => i.reaction === 'respondPost');
        let likesUsers = reactions.filter(i => i.reaction === 'like');
        let meLike = likesUsers.find(i => i.user.id === props.meId)

        return (
            <Wrapper flexGrow={1} separator={6}>
                <Root>
                    <Container>
                        <XHorizontal justifyContent="space-between" separator={9}>
                            <XVertical separator={3} flexGrow={1}>
                                <PostTitle>{props.alphaTitle}</PostTitle>
                                <MessageTextComponent
                                    message={props.message}
                                    mentions={null}
                                    isEdited={false}
                                    isService={false}
                                />
                            </XVertical>
                            {cover && (cover as MessageFull_alphaAttachments).fileId && (
                                <CoverWrapper>
                                    <XCloudImage
                                        srcCloud={'https://ucarecdn.com/' + (cover as MessageFull_alphaAttachments).fileId + '/'}
                                        resize={'fill'}
                                        width={134}
                                        height={134}
                                    />
                                </CoverWrapper>
                            )}
                        </XHorizontal>
                    </Container>
                    {moreFiles && moreFiles.length > 0 && (
                        <FilesWrapper separator={3}>
                            {moreFiles.map(i => i.fileMetadata && (
                                <FileItem key={'file' + i.fileId} href={'https://ucarecdn.com/' + i.fileId + '/' + (i.fileMetadata.name ? i.fileMetadata.name!! : '')}>
                                    <XHorizontal separator={4} alignItems="center">
                                        <FileImage className="icon" />
                                        <XHorizontal alignItems="center" separator={2}>
                                            <div>{i.fileMetadata.name} • {niceBytes(Number(i.fileMetadata.size))}</div>
                                        </XHorizontal>
                                    </XHorizontal>
                                </FileItem>
                            ))}
                        </FilesWrapper>
                    )}
                </Root>
                <XHorizontal justifyContent="space-between">
                    {props.alphaButtons.map((i, j) => i && (
                        <XVertical key={'post_buttons_group' + j}>
                            {i.map(k => (
                                <XHorizontal key={'post_button' + k.id} alignSelf="flex-start">
                                    <RespondPost
                                        messageId={props.messageId}
                                        buttonId={k.id}
                                        userId={props.userId}
                                    >
                                        <XButton
                                            text={k.title}
                                            style="primary"
                                        />
                                    </RespondPost>
                                </XHorizontal>
                            ))}
                        </XVertical>
                    ))}
                    <XHorizontal separator={1} alignItems="center">
                        {respondUsers.length > 0 && (
                            <RespondWrapper separator={2} alignItems="center">
                                <ReplyIcon />
                                <div>{respondUsers.length}</div>
                            </RespondWrapper>
                        )}
                        {!likesUsers || likesUsers.length === 0 && (
                            <SetLike messageId={props.messageId}>
                                <RespondWrapper separator={2} alignItems="center" className="like">
                                    <ReactionIcon />
                                </RespondWrapper>
                            </SetLike>
                        )}
                        {likesUsers && likesUsers.length > 0 && !meLike && (
                            <SetLike messageId={props.messageId}>
                                <RespondWrapper separator={2} alignItems="center" className="like">
                                    <ReactionIcon />
                                    <div>{likesUsers.length}</div>
                                </RespondWrapper>
                            </SetLike>
                        )}
                        {likesUsers && likesUsers.length > 0 && meLike && (
                            <UnsetLike messageId={props.messageId}>
                                <RespondWrapper separator={2} alignItems="center" className="active like">
                                    <ReactionIcon />
                                    <div>{likesUsers.length}</div>
                                </RespondWrapper>
                            </UnsetLike>
                        )}
                    </XHorizontal>
                </XHorizontal>
            </Wrapper>
        );
    }
}
