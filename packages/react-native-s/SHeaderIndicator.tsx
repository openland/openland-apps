import * as React from 'react';
import UUID from 'uuid/v4';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { SNavigationViewStyle } from './SNavigationView';
import { View, Text, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

const styles = StyleSheet.create({
    indicator: {
        paddingHorizontal: 8,
        height: 24,
        borderRadius: RadiusStyles.Medium,
        marginRight: 12,
        justifyContent: 'center'
    } as ViewStyle,
    indicatorText: {
        ...TextStyles.Label3
    } as TextStyle,
});

interface SHeaderIndicatorProps {
    current: number;
    items: number;
    theme: ThemeGlobal;
}

export class SHeaderIndicator extends React.PureComponent<SHeaderIndicatorProps> {
    private buttonId = UUID();

    private renderButton = (style: SNavigationViewStyle) => {
        const { current, items, theme } = this.props;

        return (
            <View style={[styles.indicator, { backgroundColor: theme.backgroundTertiary }]}>
                <Text style={[styles.indicatorText, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                    {current} / {items}
                </Text>
            </View>
        );
    }

    render() {
        return <HeaderConfigRegistrator config={{ buttons: [{ id: this.buttonId, render: this.renderButton }] }} />;
    }
}