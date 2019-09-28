import * as React from 'react';
import { View, TouchableWithoutFeedback, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { SDevice } from 'react-native-s/SDevice';
import { ZCounter } from './ZCounter';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZBlurredView } from './ZBlurredView';

const styles = StyleSheet.create({
    box: {
        flexBasis: 0,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    lineContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0,
        alignItems: 'center'
    } as ViewStyle,
    line: {
        width: 62,
        height: 2,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
    } as ViewStyle,
    iconContainer: {
        height: 24,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    icon: {
        width: 24,
        height: 24,
        opacity: 1,
    } as ImageStyle,
    counter: {
        position: 'absolute',
        top: -4,
        left: 14
    } as ViewStyle,
    dot: {
        position: 'absolute',
        top: -2,
        right: -3,
        width: 6,
        height: 6,
        borderRadius: 6,
    } as ViewStyle
});

interface AppBarBottomItemProps {
    icon: NodeRequire;
    iconSelected: NodeRequire;
    iconCounter?: NodeRequire;
    iconSelectedCounter?: NodeRequire;
    selected: boolean;
    counter?: number;
    dot?: boolean;
    onPress: () => void;
}

export const AppBarBottomItem = React.memo<AppBarBottomItemProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { icon, iconSelected, iconCounter, iconSelectedCounter, counter, selected, dot, onPress } = props;

    let iconRes = selected ? iconSelected : icon;
    if (counter !== undefined && iconCounter && iconSelectedCounter) {
        iconRes = selected ? iconSelectedCounter : iconCounter;
    }

    return (
        <TouchableWithoutFeedback onPressIn={onPress} delayPressIn={0}>
            <View style={styles.box}>
                {selected && (
                    <View style={styles.lineContainer}>
                        <View style={[styles.line, { backgroundColor: theme.accentPrimary }]} />
                    </View>
                )}
                <View style={styles.iconContainer}>
                    <Image
                        source={iconRes}
                        fadeDuration={0}
                        style={[styles.icon, { tintColor: selected ? theme.accentPrimary : theme.foregroundSecondary }]}
                    />
                    {counter !== undefined && (
                        <View style={styles.counter}>
                            <ZCounter theme={theme} value={counter} />
                        </View>
                    )}
                    {dot && <View style={[styles.dot, { backgroundColor: theme.accentNegative }]} />}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
});

const barStyles = StyleSheet.create({
    box: {
        paddingBottom: SDevice.safeArea.bottom,
        flexDirection: 'column',
        alignItems: 'stretch',
    } as ViewStyle,
    container: {
        flexDirection: 'row',
        height: 52
    } as ViewStyle,
});

export const AppBarBottom = React.memo<{ children?: any }>(props => (
    <ZBlurredView style={barStyles.box}>
        <View style={barStyles.container}>
            {props.children}
        </View>
    </ZBlurredView>
));