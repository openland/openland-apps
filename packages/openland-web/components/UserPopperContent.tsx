import * as React from 'react';
import { css, cx } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XView, XViewRouterContext } from 'react-mental';
import { UserForMention } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XDate } from 'openland-x/XDate';
import { XAvatar } from 'openland-x/XAvatar';
import { emoji } from 'openland-y-utils/emoji';
import { useClient } from 'openland-web/utils/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { TextCaption, TextDensed } from 'openland-web/utils/TextStyles';

const userStatus = css`
    flex: 1;
    text-align: right;
    color: #676d7a;
`;

const userOnlineStatus = css`
    color: #1790ff;
`;

const organizationTitle = css`
    color: #676d7a;
`;

const Status = (({ variables }) => {
    const client = useClient();
    const data = client.useOnline(variables, {
        fetchPolicy: 'network-only',
    });

    const { user } = data;

    if (user && (user.lastSeen && user.lastSeen !== 'online' && !user.online)) {
        return (
            <div className={cx(userStatus, TextCaption)}>
                last seen{' '}
                {user.lastSeen === 'never_online' ? (
                    'moments ago'
                ) : (
                    <XDate value={user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (user && user.online) {
        return <div className={cx(userStatus, userOnlineStatus, TextCaption)}>Online</div>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

const container = css`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    min-width: 200px;
    padding-top: 20px;
    padding-bottom: 24px;
    padding-left: 24px;
    padding-right: 24px;
    position: relative;
`;

export const UserPopperContent = React.memo(
    ({
        noCardOnMe,
        isMe,
        user,
        hidePopper,
    }: {
        user: UserForMention;
        isMe: boolean;
        noCardOnMe?: boolean;
        hidePopper: Function;
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
                    backgroundColor={'#000'}
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
                <div className={container}>
                    <XHorizontal>
                        <XView
                            flexShrink={0}
                            onClick={(e: any) => {
                                e.stopPropagation();
                                if (router) {
                                    router.navigate('/' + user.id);
                                    hidePopper();
                                }
                            }}
                        >
                            <XAvatar
                                online={false}
                                size="l-medium"
                                style="user"
                                objectName={user.name}
                                objectId={user.id}
                                cloudImageUuid={user.photo || undefined}
                            />
                        </XView>
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
                        alignSelf="flex-start"
                        onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            if (router) {
                                router.navigate('/' + user.id);
                                hidePopper();
                            }
                        }}
                    >
                        {emoji(user.name)}
                    </XView>
                    <div className={cx(organizationTitle, TextDensed)}>{organizationName}</div>
                    {!isMe && (
                        <UButton
                            text="Direct chat"
                            size="small"
                            marginTop={20}
                            alignSelf="flex-start"
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                if (router) {
                                    router.navigate('/mail/' + user.id);
                                    hidePopper();
                                }
                            }}
                        />
                    )}
                </div>
            );
        }
    },
);
