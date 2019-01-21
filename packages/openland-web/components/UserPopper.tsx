import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import Loadable from 'react-loadable';
import { XAvatar } from 'openland-x/XAvatar';
import { XPopper } from 'openland-x/XPopper';
import { MessageFull_sender } from 'openland-api/Types';

const showAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        display: 'none',
    },
    '60%': {
        display: 'block',
    },
    '70%': {
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
    },
    '100%': {
        opacity: 1,
        pointerEvents: 'auto',
        visibility: 'auto',
    },
});

const UserAvatarWrapper = Glamorous(XAvatar)({
    marginTop: 3,
    '& *': {
        cursor: 'pointer',
    },
});

const Container = Glamorous(XPopper.Content)({
    padding: 0,
    animationDuration: `500ms`,
    animationName: `${showAnimation}`,
    '& + .arrow': {
        animationDuration: `500ms`,
        animationName: `${showAnimation}`,
    },
});

export class UserAvatar extends React.PureComponent<{
    user: MessageFull_sender;
    startSelected: boolean;
}> {
    render() {
        let usrPath: string | undefined = undefined;
        if (!this.props.startSelected) {
            usrPath = '/mail/u/' + this.props.user.id;
        }
        return (
            <UserAvatarWrapper
                size="small"
                style="colorus"
                objectName={this.props.user.name}
                objectId={this.props.user.id}
                cloudImageUuid={this.props.user.photo || undefined}
                path={usrPath}
            />
        );
    }
}

const Loading = () => {
    return <div />;
};

const UserPopperContent = Loadable({
    loader: () => import('./UserPopperContent'),
    loading: Loading,
});

export class UserPopper extends React.PureComponent<
    {
        user: MessageFull_sender;
        isMe: boolean;
        startSelected: boolean;
        noCardOnMe?: boolean;
        children?: any;
    },
    {
        showPopper: boolean;
    }
> {
    xPopperRef = React.createRef<XPopper>();

    showPopper = () => {
        if (this.xPopperRef.current) {
            this.xPopperRef.current.onMouseOverTarget();
        }
    };

    hidePopper = () => {
        if (this.xPopperRef.current) {
            this.xPopperRef.current.onMouseOutTarget();
        }
    };

    getXPopperTargetNode = (elem: Element | null | Text) => {
        return elem && elem instanceof Element ? elem.children[0] : elem;
    };

    render() {
        let { user, isMe, noCardOnMe, children, startSelected } = this.props;

        console.log(UserPopperContent);
        return (
            <XPopper
                ref={this.xPopperRef}
                nodeSelector={this.getXPopperTargetNode}
                style={noCardOnMe && isMe ? 'dark' : 'default'}
                content={
                    <div onMouseEnter={this.showPopper} onMouseLeave={this.hidePopper}>
                        <UserPopperContent
                            noCardOnMe={noCardOnMe}
                            isMe={isMe}
                            user={user}
                            startSelected={startSelected}
                        />
                    </div>
                }
                contentContainer={<Container />}
                placement="top-start"
                marginLeft={-2}
            >
                <span onMouseEnter={this.showPopper} onMouseLeave={this.hidePopper}>
                    {children ? children : <UserAvatar user={user} startSelected={startSelected} />}
                </span>
            </XPopper>
        );
    }
}
