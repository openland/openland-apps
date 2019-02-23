import * as React from 'react';
import { View, BackHandler, Dimensions, Platform } from 'react-native';
import { SRouting } from './SRouting';
import { NavigationContainer } from './navigation/NavigationContainer';
import { PresentationManager } from './navigation/PresentationManager';
import { NavigationManager } from './navigation/NavigationManager';
import { SAnimated } from './SAnimated';
import { randomKey } from './utils/randomKey';

export interface SNavigationViewProps {
    width: number;
    height: number;
    routing: SRouting;
    navigationBarStyle?: Partial<SNavigationViewStyle>;
}

export interface SNavigationViewStyle {
    backgroundColor: string;
    isOpaque: boolean;
    accentColor: string;
    textColor: string;
    blurType: 'dark' | 'light';
    hairlineColor: string;
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
        let unlock1 = this.props.routing.navigationManager.beginLock();
        let unlock2 = manager.beginLock();
        SAnimated.beginTransaction();
        if (Platform.OS === 'ios') {
            SAnimated.spring('presented-' + this.key, {
                property: 'translateY',
                from: Dimensions.get('window').height,
                to: 0
            });
        } else {
            SAnimated.timing('presented-' + this.key, {
                property: 'translateY',
                from: Dimensions.get('window').height,
                to: 0
            });
        }
        SAnimated.commitTransaction(() => {
            unlock1();
            unlock2();
        });
        this.setState({ presented: manager });
    }

    private handleDismissed = () => {
        let unlock1 = this.props.routing.navigationManager.beginLock();
        SAnimated.beginTransaction();
        SAnimated.spring('presented-' + this.key, {
            property: 'translateY',
            from: 0,
            to: Dimensions.get('window').height
        });
        SAnimated.commitTransaction(() => {
            unlock1();
            this.setState({ presented: undefined });
        });
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
            blurType: 'light',
            hairlineColor: '#e0e3e7',
            ...this.props.navigationBarStyle
        };

        return (
            <View height={this.props.height} width={this.props.width} overflow="hidden">
                <NavigationContainer manager={this.routing.navigationManager} style={style} width={this.props.width} height={this.props.height} />
                {this.state.presented && (
                    <SAnimated.View name={'presented-' + this.key} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                        <NavigationContainer manager={this.state.presented} style={style} width={this.props.width} height={this.props.height} />
                    </SAnimated.View>
                )}
            </View>
        );
    }
}