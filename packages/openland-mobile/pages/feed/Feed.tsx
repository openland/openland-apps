import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { FeedEngine } from 'openland-engines/feed/FeedEngine';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { FeedPostView } from 'openland-mobile/feed/FeedPostView';
import { View, ScrollView } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { DataSourceRender } from 'openland-mobile/components/DataSourceRender';
import { SRouter } from 'react-native-s/SRouter';
import { FeedDateView } from 'openland-mobile/feed/FeedDateView';
import { DataSourceFeedItem } from 'openland-engines/feed/types';
import { FeedEmptyView } from '../main/components/FeedEmptyView';
import { FeedHandlers } from 'openland-mobile/feed/FeedHandlers';

interface FeedPageProps {
    engine: FeedEngine;
    router: SRouter;
}

class FeedPage extends React.PureComponent<FeedPageProps, { dataSourceGeneration: number }> {
    private scrollRef = React.createRef<ScrollView>();
    private unmount?: () => void;

    constructor(props: any) {
        super(props);
        this.state = { dataSourceGeneration: 0 };
    }

    componentWillMount() {
        this.unmount = this.props.engine.dataSource.dumbWatch(() => this.setState({ dataSourceGeneration: this.state.dataSourceGeneration + 1 }));
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
        }
    }

    private renderEmpty = () => (
        <FeedEmptyView
            title="Post something"
            subtitle="Create the first post"
            action="Create post"
            onPress={() => FeedHandlers.Create()}
        />
    )

    private renderLoading = (completed: boolean) => (
        <View height={56} alignItems="center" justifyContent="center" opacity={completed ? 0 : 1}>
            <LoaderSpinner />
        </View>
    )

    private renderItem = (data: { item: DataSourceFeedItem }) => {
        if (data.item.type === 'post') {
            return <FeedPostView item={data.item} scrollRef={this.scrollRef} />;
        }

        if (data.item.type === 'date') {
            return <FeedDateView item={data.item} />;
        }

        return <View />;
    }

    render() {
        const { engine } = this.props;

        return (
            <>
                <SHeader title="Feed" />
                <SHeaderButton key="feed-channels" title="Channels" icon={require('assets/ic-list-24.png')} onPress={() => this.props.router.push('FeedChannels')} />
                <SHeaderButton key="feed-create" title="Create" icon={require('assets/ic-add-24.png')} onPress={() => FeedHandlers.Create()} />

                <DataSourceRender
                    dataSource={engine.dataSource}
                    renderItem={this.renderItem}
                    renderLoading={this.renderLoading}
                    renderEmpty={this.renderEmpty}
                    scrollRef={this.scrollRef}
                />
            </>
        );
    }
}

const FeedWrapper = XMemo<PageProps>((props) => {
    const engine = getMessenger().engine.feed;

    return <FeedPage engine={engine} router={props.router} />;
});

export const Feed = withApp(FeedWrapper);