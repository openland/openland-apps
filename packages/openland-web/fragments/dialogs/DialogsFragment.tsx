import * as React from 'react';
import { XViewRouterContext, XView } from 'react-mental';
import { ThemeDefault } from 'openland-y-utils/themes';
import { NotificationsButton, NewOptionsButton } from 'openland-web/components/NewOptionsButton';
import { DialogListFragment } from './DialogListFragment';
import { UCounter } from 'openland-unicorn/UCounter';
import { useClient } from 'openland-web/utils/useClient';

const DialogsCounter = React.memo(() => {
    const client = useClient();
    let counter = client.useWithoutLoaderGlobalCounter({ fetchPolicy: 'cache-first' });
    if (counter) {
        return <UCounter value={counter.alphaNotificationCounter.unreadCount} />;
    }
    return null;
});

export const DialogsFragment = React.memo(() => {
    let router = React.useContext(XViewRouterContext)!;
    return (
        <>
            <DialogsCounter />
            <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
                <XView
                    height={56}
                    paddingHorizontal={16}
                    paddingVertical={12}
                    backgroundColor="#fff"
                    fontSize={24}
                    lineHeight="32px"
                    fontWeight="600"
                    color={ThemeDefault.foregroundPrimary}
                    flexDirection="row"
                >
                    <XView flexGrow={1} minWidth={0} flexBasis={0}>
                        Chats
                </XView>
                    <XView flexDirection="row" alignItems="center" paddingLeft={12}>
                        <XView marginRight={7} justifyContent="center" alignItems="center">
                            <NotificationsButton />
                        </XView>
                        <NewOptionsButton />
                    </XView>
                </XView>
                <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                    <DialogListFragment
                        onSearchItemSelected={() => { /* */ }}
                        onDialogPress={(id) => {
                            router.navigate(`/mail/${id}`);
                        }}
                    />
                </XView>
            </XView>
        </>
    );
});