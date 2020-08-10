import * as React from 'react';
import { css, cx } from 'linaria';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XView, XViewRouterContext } from 'react-mental';
import { UserNano_user } from 'openland-api/spacex.types';
import { XDate } from 'openland-x/XDate';
import { UAvatar } from './unicorn/UAvatar';
import { emoji } from 'openland-y-utils/emoji';
import { useClient } from 'openland-api/useClient';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { TextCaption, TextStyles } from 'openland-web/utils/TextStyles';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-24.svg';
import AddContactIcon from 'openland-icons/s/ic-invite-24.svg';
import { UIconButton } from './unicorn/UIconButton';
import { useCaptionPopper } from './CaptionPopper';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { useToast } from './unicorn/UToast';

const userStatus = css`
    color: #676d7a;
`;

const userOnlineStatus = css`
    color: #1790ff;
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

const userContainer = css`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    min-width: 360px;
    height: 128px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
`;

const userAbout = css`
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 0;
    padding-right: 12px;

    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    text-overflow: ellipsis;
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
        user: UserNano_user;
        isMe: boolean;
        noCardOnMe?: boolean;
        hidePopper: Function;
    }) => {
        const router = React.useContext(XViewRouterContext);
        const toastHandlers = useToast();
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
            const client = useClient();
            const messenger = React.useContext(MessengerContext);
            const { isContact } = useLocalContact(user.id, user.inContacts);
            const [showContactCaption] = useCaptionPopper({ text: isContact ? 'Remove from contacts' : 'Add to contacts' });
            const [loading, setLoading] = React.useState(false);

            const handleContactClick = async () => {
                setLoading(true);
                if (isContact) {
                    await client.mutateRemoveFromContacts({ userId: user.id });
                    toastHandlers.show({
                        type: 'success',
                        text: 'Removed from contacts',
                    });
                } else {
                    await client.mutateAddToContacts({ userId: user.id });
                    toastHandlers.show({
                        type: 'success',
                        text: 'Added to contacts',
                    });
                }
            };
            const prevIsContactRef = React.useRef(isContact);
            React.useEffect(() => {
                if (loading && prevIsContactRef.current !== isContact) {
                    setLoading(false);
                }
                prevIsContactRef.current = isContact;
            }, [loading, isContact]);

            React.useEffect(() => {
                messenger.getOnlines().onUsersAppear([user.id!]);
            }, []);
            return (
                <div className={userContainer}>
                    <XView flexDirection="row">
                        <XView
                            flexShrink={0}
                            marginRight={16}
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
                            {!isMe && (
                                <XView flexGrow={1} width="100%" alignItems="flex-end" flexDirection="row" justifyContent="space-between">
                                    <UButton
                                        marginBottom={4}
                                        text="Message"
                                        onClick={(e: React.MouseEvent) => {
                                            e.preventDefault();
                                            if (router) {
                                                router.navigate('/mail/' + user.id);
                                                hidePopper();
                                            }
                                        }}
                                    />
                                    {loading ? (
                                        <UIconButton
                                            loading={true}
                                            icon={isContact ? <RemoveContactIcon /> : <AddContactIcon />}
                                            size="medium"
                                        />
                                    ) : (
                                            <UIconButton
                                                icon={isContact ? <RemoveContactIcon /> : <AddContactIcon />}
                                                onClick={handleContactClick}
                                                size="medium"
                                                onMouseEnter={showContactCaption}
                                            />
                                        )}
                                </XView>
                            )}
                        </div>
                    </XView>
                </div>
            );
        }
    },
);

const entityContainer = css`
    display: flex;
    flex-direction: column;
    width: 320px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
`;

const entityName = css`
    width: 192px;
    max-height: 48px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

export const EntityPopperContent = React.memo(
    ({
        title,
        subtitle,
        id,
        photo,
        hidePopper,
    }: {
        title: string;
        subtitle?: string;
        id: string;
        photo?: string | null;
        hidePopper: Function;
    }) => {
        const router = React.useContext(XViewRouterContext);
        return (
            <div className={entityContainer}>
                <XView flexDirection="row">
                    <XView
                        flexShrink={0}
                        marginRight={16}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            if (router) {
                                router.navigate('/' + id);
                                hidePopper();
                            }
                        }}
                    >
                        <UAvatar
                            title={title}
                            id={id}
                            photo={photo}
                            size="xx-large"
                            squared={true}
                        />
                    </XView>
                    <XView paddingRight={16} justifyContent="center">
                        <XView
                            marginBottom={4}
                            {...TextStyles.Title3}
                            flexDirection="row"
                            color="var(--foregroundPrimary)"
                            hoverColor="var(--accentPrimary)"
                            cursor="pointer"
                            alignSelf="flex-start"
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                if (router) {
                                    router.navigate('/' + id);
                                    hidePopper();
                                }
                            }}
                        >
                            <div className={entityName}>{emoji(title)}</div>
                        </XView>
                        <XView {...TextStyles.Caption} color="var(--foregroundSecondary)">
                            {subtitle}
                        </XView>
                    </XView>
                </XView>
            </div>
        );
    },
);
