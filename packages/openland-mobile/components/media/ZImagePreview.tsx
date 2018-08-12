import * as React from 'react';
import { View, Animated } from 'react-native';
import { XPImage } from 'openland-xp/XPImage';
import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    State,
    RotationGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

export class ZImagePreview extends React.PureComponent<{ src: string, srcWidth: number, srcHeight: number }> {

    private _panRef = React.createRef<PanGestureHandler>();
    private _lastPan: { x: number, y: number } = { x: 0, y: 0 };
    private _panX = new Animated.Value(0);
    private _panY = new Animated.Value(0);
    private _panEvent = Animated.event(
        [{ nativeEvent: { translateY: this._panY, translateX: this._panX } }],
        { useNativeDriver: true }
    );

    private _rotationRef = React.createRef<RotationGestureHandler>();
    private _lastRotate = 0;
    private _rotate = new Animated.Value(0);
    private _rotateX = new Animated.Value(0);
    private _rotateY = new Animated.Value(0);
    private _rotateInterpolated = this._rotate.interpolate({
        inputRange: [-100, 100],
        outputRange: ['-100rad', '100rad'],
    });
    private _rotateEvent = Animated.event(
        [
            { nativeEvent: { rotation: this._rotate } }
        ],
        { useNativeDriver: true }
    );

    _onRotateHandlerStateChange = (event: RotationGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            this._rotateX.setValue(event.nativeEvent.anchorX);
            this._rotateY.setValue(event.nativeEvent.anchorY);
        } else if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastRotate += event.nativeEvent.rotation;
            this._rotate.setOffset(this._lastRotate);
            this._rotate.setValue(0);
        }
    }

    componentWillMount() {
        // this._rotateX.addListener((v) => {
        //     console.log(v);
        // });
        // this._rotate.addListener((v) => {
        //     console.log(v);
        // });
    }

    // _onPandHandlerStateChange = (event: RotationGestureHandlerStateChangeEvent) => {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //         this._lastPan = { x: this._lastPan.x + event.nativeEvent.};
    //         this._rotate.setOffset(this._lastRotate);
    //         this._rotate.setValue(0);
    //     }
    // }

    render() {
        return (
            <View width="100%" height="100%" backgroundColor="#f00" alignItems="center" justifyContent="center">
                <View width={200} height={200}>
                    {/* <PanGestureHandler
                    onGestureEvent={this._panEvent}
                    onHandlerStateChange={this.onPanStateChange}
                    ref={this._panRef}
                    minPointers={2}
                    maxPointers={2}
                    minDist={0}
                    minDeltaX={0}
                    avgTouches
                > */}
                    <RotationGestureHandler
                        ref={this._rotationRef}
                        // simultaneousHandlers={this.pinchRef}
                        onGestureEvent={this._rotateEvent}
                        onHandlerStateChange={this._onRotateHandlerStateChange}
                    >
                        <Animated.View
                            style={{
                                width: this.props.srcWidth,
                                height: this.props.srcHeight,
                                transform: [
                                    {
                                        translateX: Animated.add(this._rotateX, -this.props.srcWidth / 2)
                                    },
                                    {
                                        translateY: Animated.add(this._rotateY, -this.props.srcHeight / 2)
                                    },
                                    {
                                        rotate: this._rotateInterpolated
                                    },
                                    {
                                        translateX: Animated.multiply(Animated.add(this._rotateX, -this.props.srcWidth / 2), -1)
                                    },
                                    {
                                        translateY: Animated.multiply(Animated.add(this._rotateY, -this.props.srcHeight / 2), -1)
                                    },
                                ]
                            }}
                        >
                            <XPImage
                                source={{ uuid: this.props.src }}
                                width={this.props.srcWidth}
                                height={this.props.srcHeight}
                                imageSize={{ width: this.props.srcWidth, height: this.props.srcHeight }}
                            />
                        </Animated.View>
                    </RotationGestureHandler>
                    <Animated.View style={{ position: 'absolute', width: 5, height: 5, backgroundColor: '#0f0', transform: [{ translateX: this._rotateX }, { translateY: this._rotateY }] }} />
                </View>
            </View>
        );
    }
}