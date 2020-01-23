import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';

export const BottomSheet = (props: PageProps) => (
    <SScrollView>
        <SHeader title={'Bottom Sheet'} />
        <View alignItems={'center'}>
            <View marginVertical={20}>
                <ZButton
                    title={'Open bottom sheet'}
                    onPress={() => {
                        let builder = new ActionSheetBuilder();

                        builder.action('Share', () => console.log(), false, require('assets/ic-share-24.png'));

                        builder.action('Save to Gallery', () => console.log(), false, require('assets/ic-download-24.png'));

                        builder.show();
                    }}
                />
            </View>
        </View>
    </SScrollView>
);

export const BottomSheetPage = withApp(BottomSheet, { navigationAppearance: 'small' });
