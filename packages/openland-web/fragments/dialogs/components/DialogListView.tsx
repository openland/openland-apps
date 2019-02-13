import * as React from 'react';
import { XView } from 'react-mental';
import { DialogSearchInput } from './DialogSearchInput';
import { XListView } from 'openland-web/components/XListView';
import Glamorous from 'glamorous';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XButton } from 'openland-x/XButton';
import { DialogView } from './DialogView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { DialogSearchResults } from './DialogSearchResults';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XViewRouterContext, XViewRouteContext } from 'react-mental';
import { XInput } from 'openland-x/XInput';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XMemo } from 'openland-y-utils/XMemo';

const LoadingWrapper = Glamorous.div({
    height: 60,
});

export interface DialogListViewProps {
    onDialogClick?: (id: string) => void;
}

export const DialogListView = XMemo<DialogListViewProps>(props => {
    const ref = React.createRef<XInput>();
    let messenger = React.useContext(MessengerContext);
    let [query, setQuery] = React.useState('');
    let isSearching = query.trim().length > 0;
    let router = React.useContext(XViewRouterContext);
    let route = React.useContext(XViewRouteContext);

    const renderLoading = React.useMemo(() => {
        return () => {
            return (
                <LoadingWrapper>
                    <XButton alignSelf="center" style="flat" loading={true} />
                </LoadingWrapper>
            );
        };
    }, []);
    const renderDialog = React.useMemo(
        () => {
            return (item: DialogDataSourceItem) => <DialogView item={item} />;
        },
        [props.onDialogClick],
    );

    const getCurrentConversationId = () => {
        return route && (route as any).routeQuery ? (route as any).routeQuery.conversationId : null;
    };

    const getConversationId = (delta: number) => {
        const currentConversationId = getCurrentConversationId();
        if (currentConversationId === null) {
            return 0;
        }

        const currentDialogIndex = messenger.dialogList.dataSource.findIndex(currentConversationId);
        const nextIndex = Math.min(
            Math.max(currentDialogIndex - delta, 0),
            messenger.dialogList.dataSource.getSize() - 1,
        );

        return messenger.dialogList.dataSource.getItemByIndex(nextIndex).key;
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
                    {isSearching && <DialogSearchResults variables={{ query: query }} />}
                    {canUseDOM && !isSearching && (
                        <XListView
                            dataSource={messenger.dialogList.dataSource}
                            itemHeight={72}
                            loadingHeight={60}
                            renderItem={renderDialog}
                            renderLoading={renderLoading}
                        />
                    )}
                </XView>
            </XView>
        </XShortcuts>
    );
});
