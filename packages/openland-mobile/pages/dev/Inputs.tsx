import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';

export const InputsComponent = (props: PageProps) => (
    <SScrollView>
        <View>
            <ZListItemGroup header="Text fields" marginTop={0}>
                <ZInput label="Label" />
                <ZInput label="Label" value="Value" />
                <ZInput label="Label" multiline={true} />
                <ZInput label="Label" value="Value" multiline={true} />
                <ZInput label="Label" value="Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value" multiline={true} />
                <ZInput label="With prefix" prefix="@" description="Description" />
                <ZInput label="With prefix" value="Value" prefix="@@" description="Description" invalid={true} />
            </ZListItemGroup>
            <ZListItemGroup header="Pick fields">
                <ZPickField label="Label" />
                <ZPickField label="Label" value="Value" />
            </ZListItemGroup>
        </View>
    </SScrollView>
);

export const Inputs = withApp(InputsComponent, { navigationAppearance: 'small-hidden' });