import * as React from 'react';
import { XView } from 'react-mental';
import { MessageSelector } from './MessageSelector';
import { UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UserPopper } from 'openland-web/components/UserPopper';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';
import { SpannedString } from '../data/SpannedString';

export interface DesktopMessageContainerProps {
    compact: boolean;
    sender: UserShort;
    senderNameEmojify?: any;
    date: number;

    // Menu
    renderMenu: () => void;

    // Selection
    onSelected: () => void;
    selecting: boolean;
    selected: boolean;

    children?: any;
}

interface PreambulaContainerProps {
    children: any;
    onClick?: () => void;
}

const CompactPreambulaContainer = ({ children }: PreambulaContainerProps) => {
    return (
        <XView
            alignSelf="flex-start"
            minHeight={23}
            width={55}
            fontSize={11}
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            paddingTop={1}
            marginTop={1}
            fontWeight={'600'}
            lineHeight={'22px'}
            color={'rgba(0, 0, 0, 0.4)'}
        >
            {children}
        </XView>
    );
};

const NotCompactPreambulaContainer = ({ children }: PreambulaContainerProps) => {
    return (
        <XView
            alignSelf="flex-start"
            minHeight={23}
            width={55}
            fontSize={12}
            whiteSpace={'nowrap'}
            paddingTop={3}
            paddingLeft={3}
        >
            {children}
        </XView>
    );
};

interface MessageContainerWrapperProps {
    children: any;
    onMouseEnter: (event: React.MouseEvent<any>) => void;
    onMouseLeave: (event: React.MouseEvent<any>) => void;
    onClick?: (e: any) => void;
    cursorPointer: boolean;
}

const CompactMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
    cursorPointer,
}: MessageContainerWrapperProps) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            marginTop={0}
            paddingTop={2}
            paddingLeft={18}
            paddingRight={20}
            paddingBottom={3}
            onClick={onClick}
            cursor={cursorPointer ? 'pointer' : undefined}
        >
            {children}
        </XView>
    );
};

const NotCompactMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
    onClick,
    cursorPointer,
}: MessageContainerWrapperProps) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            marginTop={12}
            paddingTop={7}
            paddingLeft={18}
            paddingRight={20}
            paddingBottom={3}
            onClick={onClick}
            cursor={cursorPointer ? 'pointer' : undefined}
        >
            {children}
        </XView>
    );
};

