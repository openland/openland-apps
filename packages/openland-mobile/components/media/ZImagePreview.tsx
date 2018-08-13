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
    private _panXCached = 0;
    private _panY = new Animated.Value(0);
    private _panYCached = 0;
    private _lastPan: { x: number, y: number } = { x: 0, y: 0 };
    private _panEvent = Animated.event([{ nativeEvent: { translationY: this._panY, translationX: this._panX } }], { useNativeDriver: true });

    private _pinchStarted = false;
    private _pinchCompleted = false;
    private _pinchRef = React.createRef<PinchGestureHandler>();
    private _pinchScaleLast = 1;
    private _pinchScaleLastTransform = 1;
    private _pinchScale = new Animated.Value(1);
    private _punchBaseScale = new Animated.Value(1);
    private _scale = Animated.multiply(this._punchBaseScale, this._pinchScale);

    private _pinchStartScale = 1;
    private _pinchX = new Animated.Value(0);
    private _pinchXRaw = 0;
    private _pinchY = new Animated.Value(0);
    private _pinchYRaw = 0;

    private _pinchEvent = Animated.event([{ nativeEvent: { scale: this._pinchScale } }], { useNativeDriver: true });

    constructor(props: ZImagePreviewProps) {
        super(props);

        this._minZoom = Math.max(this.props.srcHeight / this.props.srcHeight, this.props.srcWidth / this.props.srcWidth);
        this._maxZoom = this._minZoom * 2;
        this._pinchScaleLast = this._minZoom;
        this._punchBaseScale.setValue(this._minZoom);
        this._pinchX.setValue(0);
        this._pinchY.setValue(0);

        this._panX.addListener((state) => {
            // console.log('panx: ' + state.value);
            this._panXCached = state.value;
        });
        this._panY.addListener((state) => {
            // console.log('pany: ' + state.value);
            this._panYCached = state.value;
        });
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
            this._pinchStartScale = this._pinchScaleLast;
            this._pinchXRaw = (event.nativeEvent.focalX - this.props.width / 2) - this._panXCached;
            this._pinchYRaw = (event.nativeEvent.focalY - this.props.height / 2) - this._panYCached;
            this._pinchX.setValue(this._pinchXRaw);
            this._pinchY.setValue(this._pinchYRaw);
            this._pinchStarted = true;
            console.log('Pinch started in ' + this._pinchXRaw + 'x' + this._pinchYRaw);
        } else if (event.nativeEvent.oldState === State.ACTIVE) {

            // Persist and align zoom
            this._pinchScaleLastTransform = event.nativeEvent.scale;
            this._pinchScaleLast = this._pinchScaleLast * event.nativeEvent.scale;
            // let preScale = this._pinchScaleLast * event.nativeEvent.scale;
            // if (preScale > this._maxZoom) {
            //     this._pinchScaleLast = this._maxZoom;
            //     this._punchBaseScale.setValue(this._pinchScaleLast);
            //     this._pinchScale.setValue(preScale / this._pinchScaleLast);
            //     animate(this._pinchScale, 1, event.nativeEvent.velocity);
            //     ReactNativeHapticFeedback.trigger('impactLight', false);
            // } else if (preScale < this._minZoom) {
            //     this._pinchScaleLast = this._minZoom;
            //     this._punchBaseScale.setValue(this._pinchScaleLast);
            //     this._pinchScale.setValue(preScale / this._pinchScaleLast);
            //     animate(this._pinchScale, 1, event.nativeEvent.velocity);
            // } else {
            //     this._pinchScaleLast = preScale;
            //     this._punchBaseScale.setValue(this._pinchScaleLast);
            //     this._pinchScale.setValue(1);
            // }
            // this._pinchScaleLast = preScale;

            // Reset Offsets
            // this._pinchX.setValue(0);
            // this._pinchY.setValue(0);
            // animate(this._pinchX, 0, event.nativeEvent.velocity);
            // animate(this._pinchY, 0, event.nativeEvent.velocity);

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

        //
        // Fix offset
        //

        // console.log(this._pinchXRaw * this._pinchStartScale);
        // console.log(this._pinchYRaw * this._pinchStartScale);

        let cx = this._lastPan.x / this._pinchScaleLast;
        let cy = this._lastPan.y / this._pinchScaleLast;

        let px = this._pinchXRaw * (1 - this._pinchScaleLastTransform); // (this._pinchStartScale - this._pinchScaleLast);
        let py = this._pinchYRaw * (1 - this._pinchScaleLastTransform); // (this._pinchStartScale - this._pinchScaleLast);

        console.log('Delta');
        console.log('Scale1: ' + this._pinchScaleLastTransform);
        console.log('Scale2: ' + this._pinchScaleLast);
        console.log('Scale3: ' + this._pinchStartScale);
        console.log('Center: (' + this._lastPan.x + ', ' + this._lastPan.y + ')');
        console.log('Pinch: (' + this._pinchXRaw + ', ' + this._pinchYRaw + ')');
        console.log('Predicted: (' + px + ', ' + py + ')');

        // this._lastPan.x = -this._pinchScaleLastTransform * this._pinchXRaw / this._pinchScaleLast;
        // this._lastPan.y = -this._pinchScaleLastTransform * this._pinchYRaw / this._pinchScaleLast;
        this._lastPan.x += px;
        this._lastPan.y += py;
        this._panX.setOffset(this._lastPan.x);
        this._panX.setValue(0);
        this._panXCached = this._lastPan.x;
        this._panY.setOffset(this._lastPan.y);
        this._panY.setValue(0);
        this._panYCached = this._lastPan.y;

        //
        // Reset Zooming
        //

        animate(this._pinchX, 0, 0);
        animate(this._pinchY, 0, 0);
        // this._pinchX.setValue(0);
        // this._pinchY.setValue(0);
        // this._pinchXRaw = 0;
        // this._pinchYRaw = 0;

        this._punchBaseScale.setValue(this._pinchScaleLast);
        this._pinchScale.setValue(1);
        this._pinchStartScale = this._pinchScaleLast;
        this._pinchScaleLastTransform = 1;

        // let currentWidth = this.props.srcWidth * this._pinchScaleLast;
        // let currentHeight = this.props.srcWidth * this._pinchScaleLast;
        // console.log(currentWidth + 'x' + currentHeight);
        // console.log('(' + this._lastPan.x + ',' + this._lastPan.y + ')');
    }

    render() {
        return (
            <View width={this.props.width} height={this.props.height} backgroundColor="#000" alignItems="center" justifyContent="center">
                <View width="100%" height="100%" overflow="hidden">
                    <PinchGestureHandler
                        ref={this._pinchRef}
                        simultaneousHandlers={[this._panRef as any]}
                        onGestureEvent={this._pinchEvent}
                        onHandlerStateChange={this._onPinchHandlerStateChange}
                    >
                        <Animated.View
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#f00'
                            }}
                        >
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
                                                    translateX: this._pinchX
                                                },
                                                {
                                                    translateY: this._pinchY
                                                },
                                                {
                                                    scale: this._pinchScale
                                                },
                                                {
                                                    translateX: Animated.multiply(this._pinchX, -1)
                                                },
                                                {
                                                    translateY: Animated.multiply(this._pinchY, -1)
                                                },
                                                {
                                                    scale: this._punchBaseScale
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
                                        <Animated.View
                                            style={{
                                                position: 'absolute',
                                                left: (this.props.srcWidth / 2 - 3),
                                                top: (this.props.srcHeight / 2 - 3),
                                                width: 6,
                                                height: 6,
                                                backgroundColor: '#f00',
                                                transform: [
                                                    {
                                                        translateX: this._pinchX
                                                    },
                                                    {
                                                        translateY: this._pinchY
                                                    }
                                                ]
                                            }}
                                        />
                                    </Animated.View>
                                </Animated.View>
                            </PanGestureHandler>
                        </Animated.View>
                    </PinchGestureHandler>
                </View>
            </View>
        );
    }
}