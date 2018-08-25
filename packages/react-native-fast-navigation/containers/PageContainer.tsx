import * as React from 'react';
import { FastRouter } from '../FastRouter';
import { View, StyleSheet, ViewStyle, Animated, Dimensions, Platform } from 'react-native';
import { PageImmutableContainer } from './PageImmutableContainer';

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        opacity: 1
    } as ViewStyle,
    rootUnmounted: {
        opacity: 0
    } as ViewStyle
});

export interface PageContainerProps {
    progress: Animated.AnimatedInterpolation;
    component: React.ComponentType<{}>;
    router: FastRouter;
    mounted: boolean;
}

function buildInterpolations(src: Animated.AnimatedInterpolation) {
    let w = Dimensions.get('window').width;
    let progressTranslate: Animated.AnimatedInterpolation;
    let underlayOpacity: Animated.AnimatedInterpolation;

    if (Platform.OS === 'ios') {
        progressTranslate = src.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [w, 0, -w * 0.3],
            extrapolate: 'clamp'
        });
    } else {
        progressTranslate = src.interpolate({
            inputRange: [-1, 0],
            outputRange: [w, 0],
            extrapolate: 'clamp'
        });
    }

    underlayOpacity = src.interpolate({
        inputRange: [-1, 0],
        outputRange: [0, 0.2],
        extrapolate: 'clamp'
    });

    return {
        progressTranslate,
        underlayOpacity
    };
}

export class PageContainer extends React.PureComponent<PageContainerProps, { progressTranslate: Animated.AnimatedInterpolation, underlayOpacity: Animated.AnimatedInterpolation }> {

    private handledProgress: Animated.AnimatedInterpolation;

    constructor(props: PageContainerProps) {
        super(props);
        this.handledProgress = this.props.progress;
        this.state = buildInterpolations(this.props.progress);
    }

    componentWillReceiveProps(nextProps: PageContainerProps) {
        if (nextProps.progress !== this.handledProgress) {
            this.handledProgress = nextProps.progress;
            this.setState(buildInterpolations(nextProps.progress));
        }
    }

    render() {
        return (
            <View style={[styles.root, !this.props.mounted && styles.rootUnmounted]} pointerEvents="box-none">
                <Animated.View
                    key="shadow"
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        opacity: this.props.mounted ? this.state.underlayOpacity : 0,
                        backgroundColor: '#000'
                    }}
                    pointerEvents="none"
                />
                <Animated.View
                    key="page"
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        transform: [{ translateX: this.state.progressTranslate }]
                    }}
                >
                    <PageImmutableContainer component={this.props.component} router={this.props.router} />
                </Animated.View>
            </View>
        );
    }
}