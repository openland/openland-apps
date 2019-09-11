import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { FeedEngine, DataSourceFeedItem } from 'openland-engines/feed/FeedEngine';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { NON_PRODUCTION } from '../Init';
import { FeedPostView } from 'openland-mobile/feed/FeedPostView';
import { View, Text, ScrollView } from 'react-native';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { DataSourceRender } from 'openland-mobile/components/DataSourceRender';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';
import { SSearchControler } from 'react-native-s/SSearchController';
import { SRouter } from 'react-native-s/SRouter';

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
        <View height={56} alignItems="center" justifyContent="center">
            <Text>--- EMPTY ---</Text>
        </View>
    )

    private renderLoading = () => (
        <View height={56} alignItems="center" justifyContent="center">
            <LoaderSpinner />
        </View>
    )

    private renderItem = (data: { item: DataSourceFeedItem }) => {
        if (data.item.type === 'post') {
            return <FeedPostView item={data.item} scrollRef={this.scrollRef} />;
        }

        return <View />;
    }

    private handleCreate = () => {
        this.props.router.present('FeedCreatePost');
    }

    render() {
        return (
            <>
                <SHeader title="Feed" />
                {NON_PRODUCTION && <SHeaderButton title="Create" icon={require('assets/ic-add-24.png')} onPress={this.handleCreate} />}
                <SSearchControler
                    searchRender={(p) => <GlobalSearch query={p.query} router={this.props.router} />}
                >
                    <DataSourceRender
                        dataSource={this.props.engine.dataSource}
                        renderItem={this.renderItem}
                        renderLoading={this.renderLoading}
                        renderEmpty={this.renderEmpty}
                        scrollRef={this.scrollRef}
                    />
                </SSearchControler>
            </>
        );
    }
}

const FeedWrapper = XMemo<PageProps>((props) => {
    const engine = getMessenger().engine.feed;

    return <FeedPage engine={engine} router={props.router} />;
});

export const Feed = withApp(FeedWrapper);