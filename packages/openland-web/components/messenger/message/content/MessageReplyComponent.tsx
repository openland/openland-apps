import * as React from 'react';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import {
    FullMessage_GeneralMessage_sender,
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
} from 'openland-api/Types';
import { MessageTextComponent } from './MessageTextComponent';
import { MessageAnimationComponent } from './MessageAnimationComponent';
import { MessageImageComponent } from './MessageImageComponent';
import { MessageFileComponent } from './MessageFileComponent';
import { XDate } from 'openland-x/XDate';
import { emoji } from 'openland-y-utils/emoji';
import { MessageVideoComponent } from './MessageVideoComponent';
import { UserPopper } from 'openland-web/components/UserPopper';
import { Span } from 'openland-y-utils/spans/Span';
import { useCheckPerf } from 'openland-web/pages/main/mail/components/Components';

interface ReplyMessageProps {
    sender: FullMessage_GeneralMessage_sender;
    senderNameEmojify?: string | JSX.Element;
    spans?: Span[];
    id: string;
    date: any;
    message: string | null;
    edited: boolean;
    attach?: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    startSelected: boolean;
    compact?: boolean;
}

export const MessageReplyComponent = React.memo((props: ReplyMessageProps) => {
    // useCheckPerf({ name: 'MessageReplyComponent' });
    let userPopperRef = React.useRef<UserPopper>(null);

    let onAvatarOrUserNameMouseEnter = () => {
        if (userPopperRef.current) {
            userPopperRef.current.showPopper();
        }
    };

    let onAvatarOrUserNameMouseLeave = () => {
        if (userPopperRef.current) {
            userPopperRef.current.hidePopper();
        }
    };

    let date = <XDate value={props.date} format="time" />;
    let content = [];

    if (props.message) {
        content.push(
            <MessageTextComponent
                spans={props.spans || []}
                key={'reply-text'}
                isService={false}
                isEdited={props.edited}
            />,
        );
    }
    if (props.attach) {
        const fileMetadata = props.attach.fileMetadata;
        const size = props.attach.fileMetadata.size || undefined;
        const name = props.attach.fileMetadata.name || undefined;

        if (fileMetadata && fileMetadata.isImage) {
            let w = fileMetadata.imageWidth || undefined;
            let h = fileMetadata.imageHeight || undefined;

            if (!!w && !!h) {
                if (fileMetadata.imageFormat === 'GIF') {
                    content.push(
                        <MessageAnimationComponent
                            key={'file'}
                            file={props.attach.fileId}
                            fileName={name}
                            width={w}
                            height={h}
                        />,
                    );
                } else {
                    const dimentions = {
                        originalWidth: w,
                        originalHeight: h,
                        width: w,
                        height: h,
                    };
                    content.push(
                        <MessageImageComponent
                            key={'file'}
                            file={props.attach.fileId}
                            fileName={name}
                            dimentions={dimentions}
                            startSelected={props.startSelected}
                        />,
                    );
                }
            }
        } else if (
            props.attach.fileMetadata.name.endsWith('.mp4') ||
            props.attach.fileMetadata.name.endsWith('.mov')
        ) {
            content.push(
                <MessageVideoComponent
                    key={'file' + props.attach.fileId}
                    file={props.attach.fileId}
                    fileName={props.attach.fileMetadata.name}
                />,
            );
        } else {
            content.push(
                <MessageFileComponent
                    key={'file'}
                    file={props.attach.fileId}
                    fileName={name}
                    fileSize={size}
                    marginBottom={8}
                />,
            );
        }
    }
    let orgPath: string | undefined = undefined;
    let usrPath: string | undefined;

    if (props.sender && props.sender.primaryOrganization && !props.startSelected) {
        orgPath = '/mail/o/' + props.sender.primaryOrganization.id;
        usrPath = '/mail/u/' + props.sender.id;
    }

    return (
        <XView
            flexDirection="column"
            position="relative"
            paddingLeft={15}
            width="100%"
            borderRadius={6}
            overflow="hidden"
            marginTop={props.compact ? undefined : 12}
        >
            {!props.compact && (
                <XView alignSelf="stretch" flexDirection="row" marginBottom={4}>
                    <XView marginRight={12}>
                        <UserPopper
                            isMe={props.sender.isYou}
                            startSelected={false}
                            user={props.sender}
                            ref={userPopperRef}
                        >
                            <XAvatar
                                size="small"
                                style="colorus"
                                objectName={props.sender!!.name}
                                objectId={props.sender!!.id}
                                cloudImageUuid={props.sender ? props.sender.photo : undefined}
                                path={usrPath}
                            />
                        </UserPopper>
                    </XView>
                    <XView flexGrow={1} width="100%" paddingTop={1}>
                        <XView alignItems="center" flexDirection="row" marginBottom={4}>
                            <XView
                                marginRight={props.sender!!.primaryOrganization ? 5 : 0}
                                fontSize={14}
                                fontWeight="600"
                                lineHeight="16px"
                                color="rgba(0, 0, 0, 0.8)"
                                onMouseEnter={onAvatarOrUserNameMouseEnter}
                                onMouseLeave={onAvatarOrUserNameMouseLeave}
                            >
                                {props.senderNameEmojify ||
                                    emoji({
                                        src: props.sender!!.name,
                                        size: 16,
                                    })}
                            </XView>
                            {props.sender!!.primaryOrganization && (
                                <XView
                                    as="a"
                                    path={orgPath ? orgPath : '/'}
                                    marginLeft={5}
                                    fontSize={12}
                                    fontWeight="600"
                                    lineHeight="14px"
                                    color="rgba(0, 0, 0, 0.4)"
                                    alignSelf="flex-end"
                                    cursor="pointer"
                                    hoverTextDecoration="none"
                                >
                                    {props.sender!!.primaryOrganization!!.name}
                                </XView>
                            )}
                        </XView>
                        <XView
                            width={62}
                            fontSize={12}
                            fontWeight="600"
                            lineHeight="14px"
                            whiteSpace="nowrap"
                            color="rgba(0, 0, 0, 0.4)"
                            paddingTop={1}
                        >
                            {date}
                        </XView>
                    </XView>
                </XView>
            )}
            <XView flexShrink={0} marginTop={props.compact ? 0 : 4}>
                {content}
            </XView>
        </XView>
    );
});
