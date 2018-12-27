import * as React from 'react';
import { XView } from 'react-mental';
import { MessageSelector } from './MessageSelector';
import { UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UserPopper } from 'openland-web/components/messenger/components/view/content/UserPopper';

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

const CompactPreambulaContainer = ({ children }: { children: any }) => {
    return (
        <XView
            alignSelf="flex-start"
            minHeight={23}
            width={55}
            fontSize={11}
            whiteSpace={'nowrap'}
            overflow={'hidden'}
            paddingTop={1}
            fontWeight={'600'}
            lineHeight={'22px'}
            color={'rgba(0, 0, 0, 0.4)'}
        >
            {children}
        </XView>
    );
};

const NotCompactPreambulaContainer = ({ children }: { children: any }) => {
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

const CompactMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
}: {
    children: any;
    onMouseEnter: (event: React.MouseEvent<any>) => void;
    onMouseLeave: (event: React.MouseEvent<any>) => void;
}) => {
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
        >
            {children}
        </XView>
    );
};

const NotCompactMessageContainerWrapper = ({
    children,
    onMouseEnter,
    onMouseLeave,
}: {
    children: any;
    onMouseEnter: (event: React.MouseEvent<any>) => void;
    onMouseLeave: (event: React.MouseEvent<any>) => void;
}) => {
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
        >
            {children}
        </XView>
    );
};

export const MessageContainer = React.memo<MessageContainerProps>(props => {
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
                <MessageSelector selected={props.selected} onClick={props.onSelected} />
            )}
        </XView>
    );

    // Left side of message
    const { compact, sender, date } = props;

    const PreambulaContainer = compact ? CompactPreambulaContainer : NotCompactPreambulaContainer;

    const preambula = (
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
            {props.compact ? (
                props.children
            ) : (
                <>
                    <XView flexDirection="row" marginBottom={4}>
                        <XView flexDirection="row">
                            <XView
                                fontSize={14}
                                fontWeight="600"
                                color="rgba(0, 0, 0, 0.8)"
                                onMouseEnter={onAvatarOrUserNameMouseEnter}
                                onMouseLeave={onAvatarOrUserNameMouseLeave}
                            >
                                {props.sender.name}
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
        <MessageContainerWrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {selector}
            {preambula}
            {content}
            {actions}
        </MessageContainerWrapper>
    );
});
