import * as React from 'react';
import { css } from 'linaria';
import { DialogDataSourceItem, emojifyMessage } from 'openland-engines/messenger/DialogListEngine';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from 'openland-icons/ic-photo.svg';
import FileIcon from 'openland-icons/ic-file-2.svg';
import ForwardIcon from 'openland-icons/ic-reply-2.svg';
import MentionIcon from 'openland-icons/ic-mention-2.svg';
import { XCounter } from 'openland-x/XCounter';
import { XView, XViewSelectedContext } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { emoji } from 'openland-y-utils/emoji';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import GroupIcon from 'openland-icons/ic-group.svg';

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

const GroupIconClass = css`
    width: 15px;
    height: 19px;
`;

export let documentIcon = css`
    margin-top: 0;
    margin-bottom: 0;
`;

export interface DialogViewProps {
    item: DialogDataSourceItem;
    handleRef?: any;
    onSelect?: (id: string) => void;
    onClick?: () => void;
}

export const DialogView = XMemo<DialogViewProps>(props => {
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
        <>{emojifyMessage(dialog.sender)}: </>
    ) : (
        ''
    );
    let message: any = undefined;
    let theme = React.useContext(ThemeContext);
    if (dialog.typing) {
        message = dialog.typing;
    } else {
        if (dialog.fileMeta) {
            if (dialog.fileMeta.isImage) {
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
                                        (active ? iconActiveClass : iconClass) + ' ' + documentIcon
                                    }
                                />
                            )}
                        </XViewSelectedContext.Consumer>
                        Document
                    </span>
                );
            }
        } else if (dialog.message) {
            message = (
                <span>
                    {!isService && sender}
                    {dialog.messageEmojified}
                </span>
            );
        } else if (dialog.date) {
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

    return (
        <XView
            as="a"
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
                        color={dialog.kind === 'GROUP' ? '#6cb83d' : theme.dialogTitleTextColor}
                        selectedColor={theme.dialogTitleTextColorSelected}
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                    >
                        {dialog.kind === 'GROUP' && (
                            <XView>
                                <GroupIcon className={GroupIconClass} />
                            </XView>
                        )}
                        <span>
                            {emoji({
                                src: dialog.title,
                                size: 16,
                            })}
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
                            lineHeight="18px"
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
