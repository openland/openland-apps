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
import { XPopper } from 'openland-x/XPopper';
import { XMenuVertical } from 'openland-x/XMenuItem';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XAvatar } from 'openland-x/XAvatar';
import { MessageTextComponent } from './MessageTextComponent';
import { niceBytes } from '../../view/content/MessageFileComponent';
import { ReactionComponent } from '../MessageReaction';
import { Reactions } from '../MessageReaction';
import { withRespondPostMessage } from '../../../../../api/withRespondPostMessage';
import ReplyIcon from '../../icons/ic-reply1.svg';
import MoreIcon from '../../icons/ic-arrow-down-blue.svg';

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
    paddingTop: 20,
    paddingBottom: 20,
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
    fontWeight: 500,
    color: '#000',
    '&:hover': {
        '& .icon': {
            opacity: 0.5
        },
        opacity: 1,
        color: '#1790ff'
    },
    '& span': {
        opacity: 0.6
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
        lineHeight: 1.2,
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

const RespondUserWrapper = Glamorous(XMenuItem)({
    height: 36
});

const RespondUserContent = Glamorous(XHorizontal)({
    '& > a': {
        height: 22
    }
});

const RespondUserAvatar = Glamorous(XAvatar)({
    width: 24,
    height: 24,
    '& img': {
        width: '24px !important',
        height: '24px !important'
    }
});

const RespondUserName = Glamorous.div({
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.67,
    color: '#000'
});

const RespondUserCompany = Glamorous.div({
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1.67,
    color: 'rgba(0, 0, 0, 0.4)'
});

const ShowMore = Glamorous(XHorizontal)<{ active: boolean }>(props => ({
    paddingTop: 12,
    cursor: 'pointer',
    fontSize: 13,
    lineHeight: 1.54,
    color: '#1790ff',
    '& svg': {
        transform: `rotate(${props.active ? '0' : '180deg'})`
    }
}));

const RactionsWrapper = Glamorous(XHorizontal)({
    '& .reactions-wrapper': {
        paddingTop: '0 !important'
    }
});

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
    privateConversation: boolean;
}

export class MessagePostComponent extends React.PureComponent<MessagePostComponentProps> {

    state = {
        showMore: true
    };

    private handleTextTrim = () => {
        this.setState({
            showMore: !this.state.showMore
        });
    }

    private respondRender = () => {
        let { props } = this;
        let { reactions } = props;

        let respondUsers = reactions.filter(i => i.reaction === 'respondPost');
        let otherReactions = reactions.filter(i => i.reaction !== 'respondPost');

        let meSender = false;

        if (props.userId === props.meId) {
            meSender = true;
        }

        return (
            <RactionsWrapper justifyContent="flex-end" flexGrow={1} alignSelf="center" alignItems="center">
                {respondUsers.length > 0 && meSender && (
                    <XPopper
                        placement="top"
                        showOnHover={true}
                        contentContainer={<XMenuVertical />}
                        content={respondUsers.map((i, j) => (
                            <RespondUserWrapper key={'post_respond' + j} style="gray" path={'/mail/u/' + i.user.id}>
                                <RespondUserContent justifyContent="space-between" alignItems="center">
                                    <XHorizontal separator={6} alignItems="center">
                                        <RespondUserAvatar
                                            cloudImageUuid={i.user.photo}
                                            objectId={i.user.id}
                                            objectName={i.user.name}
                                            size="m-small"
                                        />
                                        <XHorizontal separator={5} alignItems="center">
                                            <RespondUserName>{i.user.name}</RespondUserName>
                                            {i.user.primaryOrganization && (
                                                <RespondUserCompany>{i.user.primaryOrganization.name}</RespondUserCompany>
                                            )}
                                        </XHorizontal>
                                    </XHorizontal>
                                    {i.user.id !== props.meId && <XButton style="primary" text="Message" size="tiny" path={'/mail/' + i.user.id} />}
                                </RespondUserContent>
                            </RespondUserWrapper>
                        ))}
                    >
                        <RespondWrapper separator={2} alignItems="center">
                            <ReplyIcon />
                            <div>{respondUsers.length}</div>
                        </RespondWrapper>
                    </XPopper>
                )}
                {otherReactions.length > 0 && (
                    <Reactions
                        messageId={props.messageId}
                        reactions={otherReactions}
                        meId={props.meId}
                    />
                )}
            </RactionsWrapper>
        );
    }

    render() {
        let { props } = this;
        let { reactions } = props;
        let meRespond: any[] | boolean = reactions.filter(i => ((i.reaction === 'respondPost') && (i.user.id === props.meId)));
        let meSender = false;

        if (props.userId === props.meId) {
            meSender = true;
        }

        if (meRespond.length === 0) {
            meRespond = false
        } else if (meRespond.length !== 0) {
            meRespond = true
        }

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

            if (!(cover as MessageFull_alphaAttachments).fileId) {
                moreFiles = props.alphaAttachments;
            }
        }

        let message = props.message;
        let moreButton = false;

        if (message.length >= 170) {
            message = this.state.showMore ? message.substring(0, 170) + '...' : message;
            moreButton = true;
        }

        return (
            <Wrapper flexGrow={1} separator={6}>
                <Root separator={0}>
                    <Container>
                        <XHorizontal justifyContent="space-between" separator={9}>
                            <XVertical separator={3} flexGrow={1} maxWidth={cover && (cover as MessageFull_alphaAttachments).fileId ? 'calc(100% - 152px)' : '100%'}>
                                <PostTitle>{props.alphaTitle}</PostTitle>
                                <MessageTextComponent
                                    message={message}
                                    mentions={null}
                                    isEdited={false}
                                    isService={false}
                                />
                                {moreButton && (
                                    <ShowMore
                                        alignSelf="flex-start"
                                        alignItems="center"
                                        separator={3}
                                        onClick={this.handleTextTrim}
                                        active={this.state.showMore}
                                    >
                                        <MoreIcon />
                                        <div>{this.state.showMore ? 'Show more' : 'Show less'}</div>
                                    </ShowMore>
                                )}
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
                                            <div>{i.fileMetadata.name} <span>•</span> {niceBytes(Number(i.fileMetadata.size))}</div>
                                        </XHorizontal>
                                    </XHorizontal>
                                </FileItem>
                            ))}
                        </FilesWrapper>
                    )}
                </Root>
                <XHorizontal justifyContent="space-between">
                    {!props.privateConversation && (
                        <>
                            {!meSender && (
                                <>
                                    {!meRespond && props.alphaButtons.map((i, j) => i && (
                                        <XHorizontal key={'post_buttons_group' + j} alignItems="center" separator={6}>
                                            {i.map(k => (
                                                <XHorizontal key={'post_button' + k.id} alignSelf="flex-start">
                                                    <RespondPost
                                                        messageId={props.messageId}
                                                        buttonId={k.id}
                                                        userId={props.userId}
                                                    >
                                                        <XButton
                                                            text={k.title}
                                                            style={k.style === 'DEFAULT' ? 'primary' : 'light'}
                                                        />
                                                    </RespondPost>
                                                </XHorizontal>
                                            ))}
                                        </XHorizontal>
                                    ))}
                                    {meRespond && (
                                        <XHorizontal alignItems="center" alignSelf="flex-start">
                                            <XButton
                                                text="Message"
                                                path={'/mail/' + props.userId}
                                                style="primary"
                                            />
                                        </XHorizontal>
                                    )}
                                </>
                            )}
                            {this.respondRender()}
                        </>
                    )}
                </XHorizontal>
            </Wrapper>
        );
    }
}
