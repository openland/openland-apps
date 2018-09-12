import { animateOpacity, animateTranslateX } from 'react-native-async-view/ASAnimatedView';
import { AnimatedViewKeys } from '../AnimatedViewKeys';
import { Dimensions, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const FastHeaderCoordinator = {
    moveForward: (current: string, next: string) => {
        if (Platform.OS === 'ios') {
            animateOpacity(0, 1, AnimatedViewKeys.headerContent(next));
            animateOpacity(1, 0, AnimatedViewKeys.headerContent(current));
            animateTranslateX(SCREEN_WIDTH, 0, AnimatedViewKeys.headerTitle(next));
            animateTranslateX(SCREEN_WIDTH, 0, AnimatedViewKeys.headerTitleLarge(next), true);
            animateTranslateX(SCREEN_WIDTH, 0, AnimatedViewKeys.headerSearch(next), true);
            animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerTitle(current));
            animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerTitleLarge(current), true);
            animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerSearch(current), true);
        } else {
            animateOpacity(0, 1, AnimatedViewKeys.headerContent(next));
            animateOpacity(1, 0, AnimatedViewKeys.headerContent(current));
        }
    },

    moveBackward: (current: string, previous: string) => {
        if (Platform.OS === 'ios') {
            animateOpacity(0, 1, AnimatedViewKeys.headerContent(previous));
            animateOpacity(1, 0, AnimatedViewKeys.headerContent(current));
            animateTranslateX(-SCREEN_WIDTH, 0, AnimatedViewKeys.headerTitle(previous));
            animateTranslateX(-SCREEN_WIDTH, 0, AnimatedViewKeys.headerTitleLarge(previous), true);
            animateTranslateX(-SCREEN_WIDTH, 0, AnimatedViewKeys.headerSearch(previous), true);
            animateTranslateX(0, SCREEN_WIDTH, AnimatedViewKeys.headerTitle(current));
            animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerTitleLarge(current), true);
            animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerSearch(current), true);
        } else {
            animateOpacity(0, 1, AnimatedViewKeys.headerContent(previous));
            animateOpacity(1, 0, AnimatedViewKeys.headerContent(current));
        }
    },
};