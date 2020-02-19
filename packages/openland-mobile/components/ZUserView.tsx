import * as React from 'react';
import { UserForMention } from 'openland-api/spacex.types';
import { XMemo } from 'openland-y-utils/XMemo';
import { View, Text, Dimensions } from 'react-native';
import { ZAvatar } from './ZAvatar';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from './ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface ZUserViewProps {
    user: UserForMention;
    onPress: (userId: string) => void;
}

export const ZUserView = XMemo<ZUserViewProps>((props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <ZListItemBase height={40} onPress={() => props.onPress(props.user.id)} separator={false}>
            <View paddingHorizontal={16} flexDirection="row" alignItems="center">
                <ZAvatar
                    size="x-small"
                    photo={props.user.photo}
                    title={props.user.name}
                    id={props.user.id}
                />
                <View flexGrow={1} flexShrink={1} paddingLeft={16}>
                    <Text
                        style={{ color: theme.foregroundPrimary, fontWeight: FontStyles.Weight.Medium, width: Dimensions.get('screen').width - 72 }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {props.user.name}{'   '}
                        {props.user.primaryOrganization && (
                            <Text
                                style={{ color: theme.foregroundSecondary, fontWeight: FontStyles.Weight.Regular }}
                                allowFontScaling={false}
                            >
                                {props.user.primaryOrganization.name}
                            </Text>
                        )}
                    </Text>
                </View>
            </View>
        </ZListItemBase>
    );
});