import * as React from 'react';
import { css } from 'linaria';
import { XViewRouterContext, XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogListFragment } from './DialogListFragment';
import { UCounter } from 'openland-unicorn/UCounter';
import { useClient } from 'openland-api/useClient';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import { showCreatingGroupFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import NotificationIcon from 'openland-icons/s/ic-notifications-24.svg';
import AddIcon from 'openland-icons/s/ic-add-24.svg';
import IcMessage from 'openland-icons/s/ic-message-24.svg';
import IcUnread from 'openland-icons/s/ic-unread-24.svg';
import IcUser from 'openland-icons/s/ic-user-24.svg';
import IcGroup from 'openland-icons/s/ic-group-24.svg';

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

export type DialogType = 'all' | 'unread' | 'groups' | 'private';

const FiltersMenu = (props: {
    dialogFilter: DialogType;
    setDialogFilter: (t: DialogType) => void;
    ctx: UPopperController;
}) => {
    let res = new UPopperMenuBuilder();
    res.item({
        title: 'All chats',
        icon: <IcMessage />,
        action: () => props.setDialogFilter('all'),
        selected: props.dialogFilter === 'all',
    });
    res.item({
        title: 'Unread',
        icon: <IcUnread />,
        action: () => props.setDialogFilter('unread'),
        selected: props.dialogFilter === 'unread',
    });
    res.item({
        title: 'Direct',
        icon: <IcUser />,
        action: () => props.setDialogFilter('private'),
        selected: props.dialogFilter === 'private',
    });
    res.item({
        title: 'Groups',
        icon: <IcGroup />,
        action: () => props.setDialogFilter('groups'),
        selected: props.dialogFilter === 'groups',
    });
    return res.build(props.ctx, 240);
};

export const DialogsFragment = React.memo(() => {
    const messenger = React.useContext(MessengerContext);
    const [dialogFilter, setDialogFilter] = React.useState<DialogType>('all');
    const stackRouter = React.useContext(XViewRouterContext)!;
    const isVisible = useVisibleTab();

    const [menuVisible, menuShow] = usePopper(
        { placement: 'bottom-start', updatedDeps: dialogFilter },
        (ctx) => (
            <FiltersMenu ctx={ctx} setDialogFilter={setDialogFilter} dialogFilter={dialogFilter} />
        ),
    );

    React.useEffect(() => {
        if (isVisible) {
            trackEvent('navigate_chats');
        }
    }, [isVisible]);

    const title =
        dialogFilter === 'unread'
            ? 'Unread'
            : dialogFilter === 'groups'
            ? 'Groups'
            : dialogFilter === 'private'
            ? 'Direct'
            : 'Chats';

    return (
        <>
            <DialogsCounter />
            <XView
                width="100%"
                height="100%"
                flexDirection="column"
                alignItems="stretch"
                backgroundColor="var(--backgroundPrimary)"
            >
                <USideHeader
                    title={
                        !!messenger && !!messenger.experimentalUpdates
                            ? { title: title, active: menuVisible, action: menuShow }
                            : title
                    }
                >
                    <NotificationsButton />
                    <div onClick={() => showCreatingGroupFragment({ entityType: 'group' })}>
                        <UIconButton icon={<AddIcon />} size="large" />
                    </div>
                </USideHeader>
                <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                    <DialogListFragment
                        messenger={messenger}
                        experimental={false}
                        onDialogPress={(id) => {
                            stackRouter.navigate(`/mail/${id}`);
                        }}
                        selectedFilter={dialogFilter}
                    />
                </XView>
            </XView>
        </>
    );
});
