import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ActionSheetBuilder } from './ActionSheet';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

export interface ZReachProps {
    value: number;
    onPress?: () => void;
}

const ZReachInner = XMemo<ZReachProps>(props => (
    <LinearGradient colors={['#FEBD17', '#FF9B04']} style={{ height: 20, paddingHorizontal: 6, borderRadius: RadiusStyles.large }}>
        <Text style={{ fontSize: 13, lineHeight: 20, color: '#ffffff', fontWeight: TextStyles.weight.medium }} allowFontScaling={false}>{props.value}</Text>
    </LinearGradient>
));

export const ZReach = XMemo<ZReachProps>(props => {
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

    builder.flat();
    builder.view(ctx => (
        <View marginHorizontal={20} marginTop={20} marginBottom={20}>
            <View flexDirection="row" alignItems="center" marginBottom={5}>
                <Text style={{ color: theme.foregroundPrimary, fontSize: 18, fontWeight: TextStyles.weight.medium, lineHeight: 21, marginRight: 8 }} allowFontScaling={false}>
                    Reach
                </Text>
                <ZReach value={value} />
            </View>
            <Text style={{ color: theme.foregroundPrimary, fontSize: 16, lineHeight: 24 }} allowFontScaling={false}>
                User's reach is the total number of people in community groups they{'\u00a0'}are{'\u00a0'}in
            </Text>
        </View>
    ));

    builder.show();
});