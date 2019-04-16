import * as React from 'react';
import { XView } from 'react-mental';
import { XViewRouterContext, XViewRouteContext, XViewRoute } from 'react-mental';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { DialogSearchInput } from './DialogSearchInput';
import { XListView } from 'openland-web/components/XListView';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XButton } from 'openland-x/XButton';
import { DialogView } from './DialogView';
import { DialogSearchResults } from './DialogSearchResults';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XInput } from 'openland-x/XInput';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XMemo } from 'openland-y-utils/XMemo';
import { dialogListWebDataSource, DialogListWebItem } from './DialogListWebDataSource';

const LoadingWrapper = Glamorous.div({
    height: 60,
});

const dialogSearchWrapperClassName = css`
    justify-content: flex-start !important;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export interface DialogListViewProps {
    onDialogClick?: (id: string) => void;
}

export const DialogListView = XMemo<DialogListViewProps>(props => {
    console.log('render DialogListView');
    const ref = React.createRef<XInput>();
    let messenger = React.useContext(MessengerContext);
    let dataSource = React.useMemo(() => dialogListWebDataSource(messenger.dialogList.dataSource), [messenger]);
    let [query, setQuery] = React.useState('');
    let isSearching = query.trim().length > 0;
    let router = React.useContext(XViewRouterContext);
    let route = React.useContext(XViewRouteContext);

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
                <LoadingWrapper>
                    <XButton alignSelf="center" style="flat" loading={true} />
                </LoadingWrapper>
            );
        };
    }, []);

    const renderDialog = React.useMemo(() => {
        return (item: DialogListWebItem) => {
            let selected = false;
            if (
                conversationId &&
                (conversationId === item.key || conversationId === item.flexibleId)
            ) {
                selected = true;
            }
            return <DialogView item={item} selected={selected} />;
        };
    }, [props.onDialogClick, conversationId]);

    const getCurrentConversationId = () => {
        return route && (route as any).routeQuery ? (route as any).routeQuery.conversationId : null;
    };

    const getConversationId = (delta: number) => {
        const currentConversationId = getCurrentConversationId();
        if (currentConversationId === null) {
            return 0;
        }

        const currentDialogIndex = dataSource.findIndex(currentConversationId);
        const nextIndex = Math.min(
            Math.max(currentDialogIndex - delta, 0),
            dataSource.getSize() - 1,
        );

        return dataSource.getAt(nextIndex).key;
    };

    const handleOptionUp = () => {
        const nextId = getConversationId(+1);
        if (nextId !== getCurrentConversationId()) {
            router!.navigate(`/mail/${nextId}`);
        }
    };

    const handleOptionDown = () => {
        const nextId = getConversationId(-1);
        if (nextId !== getCurrentConversationId()) {
            router!.navigate(`/mail/${nextId}`);
        }
    };

    const handleCtrlS = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    return (
        <XShortcuts
            handlerMap={{
                OPTION_UP: handleOptionUp,
                OPTION_DOWN: handleOptionDown,
                CTRL_S: handleCtrlS,
            }}
            keymap={{
                OPTION_UP: {
                    osx: ['option+up'],
                    windows: ['alt+up'],
                },
                OPTION_DOWN: {
                    osx: ['option+down'],
                    windows: ['alt+down'],
                },
                CTRL_S: {
                    osx: ['ctrl+s'],
                },
            }}
        >
            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                <DialogSearchInput value={query} onChange={setQuery} ref={ref} />
                <XView flexGrow={1} flexBasis={0} minHeight={0}>
                    {isSearching && (
                        <div className={dialogSearchWrapperClassName}>

                            <DialogSearchResults
                                variables={{ query: query }}
                                onClick={() => setQuery('')}
                            />

                        </div>
                    )}
                    {canUseDOM && !isSearching && (
                        <XListView
                            dataSource={dataSource}
                            itemHeight={72}
                            loadingHeight={200}
                            renderItem={renderDialog}
                            renderLoading={renderLoading}
                        />
                    )}
                </XView>
            </XView>
        </XShortcuts>
    );
});

DialogListView.displayName = 'DialogListView';