import React from 'react';
import { css, cx } from 'linaria';

import { XLoader } from 'openland-x/XLoader';
import { XScrollValues } from 'openland-x/XScrollView3';
import { ChatSearchEngine } from 'openland-engines/messenger/ChatSearchEngine';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DataSourceWindow } from 'openland-y-utils/DataSourceWindow';
import { XScrollViewAnchored } from 'openland-x/XScrollViewAnchored';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { ChatSearchContext } from 'openland-web/pages/root/AppContainer';
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
}

const wrapperClassName = css`
    width: 100%;
    display: flex;
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
    flex-direction: column;
    opacity: 0;
    will-change: transform;
    animation-name: visibleClass;
    animation-duration: 150ms;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    animation-fill-mode: forwards;
    @keyframes visibleClass {
      from {
        opacity: 0;
        transform: translateY(-56px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
`;

const hidingWrapperClass = css`
    animation-name: hiddenClass;
    @keyframes hiddenClass {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-56px);
      }
    }
`;

const messagesWrapperClassName = css`
    padding-bottom: 20px;
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
    margin-right: -16px;
    
    @media(min-width: 751px) {
        margin-left: -16px;
    }
    
    @media(min-width: 1260px) {
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

export const ChatSearch = React.memo(({ chatId }: ChatSearchProps) => {
    const messenger = React.useContext(MessengerContext);
    const chatSearchContext = React.useContext(ChatSearchContext);
    const [hiding, setHiding] = React.useState(false);
    const [queryInProgress, setQueryInProgress] = React.useState(true);
    const [engine] = React.useState(() => new ChatSearchEngine(messenger, chatId));
    const [dataSourceWindow, setDataSourceWindow] = React.useState(() => {
        return new DataSourceWindow(buildMessagesSearchDataSource(engine.dataSource), 20);
    });

    const onClose = React.useCallback(() => {
        setHiding(true);

        setTimeout(() => {
            chatSearchContext!.setChatSearchState({ chatId: null });
        }, 150);
    }, [hiding]);

    React.useEffect(() => () => chatSearchContext!.setChatSearchState({ chatId: null }), []);

    useShortcuts({
        keys: ['Escape'],
        callback: onClose,
    });

    const handleScroll = React.useCallback((e: XScrollValues) => {
        if (e.clientHeight === 0) {
            return;
        }
        if (
            e.scrollTop < 800 ||
            (e.scrollHeight === e.clientHeight && !dataSourceWindow.isCompleted())
        ) {
            dataSourceWindow.needMore();
        }
    }, [dataSourceWindow]);

    const loadQuery = React.useCallback(
        debounce(
            async (searchText: string) => {
                if (searchText.length > 2) {
                    await engine.loadQuery(searchText);

                    const searchDataSource = buildMessagesSearchDataSource(engine.dataSource);
                    setDataSourceWindow(new DataSourceWindow(searchDataSource, 20));
                    setQueryInProgress(false);
                }
            },
            350,
            true,
            true,
        ),
        [engine],
    );

    const onSearchChange = React.useCallback(
        async (searchText: string) => {
            setQueryInProgress(true);

            await loadQuery(searchText);
        }, []);

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
        <div className={cx(wrapperClassName, hiding && hidingWrapperClass)}>
            <ChatSearchInput
                engine={engine}
                queryInProgress={queryInProgress}
                onSearchChange={onSearchChange}
                onSearchClose={onClose}
            />
            <div className={cx('x', messagesListClassName)}>
                <DataSourceRender
                    dataSource={dataSourceWindow}
                    reverce={true}
                    renderItem={renderMessage}
                    renderLoading={renderLoading}
                    wrapWith={dataSourceWrapper}
                />
            </div>
            <div className={overlayClassName} onClick={onClose} />
        </div>
    );
});