export const DesktopMessageContainer = XMemo<DesktopMessageContainerProps>(props => {
    let [hover, onHover] = React.useState(false);
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
    let onMouseEnter = React.useMemo(
        () => () => {
            onHover(true);
        },
        [onHover],
    );
    let onMouseLeave = React.useMemo(
        () => () => {
            onHover(false);
        },
        [onHover],
    );

    // Selector Icon
    let selector = (
        <XView marginRight={20} width={19} height={22} alignSelf="center" padding={2}>
            {(hover || props.selecting) && (
                <MessageSelector
                    selected={props.selected}
                    onClick={() => {
                        if (!props.selecting) {
                            props.onSelected();
                        }
                    }}
                />
            )}
        </XView>
    );

    // Left side of message
    const { compact, sender, date } = props;

    const PreambulaContainer = compact ? CompactPreambulaContainer : NotCompactPreambulaContainer;

    const preambula = React.useMemo(
        () => (
            <PreambulaContainer>
                {!compact ? (
                    <UserPopper
                        isMe={props.sender.isYou}
                        startSelected={false}
                        user={props.sender}
                        ref={userPopperRef}
                    >
                        <XAvatar2 id={sender.id} title={sender.name} src={sender.photo} size={36} />
                    </UserPopper>
                ) : (
                    <XView>{hover && <XDate value={date.toString()} format="time" />}</XView>
                )}
            </PreambulaContainer>
        ),
        [props.sender.isYou, props.sender, sender.id, sender.name, sender.photo, date, hover],
    );

    const notCompactHeader =
        !props.compact &&
        React.useMemo(
            () => (
                <XView flexDirection="row" marginBottom={4}>
                    <XView flexDirection="row">
                        <XView
                            flexDirection="row"
                            fontSize={14}
                            fontWeight="600"
                            color="rgba(0, 0, 0, 0.8)"
                            onMouseEnter={onAvatarOrUserNameMouseEnter}
                            onMouseLeave={onAvatarOrUserNameMouseLeave}
                        >
                            {props.senderNameEmojify}
                        </XView>
                        {props.sender.primaryOrganization && (
                            <XView
                                as="a"
                                fontSize={12}
                                fontWeight="600"
                                color="rgba(0, 0, 0, 0.4)"
                                paddingLeft={8}
                                alignSelf="flex-end"
                                marginBottom={-1}
                                path={`/mail/o/${props.sender.primaryOrganization.id}`}
                                hoverTextDecoration="none"
                            >
                                {props.sender.primaryOrganization.name}
                            </XView>
                        )}
                    </XView>
                    <XView
                        paddingLeft={8}
                        fontSize={12}
                        color="rgba(0, 0, 0, 0.4)"
                        fontWeight="600"
                        alignSelf="flex-end"
                        marginBottom={-1}
                    >
                        <XDate value={props.date.toString()} format="time" />
                    </XView>
                </XView>
            ),
            [props.date, props.sender, props.sender.primaryOrganization],
        );
    // Content
    const content = (
        <XView
            flexDirection="column"
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            minWidth={0}
            alignItems="stretch"
            backgroundColor={props.selected ? '#f7f7f7' : undefined}
            marginVertical={-2}
            marginHorizontal={-8}
            paddingVertical={2}
            paddingHorizontal={8}
            borderRadius={6}
        >
            {props.compact ? (
                props.children
            ) : (
                <>
                    {notCompactHeader}
                    <XView flexDirection="column">{props.children}</XView>
                </>
            )}
        </XView>
    );

    // Actions
    let actions = (
        <XView width={83} marginLeft={12} alignSelf="flex-start">
            {hover && props.renderMenu()}
        </XView>
    );

    // Result
    const MessageContainerWrapper = compact
        ? CompactMessageContainerWrapper
        : NotCompactMessageContainerWrapper;
    return (
        <MessageContainerWrapper
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            cursorPointer={props.selecting}
            onClick={(e: any) => {
                if (props.selecting) {
                    e.preventDefault();
                    e.stopPropagation();
                    props.onSelected();
                }
            }}
        >
            {selector}
            {preambula}
            {content}
            {actions}
        </MessageContainerWrapper>
    );
});

const MobileMessageContainerWrapper = ({ children }: { children: any }) => {
    return (
        <XView
            alignItems="center"
            flexDirection="row"
            marginTop={12}
            paddingTop={7}
            paddingLeft={18}
            paddingRight={20}
            paddingBottom={3}
        >
            {children}
        </XView>
    );
};

export interface MobileMessageContainerProps {
    children: any;
    sender: UserShort;
    date: number;
}

export const MobileMessageContainer = (props: MobileMessageContainerProps) => {
    const { sender, date } = props;

    const preambula = (
        <NotCompactPreambulaContainer>
            <XAvatar2 id={sender.id} title={sender.name} src={sender.photo} size={36} />
        </NotCompactPreambulaContainer>
    );

    // Content
    const content = (
        <XView
            flexDirection="column"
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            minWidth={0}
            alignItems="stretch"
        >
            <XView flexDirection="row" marginBottom={4}>
                <XView flexDirection="row">
                    <XView
                        flexDirection="row"
                        fontSize={14}
                        fontWeight="600"
                        color="rgba(0, 0, 0, 0.8)"
                    >
                        {emoji({
                            src: props.sender.name,
                            size: 16,
                        })}
                    </XView>
                    {props.sender.primaryOrganization && (
                        <XView
                            as="a"
                            fontSize={12}
                            fontWeight="600"
                            color="rgba(0, 0, 0, 0.4)"
                            paddingLeft={8}
                            alignSelf="flex-end"
                            marginBottom={-1}
                            path={`/mail/o/${props.sender.primaryOrganization.id}`}
                            hoverTextDecoration="none"
                        >
                            {props.sender.primaryOrganization.name}
                        </XView>
                    )}
                </XView>
                <XView
                    paddingLeft={8}
                    fontSize={12}
                    color="rgba(0, 0, 0, 0.4)"
                    fontWeight="600"
                    alignSelf="flex-end"
                    marginBottom={-1}
                >
                    <XDate value={date.toString()} format="time" />
                </XView>
            </XView>
            <XView flexDirection="column">{props.children}</XView>
        </XView>
    );

    return (
        <MobileMessageContainerWrapper>
            {preambula}
            {content}
        </MobileMessageContainerWrapper>
    );
};
