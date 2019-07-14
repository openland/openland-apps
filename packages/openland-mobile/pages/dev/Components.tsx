import * as React from 'react';
import { View, Text } from 'react-native';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { showSheetModal } from 'openland-mobile/components/showSheetModal';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';

class ComponentsComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <SScrollView>
                <ZListItemGroup header="Simple" counter={10} actionRight={{ title: 'action', onPress: () => { /**/ }}}>
                    <ZListItem text="List Item 1" onPress={() => { /**/ }} />
                    <ZListItem text="List Item 2" description="On" />
                    <ZListItem text="List Item 3" toggle={true} onToggle={() => { /**/ }} />
                    <ZListItem text="List Item 4" toggle={true} toggleDisabled={true} onToggle={() => { /**/ }} />
                    <ZListItem text="List Item 5" toggle={false} toggleDisabled={true} onToggle={() => { /**/ }} />
                    <ZListItem text="List Item 6" path="DevTypography" />
                    <ZListItem title="Label" text="Value" />
                    <ZListItem title="Label" text="Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value" />
                    <ZListItem multiline={true} title="Label" text="Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value Value" />
                    <ZListItem leftIcon={require('assets/ic-header-bell-24.png')} small={true} text="Small with icon" />
                    <ZListItem leftIcon={require('assets/ic-header-bell-24.png')} text="With icon" />
                    <ZListItem text="Modal" onPress={() => showSheetModal(() => <View><Text>{123}</Text></View>)} />
                </ZListItemGroup>
            </SScrollView>
        );
    }
}

export const Components = withApp(ComponentsComponent, { navigationAppearance: 'small-hidden' });