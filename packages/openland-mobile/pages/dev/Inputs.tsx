import * as React from 'react';
import { View } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { ZSelect } from 'openland-mobile/components/ZSelect';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';

export const InputsComponent = (props: PageProps) => {
    return (
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
                    <ZPickField label="Label" value="Value" description="Disabled" disabled={true} />
                </ZListItemGroup>
                <ZListItemGroup header="Select fields" headerMarginTop={0}>
                    <ZSelect 
                        label="Label" 
                        onChange={(option) => {
                            console.log(option);
                        }}
                        options={[
                            { label: 'Label 1', value: 'Value 1', icon: require('assets/ic-share-24.png') },
                            { label: 'Label 2', value: 'Value 2', icon: require('assets/ic-download-24.png') },
                            { label: 'Label 3', value: 3, icon: require('assets/ic-download-24.png') }
                        ]}
                    />
                    <ZSelect 
                        label="Label" 
                        defaultValue={'Value 1'}
                        description={'with default value'}
                        onChange={(option) => {
                            console.log(option);
                        }}
                        options={[
                            { label: 'Label 1', value: 'Value 1', icon: require('assets/ic-share-24.png') },
                            { label: 'Label 2', value: 'Value 2', icon: require('assets/ic-download-24.png') },
                            { label: 'Label 3', value: 3, icon: require('assets/ic-download-24.png') }
                        ]}
                    />
                </ZListItemGroup>
            </View>
        </SScrollView>
    );
};

export const Inputs = withApp(InputsComponent, { navigationAppearance: 'small-hidden' });