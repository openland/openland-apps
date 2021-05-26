import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import * as React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';

export const GoalBar = React.memo((props: { totalAmount: number, currentAmount: number }) => {
    const { totalAmount, currentAmount } = props;
    const theme = useTheme();
    const progress = Math.min(currentAmount / totalAmount * 100, 100);
    const [wrapperWidth, setWrapperWidth] = React.useState(0);
    const handleWrapperLayout = React.useCallback((e: LayoutChangeEvent) => {
        setWrapperWidth(e.nativeEvent.layout.width);
    }, []);
    return (
        <View style={{ flexGrow: 1, position: 'relative', flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: theme.backgroundTertiary, flexGrow: 1, borderRadius: 8 }} onLayout={handleWrapperLayout}>
                <View style={{ width: `${progress}%`, overflow: 'hidden', borderRadius: 8 }}>
                    <ZLinearGradient
                        width={wrapperWidth}
                        height={5}
                        borderRadius={8}
                        fallbackColor={'#5CE6C3'}
                        colors={['#5CE6C3', '#45A3E6', '#E62E5C', '#FEC519']}
                        locations={[0, 0.28, 0.76, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />
                </View>
            </View>
            <Text style={{ ...TextStyles.Detail, color: theme.foregroundSecondary, marginLeft: 12 }}>
                <Text style={{ color: theme.foregroundTertiary }}>$</Text>
                {currentAmount}
                <Text style={{ color: theme.foregroundTertiary }}> / $</Text>
                {totalAmount}
            </Text>
        </View>
    );
});