import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import { XAvatar } from 'openland-x/XAvatar';
import { XPopper } from 'openland-x/XPopper';
import { MessageFull_sender } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { withOnline } from '../../../../../api/withOnline';
import { XDate } from 'openland-x/XDate';

const showAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        display: 'none'
    },
    '60%': {
        display: 'block'
    },
    '70%': {
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden'
    },
    '100%': {
        opacity: 1,
        pointerEvents: 'auto',
        visibility: 'auto'
    }
});

const UserAvatarWrapper = Glamorous(XAvatar)({
    marginTop: 3
});

const Container = Glamorous(XPopper.Content)({
    padding: 0,
    animationDuration: `500ms`,
    animationName: `${showAnimation}`,
    '& + .arrow': {
        animationDuration: `500ms`,
        animationName: `${showAnimation}`
    }
});

const Wrapper = Glamorous.div({
    maxWidth: 400,
    paddingTop: 20,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    position: 'relative',
});

const StatusWrapper = Glamorous.div<{ online: boolean }>((props) => ({
    flex: 1,
    textAlign: 'right',
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '17px'
}));

const Name = Glamorous.div({
    marginTop: 12,
    fontSize: 16,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.9)',
    lineHeight: '19px'
});

const Role = Glamorous.div({
    marginTop: 6,
    fontSize: 14,
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.5)',
    lineHeight: '16px'
});

const Buttons = Glamorous(XHorizontal)({
    marginTop: 20,
    width: 224
});

const Status = withOnline(props => {
    if (props.data.user && (props.data.user.lastSeen && props.data.user.lastSeen !== 'online' && !props.data.user.online)) {
        return (
            <StatusWrapper online={false}>
                Last seen {props.data.user.lastSeen === 'never_online' ? 'moments ago' : <XDate value={props.data.user.lastSeen} format="humanize_cute" />}
            </StatusWrapper>
        );
    } else if (props.data.user && props.data.user.online) {
        return (
            <StatusWrapper online={true}>
                Online
            </StatusWrapper>
        );
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

export class UserAvatar extends React.Component<{ user: MessageFull_sender }> {
    render() {
        return (
            <UserAvatarWrapper
                size="small"
                style="colorus"
                objectName={this.props.user.name}
                objectId={this.props.user.id}
                cloudImageUuid={this.props.user.photo || undefined}
                path={'/mail/u/' + this.props.user.id}
            />
        );
    }
}

export const UserPopper = (props: { user: MessageFull_sender, isMe: boolean }) => {
    let { user, isMe } = props;
    let content = (
        <Wrapper>
            <XHorizontal>
                <XAvatar
                    size="l-medium"
                    style="user"
                    objectName={user.name}
                    objectId={user.id}
                    cloudImageUuid={user.photo || undefined}
                    path={'/mail/u/' + user.id}
                />
                <Status variables={{ userId: user.id }} />
            </XHorizontal>
            <Name>{user.name}</Name>
            <Buttons separator={6}>
                {!isMe && <XButton path={'/mail/' + user.id} style="primary" text="Direct chat" size="small" />}
                <XButton path={'/mail/u/' + user.id} style="electric" text={isMe ? 'My profile' : 'View profile'} size="small" />
            </Buttons>
        </Wrapper>
    );

    return (
        <XPopper
            showOnHover={true}
            content={content}
            contentContainer={<Container />}
            placement="bottom-start"
            marginLeft={-2}
        >
            <UserAvatar user={user} />
        </XPopper>
    );
};