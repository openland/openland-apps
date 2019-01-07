import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import {
    MessageFull_alphaAttachments,
    MessageFull_alphaButtons,
    MessageFull_reactions,
} from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XButton } from 'openland-x/XButton';
import { XMutation } from 'openland-x/XMutation';
import { MessageTextComponent } from '../../MessageTextComponent';
import { niceBytes } from '../../MessageFileComponent';
import { withRespondPostMessage } from '../../../../../../api/withRespondPostMessage';
import MoreIcon from 'openland-icons/ic-arrow-down-blue.svg';
import { ReactionsRender } from './postReactionsRender';

const PostTitle = css`
    font-size: 18px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    display: inline;
    white-space: pre-wrap;
    overflow-wrap: break-word;
`;

const FileItem = css`
    opacity: 0.5;
    font-size: 13px;
    line-height: 1.54;
    font-weight: 500;
    color: #000;
    &:hover {
        text-decoration: none;
        & .icon {
            opacity: 0.5;
        }
        opacity: 1;
        color: #1790ff;
    }
    & span {
        opacity: 0.6;
    }
`;

const FileImage = css`
    width: 11px;
    height: 14px;
    flex-shrink: 0;
    background-image: url(/static/X/file.svg);
    background-repeat: no-repeat;
    background-position: center;
`;

const CoverWrapper = css`
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0
    width: 134px;
    height: 134px;
    & > img {
        display: block;
    }
`;

const RevertIcon = css`
    transform: rotate(180deg);
`;

