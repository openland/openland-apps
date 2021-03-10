import React from 'react';
import {
    View,
    PanResponder,
    Animated,
    Dimensions,
    TouchableOpacity,
    GestureResponderEvent,
    PanResponderGestureState,
    StyleProp,
    ViewStyle,
} from 'react-native';

const clamp = (num: number, min: number, max: number) => Math.max(min, Math.min(num, max));

interface ZDraggableItemProps {
    x?: number;
    y?: number;
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
    children?: React.ReactNode;
    onDrag?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onPress?: (event: GestureResponderEvent) => void;
    onDragRelease?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    onPressOut?: (event: GestureResponderEvent) => void;
    onRelease?: (event: GestureResponderEvent, wasDragging: boolean) => void;
}

export const ZDraggableItem = React.memo<ZDraggableItemProps>((props) => {
    const {
        x = 0,
        y = 0,
        minX,
        minY,
        maxX,
        maxY,
        children,
        onDrag,
        onPress,
        onDragRelease,
        onPressOut,
        onRelease,
    } = props;

    const pan = React.useRef(new Animated.ValueXY());
    const offsetFromStart = React.useRef({ x: 0, y: 0 });
    const childSize = React.useRef({ x: 0, y: 0 });
    const startBounds = React.useRef({ top: 0, bottom: 0, left: 0, right: 0 });
    const isDragging = React.useRef(false);

    const getBounds = React.useCallback(() => {
        const left = x + offsetFromStart.current.x;
        const top = y + offsetFromStart.current.y;
        return {
            left,
            top,
            right: left + childSize.current.x,
            bottom: top + childSize.current.y,
        };
    }, [x, y]);

    const shouldStartDrag = React.useCallback((gs) => Math.abs(gs.dx) > 2 || Math.abs(gs.dy) > 2, []);

    const onPanResponderRelease = React.useCallback(
        (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            isDragging.current = false;
            if (onDragRelease && onRelease) {
                onDragRelease(e, gestureState);
                onRelease(e, true);
            }
            pan.current.flattenOffset();
        },
        [onDragRelease, onRelease],
    );

    const onPanResponderGrant = React.useCallback(
        () => {
            startBounds.current = getBounds();
            isDragging.current = true;
            pan.current.setOffset(offsetFromStart.current);
            pan.current.setValue({ x: 0, y: 0 });
        },
        [getBounds],
    );

    const handleOnDrag = React.useCallback(
        (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            const { dx, dy } = gestureState;
            const { top, right, left, bottom } = startBounds.current;
            const Window = Dimensions.get('window');
            const changeX = clamp(
                dx,
            // @ts-ignore
                Number.isFinite(minX) ? minX - left : -Window.width,
            // @ts-ignore
                Number.isFinite(maxX) ? maxX - right : Window.width - right - 12,
            );
            const changeY = clamp(
                dy,
            // @ts-ignore
                Number.isFinite(minY) ? minY - top : -Window.height,
            // @ts-ignore
                Number.isFinite(maxY) ? maxY - bottom : Window.height - bottom - 12,
            );
            pan.current.setValue({ x: changeX, y: changeY });
            if (onDrag) {
              onDrag(e, gestureState);
            }
        },
        [maxX, maxY, minX, minY, onDrag],
    );

    const panResponder = React.useMemo(() => {
        return PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => shouldStartDrag(gestureState),
            onMoveShouldSetPanResponderCapture: (_, gestureState) => shouldStartDrag(gestureState),
            onPanResponderGrant,
            onPanResponderMove: Animated.event([], {
                // @ts-ignore
                listener: handleOnDrag,
                useNativeDriver: false,
            }),
            onPanResponderRelease,
        });
    }, [handleOnDrag, onPanResponderGrant, onPanResponderRelease, shouldStartDrag]);

    React.useEffect(() => {
        const curPan = pan.current;
        curPan.addListener((c) => (offsetFromStart.current = c));
        return () => {
            // @ts-ignore
            curPan.removeAllListeners();
        };
    }, []);

    const positionCss: StyleProp<ViewStyle> = React.useMemo(() => {
        const Window = Dimensions.get('window');
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            width: Window.width,
            height: Window.height,
        };
    }, []);

    const handleOnLayout = React.useCallback((event) => {
        const { height, width } = event.nativeEvent.layout;
        childSize.current = { x: width, y: height };
    }, []);

    const handlePressOut = React.useCallback(
        (event: GestureResponderEvent) => {
            if (onPressOut) {
                onPressOut(event);
            }
            if (!isDragging.current && onRelease) {
                onRelease(event, false);
            }
        },
        [onPressOut, onRelease],
    );

    return (
        <View pointerEvents="box-none" style={positionCss}>
            <Animated.View
                pointerEvents="box-none"
                {...panResponder.panHandlers}
                style={pan.current.getLayout()}
            >
                <TouchableOpacity
                    onLayout={handleOnLayout}
                    style={{ top: y, left: x, alignSelf: 'baseline' }}
                    onPress={onPress}
                    activeOpacity={0.6}
                    onPressOut={handlePressOut}
                >
                    {children}
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
});
