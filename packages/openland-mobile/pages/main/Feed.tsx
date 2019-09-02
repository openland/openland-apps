import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { FeedEngine } from 'openland-engines/feed/FeedEngine';
import { SHeader } from 'react-native-s/SHeader';
import { View, Text } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

interface FeedPageProps {
    engine: FeedEngine;
}

class FeedPage extends React.PureComponent<FeedPageProps, { dataSourceGeneration: number }> {
    constructor(props: any) {
        super(props);
        this.state = { dataSourceGeneration: 0 };
    }

    private unmount?: () => void;

    componentWillMount() {
        this.unmount = this.props.engine.dataSource.dumbWatch(() => this.setState({ dataSourceGeneration: this.state.dataSourceGeneration + 1 }));
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
        }
    }

    render() {
        const isEmpty = this.props.engine.dataSource.getSize() === 0 && this.props.engine.dataSource.isInited();

        if (isEmpty) {
            return (
                <>
                    <SHeader title="Feed" />
                    <View>
                        <Text>--- EMPTY ---</Text>
                    </View>
                </>
            );
        }

        return (
            <>
                <SHeader title="Feed" />
                <SHeaderButton title="Create" icon={require('assets/ic-add-24.png')} />
                <ASSafeAreaContext.Consumer>
                    {area => (
                        <>
                            <ASListView
                                contentPaddingTop={area.top}
                                contentPaddingBottom={area.bottom}
                                dataView={getMessenger().feed}
                                style={{ flexGrow: 1 }}
                                headerPadding={4}
                            />
                        </>
                    )}
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
}

const FeedWrapper = XMemo<PageProps>((props) => {
    const engine = getMessenger().engine.feed;

    return <FeedPage engine={engine} />;
});

export const Feed = withApp(FeedWrapper);