import * as React from 'react';
import { TouchableOpacity, View, Image, Text, Animated } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const DonateButton = React.memo(() => {
    const theme = useTheme();
    const [animation] = React.useState(new Animated.Value(1));
    const showTextRef = React.useRef(true);
    const onPress = () => {
        let nextValue = showTextRef.current ? 0 : 1;
        Animated.timing(animation, {
            duration: 150,
            toValue: nextValue,
            useNativeDriver: false,
        }).start();
        showTextRef.current = !showTextRef.current;
    };
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Animated.View
                style={{
                    position: 'relative',
                    width: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [40, 98]
                    }),
                    borderRadius: 16,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: theme.payBackgroundPrimary,
                }}
            >
                <Image
                    source={require('assets/ic-donate-16.png')}
                    style={{ tintColor: theme.foregroundContrast }}
                />
                <Animated.View
                    style={{
                        opacity: animation.interpolate({
                            inputRange: [0.5, 1],
                            outputRange: [0, 1]
                        }),
                        right: 12,
                        top: 0,
                        bottom: 0,
                        position: 'absolute',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            ...TextStyles.Label2,
                            color: theme.foregroundContrast,
                        }}
                    >
                        Donate
                    </Text>
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    );
});

export const RoomDonationBar = React.memo(() => {

    return (
        <View style={{ paddingTop: 12, paddingBottom: 16, flexDirection: 'row' }}>
            <View style={{ paddingHorizontal: 16, flexGrow: 0 }}>
                <DonateButton />
            </View>
            <View style={{ flexGrow: 1 }} />
        </View >
    );
});