import * as React from 'react';
import { View } from './components/View';
import { Animations } from './components/Animations';

export const AnimationSampleView = React.memo(() => {
    const animation = Animations.timing({ from: 0, to: 100, duration: 5000, delay: 3000 });
    return (
        <View width="100%" height="100%" backgroundColor="pink">
            <View width={100} height={100} backgroundColor="red" transformY={animation} />
        </View>
    );
});