import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { UserForMention } from 'openland-api/Types';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XDate } from 'openland-x/XDate';
import { XAvatar } from 'openland-x/XAvatar';
import { emoji } from 'openland-y-utils/emoji';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XViewRouterContext } from 'react-mental';

const StatusWrapper = Glamorous.div<{ online: boolean }>(props => ({
    flex: 1,
    textAlign: 'right',
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.4)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '17px',
}));

const OrgTitle = Glamorous.div({
    marginTop: 6,
    fontSize: 14,
    opacity: 0.5,
    color: '#000000',
});

const Buttons = Glamorous(XHorizontal)({
    marginTop: 20,
});

const Status = (({ variables }) => {
    const client = useClient();
    const data = client.useOnline(variables, {
        fetchPolicy: 'network-only',
    });

    const { user } = data;

    if (user && (user.lastSeen && user.lastSeen !== 'online' && !user.online)) {
        return (
            <StatusWrapper online={false}>
                last seen{' '}
                {user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                    <XDate value={user.lastSeen} format="humanize_cute" />
                )}
            </StatusWrapper>
        );
    } else if (user && user.online) {
        return <StatusWrapper online={true}>Online</StatusWrapper>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

const Wrapper = Glamorous.div({
    maxWidth: 400,
    minWidth: 200,
    paddingTop: 20,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    position: 'relative',
});

const UserPopperContent = XMemo(
    ({
        noCardOnMe,
        isMe,
        user,
        hidePopper,
        customButton,
    }: {
        user: UserForMention;
        isMe: boolean;
        startSelected: boolean;
        noCardOnMe?: boolean;
        hidePopper: Function;
        customButton?: (hidePopper: Function) => void;
    }) => {
        const router = React.useContext(XViewRouterContext);
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
            const messenger = React.useContext(MessengerContext);
            React.useEffect(() => {
                messenger.getOnlines().onUserAppears(user.id!);
            }, []);
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
                        />
                        <React.Suspense fallback={<div />}>
                            <Status variables={{ userId: user.id }} />
                        </React.Suspense>
                    </XHorizontal>
                    <XView
                        marginTop={12}
                        fontSize={16}
                        fontWeight="600"
                        flexDirection="row"
                        color="rgba(0, 0, 0, 0.9)"
                        hoverColor="#1790ff"
                        cursor="pointer"
                        onClick={(e: any) => {
                            e.stopPropagation();
                            if (router) {
                                router.navigate('/' + user.id);
                                hidePopper();
                            }
                        }}
                    >
                        {emoji(user.name)}
                    </XView>
                    <OrgTitle>{organizationName}</OrgTitle>
                    {(!isMe || !!customButton) && (
                        <Buttons separator={6}>
                            {!isMe && (
                                <XButton
                                    style="primary"
                                    text="Direct chat"
                                    size="small"
                                    autoClose={true}
                                    onClick={(e: any) => {
                                        e.stopPropagation();
                                        if (router) {
                                            router.navigate('/mail/' + user.id);
                                            hidePopper();
                                        }
                                    }}
                                />
                            )}
                            {!!customButton && customButton(hidePopper)}
                        </Buttons>
                    )}
                </Wrapper>
            );
        }
    },
);

export default UserPopperContent;
