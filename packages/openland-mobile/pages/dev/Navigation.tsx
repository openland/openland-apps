import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, Slider, Animated } from 'react-native';
import { ZHeaderTitle } from '../../components/ZHeaderTitle';
import { ZScrollView } from '../../components/ZScrollView';

export class NavigationComponent extends React.PureComponent<NavigationInjectedProps, { offset: number, size: number, size2: number }> {

    static navigationOptions = {
        title: 'Navigation'
    };

    offsetVal = new Animated.Value(0);

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            offset: 0,
            size: 10,
            size2: 10
        };
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
                    <View style={{ width: '100%', backgroundColor: '#f00', height: 56 }}>
                        <ZHeaderTitle appearance="android" rightTitle={'a'.repeat(this.state.size2)} titleText={'!'.repeat(this.state.size)} progress={this.offsetVal} hairlineOffset={new Animated.Value(56)} />
                    </View>
                    <Slider value={this.state.offset} maximumValue={1} minimumValue={-1} step={0.1} onValueChange={this.handleChange} />
                    <Slider value={this.state.size} maximumValue={80} minimumValue={1} onValueChange={this.handleSizeChange} />
                    <Slider value={this.state.size2} maximumValue={80} minimumValue={1} onValueChange={this.handleSize2Change} />
                </View>
            </ZScrollView>
        );
    }
}

export const Navigation = withApp(NavigationComponent);