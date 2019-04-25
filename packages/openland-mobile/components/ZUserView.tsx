import * as React from 'react';
import { UserShort, UserTiny } from 'openland-api/Types';
import { XMemo } from 'openland-y-utils/XMemo';
import { Platform, TouchableNativeFeedback, TouchableHighlight, View, Text, TextStyle } from 'react-native';
import { ZAvatar } from './ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export interface ZUserViewProps {
    user: UserTiny;
    onPress: (userId: string) => void;
}

const ZUserViewInner = XMemo<ZUserViewProps>((props) => (
    <View paddingHorizontal={16} paddingVertical={6} flexDirection="row" alignItems="center">
        <ZAvatar
            size={28}
            src={props.user.photo}
            placeholderTitle={props.user.name}
            placeholderKey={props.user.id}
        />
        <View flexGrow={1} flexShrink={1} paddingLeft={12}>
            <Text
                style={{ color: '#000000', fontWeight: TextStyles.weight.medium } as TextStyle}
                allowFontScaling={false}
            >
                {props.user.name}{'   '}
                {props.user.primaryOrganization && (
                    <Text
                        style={{ color: '#99a2b0', fontWeight: TextStyles.weight.regular } as TextStyle}
                        allowFontScaling={false}
                    >
                        {props.user.primaryOrganization.name}
                    </Text>
                )}
            </Text>
        </View>
    </View>
))

export const ZUserView = React.memo<ZUserViewProps>((props) => {
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={() => props.onPress(props.user.id)}>
                <ZUserViewInner {...props} />
            </TouchableNativeFeedback>
        );
    } else {
        return (
            <TouchableHighlight underlayColor="#eee" onPress={() => props.onPress(props.user.id)}>
                <ZUserViewInner {...props} />
            </TouchableHighlight>
        )
    }
});