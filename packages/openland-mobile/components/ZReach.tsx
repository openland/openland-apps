import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { FontStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { ActionSheetBuilder } from './ActionSheet';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

export interface ZReachProps {
    value: number;
    onPress?: () => void;
}

const ZReachInner = React.memo((props: ZReachProps) => (
    <LinearGradient colors={['#FEBD17', '#FF9B04']} style={{ height: 20, paddingHorizontal: 6, borderRadius: RadiusStyles.Large }}>
        <Text style={{ fontSize: 13, lineHeight: 20, color: '#ffffff', fontWeight: FontStyles.Weight.Medium }} allowFontScaling={false}>{props.value}</Text>
    </LinearGradient>
));

export const ZReach = React.memo((props: ZReachProps) => {
    if (!!props.onPress) {
        return (
            <TouchableWithoutFeedback onPress={props.onPress}>
                <View>
                    <ZReachInner {...props} />
                </View>
            </TouchableWithoutFeedback>
        );
    }

    return <ZReachInner {...props} />;
});

export const showReachInfo = ((value: number, theme: ThemeGlobal) => {
    const builder = new ActionSheetBuilder();

    builder.view(ctx => (
        <View style={{ marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Text style={{ color: theme.foregroundPrimary, fontSize: 18, fontWeight: FontStyles.Weight.Medium, lineHeight: 21, marginRight: 8 }} allowFontScaling={false}>
                    Reach
                </Text>
                <ZReach value={value} />
            </View>
            <Text style={{ color: theme.foregroundPrimary, fontSize: 16, lineHeight: 24 }} allowFontScaling={false}>
                User's reach is the total number of people in community groups they{'\u00a0'}are{'\u00a0'}in
            </Text>
        </View>
    ));

    builder.cancelable(false);
    builder.show();
});