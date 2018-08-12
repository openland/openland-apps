import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../components/withApp';
import { View, Animated } from 'react-native';
import { ZHeader } from '../../components/ZHeader';
import { ZImagePreview } from '../../components/media/ZImagePreview';

export class NavigationComponent extends React.PureComponent<NavigationInjectedProps, { offset: number, size: number, size2: number, tab: number }> {

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
            size2: 10,
            tab: 1
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

    handleTabChange = (index: number) => {
        this.setState({ tab: index });
    }

    render() {
        return (
            <>
                <ZHeader title="Some title" />
                <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
                    <ZImagePreview src="dc01c0c6-4b2a-4d84-88eb-9f5a1c0bc8da" srcWidth={200} srcHeight={200} />
                </View>
            </>
        );
    }
}

export const Navigation = withApp(NavigationComponent);