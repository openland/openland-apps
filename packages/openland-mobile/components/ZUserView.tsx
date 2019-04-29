import * as React from 'react';
import { UserTiny } from 'openland-api/Types';
import { XMemo } from 'openland-y-utils/XMemo';
import { View, Text, TextStyle } from 'react-native';
import { ZAvatar } from './ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from './ZListItemBase';

export interface ZUserViewProps {
    user: UserTiny;
    onPress: (userId: string) => void;
}

export const ZUserView = XMemo<ZUserViewProps>((props) => (
    <ZListItemBase height={40} onPress={() => props.onPress(props.user.id) } separator={false}>
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
    </ZListItemBase>
))