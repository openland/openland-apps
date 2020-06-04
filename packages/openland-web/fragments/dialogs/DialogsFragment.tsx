import * as React from 'react';
import { css } from 'linaria';
import { XViewRouterContext, XView } from 'react-mental';
import { DialogListFragment } from './DialogListFragment';
import { UCounter } from 'openland-unicorn/UCounter';
import { useClient } from 'openland-api/useClient';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import { showCreatingGroupFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import NotificationIcon from 'openland-icons/s/ic-notifications-24.svg';
import PlusIcon from 'openland-icons/ic-add.svg';

const dotClass = css`
    position: absolute;
    top: 11px;
    right: 14px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    border: 2px solid var(--backgroundPrimary);
    background-color: var(--accentNegative);
    z-index: 2;
`;

const wrapperClass = css`
    position: relative;

    &:hover .${dotClass} {
        border-color: var(--backgroundPrimaryHover);
    }
`;

export const NotificationsButton = React.memo(() => {
    const client = useClient();
    const notificationsCenter = client.useMyNotificationCenter({
        fetchPolicy: 'network-only',
        suspense: false,
    });

    return (
        <div className={wrapperClass}>
            <UIconButton path="/notifications" icon={<NotificationIcon />} size="large" />
            {notificationsCenter && !!notificationsCenter.myNotificationCenter.unread && (
                <div className={dotClass} />
            )}
        </div>
    );
});

const DialogsCounter = React.memo(() => {
    const client = useClient();
    let counter = client.useGlobalCounter({ fetchPolicy: 'cache-first', suspense: false });
    if (counter) {
        return <UCounter value={counter.alphaNotificationCounter.unreadCount} />;
    }
    return null;
});

const BotActivator = () => {
    const client = useClient();
    const discoverState = client.useDiscoverState({ suspense: false });
    if (!discoverState) {
        return null;
    }
    if (discoverState.dialogs.items.length === 0) {
        client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
    }
    return null;
};

export const DialogsFragment = React.memo(() => {
    const stackRouter = React.useContext(XViewRouterContext)!;
    const isVisible = useVisibleTab();
    React.useEffect(
        () => {
            if (isVisible) {
                trackEvent('navigate_chats');
            }
        },
        [isVisible],
    );

    return (
        <>
            <DialogsCounter />
            <BotActivator />
            <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
                <USideHeader title="Chats">
                    <NotificationsButton />
                    <div onClick={() => showCreatingGroupFragment({ entityType: 'group' })}>
                        <UIconButton icon={<PlusIcon />} size="large" />
                    </div>
                </USideHeader>
                <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                    <DialogListFragment
                        onSearchItemSelected={() => {
                            /* */
                        }}
                        onDialogPress={id => {
                            stackRouter.navigate(`/mail/${id}`);
                        }}
                    />
                </XView>
            </XView>
        </>
    );
});
