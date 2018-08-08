import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, Slider, Animated } from 'react-native';
import { ZHeaderTitle } from '../../components/ZHeaderTitle';
import { ZScrollView } from '../../components/ZScrollView';

export class NavigationComponent extends React.PureComponent<NavigationInjectedProps, { offset: number, size: number }> {

    static navigationOptions = {
        title: 'Navigation'
    };

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            offset: 0,
            size: 10
        };
    }

    handleChange = (value: number) => {
        this.setState({ offset: value });
    }

    handleSizeChange = (value: number) => {
        this.setState({ size: value });
    }

    render() {
        return (
            <ZScrollView>
                <View flexDirection="column">
                    <View width="100%" backgroundColor="#f00" height={56}>
                        <ZHeaderTitle appearance="android" rightTitle={'action'} titleText={'!'.repeat(this.state.size)} progress={new Animated.Value(this.state.offset)} hairlineOffset={new Animated.Value(56)} />
                    </View>
                    <Slider value={this.state.offset} maximumValue={1} minimumValue={-1} step={0.1} onValueChange={this.handleChange} />
                    <Slider value={this.state.size} maximumValue={50} minimumValue={1} onValueChange={this.handleSizeChange} />
                </View>
            </ZScrollView>
        );
    }
}

export const Navigation = withApp(NavigationComponent);