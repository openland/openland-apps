import * as React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { ZListItem } from '../../components/ZListItem';
import { AppStyles } from '../../styles/AppStyles';
import { ZListItemGroup } from '../../components/ZListItemGroup';

export class Components extends React.PureComponent {
    static navigationOptions = (args: any) => {
        return {
            title: 'Components'
        };
    }

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
                        </ZListItemGroup>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}