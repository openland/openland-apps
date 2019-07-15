import * as React from 'react';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import LoaderSpinner from 'openland-mobile/components/LoaderSpinner';

export const LoadersComponent = (props: PageProps) => (
    <SScrollView>
        <SHeader title="Loader spinner" />
        <View alignItems={'center'} paddingTop={20}>
            <Text>Size: large</Text>
            <View marginVertical={20}>
                <LoaderSpinner size={'large'} />
            </View>
            <Text>Size: medium</Text>
            <View marginVertical={20}>
                <LoaderSpinner size={'medium'} />
            </View>
            <Text>Size: small</Text>
            <View marginVertical={20}>
                <LoaderSpinner size={'small'} />
            </View>
        </View>
    </SScrollView>
);

export const Loader = withApp(LoadersComponent, { navigationAppearance: 'small' });
