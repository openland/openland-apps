import * as React from 'react';
import { View, Animated, Text, ART } from 'react-native';

export interface XPCircularLoaderProps {
    visible: boolean;
    progress: number;
}
export class XPCircularLoader extends React.PureComponent<XPCircularLoaderProps, { visible: boolean }> {
    private rotation = new Animated.Value(0);
    private opactiy = new Animated.Value(0);
    private shown = false;

    constructor(props: XPCircularLoaderProps) {
        super(props);
        this.state = {
            visible: this.props.visible
        };
        if (this.props.visible) {
            this.opactiy.setValue(1);
            this.shown = true;
        }

        Animated.loop(
            Animated.timing(this.rotation, {
                toValue: Math.PI * 2,
                useNativeDriver: true,
                isInteraction: false
            })
        ).start();
    }

    componentWillUpdate(nextProps: XPCircularLoaderProps) {
        if (nextProps.visible) {
            if (!this.shown) {
                this.setState({ visible: true });
                this.shown = true;
                Animated.timing(this.opactiy, {
                    toValue: 1,
                    useNativeDriver: true,
                    isInteraction: false
                }).start();
            }
        } else {
            if (this.shown) {
                this.shown = false;
                Animated.timing(this.opactiy, {
                    toValue: 0,
                    useNativeDriver: true,
                    isInteraction: false
                }).start(() => { this.setState({ visible: false }); });
            }
        }
    }

    render() {
        if (!this.state.visible) {
            return null;
        }
        let progress = Math.max(this.props.progress || 0, 0.1);
        let path = require('d3-shape').
            arc()
            .outerRadius(20)
            .innerRadius(17)
            .startAngle(0)
            .endAngle(Math.PI * 2 * progress)
            .cornerRadius(1.5);
        return (
            <Animated.View style={{ width: 46, height: 46, backgroundColor: 'rgba(0, 0, 0, 0.4)', borderRadius: 23, opacity: this.opactiy, transform: [{ rotate: this.rotation }], alignItems: 'center', justifyContent: 'center' }}>
                <ART.Surface
                    width={46}
                    height={46}
                >
                    <ART.Group x={23} y={23}>
                        <ART.Shape d={path()} fill={'#fff'} />
                    </ART.Group>
                </ART.Surface>
            </Animated.View>
        );
    }
}