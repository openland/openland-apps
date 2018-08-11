import * as React from 'react';
import { View } from 'react-native';
import { AppStyles } from '../../styles/AppStyles';
import { ZLoader } from '../../components/ZLoader';

export class Loader extends React.PureComponent {
    static navigationOptions = (args: any) => {
        return {
            title: 'Components'
        };
    }

    render() {
        return (
            <View width="100%" height="100%" backgroundColor={AppStyles.backyardColor}>
                <ZLoader />
            </View>
        );
    }
}