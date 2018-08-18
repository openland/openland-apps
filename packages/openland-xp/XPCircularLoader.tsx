import * as React from 'react';
import { View, Animated, Text, ART } from 'react-native';

export class XPCircularLoader extends React.PureComponent<{ progress?: number }> {
    private rotation = new Animated.Value(0);

    componentWillMount() {
        Animated.loop(
            Animated.timing(this.rotation, {
                toValue: Math.PI * 2,
                useNativeDriver: true
            })
        ).start();
    }

    render() {
        let progress = this.props.progress || 0.3;
        let path = require('d3-shape').
            arc()
            .outerRadius(20)
            .innerRadius(19)
            .startAngle(0)
            .endAngle(Math.PI * 2 * progress)
            .cornerRadius(2);
        return (
            <View style={{ width: 46, height: 46, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 23 }}>
                <Animated.View style={{ width: 46, height: 46, transform: [{ rotate: this.rotation }], alignItems: 'center', justifyContent: 'center' }}>
                    <ART.Surface
                        width={46}
                        height={46}
                    >
                        <ART.Group x={23} y={23}>
                            <ART.Shape d={path()} stroke={'#fff'} />
                        </ART.Group>
                    </ART.Surface>
                </Animated.View>
            </View>
        );
    }
}