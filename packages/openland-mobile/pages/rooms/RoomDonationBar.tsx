import * as React from 'react';
import { TouchableOpacity, View, Image, Text, Animated, FlatList } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { GoalBar } from './GoalBar';
import { showRoomDonate } from './RoomDonateModal';
import { SRouter } from 'react-native-s/SRouter';

const DonateButton = React.memo((props: { small: boolean, onPress?: () => void }) => {
    const theme = useTheme();
    const [animation] = React.useState(new Animated.Value(props.small ? 0 : 1));
    React.useEffect(() => {
        let nextValue = props.small ? 0 : 1;
        Animated.timing(animation, {
            duration: 150,
            toValue: nextValue,
            useNativeDriver: false,
        }).start();
    }, [props.small]);
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={props.onPress}
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

const useColorByAmount = (amount: number) => {
    const theme = useTheme();
    if (amount <= 4) {
        return theme.tintCyan;
    } else if (amount <= 9) {
        return theme.tintBlue;
    } else if (amount <= 24) {
        return theme.tintPurple;
    } else if (amount <= 49) {
        return theme.tintRed;
    } else {
        return theme.tintOrange;
    }
};

const DonationBadge = React.memo((props: { amount: number, photo: string | null, name: string, id: string }) => {
    const theme = useTheme();
    const bgColor = useColorByAmount(props.amount);
    return (
        <View
            style={{
                paddingVertical: 4,
                paddingLeft: 4,
                paddingRight: 12,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: bgColor,
                borderRadius: 16,
            }}
        >
            <ZAvatar size="x-small" id={props.id} title={props.name} photo={props.photo} />
            <Text
                style={{
                    ...TextStyles.Label2,
                    color: theme.foregroundContrast,
                    marginLeft: 8,
                }}
            >
                ${props.amount}
            </Text>
        </View>
    );
});

export const RoomDonationBar = React.memo((props: { router: SRouter }) => {
    const { router } = props;
    const amounts = [
        { amount: 1 },
        { amount: 5 },
        { amount: 25 },
        { amount: 50 },
        { amount: 1 },
        { amount: 5 },
        { amount: 25 },
        { amount: 50 },
        { amount: 1 },
        { amount: 5 },
        { amount: 25 },
        { amount: 50 },
        { amount: 1 },
        { amount: 5 },
        { amount: 25 },
        { amount: 50 },
        { amount: 1 },
        { amount: 5 },
        { amount: 25 },
        { amount: 50 },
    ];
    return (
        <View style={{ marginTop: -4, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ paddingHorizontal: 16, flexGrow: 0 }}>
                    <DonateButton small={false} onPress={() => showRoomDonate({ description: 'For new Opneland logo', currentAmount: 100, totalAmount: 500, router })} />
                </View>

                <FlatList
                    data={amounts}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <View style={{ marginRight: 8 }}>
                            <DonationBadge amount={item.amount} id="1" name="Alex" photo={null} />
                        </View>
                    )}
                    style={{ paddingBottom: 16, flexGrow: 1 }}
                />
            </View>
            <View style={{ paddingHorizontal: 16 }}>
                <GoalBar currentAmount={220} totalAmount={500} />
            </View>
        </View >
    );
});