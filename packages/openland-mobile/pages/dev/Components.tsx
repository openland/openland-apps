import * as React from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { ZListItem } from '../../components/ZListItem';
import { AppStyles } from '../../styles/AppStyles';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { showSheetModal } from 'openland-mobile/components/showSheetModal';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';

class ComponentsComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <ScrollView width="100%" height="100%" backgroundColor={AppStyles.backyardColor}>
                <SafeAreaView>
                    <View width="100%" paddingTop={8} flexDirection="column">
                        <ZListItemGroup header="Simple">
                            <ZListItem text="List Item 1" onPress={() => {/**/ }} />
                            <ZListItem text="List Item 2" description="On" />
                            <ZListItem text="List Item 3" toggle={true} onToggle={() => { /**/ }} />
                            <ZListItem text="List Item 4" toggle={true} toggleDisabled={true} onToggle={() => { /**/ }} />
                            <ZListItem text="List Item 5" toggle={false} toggleDisabled={true} onToggle={() => { /**/ }} />
                            <ZListItem text="List Item 6" path="DevTypography" />
                            <ZListItem text="Modal" onPress={() => showSheetModal(() => <View><Text>{123}</Text></View>)} />
                        </ZListItemGroup>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

export const Components = withApp(ComponentsComponent);