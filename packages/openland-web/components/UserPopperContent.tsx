import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { MessageFull_sender, UserShort } from 'openland-api/Types';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withOnline } from '../api/withOnline';
import { XDate } from 'openland-x/XDate';
import { XAvatar } from 'openland-x/XAvatar';

const StatusWrapper = Glamorous.div<{ online: boolean }>(props => ({
    flex: 1,
    textAlign: 'right',
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '17px',
}));

const Name = Glamorous.div({
    marginTop: 12,
    fontSize: 16,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.9)',
    lineHeight: '19px',
});

const OrgTitle = Glamorous.div({
    marginTop: 6,
    fontSize: 14,
    opacity: 0.5,
    color: '#000000',
});

const Buttons = Glamorous(XHorizontal)({
    marginTop: 20,
    width: 224,
});

const Status = withOnline(props => {
    if (
        props.data.user &&
        (props.data.user.lastSeen &&
            props.data.user.lastSeen !== 'online' &&
            !props.data.user.online)
    ) {
        return (
            <StatusWrapper online={false}>
                last seen{' '}
                {props.data.user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                        <XDate value={props.data.user.lastSeen} format="humanize_cute" />
                    )}
            </StatusWrapper>
        );
    } else if (props.data.user && props.data.user.online) {
        return <StatusWrapper online={true}>Online</StatusWrapper>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

const Wrapper = Glamorous.div({
    maxWidth: 400,
    paddingTop: 20,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    position: 'relative',
});

export default React.memo(
    ({
        noCardOnMe,
        isMe,
        user,
        startSelected,
    }: {
        user: UserShort;
        isMe: boolean;
        startSelected: boolean;
        noCardOnMe?: boolean;
    }) => {
        let usrPath: string | undefined = undefined;
        if (!startSelected) {
            usrPath = '/mail/u/' + user.id;
        }
        if (noCardOnMe && isMe) {
            return (
                <XView
                    width={78}
                    justifyContent="center"
                    alignItems="center"
                    height={30}
                    color={'white'}
                    borderRadius={15}
                    backgroundColor={'#6e7588'}
                >
                    It&apos;s you
                </XView>
            );
        } else {
            const organizationName = user.primaryOrganization ? user.primaryOrganization.name : '';
            return (
                <Wrapper>
                    <XHorizontal>
                        <XAvatar
                            online={false}
                            size="l-medium"
                            style="user"
                            objectName={user.name}
                            objectId={user.id}
                            cloudImageUuid={user.photo || undefined}
                            path={usrPath}
                        />
                        <Status variables={{ userId: user.id }} />
                    </XHorizontal>
                    <Name>{user.name}</Name>
                    <OrgTitle>{organizationName}</OrgTitle>
                    <Buttons separator={6}>
                        {!isMe && (
                            <XButton
                                path={'/mail/' + user.id}
                                style="primary"
                                text="Direct chat"
                                size="small"
                            />
                        )}
                        <XButton
                            path={'/mail/u/' + user.id}
                            style="electric"
                            text={isMe ? 'My profile' : 'View profile'}
                            size="small"
                        />
                    </Buttons>
                </Wrapper>
            );
        }
    },
);
