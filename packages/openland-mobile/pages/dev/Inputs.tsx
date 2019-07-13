import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZInput } from 'openland-mobile/components/ZInput';

export const InputsComponent = (props: PageProps) => (
    <SScrollView>
        <View>
            <View marginVertical={8}>
                <ZInput label="Label" />
            </View>
            <View marginVertical={8}>
                <ZInput label="Label" value="Value" />
            </View>
            <View marginVertical={8}>
                <ZInput label="Label" multiline={true} />
            </View>
            <View marginVertical={8}>
                <ZInput label="Label" value="Value" multiline={true} />
            </View>
            <View marginVertical={8}>
                <ZInput label="Label" value="Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value" multiline={true} />
            </View>
            <View marginVertical={8}>
                <ZInput label="With prefix" prefix="@" description="Description" />
            </View>
            <View marginVertical={8}>
                <ZInput label="With prefix" value="Value" prefix="@@" description="Description" invalid={true} />
            </View>
        </View>
    </SScrollView>
);

export const Inputs = withApp(InputsComponent, { navigationAppearance: 'small-hidden' });