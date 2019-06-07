import * as React from 'react';
import { View, TouchableWithoutFeedback, Image, Text, Platform } from 'react-native';
import { SDevice } from 'react-native-s/SDevice';
import { AppStyles } from '../styles/AppStyles';
import { ZCounter } from './ZCounter';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZBlurredView } from './ZBlurredView';

export interface AppBarBottomItemProps {
    title: string;
    icon?: any;
    selected?: boolean;
    counter?: number;
    dot?: boolean;
    onPress?: () => void;
}

export const AppBarBottomItem = React.memo<AppBarBottomItemProps>((props) => {
    let theme = React.useContext(ThemeContext);
    let size = Platform.OS === 'android' ? 22 : 28;
    return (
        <TouchableWithoutFeedback onPressIn={props.onPress} delayPressIn={0}>
            <View
                style={{
                    flexBasis: 0,
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        // width: 28,
                        height: size,
                        marginBottom: Platform.OS === 'android' ? -1 : 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={props.icon}
                        resizeMode="contain"
                        style={{
                            width: size,
                            height: size,
                            opacity: 1,
                            tintColor: props.selected ? theme.tabColorActive : theme.tabColor
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: Platform.OS === 'android' ? -6 : -2,
                            right: -5
                        }}
                    >
                        {props.counter !== undefined && (<ZCounter theme={theme} value={props.counter} appearance="contrast" />)}
                    </View>
                    {props.dot && <View
                        style={{
                            position: 'absolute',
                            top: Platform.OS === 'android' ? -6 : 0,
                            right: Platform.OS === 'android' ? -6 : 0,
                            width: 11,
                            height: 11,
                            backgroundColor: '#ff3b30',
                            borderRadius: 5,
                            borderWidth: 2,
                            borderColor: theme.headerColor
                        }}
                    />}
                </View>
                <Text
                    style={{
                        color: props.selected ? theme.tabColorActive : theme.tabColor,
                        fontSize: 12,
                        fontWeight: Platform.OS === 'android' ? '500' : '400',
                        height: Platform.OS === 'android' ? 16 : 14,
                        overflow: 'visible',
                        opacity: Platform.OS === 'android' ? (props.selected ? 1 : 0.5) : 1
                    }}
                >
                    {props.title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
});

export const AppBarBottom = React.memo<{ children?: any }>((props) => {
    let theme = React.useContext(ThemeContext);
    return (
        <ZBlurredView
            style={{
                // backgroundColor: theme.backgroundColor,
                paddingBottom: SDevice.safeArea.bottom,
                flexDirection: 'column',
                alignItems: 'stretch',
                // shadowColor: '#000',
                // shadowOpacity: 0.2,
                // shadowOffset: { width: 0, height: 1 }
            }}
        >
            {/* {Platform.OS === 'ios' && (<View style={{ height: 1, backgroundColor: AppStyles.separatorColor, opacity: 0.5 }} />)}
            {Platform.OS !== 'ios' && (<View style={{ height: 1, backgroundColor: '#f5f5f5' }} />)} */}
            {/* <View style={{ height: 1, backgroundColor: theme.separatorColor }} /> */}
            <View style={{ flexDirection: 'row', height: 48 }}>
                {props.children}
            </View>
        </ZBlurredView>
    );
});