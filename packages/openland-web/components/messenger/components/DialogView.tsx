import * as React from 'react';
import { css } from 'linaria';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from '../components/icons/ic-photo.svg';
import FileIcon from '../components/icons/ic-file-2.svg';
import ForwardIcon from './icons/ic-reply.svg';
import { XCounter } from 'openland-x/XCounter';
import { XView } from 'openland-x/XView';
import { XLink2 } from 'openland-x/XLink2';

let iconClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 1px 5px -1px 1px;
`;

let documentIcon = css`
    margin-top: 0;
    margin-bottom: 0;
`;

export const DialogView = (props: { item: DialogDataSourceItem }) => {
    let conv = props.item;
    let isPrivate = props.item.kind === 'PRIVATE';
    return (
        <XLink2
            path={'/mail/' + props.item.key}
            height={72}
            flexDirection="row"
            paddingLeft={16}
            paddingTop={4}
            paddingBottom={4}
            minWidth={0}
            alignItems="center"
            hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
            selectedBackgroundColor="#4596e1"
            selectedHoverBackgroundColor="#4596e1"
        >
            <XAvatar
                style={(props.item.kind === 'INTERNAL'
                    ? 'organization'
                    : props.item.kind === 'GROUP'
                        ? 'group'
                        : props.item.kind === 'PUBLIC'
                            ? 'room' :
                            props.item.kind === 'PRIVATE' ? 'user' : undefined
                )}
                objectName={props.item.title}
                objectId={props.item.flexibleId}
                online={props.item.online}
                cloudImageUuid={props.item.photo}
            />
            <XView
                flexDirection="column"
                flexGrow={1}
                flexShrink={1}
                paddingLeft={12}
                paddingRight={16}
                minWidth={0}
            >
                <XView
                    flexDirection="row"
                    flexGrow={1}
                    flexShrink={0}
                    minWidth={0}
                    marginBottom={3}
                >
                    <XView
                        flexGrow={1}
                        flexShrink={1}
                        minWidth={0}
                        fontSize={14}
                        fontWeight="600"
                        lineHeight="18px"
                        color="#000"
                        selectedColor="#fff"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                    >
                        {props.item.title}
                    </XView>
                    {props.item.date && (
                        <XView
                            height={18}
                            color="rgba(0, 0, 0, 0.3)"
                            selectedColor="rgba(255, 255, 255, 0.8)"
                            marginLeft={5}
                            fontSize={12}
                            fontWeight="600"
                            lineHeight="18px"
                            whiteSpace="nowrap"
                        >
                            <XDate value={props.item.date.toString()} format="datetime_short" />
                        </XView>
                    )}
                </XView>
                <XView
                    flexDirection="row"
                    minWidth={0}
                    flexGrow={1}
                    flexShrink={1}
                    color="rgba(0, 0, 0, 0.5)"
                    selectedColor="#fff"
                >
                    <XView
                        height={34}
                        flexGrow={1}
                        flexShrink={1}
                        flexBasis={0}
                        minWidth={0}
                        fontSize={13}
                        fontWeight="400"
                        lineHeight="17px"
                        overflow="hidden"
                    >
                        {conv.typing || (
                            <>
                                {!!(conv.message) && !conv.fileMeta && (
                                    <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} {conv.message}</span>
                                )}
                                {!conv.message && !conv.fileMeta && (
                                    <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} <ForwardIcon className={iconClass + ' ' + documentIcon} />Forward</span>
                                )}
                                {conv.fileMeta && conv.fileMeta.isImage && (
                                    <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} <PhotoIcon className={iconClass} />Image</span>
                                )}
                                {conv.fileMeta && !conv.fileMeta.isImage && (
                                    <span>{conv.isOut ? 'You:' : (isPrivate ? null : conv.sender + ':')} <FileIcon className={iconClass + ' ' + documentIcon} />Document</span>
                                )}
                            </>
                        )}
                    </XView>
                    {conv.unread > 0 && (
                        <XView paddingLeft={12} alignSelf="center"><XCounter big={true} count={conv.unread} /></XView>
                    )}
                </XView>
            </XView>
        </XLink2>
    );
};