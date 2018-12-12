import * as React from 'react';
import { emojify } from 'react-emojione';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { XAvatar } from 'openland-x/XAvatar';
import { XDate } from 'openland-x/XDate';
import PhotoIcon from '../components/icons/ic-photo.svg';
import FileIcon from '../components/icons/ic-file-2.svg';
import ForwardIcon from './icons/ic-reply-2.svg';
import { XCounter } from 'openland-x/XCounter';
import { XView, XViewSelectedContext } from 'react-mental';
import { XLink2 } from 'openland-x/XLink2';
import { iconActiveClass, iconClass, documentIcon } from './DialogView.styles';

interface DialogViewProps {
    item: DialogDataSourceItem;
    handleRef?: any;
    compact?: boolean;
    onSelect?: () => void;
}

class DialogViewInner extends React.Component<DialogViewProps> {
    shouldComponentUpdate(nextProps: DialogViewProps) {
        return nextProps.item !== this.props.item;
    }
    render() {
        let props = this.props;
        let dialog = props.item;
        let isPrivate = props.item.kind === 'PRIVATE';
        let sender = dialog.isOut ? 'You: ' : (isPrivate ? '' : (dialog.sender ? dialog.sender + ': ' : ''));
        let message: any = undefined;
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
                                    <PhotoIcon
                                        className={
                                            active
                                                ? iconActiveClass
                                                : iconClass
                                        }
                                    />
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
                                            (active
                                                ? iconActiveClass
                                                : iconClass) +
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
            } else if (dialog.message) {
                message = (
                    <span>
                        {sender}
                        {emojify(dialog.message, {
                            style: {
                                height: 13,
                                backgroundImage:
                                    'url(https://cdn.openland.com/shared/web/emojione-3.1.2-64x64.png)',
                            },
                        })}
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
            >
                <XAvatar
                    style="user"
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
                            {message}
                        </XView>
                        {dialog.unread > 0 && (
                            <XView paddingLeft={12} alignSelf="center">
                                <XCounter big={true} count={dialog.unread} />
                            </XView>
                        )}
                    </XView>
                </XView>
            </XView>
        );
    }
}

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

export class DialogView extends React.PureComponent<DialogViewProps> {
    render() {
        return this.props.compact ? (
            <DialogViewCompactInner {...this.props} />
        ) : (
                <DialogViewInner {...this.props} />
            );
    }
}