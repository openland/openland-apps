import * as React from 'react';
import { View, BackHandler } from 'react-native';
import { SRouting } from './SRouting';
import { NavigationContainer } from './navigation/NavigationContainer';

export interface SNavigationViewProps {
    routing: SRouting;
    navigationBarStyle?: Partial<SNavigationViewStyle>;
}

export interface SNavigationViewStyle {
    backgroundColor: string;
    isOpaque: boolean;
}

export class SNavigationView extends React.PureComponent<SNavigationViewProps> {

    private routing: SRouting;

    constructor(props: SNavigationViewProps) {
        super(props);

        this.routing = props.routing;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBack);
    }

    private handleHardwareBack = () => {
        return this.routing.navigationManager.pop();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleHardwareBack);
    }

    render() {

        // Resolve style navigation bar style
        let style: SNavigationViewStyle = {
            backgroundColor: '#fff',
            isOpaque: true,
            ...this.props.navigationBarStyle
        };

        return (
            <View height="100%" width="100%">
                <NavigationContainer manager={this.routing.navigationManager} style={style} />
            </View>
        );
    }
}