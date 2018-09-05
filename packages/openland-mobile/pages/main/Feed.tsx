import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { ZScrollView } from '../../components/ZScrollView';
import { View, Text, Dimensions } from 'react-native';
import { XPAvatar } from 'openland-xp/XPAvatar';
import { ZListItemFooter } from '../../components/ZListItemFooter';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ZSafeAreaView } from '../../components/layout/ZSafeAreaView';
import { AsyncAvatar } from '../../messenger/components/AsyncAvatar';
import { ASText } from 'react-native-async-view/ASText';

class FeedComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <FastHeader title="Feed" />
                <ZScrollView style={{ flexGrow: 1 }}>
                    <View marginHorizontal={15} marginVertical={15}>
                        <ASView style={{ height: 345 }}>
                            <ASFlex flexDirection="column" backgroundGradient={{ start: '#3023ae', end: '#c86dd7' }} borderRadius={12} alignItems="stretch">
                                <ASFlex flexDirection="row" height={64} marginLeft={15} marginRight={15} marginTop={15}>
                                    <AsyncAvatar size={36} placeholderKey="key" placeholderTitle="T T" />
                                    {}
                                </ASFlex>
                                <ASFlex flexDirection="column" flexGrow={1} marginLeft={30} marginRight={30} alignItems="stretch" justifyContent="center">
                                    <ASText textAlign="center" fontSize={24} color="#fff" fontWeight="600">Learn How To Motivate Yourself</ASText>
                                </ASFlex>
                                <ASFlex flexDirection="row" height={64} marginLeft={15} marginRight={15} marginTop={15}>
                                    {}
                                </ASFlex>
                            </ASFlex>
                        </ASView>
                    </View>
                    <View marginHorizontal={15} marginVertical={15}>
                        <ASView style={{ height: 345 }}>
                            <ASFlex flexDirection="column" backgroundGradient={{ start: '#fad961', end: '#f76b1c' }} borderRadius={12} alignItems="stretch">
                                <ASFlex flexDirection="row" height={64} marginLeft={15} marginRight={15} marginTop={15}>
                                    <AsyncAvatar size={36} placeholderKey="key" placeholderTitle="T T" />
                                    {}
                                </ASFlex>
                                <ASFlex flexDirection="column" flexGrow={1} marginLeft={30} marginRight={30} alignItems="stretch" justifyContent="center">
                                    <ASText textAlign="center" fontSize={24} color="#fff" fontWeight="600">Break Through Self Doubt And Fear</ASText>
                                </ASFlex>
                                <ASFlex flexDirection="row" height={64} marginLeft={15} marginRight={15} marginTop={15}>
                                    {}
                                </ASFlex>
                            </ASFlex>
                        </ASView>
                    </View>
                    {/* <View backgroundColor="#3023ae" marginHorizontal={15} marginVertical={15} height={345} borderRadius={12} flexDirection="column" alignItems="stretch">
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
                    </View> */}
                    <ZListItemFooter />
                </ZScrollView>
            </>
        );
    }
}

export const Feed = withApp(FeedComponent);