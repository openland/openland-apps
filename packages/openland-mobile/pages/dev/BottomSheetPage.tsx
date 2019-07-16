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
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';

export const BottomSheet = (props: PageProps) => (
    <SScrollView>
        <SHeader title={'Bottom Sheet'} />
        <View alignItems={'center'}>
            <View marginVertical={20}>
                <ZRoundedButton 
                    title={'Open bottom sheet'}
                    onPress={() => {
                        let builder = new ActionSheetBuilder();

                        builder.action('Share', () => console.log(), false, require('assets/ic-header-share-24.png'));

                        builder.action('Save to Gallery' , () => console.log(), false, require('assets/ic-download-24.png'));

                        builder.show();
                    }}
                />
            </View>
        </View>
    </SScrollView>
);

export const BottomSheetPage = withApp(BottomSheet, { navigationAppearance: 'small' });
