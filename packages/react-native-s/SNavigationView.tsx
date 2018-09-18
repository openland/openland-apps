import * as React from 'react';
import { View, BackHandler } from 'react-native';
import { SRouting } from './SRouting';
import { NavigationContainer } from './navigation/NavigationContainer';
import { PresentationManager } from './navigation/PresentationManager';
import { NavigationManager } from './navigation/NavigationManager';
import { SAnimated } from './SAnimated';
import { randomKey } from './utils/randomKey';

export interface SNavigationViewProps {
    routing: SRouting;
    navigationBarStyle?: Partial<SNavigationViewStyle>;
}

export interface SNavigationViewStyle {
    backgroundColor: string;
    isOpaque: boolean;
    accentColor: string;
    textColor: string;
}

export class SNavigationView extends React.PureComponent<SNavigationViewProps, { presented?: NavigationManager }> {

    private key: string = randomKey();
    private routing: SRouting;
    private presentationManager: PresentationManager;

    constructor(props: SNavigationViewProps) {
        super(props);
        this.presentationManager = new PresentationManager(this.props.routing.navigationManager, this.handlePresented, this.handleDismissed);
        this.routing = props.routing;
        this.state = {};
    }

    private handlePresented = (manager: NavigationManager) => {
        SAnimated.spring('presented-' + this.key, {
            property: 'translateY',
            from: 500,
            to: 0
        });
        this.setState({ presented: manager });
    }

    private handleDismissed = () => {
        this.setState({ presented: undefined });
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBack);
    }

    private handleHardwareBack = () => {
        if (this.routing.navigationManager.isLocked()) {
            return true;
        }
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
            accentColor: '#4747ec',
            textColor: '#000',
            ...this.props.navigationBarStyle
        };

        return (
            <View height="100%" width="100%">
                <NavigationContainer manager={this.routing.navigationManager} style={style} />
                {this.state.presented && (
                    <SAnimated.View name={'presented-' + this.key} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        <NavigationContainer manager={this.state.presented} style={style} />
                    </SAnimated.View>
                )}
            </View>
        );
    }
}