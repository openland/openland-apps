import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XViewRouterContext, XViewRouteContext, XViewRoute } from 'react-mental';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { XListView } from 'openland-web/components/XListView';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogView } from './DialogView';
import { DialogSearchResults } from './DialogSearchResults';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XMemo } from 'openland-y-utils/XMemo';
import { dialogListWebDataSource, DialogListWebItem } from './DialogListWebDataSource';
import { XLoader } from 'openland-x/XLoader';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceWindow } from 'openland-y-utils/DataSourceWindow';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { CallFloating } from 'openland-web/modules/conference/CallFloating';
import { DiscoverFooter } from 'openland-web/fragments/discover/components/DiscoverFooter';
import { DialogSearchMessages } from './DialogSearchMessages';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 0;
  min-height: 0;
  transform: translateZ(0);
`;

export interface DialogListViewProps {
    onDialogClick?: (id: string) => void;
    onSearchItemPress?: (a: string) => void;
    onSearchItemSelected: (a: GlobalSearch_items | null) => void;
}

let ds: DataSource<DialogListWebItem> | undefined;

export const DialogListView = XMemo<DialogListViewProps>(props => {
    const ref = React.useRef<USearchInputRef>(null);
    let messenger = React.useContext(MessengerContext);
    if (!ds) {
        ds = dialogListWebDataSource(messenger.dialogList.dataSource);
    }
    let dataSource = React.useMemo(() => new DataSourceWindow(ds!, 20), [ds]);
    let [query, setQuery] = React.useState('');
    let isSearching = query.trim().length > 0;
    let router = React.useContext(XViewRouterContext);
    let route = React.useContext(XViewRouteContext);

    React.useEffect(
        () => {
            if (isSearching === false) {
                props.onSearchItemSelected(null);
            }
        },
        [isSearching],
    );

    let conversationId: null | string = null;
    if (route) {
        const typedFixedRoute = route as XViewRoute & { routeQuery?: any };

        if (typedFixedRoute.routeQuery) {
            conversationId =
                typedFixedRoute.routeQuery && typedFixedRoute.routeQuery.conversationId
                    ? typedFixedRoute.routeQuery.conversationId
                    : null;
        }
    }

    const renderLoading = React.useMemo(() => {
        return () => {
            return (
                <XView
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height={80}
                >
                    <XLoader
                        loading={true}
                        size={ds && ds.isInited() ? 'medium' : 'large'}
                        transparentBackground={true}
                    />
                </XView>
            );
        };
    }, []);

    const renderDialog = React.useMemo(
        () => {
            return (item: DialogListWebItem) => {
                let selected = false;
                if (
                    conversationId &&
                    (conversationId === item.key || conversationId === item.flexibleId)
                ) {
                    selected = true;
                }
                return <DialogView item={item} selected={selected} onPress={props.onDialogClick} />;
            };
        },
        [props.onDialogClick, conversationId],
    );

    // const getCurrentConversationId = () => {
    //     return route && (route as any).routeQuery ? (route as any).routeQuery.conversationId : null;
    // };

    // const getConversationId = (delta: number) => {
    //     const currentConversationId = getCurrentConversationId();
    //     if (currentConversationId === null) {
    //         return 0;
    //     }

    //     const currentDialogIndex = dataSource.findIndex(currentConversationId);
    //     const nextIndex = Math.min(
    //         Math.max(currentDialogIndex - delta, 0),
    //         dataSource.getSize() - 1,
    //     );

    //     return dataSource.getAt(nextIndex).key;
    // };

    // const handleOptionUp = () => {
    //     const nextId = getConversationId(+1);
    //     if (nextId !== getCurrentConversationId()) {
    //         router!.navigate(`/mail/${nextId}`);
    //     }
    // };

    // const handleOptionDown = () => {
    //     const nextId = getConversationId(-1);
    //     if (nextId !== getCurrentConversationId()) {
    //         router!.navigate(`/mail/${nextId}`);
    //     }
    // };

    const handleCtrlS = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    useShortcuts([
        {
            keys: ['Escape'],
            callback: () => {
                // TODO: check input focus (implement is useShortcuts via ref?)
                if (ref.current && query) {
                    ref.current.reset();
                    return true;
                }
                return false;
            },
        },
        // { keys: ['Meta', 'ArrowUp'], callback: handleOptionUp },
        // { keys: ['Meta', 'ArrowDown'], callback: handleOptionDown },
        { keys: ['Control', 's'], callback: handleCtrlS },
    ]);

    const onPick = React.useCallback((item: GlobalSearch_items) => {
        if (ref.current) {
            ref.current.reset();
        }
        if (item.__typename === 'Organization') {
            router!.navigate(`/${item.shortname || item.id}`);
            return;
        }
        router!.navigate(`/mail/${item.id}`);
    }, []);

    const onMessagePick = React.useCallback(
        (messageId: string) => {
            router!.navigate(`/message/${messageId}`, false);
        },
        [],
    );

    return (
        <div className={containerStyle}>
            <USearchInput
                value={query}
                onChange={setQuery}
                ref={ref}
                marginHorizontal={16}
                marginBottom={16}
            />
            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                {isSearching && !onMessagePick && (
                    <DialogSearchResults
                        variables={{ query }}
                        onPick={onPick}
                    />
                )}
                {isSearching && onMessagePick && (
                    <DialogSearchMessages
                        variables={{ query }}
                        onPick={onPick}
                        onMessagePick={onMessagePick}
                    />
                )}
                {canUseDOM && !isSearching && (
                    <XListView
                        dataSource={dataSource}
                        itemHeight={72}
                        loadingHeight={200}
                        renderItem={renderDialog}
                        renderLoading={renderLoading}
                        afterChildren={<DiscoverFooter />}
                    />
                )}
            </XView>
            <CallFloating />
        </div>
    );
});

DialogListView.displayName = 'DialogListView';
