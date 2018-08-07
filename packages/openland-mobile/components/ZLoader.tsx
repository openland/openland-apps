import * as React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export interface ZLoaderProps {
    transparent?: boolean;
}

export class ZLoader extends React.PureComponent<ZLoaderProps> {

    render() {
        return (
            <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: this.props.transparent !== true ? '#fff' : undefined, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 100, height: 100 }}>
                    <LottieView source={require('assets/loader.json')} autoPlay={true} loop={true} style={{ width: 100, height: 100 }} />
                </View>
            </View>
        );
    }
}