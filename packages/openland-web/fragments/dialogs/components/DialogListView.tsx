import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XViewRouterContext, XViewRouteContext, XViewRoute } from 'react-mental';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { XListView } from 'openland-web/components/XListView';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogView } from './DialogView';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useGlobalSearch } from 'openland-unicorn/components/TabLayout';
import { DialogListWebItem } from './DialogListWebDataSource';
import { XLoader } from 'openland-x/XLoader';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceWindow } from 'openland-y-utils/DataSourceWindow';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { CallFloating } from 'openland-web/modules/conference/CallFloating';
import { DiscoverFooter } from 'openland-web/fragments/discover/components/DiscoverFooter';
import { DialogSearchMessages, DialogSearchMessagesRef } from './DialogSearchMessages';

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
    source: DataSource<DialogListWebItem>;
    onDialogClick?: (id: string) => void;
    onSearchItemPress?: (a: string) => void;
    onSearchItemSelected?: (a: GlobalSearch_items | null) => void;
}

export const DialogListView = React.memo((props: DialogListViewProps) => {
    const ref = React.useRef<USearchInputRef>(null);
    let messenger = React.useContext(MessengerContext);
    const dataSource = React.useMemo(() => new DataSourceWindow(props.source, 20), [props.source]);
    const globalSearch = useGlobalSearch();
    const router = React.useContext(XViewRouterContext);
    const route = React.useContext(XViewRouteContext);
    const listRef = React.useRef<DialogSearchMessagesRef>(null);

    const [focused, setFocused] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const isSearching = focused || (globalSearch && globalSearch.value.trim().length > 0);

    React.useEffect(
        () => {
            if (isSearching === false && props.onSearchItemSelected) {
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
                        size={props.source && props.source.isInited() ? 'medium' : 'large'}
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
                return <DialogView item={item} selected={selected} onPress={props.onDialogClick} savedMessages={item.flexibleId === messenger.user.id} />;
            };
        },
        [props.onDialogClick, conversationId],
    );

    const handleCtrlS = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    const handleEscape = () => {
        if (ref.current && globalSearch && globalSearch.value) {
            globalSearch.onChange('');
            return true;
        } else if (ref.current && focused) {
            ref.current.reset();
            setFocused(false);
            return true;
        }
        return false;
    };

    useShortcuts([
        { keys: ['Control', 's'], callback: handleCtrlS },
    ]);

    const onPick = React.useCallback((item: GlobalSearch_items) => {
        if (ref.current) {
            ref.current.reset();
        }
        setFocused(false);
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

    const query = globalSearch && globalSearch.value || '';

    React.useEffect(() => {
        if (listRef.current) {
            if (query.trim().length > 0) {
                listRef.current.loadResults(query);
            } else {
                listRef.current.resetResults();
            }
        }
    }, [query]);

    const onInputFocus = React.useCallback(() => {
        setFocused(true);
    }, []);

    const onInputCancel = React.useCallback(() => {
        if (ref.current) {
            ref.current.reset();
        }
        setFocused(false);
    }, []);

    return (
        <div className={containerStyle}>
            <USearchInput
                value={globalSearch && globalSearch.value || ''}
                onChange={(globalSearch && globalSearch.onChange) || (() => {/* */ })}
                onFocus={onInputFocus}
                ref={ref}
                placeholder="Chats, messages, and more"
                loading={loading}
                marginHorizontal={16}
                marginBottom={16}
                onCancel={onInputCancel}
            />

            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                {isSearching && (
                    <DialogSearchMessages
                        listRef={listRef}
                        onPick={onPick}
                        onMessagePick={onMessagePick}
                        onLoading={setLoading}
                        onEscapePress={handleEscape}
                    />
                )}
                {canUseDOM && !isSearching && (
                    <XListView
                        dataSource={dataSource}
                        itemHeight={72}
                        loadingHeight={1000}
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
