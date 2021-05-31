import * as React from 'react';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { View, Text, Animated, Easing } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useColorByAmount } from 'openland-mobile/utils/useColorByAmount';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const useAppearing = ({ timeout, onDisappear }: { timeout: number, onDisappear?: () => void }) => {
    const animatedValue = React.useRef(new Animated.Value(0)).current;
    const transform = [
        {
            scale: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.84, 1],
            })
        },
        {
            translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-8, 0],
            })
        },
    ];
    const appear = React.useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
    }, []);
    const disappear = React.useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 150,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        if (onDisappear) {
            onDisappear();
        }
    }, []);

    React.useEffect(() => {
        appear();
        let timerId = setTimeout(() => {
            disappear();
        }, timeout);
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return { transform, opacity: animatedValue, disappear };
};

const DonationItem = React.memo(({
    amount,
    user,
    message,
    onDisappear,
}: {
    amount: number;
    user: {
        id: string;
        name: string;
        photo: string | null;
    }
    message?: string | undefined;
    onDisappear: (id: string) => void;
}) => {
    const theme = useTheme();
    const amountColor = useColorByAmount(amount);

    const { opacity, transform, disappear } = useAppearing({
        timeout: 10000,
        onDisappear: () => onDisappear(user.id)
    });

    return (
        <TouchableWithoutFeedback onPress={disappear}>
            <Animated.View
                style={{
                    flexGrow: 1,
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    backgroundColor: theme.overlayHeavy,
                    borderRadius: 12,
                    shadowColor: theme.accentPay,
                    shadowOpacity: 0.08,
                    shadowRadius: 24,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 2,
                    opacity,
                    transform,
                    position: 'relative',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <ZAvatar
                        photo={user.photo}
                        id={user.id}
                        title={user.name}
                        size="x-small"
                    />
                    <View
                        style={{
                            flex: 1,
                            marginHorizontal: 12
                        }}
                    >
                        <Text
                            style={{
                                ...TextStyles.Label2,
                                color: theme.foregroundContrast,
                            }}
                            numberOfLines={1}
                        >
                            {user.name}
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            backgroundColor: amountColor,
                            borderRadius: 100
                        }}
                    >
                        <Text style={{ ...TextStyles.Label2, color: theme.foregroundContrast }}>
                            ${amount}
                        </Text>
                    </View>
                </View>
                {message && (
                    <Text
                        style={{ ...TextStyles.Densed, marginTop: 8, color: theme.foregroundContrast }}
                        numberOfLines={6}
                    >
                        {message}
                    </Text>
                )}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
});

export const DonationNotifications = React.memo(() => {
    // TODO Replace user.id with id
    const [donations, setDonations] = React.useState<({
        amount: number;
        user: {
            id: string;
            name: string;
            photo: string | null;
        }
        message?: string | undefined;
    })[]>([]);
    const addDonation = (x: any) => {
        setDonations(prev => [x, ...prev]);
    };

    React.useEffect(() => {
        setTimeout(() => {
            addDonation({
                amount: 1,
                user: {
                    id: '1',
                    name: 'Alex Baldwin',
                    photo: null,
                },
                message: 'Space power 🚀🚀🚀'
            });
        }, 2000);

        setTimeout(() => {
            addDonation({
                amount: 5,
                user: {
                    id: '2',
                    name: 'Jogn',
                    photo: null,
                },
            });
        }, 4000);

        setTimeout(() => {
            addDonation({
                amount: 100,
                user: {
                    id: '4',
                    name: 'Elon Musk',
                    photo: null,
                },
                message: 'An example of a few messages those are joined as a An example of a few messages those are joined as a An exa mple of a few messages those are joined as a An example of a few mess ages those are joined as a'
            });
            addDonation({
                amount: 100,
                user: {
                    id: '5',
                    name: 'Elon Musk',
                    photo: null,
                },
                message: 'An example of a few messages those are joined as a An example of a few messages those are joined as a An exa mple of a few messages those are joined as a An example of a few mess ages those are joined as a'
            });
            addDonation({
                amount: 100,
                user: {
                    id: '6',
                    name: 'Elon Musk',
                    photo: null,
                },
                message: 'An example of a few messages those are joined as a An example of a few messages those are joined as a An exa mple of a few messages those are joined as a An example of a few mess ages those are joined as a'
            });
        }, 6000);
    }, []);

    const handleDisapper = (userId: string) => {
        setTimeout(() => {
            setDonations(x => x.filter(y => y.user.id !== userId));
        }, 200);
    };
    return (
        <View style={{ height: 400, flexDirection: 'row' }}>
            <ScrollView
                style={{ marginBottom: 8, marginHorizontal: 16, flexGrow: 1, flexShrink: 1, flexBasis: 0, alignSelf: 'flex-end' }}
            >
                {donations.map(d => (
                    <View key={d.user.id} style={{ marginBottom: 8 }}>
                        <DonationItem key={d.user.id} {...d} onDisappear={handleDisapper} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
});
