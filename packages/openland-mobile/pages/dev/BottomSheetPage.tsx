import * as React from 'react';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';

export const BottomSheet = (props: PageProps) => (
    <SScrollView>
        <SHeader title={'Bottom Sheet'} />
        <View alignItems={'center'}>
            <Text>Скоро тут что-то будет</Text>

            <View marginVertical={20}>
                <ZRoundedButton 
                    title={'Open sheet'}
                    onPress={() => {
                        showBottomSheet(() => (
                            <ZListItemGroup>
                                <ZListItem
                                    leftIcon={require('assets/ic-header-bell-24.png')}
                                    small={true}
                                    text="Open bottom sheet again"
                                    onPress={() => {
                                        showBottomSheet(() => (<Text>123</Text>));
                                    }}
                                />
                                <ZListItem
                                    leftIcon={require('assets/ic-header-bell-24.png')}
                                    small={true}
                                    text="Invate friends"
                                    onPress={() => console.log('')}
                                />
                                <ZListItem
                                    leftIcon={require('assets/ic-header-bell-24.png')}
                                    small={true}
                                    text="Leave and delete"
                                    onPress={() => console.log('')}
                                />
                            </ZListItemGroup>
                        ));
                    }}
                />
            </View>
        </View>
    </SScrollView>
);

export const BottomSheetPage = withApp(BottomSheet, { navigationAppearance: 'small' });
