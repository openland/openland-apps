import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { XViewRouterContext, XViewRouteContext, XViewRoute } from 'react-mental';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { XListView } from 'openland-web/components/XListView';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogView } from './DialogView';
import { USearchInput, USearchInputRef } from 'openland-web/components/unicorn/USearchInput';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useGlobalSearch } from 'openland-unicorn/components/TabLayout';
import { dialogListWebDataSource, DialogListWebItem } from './DialogListWebDataSource';
import { XLoader } from 'openland-x/XLoader';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceWindow } from 'openland-y-utils/DataSourceWindow';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { CallFloating } from 'openland-web/modules/conference/CallFloating';
import { DiscoverFooter } from 'openland-web/fragments/discover/components/DiscoverFooter';
import { DialogSearchMessages, DialogSearchMessagesRef } from './DialogSearchMessages';
import { TextStyles } from 'openland-web/utils/TextStyles';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;
  flex-basis: 0;
  min-height: 0;
  transform: translateZ(0);
`;

const searchWrapper = css`
    flex-direction: row;
    padding: 0 16px;
    margin: 0 0 16px;
    position: relative;
    overflow: hidden;
    transition: padding 100ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: padding;

    &.is-active {
        padding-right: 80px;

        .search-button {
            transform: translateX(0);
            opacity: 1;
            pointer-events: initial;
        }
    }
`;

const searchButton = css`
    width: 80px;
    position: absolute;
    top: 0; right: 0; bottom: 0;
    transform: translateX(20px);
    transition: transform 100ms cubic-bezier(0.4, 0, 0.2, 1), opacity 100ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, opacity;
    opacity: 0;
    pointer-events: none;
`;

export interface DialogListViewProps {
    onDialogClick?: (id: string) => void;
    onSearchItemPress?: (a: string) => void;
    onSearchItemSelected: (a: GlobalSearch_items | null) => void;
}

let ds: DataSource<DialogListWebItem> | undefined;

export const DialogListView = React.memo((props: DialogListViewProps) => {
    const ref = React.useRef<USearchInputRef>(null);
    let messenger = React.useContext(MessengerContext);
    if (!ds) {
        ds = dialogListWebDataSource(messenger.dialogList.dataSource);
    }
    const dataSource = React.useMemo(() => new DataSourceWindow(ds!, 20), [ds]);
    const globalSearch = useGlobalSearch();
    const router = React.useContext(XViewRouterContext);
    const route = React.useContext(XViewRouteContext);
    const listRef = React.useRef<DialogSearchMessagesRef>(null);

    const [focused, setFocused] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const isSearching = focused || globalSearch.value.trim().length > 0;

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

    useShortcuts([
        {
            keys: ['Escape'],
            callback: () => {
                // TODO: check input focus (implement is useShortcuts via ref?)
                if (ref.current && globalSearch.value) {
                    ref.current.reset();
                    setFocused(false);
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

    const query = globalSearch.value;

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
            <div className={cx(searchWrapper, isSearching && 'is-active')}>
                <USearchInput
                    value={globalSearch.value}
                    onChange={globalSearch.onChange}
                    onFocus={onInputFocus}
                    ref={ref}
                    placeholder="Groups, people and more"
                    loading={loading}
                    flexGrow={1}
                />

                <div className={cx(searchButton, 'search-button')}>
                    <XView
                        onClick={onInputCancel}
                        color="var(--accentPrimary)"
                        hoverColor="var(--accentPrimaryHover)"
                        paddingVertical={8}
                        cursor="pointer"
                        paddingHorizontal={16}
                        {...TextStyles.Body}
                    >
                        Cancel
                    </XView>
                </div>
            </div>

            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                {isSearching && (
                    <DialogSearchMessages
                        listRef={listRef}
                        onPick={onPick}
                        onMessagePick={onMessagePick}
                        onLoading={setLoading}
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
