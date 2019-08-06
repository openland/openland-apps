import * as React from 'react';
import { SRouting } from 'react-native-s/SRouting';
import { Platform, View } from 'react-native';
import { SNavigationView, SNavigationViewStyle } from 'react-native-s/SNavigationView';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { randomKey } from 'react-native-s/utils/randomKey';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SDevice } from 'react-native-s/SDevice';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

export interface RootProps {
    width: number;
    height: number;
    routing: SRouting;
    padLayout?: boolean;
}

export const isPad = !!(Platform.OS === 'ios' && (Platform as any).isPad);

class RootContainer extends React.PureComponent<RootProps & { theme: ThemeGlobal }, { masterRouting?: SRouting, masterKey?: string }> {

    private isIPad = false;

    constructor(props: RootProps & { theme: ThemeGlobal }) {
        super(props);

        this.state = {};

        this.isIPad = isPad && this.props.padLayout !== false;

        if (this.isIPad) {
            this.props.routing.navigationManager.setPushHandler(this.handlePush);
        }
    }

    componentWillReceiveProps(nextProps: RootProps & { theme: ThemeGlobal }) {
        if (this.isIPad && nextProps.width <= 375 * 2 && this.props.width > 375 * 2) {
            this.setState({ masterKey: undefined, masterRouting: undefined });
        }
    }

    private handlePush = (route: string, params?: any) => {
        if (this.isIPad && this.props.width > 375 * 2) {
            let man = new NavigationManager(this.props.routing.navigationManager.routes, route, params);
            this.setState({ masterRouting: new SRouting(man), masterKey: randomKey() });
            return true;
        } else {
            return false;
        }
    }

    render() {
        let bgColor = this.props.theme.backgroundPrimary;
        let headerColor = this.props.theme.backgroundSecondary;
        let textColor = this.props.theme.foregroundPrimary;
        let blurType = this.props.theme.blurType;
        let accentColor = this.props.theme.accentPrimary;
        let iconColor = this.props.theme.foregroundSecondary;
        let style: Partial<SNavigationViewStyle> = {
            accentColor,
            iconColor,
            backgroundColor: bgColor,
            textColor,
            blurType,
            headerColor,
            isOpaque: Platform.OS === 'ios' && blurType !== 'dark' ? false : true,
            hairlineColor: this.props.theme.backgroundPrimary,
            keyboardAppearance: this.props.theme.keyboardAppearance,
            searchBackground: this.props.theme.backgroundInverted,
            searchColor: this.props.theme.foregroundTertiary,
            selectionColor: this.props.theme.accentPrimary
        };

        if (this.isIPad && this.props.width > 375 * 2) {

            let sideWidth = 320;
            if (this.props.width > 1000) {
                console.log(this.props.width);
                sideWidth = 375;
            }

            return (
                <View width="100%" height="100%" flexDirection="row">
                    <SNavigationView
                        width={sideWidth}
                        height={this.props.height}
                        routing={this.props.routing}
                        navigationBarStyle={style}
                    />
                    <View height={'100%'} width={0.5} backgroundColor={this.props.theme.separatorColor} />
                    <View width={this.props.width - sideWidth} height={'100%'} backgroundColor={this.props.theme.backgroundPrimary}>
                        {this.state.masterRouting && (
                            <SNavigationView
                                key={this.state.masterKey!!}
                                width={this.props.width - sideWidth}
                                height={this.props.height}
                                routing={this.state.masterRouting}
                                navigationBarStyle={style}
                            />
                        )}
                    </View>
                </View>
            );
        }

        return (
            <View width="100%" height="100%" flexDirection="row">
                <SNavigationView
                    width={this.props.width}
                    height={this.props.height}
                    routing={this.props.routing}
                    navigationBarStyle={style}
                />
                {Platform.OS === 'android' && <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: SDevice.safeArea.bottom, backgroundColor: this.props.theme.backgroundTertiary }} />}
            </View>
        );
    }
}

export const Root = React.memo<RootProps>((props) => {
    let theme = React.useContext(ThemeContext);
    return <RootContainer {...props} theme={theme} />;
});