import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { ZScrollView } from '../../components/ZScrollView';
import { View, Text } from 'react-native';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { ZListItemFooter } from '../../components/ZListItemFooter';

class FeedComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <FastHeader title="Feed" />
                <ZScrollView style={{ flexGrow: 1 }}>
                    <View backgroundColor="#3023ae" marginHorizontal={15} marginVertical={15} height={345} borderRadius={12} flexDirection="column" alignItems="stretch">
                        <View flexDirection="row" height={64} paddingHorizontal={15} paddingTop={15}>
                            <XPAvatar size={36} placeholderKey="key" placeholderTitle="T T" />
                        </View>
                        <View flexDirection="row" flexGrow={1} paddingHorizontal={30} alignItems="center" justifyContent="center">
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '600', textAlign: 'center', textAlignVertical: 'center' }}>Learn How To Motivate Yourself</Text>
                        </View>
                        <View flexDirection="row" height={64} paddingHorizontal={15} paddingTop={15}>
                            {}
                        </View>
                    </View>
                    <View backgroundColor="#f76b1c" marginHorizontal={15} marginVertical={15} height={345} borderRadius={12} flexDirection="column" alignItems="stretch">
                        <View flexDirection="row" height={64} paddingHorizontal={15} paddingTop={15}>
                            <XPAvatar size={36} placeholderKey="key" placeholderTitle="T T" />
                        </View>
                        <View flexDirection="row" flexGrow={1} paddingHorizontal={30} alignItems="center" justifyContent="center">
                            <Text style={{ fontSize: 24, color: '#fff', fontWeight: '600', textAlign: 'center', textAlignVertical: 'center' }}>Break Through Self Doubt And Fear</Text>
                        </View>
                        <View flexDirection="row" height={64} paddingHorizontal={15} paddingTop={15}>
                            {}
                        </View>
                    </View>
                    <ZListItemFooter />
                </ZScrollView>
            </>
        );
    }
}

export const Feed = withApp(FeedComponent);