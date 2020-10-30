import React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';

import { XLoader } from 'openland-x/XLoader';
import { XScrollValues } from 'openland-x/XScrollView3';
import { ChatSearchEngine } from 'openland-engines/messenger/ChatSearchEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DataSourceWindow } from 'openland-y-utils/DataSourceWindow';
import { XScrollViewAnchored } from 'openland-x/XScrollViewAnchored';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { debounce } from 'openland-y-utils/timer';
import {
    DataSourceDateItem,
    DataSourceNewDividerItem,
} from 'openland-engines/messenger/ConversationEngine';

import { DataSourceRender } from '../messenger/view/DataSourceRender';
import {
    buildMessagesSearchDataSource,
    DataSourceWebMessageItem,
} from '../messenger/data/WebMessageItemDataSource';

import { DateComponent } from '../messenger/view/DateComponent';
import { ChatSearchInput } from './ChatSearchInput';
import { ChatSearchMessage } from './ChatSearchMessage';

interface ChatSearchProps {
    chatId: string;
    onSearchClose: () => void;
}

const messagesWrapperClassName = css`
    padding-bottom: 35px;
`;

const loaderClass = css`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

const messagesListClassName = css`
    max-height: 400px;
    background-color: var(--backgroundPrimary);
    margin-left: -72px;
    
    @media(min-width: 1280px) {
        margin: 0 -5000px;    
    }
`;

const overlayClassName = css`
    height: 10000px;
    background-color: var(--backgroundTertiaryTrans);
    margin: 0 -2000px;
    box-shadow: inset 0px 8px 24px rgba(0, 0, 0, 0.08), inset 0px 0px 48px rgba(0, 0, 0, 0.04);
    flex-shrink: 0;
`;

export const ChatSearch = React.memo(({ chatId, onSearchClose }: ChatSearchProps) => {
    const messenger = React.useContext(MessengerContext);
    const [queryInProgress, setQueryInProgress] = React.useState(true);
    const [engine] = React.useState(() => new ChatSearchEngine(messenger, chatId));
    const [dataSourceWindow, setDataSourceWindow] = React.useState(() => {
        return new DataSourceWindow(buildMessagesSearchDataSource(engine.dataSource), 20);
    });

    useShortcuts({
        keys: ['Escape'],
        callback: onSearchClose,
    });

    const handleScroll = (e: XScrollValues) => {
        if (e.clientHeight === 0) {
            return;
        }
        if (
            e.scrollTop < 800 ||
            (e.scrollHeight === e.clientHeight && !dataSourceWindow.isCompleted())
        ) {
            dataSourceWindow.needMore();
        }
    };

    const loadQuery = React.useCallback(debounce(async (searchText: string) => {
        if (searchText.length > 2) {
            await engine.loadQuery(searchText);

            const searchDataSource = buildMessagesSearchDataSource(engine.dataSource);
            setDataSourceWindow(new DataSourceWindow(searchDataSource, 20));
            setQueryInProgress(false);
        }
    }, 350, true, true), [engine, setDataSourceWindow]);

    const onSearchChange = React.useCallback(async (searchText: string) => {
        setQueryInProgress(true);

        await loadQuery(searchText);
    }, [setQueryInProgress]);

    const renderMessage = React.memo(
        (data: {
            item: DataSourceWebMessageItem | DataSourceDateItem | DataSourceNewDividerItem;
        }) => {
            if (data.item.type === 'message') {
                return (
                    <ChatSearchMessage
                        message={data.item}
                        engine={messenger.getConversation(chatId)}
                    />
                );
            } else if (data.item.type === 'date') {
                return <DateComponent item={data.item} />;
            }
            return <div />;
        },
    );

    const renderLoading = React.memo(() => {
        return (
            <div className={loaderClass}>
                <XLoader loading={true} transparentBackground={true} size="medium" />
            </div>
        );
    });

    const dataSourceWrapper = React.memo((props: { children?: any }) => {
        if (dataSourceWindow.getSize() === 0 || queryInProgress) {
            return null;
        }

        return (
            <XScrollViewAnchored
                flexGrow={1}
                flexShrink={1}
                justifyContent="flex-end"
                onScroll={handleScroll}
                contentClassName={messagesWrapperClassName}
            >
                {props.children}
            </XScrollViewAnchored>
        );
    });

    return (
        <XView width="100%">
            <ChatSearchInput engine={engine} queryInProgress={queryInProgress} onSearchChange={onSearchChange} onSearchClose={onSearchClose} />
            <div className={cx('x', messagesListClassName)}>
                <DataSourceRender
                    dataSource={dataSourceWindow}
                    reverce={true}
                    renderItem={renderMessage}
                    renderLoading={renderLoading}
                    wrapWith={dataSourceWrapper}
                />
            </div>
            <div className={overlayClassName} onClick={onSearchClose} />
        </XView>
    );
});
