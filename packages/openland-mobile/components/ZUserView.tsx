import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { ZAvatar } from './ZAvatar';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ZListItemBase } from './ZListItemBase';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface ZUserViewProps {
    user: {
        id: string,
        name: string,
        photo: string | null,
    };
    onPress: (userId: string) => void;
}

export const ZUserView = React.memo((props: ZUserViewProps) => {
    const theme = React.useContext(ThemeContext);

    return (
        <ZListItemBase height={40} onPress={() => props.onPress(props.user.id)} separator={false}>
            <View style={{ paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
                <ZAvatar
                    size="x-small"
                    photo={props.user.photo}
                    id={props.user.id}
                />
                <View style={{ flexGrow: 1, flexShrink: 1, paddingLeft: 16 }}>
                    <Text
                        style={{ color: theme.foregroundPrimary, fontWeight: FontStyles.Weight.Medium, width: Dimensions.get('screen').width - 72 }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {props.user.name}
                    </Text>
                </View>
            </View>
        </ZListItemBase>
    );
});