const RespondPost = withRespondPostMessage(props => (
    <XMutation
        action={async () => {
            await props.respondPostMessage({
                variables: {
                    messageId: (props as any).messageId,
                    buttonId: (props as any).buttonId,
                    reaction: 'respondPost',
                },
            });
        }}
        onSuccess={() => props.router.replace('/mail/' + (props as any).userId)}
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
    senderName: string;
    message: string;
    alphaTitle: string;
    alphaButtons: (MessageFull_alphaButtons[] | null)[];
    alphaAttachments: MessageFull_alphaAttachments[];
    reactions: MessageFull_reactions[];
    edited: boolean;
    privateConversation: boolean;
}

export const MessagePostComponent = React.memo<MessagePostComponentProps>(props => {
    let [showMore, trimText] = React.useState(true);

    const textTrimmer = () => {
        trimText(!showMore);
    };

    let { reactions } = props;
    let meRespond: any[] | boolean = reactions.filter(
        i => i.reaction === 'respondPost' && i.user.id === props.meId,
    );
    let meSender = false;

    if (props.userId === props.meId) {
        meSender = true;
    }

    if (meRespond.length === 0) {
        meRespond = false;
    } else if (meRespond.length !== 0) {
        meRespond = true;
    }

    let cover: MessageFull_alphaAttachments[] | MessageFull_alphaAttachments | null = null;
    let moreFiles: MessageFull_alphaAttachments[] | null = null;

    if (props.alphaAttachments.length > 0) {
        cover = props.alphaAttachments.filter(i => i.fileMetadata && i.fileMetadata.isImage);
        if (cover[0]) {
            cover = cover[0];
        }
        if ((cover as MessageFull_alphaAttachments).fileId) {
            moreFiles = props.alphaAttachments.filter(
                i => i.fileId !== (cover as MessageFull_alphaAttachments).fileId,
            );
        }

        if (!(cover as MessageFull_alphaAttachments).fileId) {
            moreFiles = props.alphaAttachments;
        }
    }

    let message = props.message;
    let moreButton = false;

    if (message.length >= 500) {
        message = showMore ? message.substring(0, 500) + '...' : message;
        moreButton = true;
    }

    return (
        <XView
            flexGrow={1}
            maxWidth={550}
            flexDirection="column"
            paddingTop={4}
            paddingBottom={4}
        >
            <XView
                flexDirection="column"
                borderWidth={1}
                borderRadius={10}
                borderColor="#ececec"
                overflow="hidden"
                position="relative"
            >
                <XView
                    paddingHorizontal={20}
                    paddingVertical={20}
                    flexDirection="column"
                >
                    <XHorizontal justifyContent="space-between" separator={9}>
                        <XVertical
                            separator={3}
                            flexGrow={1}
                            maxWidth={
                                cover && (cover as MessageFull_alphaAttachments).fileId
                                    ? 'calc(100% - 152px)'
                                    : '100%'
                            }
                        >
                            <div className={PostTitle}>{props.alphaTitle}</div>
                            <MessageTextComponent
                                message={message}
                                mentions={null}
                                isEdited={false}
                                isService={false}
                            />
                            {moreButton && (
                                <XView
                                    alignSelf="flex-start"
                                    alignItems="center"
                                    flexDirection="row"
                                    paddingTop={12}
                                    cursor="pointer"
                                    fontSize={12}
                                    lineHeight={1.54}
                                    color="#1790ff"
                                    onClick={textTrimmer}
                                >
                                    <MoreIcon className={showMore ? '' : RevertIcon}/>
                                    <XView marginLeft={6}>
                                        {showMore ? 'Show more' : 'Show less'}
                                    </XView>
                                </XView>
                            )}
                        </XVertical>
                        {cover && (cover as MessageFull_alphaAttachments).fileId && (
                            <div className={CoverWrapper}>
                                <XCloudImage
                                    srcCloud={
                                        'https://ucarecdn.com/' +
                                        (cover as MessageFull_alphaAttachments).fileId +
                                        '/'
                                    }
                                    resize={'fill'}
                                    width={134}
                                    height={134}
                                />
                            </div>
                        )}
                    </XHorizontal>
                </XView>
                {moreFiles && moreFiles.length > 0 && (
                    <XView>
                        <XView
                            height={1}
                            backgroundColor="#ececec"
                            flexDirection="column"
                        />
                        <XView
                            paddingVertical={10}
                            paddingHorizontal={20}
                        >
                            <XVertical separator={3}>
                                {moreFiles.map(
                                    i =>
                                        i.fileMetadata && (
                                            <a
                                                className={FileItem}
                                                key={'file' + i.fileId}
                                                target="_blank"
                                                href={
                                                    'https://ucarecdn.com/' +
                                                    i.fileId +
                                                    '/' +
                                                    (i.fileMetadata.name ? i.fileMetadata.name!! : '')
                                                }
                                            >
                                                <XHorizontal separator={4} alignItems="center">
                                                    <div className={`${FileImage} icon`}/>
                                                    <XHorizontal alignItems="center" separator={2}>
                                                        <div>
                                                            {i.fileMetadata.name} <span>•</span>{' '}
                                                            {niceBytes(Number(i.fileMetadata.size))}
                                                        </div>
                                                    </XHorizontal>
                                                </XHorizontal>
                                            </a>
                                        ),
                                )}
                            </XVertical>
                        </XView>
                    </XView>
                )}
            </XView>
            {!props.privateConversation && (
                <XView
                    marginTop={12}
                    justifyContent="space-between"
                    flexDirection="row"
                >
                    {!meSender && (
                        <>
                            {!meRespond && props.alphaButtons.map((i, j) =>
                                i && (
                                    <XHorizontal
                                        key={'post_buttons_group' + j}
                                        alignItems="center"
                                        separator={6}
                                    >
                                        {i.map(k => (
                                            <XHorizontal
                                                key={'post_button' + k.id}
                                                alignSelf="flex-start"
                                            >
                                                <RespondPost
                                                    messageId={props.messageId}
                                                    buttonId={k.id}
                                                    userId={props.userId}
                                                >
                                                    <XButton
                                                        text={k.title}
                                                        style={
                                                            k.style === 'DEFAULT'
                                                                ? 'primary'
                                                                : 'light'
                                                        }
                                                    />
                                                </RespondPost>
                                            </XHorizontal>
                                        ))}
                                    </XHorizontal>
                                ),
                            )}
                            {meRespond && (
                                <XView
                                    flexDirection="row"
                                    alignItems="center"
                                    alignSelf="flex-start"
                                >
                                    <XButton
                                        text={'Message ' + props.senderName}
                                        path={'/mail/' + props.userId}
                                        style="primary"
                                    />
                                </XView>
                            )}
                        </>
                    )}
                    <ReactionsRender
                        messageId={props.messageId}
                        userId={props.userId}
                        meId={props.meId}
                        reactions={props.reactions}
                    />
                </XView>
            )}
        </XView>
    );
});