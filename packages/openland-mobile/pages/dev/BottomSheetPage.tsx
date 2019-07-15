import * as React from 'react';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';

export const BottomSheet = (props: PageProps) => (
    <SScrollView>
        <SHeader title={'Bottom Sheet'} />
        <View alignItems={'center'}>
            <Text>Скоро тут что-то будет</Text>
        </View>
    </SScrollView>
);

export const BottomSheetPage = withApp(BottomSheet, { navigationAppearance: 'small' });
