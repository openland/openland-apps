import * as React from 'react';
import { View } from 'react-native';
import { ZLoader } from '../../components/ZLoader';

export class Loader extends React.PureComponent {
    render() {
        return (
            <View width="100%" height="100%">
                <ZLoader />
            </View>
        );
    }
}