import * as React from 'react';
import { css } from 'linaria';
import { emojify } from 'react-emojione';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from '../components/icons/ic-photo.svg';
import FileIcon from '../components/icons/ic-file-2.svg';
import ForwardIcon from './icons/ic-reply-2.svg';
import { XCounter } from 'openland-x/XCounter';
import { XView, XViewSelectedContext } from 'openland-x/XView';
import { XLink2 } from 'openland-x/XLink2';

let iconClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 1px 5px -1px 1px;

    path {
        fill: rgba(0, 0, 0, 0.3);
    }
`;

let iconActiveClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 1px 5px -1px 1px;

    path {
        fill: rgba(255, 255, 255, 0.9);
    }
`;

let documentIcon = css`
    margin-top: 0;
    margin-bottom: 0;
`;

interface DialogViewProps {
    item: DialogDataSourceItem;
    handleRef?: any;
    compact?: boolean;
    onSelect?: () => void;
}

const DialogViewInner = (props: DialogViewProps) => {
    let dialog = props.item;
    let isPrivate = props.item.kind === 'PRIVATE';
    return (
        <XLink2
            ref={props.handleRef}
            path={'/mail/' + dialog.key}
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
                style={
                    dialog.kind === 'INTERNAL'
                        ? 'organization'
                        : dialog.kind === 'GROUP'
                            ? 'group'
                            : dialog.kind === 'PUBLIC'
                                ? 'room'
                                : dialog.kind === 'PRIVATE'
                                    ? 'user'
                                    : undefined
                }
                objectName={dialog.title}
                objectId={dialog.flexibleId}
                online={dialog.online}
                cloudImageUuid={dialog.photo}
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
                        {dialog.title}
                    </XView>
                    {dialog.date && (
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
                            <XDate
                                value={dialog.date.toString()}
                                format="datetime_short"
                            />
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
                        <XViewSelectedContext.Consumer>
                            {active => (
                                <>
                                    {dialog.typing || (
                                        <>
                                            {!!dialog.message &&
                                                !dialog.fileMeta && (
                                                    <span>
                                                        {dialog.isOut
                                                            ? 'You:'
                                                            : isPrivate
                                                                ? null
                                                                : dialog.sender +
                                                                  ':'}{' '}
                                                        {emojify(
                                                            dialog.message,
                                                            {
                                                                style: {
                                                                    height: 13,
                                                                    backgroundImage:
                                                                        'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)',
                                                                },
                                                            },
                                                        )}
                                                    </span>
                                                )}
                                            {!dialog.message &&
                                                !dialog.fileMeta && (
                                                    <span>
                                                        {dialog.isOut
                                                            ? 'You:'
                                                            : isPrivate
                                                                ? null
                                                                : dialog.sender +
                                                                  ':'}{' '}
                                                        <ForwardIcon
                                                            className={
                                                                (active
                                                                    ? iconActiveClass
                                                                    : iconClass) +
                                                                ' ' +
                                                                documentIcon
                                                            }
                                                        />
                                                        Forward
                                                    </span>
                                                )}
                                            {dialog.fileMeta &&
                                                dialog.fileMeta.isImage && (
                                                    <span>
                                                        {dialog.isOut
                                                            ? 'You:'
                                                            : isPrivate
                                                                ? null
                                                                : dialog.sender +
                                                                  ':'}{' '}
                                                        <PhotoIcon
                                                            className={
                                                                active
                                                                    ? iconActiveClass
                                                                    : iconClass
                                                            }
                                                        />
                                                        Image
                                                    </span>
                                                )}
                                            {dialog.fileMeta &&
                                                !dialog.fileMeta.isImage && (
                                                    <span>
                                                        {dialog.isOut
                                                            ? 'You:'
                                                            : isPrivate
                                                                ? null
                                                                : dialog.sender +
                                                                  ':'}{' '}
                                                        <FileIcon
                                                            className={
                                                                (active
                                                                    ? iconActiveClass
                                                                    : iconClass) +
                                                                ' ' +
                                                                documentIcon
                                                            }
                                                        />
                                                        Document
                                                    </span>
                                                )}
                                        </>
                                    )}
                                </>
                            )}
                        </XViewSelectedContext.Consumer>
                    </XView>
                    {dialog.unread > 0 && (
                        <XView paddingLeft={12} alignSelf="center">
                            <XCounter big={true} count={dialog.unread} />
                        </XView>
                    )}
                </XView>
            </XView>
        </XLink2>
    );
};

const DialogViewCompactInner = (props: DialogViewProps) => {
    let dialog = props.item;

    return (
        <XLink2
            ref={props.handleRef}
            path={'/mail/' + dialog.key}
            height={50}
            flexDirection="row"
            paddingLeft={16}
            minWidth={0}
            alignItems="center"
            hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
            selectedBackgroundColor="#4596e1"
            selectedHoverBackgroundColor="#4596e1"
            onClick={props.onSelect}
        >
            <XAvatar
                style={
                    dialog.kind === 'INTERNAL'
                        ? 'organization'
                        : dialog.kind === 'GROUP'
                            ? 'group'
                            : dialog.kind === 'PUBLIC'
                                ? 'room'
                                : dialog.kind === 'PRIVATE'
                                    ? 'user'
                                    : undefined
                }
                objectName={dialog.title}
                objectId={dialog.flexibleId}
                online={dialog.online}
                cloudImageUuid={dialog.photo}
                size="m-small"
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
                        {dialog.title}
                    </XView>
                    {dialog.date && (
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
                            <XDate
                                value={dialog.date.toString()}
                                format="datetime_short"
                            />
                        </XView>
                    )}
                </XView>
            </XView>
        </XLink2>
    );
};

export const DialogView = (props: DialogViewProps) => {
    return props.compact ? (
        <DialogViewCompactInner {...props} />
    ) : (
        <DialogViewInner {...props} />
    );
};
