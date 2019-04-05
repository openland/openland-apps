import * as React from 'react';
import { css } from 'linaria';
import { XView, XViewSelectedContext } from 'react-mental';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from 'openland-icons/ic-photo.svg';
import FileIcon from 'openland-icons/ic-file-2.svg';
import ForwardIcon from 'openland-icons/ic-reply-2.svg';
import MentionIcon from 'openland-icons/ic-mention-2.svg';
import { XCounter } from 'openland-x/XCounter';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import LockIcon from 'openland-icons/ic-group.svg';
import ChanneSecretIcon from 'openland-icons/ic-channel-dialog.svg';
import { DialogListWebItem } from './DialogListWebDataSource';

export let iconClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 2px 5px -1px 1px;

    path {
        fill: rgba(0, 0, 0, 0.3);
    }
`;

export let iconActiveClass = css`
    display: inline-block;
    vertical-align: top;
    margin: 2px 5px -1px 1px;

    path {
        fill: rgba(255, 255, 255, 0.9);
    }
`;

export let channelIconClass = css`
    margin: 0px 0px -2px 0px;
    path {
        fill: black;
    }
`;

export let channelSecretIconClass = css`
    margin: 0px 0px -2px 0px;
    path {
        fill: #129f25;
    }
`;

export let channelIconActiveClass = css`
    margin: 0px 0px -2px 0px;
    path {
        fill: white;
    }
`;

export let documentIcon = css`
    margin-top: 0;
    margin-bottom: 0;
`;

const GroupIconClass = css`
    width: 15px;
    height: 19px;
`;

export interface DialogViewProps {
    item: DialogListWebItem;
    handleRef?: any;
    onSelect?: (id: string) => void;
    onClick?: () => void;
    selected?: boolean;
}

export const DialogView = React.memo<DialogViewProps>(props => {
    console.log('render!');
    // let router = React.useContext(XRouterContext);
    let dialog = props.item;
    let isMuted = dialog.isMuted;
    let isService = dialog.isService;
    let haveMention = dialog.haveMention;
    let isPrivate = props.item.kind === 'PRIVATE';
    let sender = dialog.isOut ? (
        'You: '
    ) : isPrivate ? (
        ''
    ) : dialog.sender ? (
        <>{dialog.senderEmojify}: </>
    ) : (
                    ''
                );
    let message: any = undefined;
    let theme = React.useContext(ThemeContext);

    if (dialog.typingEmojify) {
        message = <>{dialog.typingEmojify}</>;
    } else {
        message = dialog.fallback;
        if (dialog.message) {
            message = (
                <span>
                    {!isService && sender}
                    {dialog.messageEmojify}
                </span>
            );
        } else if (dialog.attachments && dialog.attachments.length === 1) {
            let attachment = dialog.attachments[0];
            if (attachment.__typename === 'MessageAttachmentFile') {
                if (attachment.fileMetadata.isImage) {
                    message = (
                        <span>
                            {sender}
                            <XViewSelectedContext.Consumer>
                                {active => (
                                    <PhotoIcon className={active ? iconActiveClass : iconClass} />
                                )}
                            </XViewSelectedContext.Consumer>
                            Image
                        </span>
                    );
                } else {
                    message = (
                        <span>
                            {sender}
                            <XViewSelectedContext.Consumer>
                                {active => (
                                    <FileIcon
                                        className={
                                            (active ? iconActiveClass : iconClass) +
                                            ' ' +
                                            documentIcon
                                        }
                                    />
                                )}
                            </XViewSelectedContext.Consumer>
                            Document
                        </span>
                    );
                }
            }
            message = message || attachment.fallback;
        } else if (dialog.forward) {
            message = (
                <span>
                    {sender}
                    <XViewSelectedContext.Consumer>
                        {active => (
                            <ForwardIcon
                                className={
                                    (active ? iconActiveClass : iconClass) + ' ' + documentIcon
                                }
                            />
                        )}
                    </XViewSelectedContext.Consumer>
                    Forward
                </span>
            );
        }
    }

    let highlightSecretChat = false;
    if (localStorage.getItem('highlight_secret_chat') === 'true') {
        highlightSecretChat = true;
    }

    return (
        <XView
            selected={props.selected}
            as="a"
            ref={props.handleRef}
            path={'/mail/' + dialog.key}
            // onMouseDown={() => router!.push('/mail/' + dialog.key)}
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
            linkSelectable={true}
            hoverTextDecoration="none"
        >
            <XAvatar2
                title={dialog.title}
                id={dialog.kind === 'PRIVATE' ? dialog.flexibleId : dialog.key}
                src={dialog.photo}
                online={dialog.online}
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
                        flexDirection="row"
                        flexGrow={1}
                        flexShrink={1}
                        minWidth={0}
                        fontSize={14}
                        fontWeight="600"
                        lineHeight="18px"
                        color={
                            highlightSecretChat && dialog.kind === 'GROUP'
                                ? '#129f25'
                                : theme.dialogTitleTextColor
                        }
                        selectedColor={theme.dialogTitleTextColorSelected}
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                    >
                        {highlightSecretChat && !dialog.isChannel && dialog.kind === 'GROUP' && (
                            <XView>
                                <LockIcon className={GroupIconClass} />
                            </XView>
                        )}
                        {dialog.isChannel && (
                            <XViewSelectedContext.Consumer>
                                {active => (
                                    <XView
                                        alignSelf="stretch"
                                        justifyContent="center"
                                        marginRight={2}
                                    >
                                        <ChanneSecretIcon
                                            className={
                                                active
                                                    ? channelIconActiveClass
                                                    : dialog.kind === 'GROUP' && highlightSecretChat
                                                        ? channelSecretIconClass
                                                        : channelIconClass
                                            }
                                        />
                                    </XView>
                                )}
                            </XViewSelectedContext.Consumer>
                        )}
                        <span>
                            {dialog.titleEmojify}
                        </span>
                    </XView>
                    {dialog.date && (
                        <XView
                            height={18}
                            color={theme.dialogDateTextColor}
                            selectedColor={theme.dialogDateTextColorSelected}
                            marginLeft={5}
                            fontSize={12}
                            fontWeight="600"
                            lineHeight="19px"
                            whiteSpace="nowrap"
                        >
                            <XDate value={dialog.date.toString()} format="datetime_short" />
                        </XView>
                    )}
                </XView>
                <XView flexDirection="row" minWidth={0} flexGrow={1} flexShrink={1}>
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
                        selectedOpacity={1}
                        color={theme.dialogMessageTextColor}
                        selectedColor={theme.dialogMessageTextColorSelected}
                    >
                        {message}
                    </XView>
                    {dialog.unread > 0 && (
                        <>
                            {haveMention && (
                                <XView alignSelf="center" paddingLeft={12} marginRight={-6}>
                                    <MentionIcon />
                                </XView>
                            )}
                            <XView paddingLeft={12} alignSelf="center">
                                <XCounter grey={isMuted} big={true} count={dialog.unread} />
                            </XView>
                        </>
                    )}
                </XView>
            </XView>
        </XView>
    );
});

DialogView.displayName = 'DialogView';
