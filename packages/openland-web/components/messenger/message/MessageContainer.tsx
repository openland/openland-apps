import * as React from 'react';
import { XView } from 'react-mental';
import { MessageSelector } from './MessageSelector';
import { UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XPopper2 } from 'openland-web/components/XPopper2';
import { usePopperHover } from 'openland-web/components/usePopperHover';
import { UserPopup } from 'openland-web/fragments/UserPopup';

export interface MessageContainerProps {
    compact: boolean;
    sender: UserShort;
    date: number;

    // Menu
    renderMenu: () => void;

    // Selection
    onSelected: () => void;
    selecting: boolean;
    selected: boolean;
}

export const MessageContainer = React.memo<MessageContainerProps>(props => {
    let [hover, onHover] = React.useState(false);
    let onMouseEnter = React.useMemo(() => () => onHover(true), [onHover]);
    let onMouseLeave = React.useMemo(() => () => onHover(false), [onHover]);
    let popupRef = React.useRef(null);

    let popup = (
        <XPopper2 ref={popupRef} placement="top">
            <UserPopup id={props.sender.id} />
        </XPopper2>
    );
    // let popupClick = usePopperClick(popupRef);
    let popupHover = usePopperHover(popupRef);

    // Selector Icon
    let selector = (
        <XView marginRight={22} width={18} height={22} alignSelf="center">
            {(hover || props.selecting) && (
                <MessageSelector selected={props.selected} onClick={props.onSelected} />
            )}
        </XView>
    );

    // Left side of message
    const { compact, sender, date } = props;

    const preambula = (
        <XView
            width={55}
            height={22}
            alignSelf="flex-start"
            fontSize={12}
            whiteSpace={'nowrap'}
            overflow={compact ? 'hidden' : null}
            paddingTop={compact ? 1 : null}
            fontWeight={compact ? '600' : undefined}
            lineHeight={compact ? '22px' : undefined}
            color={compact ? 'rgba(0, 0, 0, 0.4)' : undefined}
            {...(compact ? {} : popupHover)}
        >
            {!compact ? (
                <XAvatar2 id={sender.id} title={sender.name} src={sender.photo} size={36} />
            ) : (
                hover && <XDate value={date.toString()} format="time" />
            )}
        </XView>
    );

    // Content
    let content: any;
    if (!props.compact) {
        content = (
            <XView
                flexDirection="column"
                flexGrow={1}
                flexShrink={1}
                flexBasis={0}
                minWidth={0}
                alignItems="stretch"
            >
                <XView flexDirection="row">
                    <XView
                        fontSize={14}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.8)"
                        {...popupHover}
                    >
                        {props.sender.name}
                    </XView>
                    {props.sender.primaryOrganization && (
                        <XView
                            fontSize={12}
                            fontWeight="600"
                            color="rgba(0, 0, 0, 0.4)"
                            paddingLeft={8}
                        >
                            {props.sender.primaryOrganization.name}
                        </XView>
                    )}
                    <XView
                        paddingLeft={8}
                        fontSize={12}
                        color="rgba(0, 0, 0, 0.4)"
                        fontWeight="600"
                    >
                        <XDate value={props.date.toString()} format="time" />
                    </XView>
                </XView>
                <XView flexDirection="column">{props.children}</XView>
            </XView>
        );
    } else {
        content = (
            <XView flexDirection="column" flexGrow={1} flexShrink={1} flexBasis={0} minWidth={0}>
                {props.children}
            </XView>
        );
    }

    // Actions
    let actions = <XView width={83}>{hover && props.renderMenu()}</XView>;

    // Result
    if (props.compact) {
        return (
            <XView
                alignItems="center"
                flexDirection="row"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                paddingLeft={20}
                paddingRight={20}
            >
                {popup}
                {selector}
                {preambula}
                {content}
                {actions}
            </XView>
        );
    } else {
        return (
            <XView
                alignItems="center"
                flexDirection="row"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                marginTop={12}
                paddingLeft={20}
                paddingRight={20}
            >
                {popup}
                {selector}
                {preambula}
                {content}
                {actions}
            </XView>
        );
    }
});
