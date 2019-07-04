import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { XMemo } from 'openland-y-utils/XMemo';

export interface ZReachProps {
    value: number;
    onPress?: () => void;
}

const ZReachInner = XMemo<ZReachProps>(props => (
    <LinearGradient colors={['#FEBD17', '#FF9B04']} style={{ height: 20, paddingHorizontal: 6, borderRadius: 16 }}>
        <Text style={{ fontSize: 13, lineHeight: 20, color: '#ffffff', fontWeight: TextStyles.weight.medium }}>{props.value}</Text>
    </LinearGradient>
));

export const ZReach = React.memo<ZReachProps>((props) => {
    if (!!props.onPress) {
        return (
            <TouchableWithoutFeedback onPress={props.onPress}>
                <View>
                    <ZReachInner {...props} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return <ZReachInner {...props} />;
})