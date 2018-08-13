import * as React from 'react';
import { View, Animated, LayoutChangeEvent, Dimensions, Vibration } from 'react-native';
import { XPImage } from 'openland-xp/XPImage';
import {
    PanGestureHandler,
    PinchGestureHandler,
    State,
    PanGestureHandlerStateChangeEvent,
    PinchGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import ViewOverflow from 'react-native-view-overflow';

function animate(value: Animated.Value, toValue: number | Animated.Value, velocity: number) {
    Animated.spring(value, {
        velocity: velocity,
        tension: 16,
        friction: 7,
        toValue: toValue,
        useNativeDriver: true,
    }).start();
}

export interface ZImagePreviewProps {
    src: string;
    srcWidth: number;
    srcHeight: number;
    width: number;
    height: number;
}

export class ZImagePreview extends React.PureComponent<ZImagePreviewProps> {

    private _maxZoom = 2;
    private _minZoom = 1;

    private _panStarted = false;
    private _panCompleted = false;
    private _panRef = React.createRef<PanGestureHandler>();
    private _panX = new Animated.Value(0);
    private _panY = new Animated.Value(0);
    private _lastPan: { x: number, y: number } = { x: 0, y: 0 };
    private _panEvent = Animated.event([{ nativeEvent: { translationY: this._panY, translationX: this._panX } }], { useNativeDriver: true });

    private _pinchStarted = false;
    private _pinchCompleted = false;
    private _pinchRef = React.createRef<PinchGestureHandler>();
    private _pinchScaleLast = 1;
    private _pinchScale = new Animated.Value(1);
    private _punchBaseScale = new Animated.Value(1);
    private _scale = Animated.multiply(this._punchBaseScale, this._pinchScale);
    private _pinchX = new Animated.Value(0);
    private _pinchY = new Animated.Value(0);
    private _pinchEvent = Animated.event([{ nativeEvent: { scale: this._pinchScale } }], { useNativeDriver: true });

    constructor(props: ZImagePreviewProps) {
        super(props);

        this._minZoom = Math.max(this.props.srcHeight / this.props.srcHeight, this.props.srcWidth / this.props.srcWidth);
        this._maxZoom = this._minZoom * 2;
        this._pinchScaleLast = this._minZoom;
        this._punchBaseScale.setValue(this._minZoom);
        this._pinchX.setValue(this.props.srcWidth / 2);
        this._pinchY.setValue(this.props.srcHeight / 2);
    }

    _onPandHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {

        // Mark pan as started
        if (event.nativeEvent.state === State.ACTIVE) {
            this._panStarted = true;
        }

        // Handle completition
        if (event.nativeEvent.oldState === State.ACTIVE) {

            // console.log(this._lastPan.x);
            // console.log(event.nativeEvent.translationX);
            // console.log(currentWidth);
            // console.log(this._contentWidthRaw);

            // const prepan = { x: this._lastPan.x + event.nativeEvent.translationX, y: this._lastPan.y + event.nativeEvent.translationY };

            // let cx1 = this._contentWidthRaw / 2 + prepan.x - currentWidth / 2;
            // let cx2 = this._contentWidthRaw / 2 + prepan.x + currentWidth / 2;

            // console.log('cx');
            // console.log(cx1);
            // console.log(cx2);

            // console.log(prepan.x + currentWidth);

            // if (prepan.x + currentWidth < this._contentWidthRaw) {
            //     console.log('right-x');
            //     this._lastPan.x = this._contentWidthRaw - currentWidth;
            //     this._panX.setOffset(this._contentWidthRaw - currentWidth);
            //     this._panX.setValue(-this._lastPan.x + prepan.x);
            //     animate(this._panX, 0, event.nativeEvent.velocityX);
            // } else if (prepan.x >= 0) {
            //     console.log('left-x');
            //     console.log(prepan.x);
            //     this._lastPan.x = 0;
            //     this._panX.setOffset(0);
            //     this._panX.setValue(prepan.x);
            //     animate(this._panX, 0, event.nativeEvent.velocityX);
            // } else {
            //     console.log('center-x');
            //     this._lastPan.x += event.nativeEvent.translationX;
            //     this._panX.setOffset(this._lastPan.x);
            //     this._panX.setValue(0);
            // }

            // if (cx1 >= 0) {
            //     this._lastPan.x = 0;
            //     this._panX.setOffset(0);
            //     this._panX.setValue(cx1 * this._pinchScaleLast);
            //     animate(this._panX, 0, event.nativeEvent.velocityX);
            // } else {
            //     this._lastPan.x += event.nativeEvent.translationX;
            //     this._panX.setOffset(this._lastPan.x);
            //     this._panX.setValue(0);
            // }

            this._lastPan.x += event.nativeEvent.translationX;
            this._lastPan.y += event.nativeEvent.translationY;
            this._panX.setOffset(this._lastPan.x);
            this._panX.setValue(0);
            this._panY.setOffset(this._lastPan.y);
            this._panY.setValue(0);

            // animate(this._panX, 0, event.nativeEvent.velocityX);
            // animate(this._panY, 0, event.nativeEvent.velocityY);

            console.log('pan release');

            this._panCompleted = true;
            if ((this._pinchStarted && this._pinchCompleted) || !this._pinchStarted) {
                this._panCompleted = false;
                this._panStarted = false;
                this._pinchStarted = false;
                this._pinchCompleted = false;
                this._handleCompleted();
            }
        }
    }

    _onPinchHandlerStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            // console.log('pinch active');
            // console.log(this._lastPan.x + 'x' + this._lastPan.y);
            this._pinchX.setValue(event.nativeEvent.focalX - this._lastPan.x);
            this._pinchY.setValue(event.nativeEvent.focalY - this._lastPan.y);
            this._pinchStarted = true;
        } else if (event.nativeEvent.oldState === State.ACTIVE) {

            // Persist and align zoom
            let preScale = this._pinchScaleLast * event.nativeEvent.scale;
            if (preScale > this._maxZoom) {
                this._pinchScaleLast = this._maxZoom;
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScale.setValue(preScale / this._pinchScaleLast);
                animate(this._pinchScale, 1, event.nativeEvent.velocity);
                ReactNativeHapticFeedback.trigger('impactLight', false);
            } else if (preScale < this._minZoom) {
                this._pinchScaleLast = this._minZoom;
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScale.setValue(preScale / this._pinchScaleLast);
                animate(this._pinchScale, 1, event.nativeEvent.velocity);
            } else {
                this._pinchScaleLast = preScale;
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScale.setValue(1);
            }

            // Reset Offsets
            animate(this._pinchX, this.props.srcWidth / 2, event.nativeEvent.velocity);
            animate(this._pinchY, this.props.srcHeight / 2, event.nativeEvent.velocity);

            console.log('zoom release');

            this._pinchCompleted = true;
            if ((this._panStarted && this._panCompleted) || !this._panStarted) {
                this._panCompleted = false;
                this._panStarted = false;
                this._pinchStarted = false;
                this._pinchCompleted = false;
                this._handleCompleted();
            }
        }
    }

    _handleCompleted = () => {
        console.log('completed');
        let currentWidth = this.props.srcWidth * this._pinchScaleLast;
        let currentHeight = this.props.srcWidth * this._pinchScaleLast;
        // console.log(currentWidth + 'x' + currentHeight);
        // console.log('(' + this._lastPan.x + ',' + this._lastPan.y + ')');
    }

    render() {
        // console.log('render');
        // console.log(this._lastPan.x + 'x' + this._lastPan.y);
        const centerX = Animated.add(this._pinchX, -this.props.width / 2);
        const centerY = Animated.add(this._pinchY, -this.props.height / 2);
        return (
            <View width={this.props.width} height={this.props.height} backgroundColor="#000" alignItems="center" justifyContent="center">
                <View width="100%" height="100%" overflow="hidden">
                    <PanGestureHandler
                        onGestureEvent={this._panEvent}
                        onHandlerStateChange={this._onPandHandlerStateChange}
                        simultaneousHandlers={[this._panRef as any]}
                        ref={this._panRef}
                        minPointers={1}
                        maxPointers={2}
                        minDist={0}
                        minDeltaX={0}
                        minDeltaY={0}
                        minOffsetX={0}
                        minOffsetY={0}
                        minVelocityX={0}
                        minVelocityY={0}
                        minVelocity={0}
                        avgTouches={true}
                    >
                        <Animated.View style={{ width: '100%', height: '100%', backgroundColor: '#f00' }}>
                            <PinchGestureHandler
                                ref={this._pinchRef}
                                simultaneousHandlers={[this._panRef as any]}
                                onGestureEvent={this._pinchEvent}
                                onHandlerStateChange={this._onPinchHandlerStateChange}
                            >
                                <Animated.View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                                    <Animated.View
                                        style={{
                                            width: this.props.srcWidth,
                                            height: this.props.srcHeight,
                                            transform: [
                                                {
                                                    translateX: this._panX
                                                },
                                                {
                                                    translateY: this._panY
                                                },
                                                {
                                                    translateX: centerX
                                                },
                                                {
                                                    translateY: centerY
                                                },
                                                {
                                                    scale: this._scale
                                                },
                                                {
                                                    translateX: Animated.multiply(centerX, -1)
                                                },
                                                {
                                                    translateY: Animated.multiply(centerY, -1)
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
                                </Animated.View>
                            </PinchGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </View>
        );
    }
}