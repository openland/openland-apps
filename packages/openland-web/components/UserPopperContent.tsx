import * as React from 'react';
import { css, cx } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XView, XViewRouterContext } from 'react-mental';
import { UserForMention } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XDate } from 'openland-x/XDate';
import { UAvatar } from './unicorn/UAvatar';
import { emoji } from 'openland-y-utils/emoji';
import { useClient } from 'openland-web/utils/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { TextCaption } from 'openland-web/utils/TextStyles';

const userStatus = css`
    color: #676d7a;
`;

const userOnlineStatus = css`
    color: #1790ff;
`;

const organizationTitle = css`
    margin-top: 4px;
    color: #676d7a;
`;

const Status = (({ variables }) => {
    const client = useClient();
    const data = client.useOnline(variables, {
        fetchPolicy: 'network-only',
    });

    const { user } = data;

    if (user && user.lastSeen && user.lastSeen !== 'online' && !user.online) {
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
        return <div className={cx(userStatus, userOnlineStatus)}>Online</div>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

const container = css`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    min-width: 360px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
`;

const userAbout = css`
    padding-top: 12px;
    padding-bottom: 16px;
    padding-left: 0;
    padding-right: 16px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const userName = css`
    width: 184px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                if (router) {
                                    router.navigate('/' + user.id);
                                    hidePopper();
                                }
                            }}
                        >
                            <UAvatar
                                title={user.name}
                                id={user.id}
                                photo={user.photo}
                                size="xxx-large"
                                squared={true}
                            />
                        </XView>
                        <div className={userAbout}>
                            <XView
                                marginBottom={4}
                                fontSize={17}
                                lineHeight={1.41}
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
                                <div className={userName}>{emoji(user.name)}</div>
                            </XView>
                            <React.Suspense fallback={<div />}>
                                <Status variables={{ userId: user.id }} />
                            </React.Suspense>
                            <div className={cx(organizationTitle, TextCaption)}>
                                {organizationName}
                            </div>
                            {!isMe && (
                                <UButton
                                    text="Message"
                                    size="small"
                                    marginTop={16}
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
                    </XHorizontal>
                </div>
            );
        }
    },
);
