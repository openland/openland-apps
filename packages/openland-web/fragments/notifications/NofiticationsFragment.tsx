import * as React from 'react';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import {
    DataSourceRender,
} from 'openland-web/fragments/chat/messenger/view/DataSourceRender';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3, XScrollValues } from 'openland-x/XScrollView3';
import {
    DataSourceWebMessageItem,
    buildMessagesDataSource,
} from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { MessengerEmptyFragment } from 'openland-web/fragments/chat/MessengerEmptyFragment';
import { NotificationCenterEngine } from 'openland-engines/NotificationCenterEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { UHeader } from 'openland-unicorn/UHeader';
import { NotificationCommentView, NotificationMatchmakingView } from './components/NotificationView';
import { css } from 'linaria';

const wrapperClass = css`
    padding: 0 16px 32px;
    max-width: 824px;
    margin: 0 auto;
    width: 100%;
`;

const loaderClass = css`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

interface CommentsNotificationsProps {
    engine: NotificationCenterEngine;
}

class CommentsNotificationsInner extends React.PureComponent<
    CommentsNotificationsProps,
    { dataSourceGeneration: number }
    > {
    private unmount?: () => void;
    private unmount1?: () => void;
    private dataSource: DataSource<DataSourceWebMessageItem | DataSourceDateItem>;

    constructor(props: CommentsNotificationsProps) {
        super(props);

        this.dataSource = buildMessagesDataSource(this.props.engine.dataSource);
        this.state = { dataSourceGeneration: 0 };
    }

    componentWillMount() {
        this.unmount = this.props.engine.subscribe();
        this.unmount1 = this.dataSource.dumbWatch(() =>
            this.setState({ dataSourceGeneration: this.state.dataSourceGeneration + 1 }),
        );
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
        }
        if (this.unmount1) {
            this.unmount1();
        }
    }

    private renderLoading = () => {
        return (
            <div className={loaderClass}>
                <XLoader loading={true} />
            </div>
        );
    }

    private handleScroll = (e: XScrollValues) => {
        if (e.scrollTop < 300) {
            this.dataSource.needMore();
        }
    }

    private dataSourceWrapper = (props: { children?: any }) => {
        return (
            <>
                <XScrollView3
                    useDefaultScroll={true}
                    flexGrow={1}
                    flexShrink={1}
                    onScroll={this.handleScroll}
                >
                    <div className={wrapperClass}>
                        {props.children}
                    </div>
                </XScrollView3>
            </>
        );
    }

    private renderNotification = (data: { item: (DataSourceWebMessageItem) }) => {
        return data.item.notificationType ? (
            data.item.notificationType === 'mm' ?
                <NotificationMatchmakingView notification={data.item} /> : <NotificationCommentView notification={data.item} />
        ) : null;
    }

    private renderEmpty = () => {
        return (
            <XView flexDirection="row" alignItems="center" flexGrow={1}>
                <MessengerEmptyFragment text="Comments in threads you are involved in will be right here" />
            </XView>
        );
    }

    render() {
        if (!this.dataSource.isInited()) {
            return (
                <XView flexGrow={1} flexShrink={0}>
                    <XLoader loading={true} />
                </XView>
            );
        }

        return (
            <>
                <UHeader title="Notifications" appearance="wide" />
                <XView flexGrow={1} flexShrink={1}>
                    <DataSourceRender
                        dataSource={this.dataSource}
                        reverce={false}
                        wrapWith={this.dataSourceWrapper}
                        renderItem={this.renderNotification}
                        renderLoading={this.renderLoading}
                        renderEmpty={this.renderEmpty}
                    />
                </XView>
            </>
        );
    }
}

export const NotificationsFragment = React.memo(() => {
    const messenger = React.useContext(MessengerContext);

    return <CommentsNotificationsInner engine={messenger.notificationCenter} />;
});
