import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ASListView } from 'react-native-async-view/ASListView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { FeedEngine } from 'openland-engines/feed/FeedEngine';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { Animated } from 'react-native';
import { STrackedValue } from 'react-native-s/STrackedValue';

interface FeedPageProps {
    engine: FeedEngine;
}

class FeedPage extends React.PureComponent<FeedPageProps, { dataSourceGeneration: number }> {
    private unmount?: () => void;
    private contentOffset = new STrackedValue();

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

    render() {
        return (
            <>
                <SHeader title="Feed" />
                <SHeaderButton title="Create" icon={require('assets/ic-add-24.png')} />
                <ASSafeAreaContext.Consumer>
                    {area => (
                        <ASListView
                            overscrollCompensation={true}
                            contentPaddingTop={area.top}
                            contentPaddingBottom={area.bottom}
                            dataView={getMessenger().feed}
                            style={[{ flexGrow: 1 }, {
                                // Work-around for freezing navive animation driver
                                opacity: Animated.add(1, Animated.multiply(0, this.contentOffset.offset)),
                            } as any]}
                            onScroll={this.contentOffset.event}
                            headerPadding={4}
                        />
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