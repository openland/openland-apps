import { Dimensions, Platform } from 'react-native';
import { SAnimated } from 'react-native-s/SAnimated';
import { AnimatedViewKeys } from '../AnimatedViewKeys';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const FastHeaderCoordinator = {
    moveForward: (current: string, next: string) => {
        if (Platform.OS === 'ios') {
            SAnimated.timing(AnimatedViewKeys.headerContent(next), {
                property: 'opacity',
                from: 0,
                to: 1
            });
            SAnimated.timing(AnimatedViewKeys.headerContent(current), {
                property: 'opacity',
                from: 1,
                to: 0
            });
            // animateTranslateX(SCREEN_WIDTH, 0, AnimatedViewKeys.headerTitle(next));
            // animateTranslateX(SCREEN_WIDTH, 0, AnimatedViewKeys.headerTitleLarge(next), true);
            // animateTranslateX(SCREEN_WIDTH, 0, AnimatedViewKeys.headerSearch(next), true);
            // animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerTitle(current));
            // animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerTitleLarge(current), true);
            // animateTranslateX(0, -SCREEN_WIDTH, AnimatedViewKeys.headerSearch(current), true);
        } else {
            SAnimated.timing(AnimatedViewKeys.headerContent(next), {
                property: 'opacity',
                from: 0,
                to: 1
            });
            SAnimated.timing(AnimatedViewKeys.headerContent(current), {
                property: 'opacity',
                from: 1,
                to: 0
            });
        }
    },

    moveBackward: (current: string, previous: string) => {
        if (Platform.OS === 'ios') {
            SAnimated.timing(AnimatedViewKeys.headerContent(previous), {
                property: 'opacity',
                from: 0,
                to: 1
            });
            SAnimated.timing(AnimatedViewKeys.headerContent(current), {
                property: 'opacity',
                from: 1,
                to: 0
            });

            SAnimated.timing(AnimatedViewKeys.headerTitle(previous), {
                property: 'translateX',
                from: -SCREEN_WIDTH,
                to: 0
            });
            SAnimated.timing(AnimatedViewKeys.headerTitleLarge(previous), {
                property: 'translateX',
                from: -SCREEN_WIDTH,
                to: 0,
                optional: true
            });
            SAnimated.timing(AnimatedViewKeys.headerSearch(previous), {
                property: 'translateX',
                from: -SCREEN_WIDTH,
                to: 0,
                optional: true
            });

            SAnimated.timing(AnimatedViewKeys.headerTitle(current), {
                property: 'translateX',
                from: 0,
                to: SCREEN_WIDTH
            });
            SAnimated.timing(AnimatedViewKeys.headerTitleLarge(current), {
                property: 'translateX',
                from: 0,
                to: SCREEN_WIDTH,
                optional: true
            });
            SAnimated.timing(AnimatedViewKeys.headerSearch(current), {
                property: 'translateX',
                from: 0,
                to: SCREEN_WIDTH,
                optional: true
            });
        } else {
            SAnimated.timing(AnimatedViewKeys.headerContent(previous), {
                property: 'opacity',
                from: 0,
                to: 1
            });
            SAnimated.timing(AnimatedViewKeys.headerContent(current), {
                property: 'opacity',
                from: 1,
                to: 0
            });
        }
    },
};