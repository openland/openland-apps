import * as React from 'react';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import {
    DataSourceRender,
} from 'openland-web/fragments/chat/messenger/view/DataSourceRender';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3, XScrollValues } from 'openland-x/XScrollView3';
import { MessengerEmptyFragment } from 'openland-web/fragments/chat/MessengerEmptyFragment';
import { DataSource } from 'openland-y-utils/DataSource';
import { UHeader } from 'openland-unicorn/UHeader';
import { css } from 'linaria';
import { FeedEngine } from 'openland-engines/feed/FeedEngine';
import { FeedPostView } from './components/FeedPostView';
import { DataSourceFeedItem } from 'openland-engines/feed/types';

const wrapperClass = css`
    padding: 0 16px 32px;
    max-width: 532px;
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
    engine: FeedEngine;
}

class FeedInner extends React.PureComponent<CommentsNotificationsProps, { dataSourceGeneration: number }> {
    private unmount?: () => void;
    private dataSource: DataSource<DataSourceFeedItem>;

    constructor(props: CommentsNotificationsProps) {
        super(props);

        this.dataSource = this.props.engine.dataSource;
        this.state = { dataSourceGeneration: 0 };
    }

    componentWillMount() {
        this.unmount = this.dataSource.dumbWatch(() =>
            this.setState({
                dataSourceGeneration: this.state.dataSourceGeneration + 1
            }),
        );
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
        }
    }

    private renderLoading = () => (
        <div className={loaderClass}>
            <XLoader loading={true} />
        </div>
    )

    private handleScroll = (e: XScrollValues) => {
        const scrollHeight = e.scrollHeight;
        const clientHeight = e.clientHeight;
        const scrollTop = e.scrollTop;
        const d = scrollHeight - (clientHeight + scrollTop);

        if (d < 200) {
            this.dataSource.needMore();
        }
    }

    private dataSourceWrapper = (props: { children?: any }) => (
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
    )

    private renderItem = (data: { item: DataSourceFeedItem }) => {
        if (data.item.type === 'post') {
            return <FeedPostView item={data.item} />;
        }

        return <div />;
    }

    private renderEmpty = () => (
        <XView flexDirection="row" alignItems="center" flexGrow={1}>
            <MessengerEmptyFragment text="--- EMPTY ---" />
        </XView>
    )

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
                <UHeader title="Feed" />
                <XView flexGrow={1} flexShrink={1}>
                    <DataSourceRender
                        dataSource={this.dataSource}
                        reverce={false}
                        wrapWith={this.dataSourceWrapper}
                        renderItem={this.renderItem}
                        renderLoading={this.renderLoading}
                        renderEmpty={this.renderEmpty}
                    />
                </XView>
            </>
        );
    }
}

export const FeedFragment = React.memo(() => {
    const messenger = React.useContext(MessengerContext);

    return <FeedInner engine={messenger.feed} />;
});
