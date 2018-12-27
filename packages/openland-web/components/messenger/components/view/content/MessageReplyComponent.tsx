import * as React from 'react';
import { XView } from 'react-mental';
import { XAvatar } from 'openland-x/XAvatar';
import {
    RoomMessageFull_reply_sender,
    RoomMessageFull_reply_fileMetadata,
    RoomMessageFull_mentions,
} from 'openland-api/Types';
import { MessageTextComponent } from './MessageTextComponent';
import { MessageAnimationComponent } from './MessageAnimationComponent';
import { MessageImageComponent } from './MessageImageComponent';
import { MessageFileComponent } from './MessageFileComponent';
import { XDate } from 'openland-x/XDate';

interface ReplyMessageProps {
    sender: RoomMessageFull_reply_sender;
    mentions: RoomMessageFull_mentions[] | null;
    id: string;
    date: any;
    message: string | null;
    edited: boolean;
    file: string | null;
    fileMetadata: RoomMessageFull_reply_fileMetadata | null;
    startSelected: boolean;
    compact?: boolean;
}

export const MessageReplyComponent = React.memo<ReplyMessageProps>(props => {
    let date = <XDate value={props.date} format="time" />;
    let content = [];
    if (props.message) {
        content.push(
            <MessageTextComponent
                message={props.message}
                mentions={props.mentions}
                key={'reply-text'}
                isService={false}
                isEdited={props.edited}
            />,
        );
    }
    if (props.file) {
        const { fileMetadata } = props;
        const size = props.fileMetadata!!.size || undefined;
        const name = props.fileMetadata!!.name || undefined;

        if (fileMetadata && fileMetadata.isImage) {
            let w = fileMetadata.imageWidth || undefined;
            let h = fileMetadata.imageHeight || undefined;

            if (!!w && !!h) {
                if (fileMetadata.imageFormat === 'GIF') {
                    content.push(
                        <MessageAnimationComponent
                            key={'file'}
                            file={props.file}
                            fileName={name}
                            width={w}
                            height={h}
                        />,
                    );
                } else {
                    content.push(
                        <MessageImageComponent
                            key={'file'}
                            file={props.file}
                            fileName={name}
                            width={w}
                            height={h}
                            startSelected={props.startSelected}
                        />,
                    );
                }
            }
        } else {
            content.push(
                <MessageFileComponent
                    key={'file'}
                    file={props.file}
                    fileName={name}
                    fileSize={size}
                    marginTop={0}
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
            marginTop={props.compact ? 6 : 12}
            borderRadius={6}
        >
            {!props.compact && (
                <XView alignSelf="stretch" flexDirection="row" marginBottom={4}>
                    <XView marginRight={12}>
                        <XAvatar
                            size="small"
                            style="colorus"
                            objectName={props.sender!!.name}
                            objectId={props.sender!!.id}
                            cloudImageUuid={props.sender ? props.sender.photo : undefined}
                            path={usrPath}
                        />
                    </XView>
                    <XView flexGrow={1} width="calc(100% - 60px)" paddingTop={1}>
                        <XView alignItems="center" flexDirection="row" marginBottom={4}>
                            <XView
                                marginRight={props.sender!!.primaryOrganization ? 5 : 0}
                                fontSize={14}
                                fontWeight="600"
                                lineHeight="16px"
                                color="rgba(0, 0, 0, 0.8)"
                            >
                                {props.sender!!.name}
                            </XView>
                            {props.sender!!.primaryOrganization && (
                                <XView
                                    as="a"
                                    path={orgPath}
                                    marginLeft={5}
                                    fontSize={12}
                                    fontWeight="600"
                                    lineHeight="14px"
                                    color="rgba(0, 0, 0, 0.4)"
                                    alignSelf="flex-end"
                                    cursor="pointer"
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
