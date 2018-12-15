import * as React from 'react';
import { XView } from 'react-mental';
import { MessageSelector } from './MessageSelector';
import { UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { usePopper } from 'openland-web/components/usePopper';

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

export const MessageContainer = React.memo<MessageContainerProps>((props) => {

    let [hover, onHover] = React.useState(false);
    let onMouseEnter = React.useMemo(() => () => onHover(true), [onHover]);
    let onMouseLeave = React.useMemo(() => () => onHover(false), [onHover]);
    let [popupProps, popupRender] = usePopper('Test', { placement: 'top' });
    // let popupProps = {};
    // let popupRender = null;

    // Selector Icon
    let selector = (
        <XView marginRight={22} width={18} height={22} alignSelf="flex-start">
            {(hover || props.selecting) && <MessageSelector selected={props.selected} onClick={props.onSelected} />}
        </XView>
    );

    // Left side of message
    let preambula: any;
    if (props.compact) {
        preambula = (
            <XView
                width={55}
                height={22}
                alignSelf="flex-start"
                whiteSpace="nowrap"
                overflow="hidden"
                fontSize={12}
                paddingTop={1}
                fontWeight="600"
                lineHeight="22px"
                color="rgba(0, 0, 0, 0.4)"
            >
                {hover && <XDate value={props.date.toString()} format="time" />}
            </XView>
        );
    } else {
        preambula = (
            <XView width={55} alignSelf="flex-start">
                <XAvatar2
                    id={props.sender.id}
                    title={props.sender.name}
                    src={props.sender.photo}
                    size={36}
                />
            </XView>
        );
    }

    // Content
    let content: any;
    if (!props.compact) {
        content = (
            <XView flexDirection="column" flexGrow={1} flexShrink={1} flexBasis={0} minWidth={0} alignItems="stretch">
                <XView flexDirection="row">
                    <XView fontSize={14} fontWeight="600" color="rgba(0, 0, 0, 0.8)" {...popupProps}>{props.sender.name}</XView>
                    {props.sender.primaryOrganization && (
                        <XView fontSize={12} fontWeight="600" color="rgba(0, 0, 0, 0.4)" paddingLeft={8}>
                            {props.sender.primaryOrganization.name}
                        </XView>
                    )}
                    <XView paddingLeft={8} fontSize={12} color="rgba(0, 0, 0, 0.4)" fontWeight="600">
                        <XDate value={props.date.toString()} format="time" />
                    </XView>
                </XView>
                <XView flexDirection="column">
                    {props.children}
                </XView>
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
    let actions = (
        <XView width={83}>
            {hover && props.renderMenu()}
        </XView>
    )

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
                {popupRender}
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
                {popupRender}
                {selector}
                {preambula}
                {content}
                {actions}
            </XView>
        );
    }
});