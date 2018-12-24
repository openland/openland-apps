import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MessageSelector } from './MessageSelector';
import { UserShort } from 'openland-api/Types';
import { XDate } from 'openland-x/XDate';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { UserPopper } from 'openland-web/components/messenger/components/view/content/UserPopper';

const AvatarWrapper = css`
    align-self: flex-start;
    & > span: {
        align-self: flex-start;
    }
`;

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
        >
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
                hover && <XDate value={date.toString()} format="time" />
            )}
        </XView>
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
                </>
            )}
        </XView>
    );

    // Actions
    let actions = <XView width={83}>{hover && props.renderMenu()}</XView>;

    // Result

    return (
        <XView
            alignItems="center"
            flexDirection="row"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            marginTop={props.compact ? 0 : 12}
            paddingLeft={20}
            paddingRight={20}
        >
            {selector}
            <div className={AvatarWrapper}>{preambula}</div>
            {content}
            {actions}
        </XView>
    );
});
