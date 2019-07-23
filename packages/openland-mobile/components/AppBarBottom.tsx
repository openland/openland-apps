import * as React from 'react';
import { View, TouchableWithoutFeedback, Image, Text, Platform } from 'react-native';
import { SDevice } from 'react-native-s/SDevice';
import { ZCounter } from './ZCounter';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZBlurredView } from './ZBlurredView';

export interface AppBarBottomItemProps {
    icon: NodeRequire;
    iconSelected: NodeRequire;
    selected?: boolean;
    counter?: number;
    dot?: boolean;
    onPress?: () => void;
}

export const AppBarBottomItem = React.memo<AppBarBottomItemProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { icon, iconSelected, selected, counter, dot, onPress } = props;

    return (
        <TouchableWithoutFeedback onPressIn={onPress} delayPressIn={0}>
            <View
                style={{
                    flexBasis: 0,
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {selected && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' }}>
                        <View style={{ width: 93, height: 2, backgroundColor: theme.accentPrimary, borderBottomLeftRadius: 2, borderBottomRightRadius: 2 }} />
                    </View>
                )}
                <View
                    style={{
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={selected ? iconSelected : icon}
                        fadeDuration={0}
                        style={{
                            width: 24,
                            height: 24,
                            opacity: 1,
                            tintColor: selected ? theme.accentPrimary : theme.foregroundSecondary
                        }}
                    />
                    {counter !== undefined && (
                        <View
                            style={{
                                position: 'absolute',
                                top: -6,
                                left: 14
                            }}
                        >
                            <ZCounter theme={theme} value={counter} />
                        </View>
                    )}
                    {dot && (
                        <View
                            style={{
                                position: 'absolute',
                                top: -2,
                                right: -3,
                                width: 6,
                                height: 6,
                                borderRadius: 6,
                                backgroundColor: theme.accentNegative
                            }}
                        />
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

export const AppBarBottom = React.memo<{ children?: any }>((props) => {
    return (
        <ZBlurredView
            style={{
                paddingBottom: SDevice.safeArea.bottom,
                flexDirection: 'column',
                alignItems: 'stretch',
            }}
        >
            <View style={{ flexDirection: 'row', height: 52 }}>
                {props.children}
            </View>
        </ZBlurredView>
    );
});