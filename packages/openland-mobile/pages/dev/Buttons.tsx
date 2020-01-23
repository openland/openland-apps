import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZButton } from 'openland-mobile/components/ZButton';

export const ButtonsComponent = (props: PageProps) => (
    <SScrollView>
        <View paddingHorizontal={16}>
            <View marginVertical={16} flexDirection="row">
                <View marginRight={10}>
                    <ZButton title="Label" />
                </View>
                <View marginRight={10}>
                    <ZButton title="Label" style="secondary" />
                </View>
                <View>
                    <ZButton title="Label" style="danger" />
                </View>
            </View>
            <View marginVertical={16} flexDirection="row">
                <View marginRight={10}>
                    <ZButton title="Label" loading={true} />
                </View>
                <View marginRight={10}>
                    <ZButton title="Label" style="secondary" loading={true} />
                </View>
                <View>
                    <ZButton title="Label" style="danger" loading={true} />
                </View>
            </View>
            <View marginVertical={16}>
                <View marginBottom={10}>
                    <ZButton title="Label" size="large"  />
                </View>
                <View marginBottom={10}>
                    <ZButton title="Label" size="large" style="secondary"  />
                </View>
                <View marginBottom={10}>
                    <ZButton title="Label" size="large" style="danger"  />
                </View>
            </View>
            <View marginVertical={16}>
                <View marginBottom={10}>
                    <ZButton title="Label" size="large" loading={true} />
                </View>
                <View marginBottom={10}>
                    <ZButton title="Label" size="large" style="secondary" loading={true} />
                </View>
                <View marginBottom={10}>
                    <ZButton title="Label" size="large" style="danger" loading={true} />
                </View>
            </View>
        </View>
    </SScrollView>
);

export const Buttons = withApp(ButtonsComponent, { navigationAppearance: 'small-hidden' });