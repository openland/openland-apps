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
            <ZListItemGroup header="Text fields" headerMarginTop={0}>
                <ZInput placeholder="Label" />
                <ZInput placeholder="Label" value="Value" />
                <ZInput placeholder="Label" multiline={true} />
                <ZInput placeholder="Label" value="Value" multiline={true} />
                <ZInput placeholder="Label" value="Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value" multiline={true} />
                <ZInput placeholder="With prefix" prefix="@" description="Description" />
                <ZInput placeholder="With prefix" value="Value" prefix="@@" description="Description" invalid={true} />
            </ZListItemGroup>
            <ZListItemGroup header="Pick fields" headerMarginTop={0}>
                <ZPickField label="Label" />
                <ZPickField label="Label" value="Value" />
                <ZPickField label="Label" value="Value" description="Description" />
            </ZListItemGroup>
        </View>
    </SScrollView>
);

export const Inputs = withApp(InputsComponent, { navigationAppearance: 'small-hidden' });