import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { ZScrollView } from '../../components/ZScrollView';

class FeedComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <FastHeader title="Feed" />
                <ZScrollView style={{ flexGrow: 1 }}>
                    {}
                </ZScrollView>
            </>
        );
    }
}

export const Feed = withApp(FeedComponent);