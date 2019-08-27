import * as React from 'react';
import { View } from './components/View';
import { Animations } from './components/Animations';

export const AnimationSampleView = React.memo(() => {
    const opacity = Animations.sequence(
        Animations.setValue(0),
        Animations.timing({ to: 1, duration: 4000, delay: 500 })
    );
    const animation = Animations.sequence(
        Animations.timing({ to: -50, duration: 3000 }),
        Animations.timing({ to: 100, duration: 4000 })
    );
    return (
        <View width="100%" height="100%" backgroundColor="pink">
            <View
                width={100}
                height={100}
                backgroundColor="red"
                translateY={animation}
                opacity={opacity}
            />
        </View>
    );
});