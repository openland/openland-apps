import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, Slider, Animated } from 'react-native';
import { ZHeaderTitle } from '../../components/navigation/ZHeaderTitle';
import { ZScrollView } from '../../components/ZScrollView';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZHeader } from '../../components/ZHeader';

export class NavigationComponent extends React.PureComponent<NavigationInjectedProps, { offset: number, size: number, size2: number }> {

    static navigationOptions = {
        title: 'Navigation'
    };

    offsetVal = new Animated.Value(0);

    size = new Animated.Value(56);

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            offset: 0,
            size: 10,
            size2: 10
        };

        Animated.loop(Animated.sequence([
            Animated.timing(this.size, {
                toValue: 106,
                duration: 3000,
                useNativeDriver: true
            }),
            Animated.timing(this.size, {
                toValue: 56,
                duration: 3000,
                useNativeDriver: true
            })]
        )).start();
    }

    handleChange = (value: number) => {
        this.setState({ offset: value });
        this.offsetVal.setValue(value);
    }

    handleSizeChange = (value: number) => {
        this.setState({ size: value });
    }

    handleSize2Change = (value: number) => {
        this.setState({ size2: value });
    }

    render() {
        return (
            <ZScrollView>
                <View style={{ flexDirection: 'column' }}>
                    <ZListItemGroup header="Android">
                        <ZHeaderTitle index={0} appearance="android" headerAppearance="large" titleText="Messages" progress={this.offsetVal} hairlineOffset={new Animated.Value(56)} />
                        <ZHeaderTitle index={1} appearance="android" headerAppearance="large" titleText="Justin Bieber" subtitleText="Person" progress={this.offsetVal} hairlineOffset={new Animated.Value(56)} />
                        <View height={106}>
                            <ZHeaderTitle index={0} appearance="android" headerAppearance="large" titleText="Justin Bieber" subtitleText="Person" progress={this.offsetVal} hairlineOffset={this.size} />
                        </View>
                    </ZListItemGroup>
                    <ZListItemGroup header="iOS">
                        <ZHeaderTitle index={0} appearance="ios" headerAppearance="large" titleText="Messages" progress={this.offsetVal} hairlineOffset={new Animated.Value(56)} />
                        <ZHeaderTitle index={1} appearance="ios" headerAppearance="large" titleText="Messages" progress={this.offsetVal} hairlineOffset={new Animated.Value(56)} />
                        <ZHeaderTitle index={0} appearance="ios" headerAppearance="large" titleText={'!'.repeat(this.state.size)} progress={new Animated.Value(0)} hairlineOffset={new Animated.Value(56)} />
                    </ZListItemGroup>
                    <Slider value={this.state.offset} maximumValue={1} minimumValue={-1} step={0.1} onValueChange={this.handleChange} />
                    <Slider value={this.state.size} maximumValue={80} minimumValue={1} onValueChange={this.handleSizeChange} />
                    <Slider value={this.state.size2} maximumValue={80} minimumValue={1} onValueChange={this.handleSize2Change} />
                </View>
            </ZScrollView>
        );
    }
}

export const Navigation = withApp(NavigationComponent);