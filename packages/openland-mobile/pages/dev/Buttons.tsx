import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';

export const ButtonsComponent = (props: PageProps) => (
    <SScrollView>
        <View paddingHorizontal={16}>
            <View marginVertical={16} flexDirection="row">
                <View marginRight={10}>
                    <ZRoundedButton title="Label" />
                </View>
                <View marginRight={10}>
                    <ZRoundedButton title="Label" style="secondary" />
                </View>
                <View>
                    <ZRoundedButton title="Label" style="danger" />
                </View>
            </View>
            <View marginVertical={16}>
                <View marginBottom={10}>
                    <ZRoundedButton title="Label" size="large" />
                </View>
                <View marginBottom={10}>
                    <ZRoundedButton title="Label" size="large" style="secondary" />
                </View>
                <View marginBottom={10}>
                    <ZRoundedButton title="Label" size="large" style="danger" />
                </View>
            </View>
        </View>
    </SScrollView>
);

export const Buttons = withApp(ButtonsComponent, { navigationAppearance: 'small-hidden' });