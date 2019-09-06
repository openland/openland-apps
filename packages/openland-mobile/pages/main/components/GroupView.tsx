import * as React from 'react';
import { RoomShort_SharedRoom, GlobalSearch_items_SharedRoom } from 'openland-api/Types';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, Text } from 'react-native';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface GroupViewProps {
    item: RoomShort_SharedRoom | GlobalSearch_items_SharedRoom;
    photo?: string;
    paddingRight?: number;
    onPress: (id: string) => void;
    onLongPress?: () => void;
}

export const GroupView = React.memo<GroupViewProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { item, photo, paddingRight, onPress, onLongPress } = props;
    const membersCount = item.membersCount || 0;

    const handlePress = React.useCallback(() => {
        onPress(item.id);
    }, [item.id, onPress]);

    return (
        <ZListItemBase height={52} onPress={handlePress} onLongPress={onLongPress} separator={false}>
            <View marginHorizontal={16} height={52} alignItems="center" justifyContent="center">
                <ZAvatar
                    src={photo}
                    size="medium"
                    placeholderKey={item.id}
                    placeholderTitle={item.title}
                />
            </View>
            <View paddingRight={paddingRight || 10} flexDirection="column" flexGrow={1} flexBasis={0} justifyContent="center">
                <Text
                    numberOfLines={1}
                    style={{
                        ...TextStyles.Label1,
                        color: theme.foregroundPrimary,
                    }}
                    allowFontScaling={false}
                >
                    {item.title}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        ...TextStyles.Subhead,
                        color: theme.foregroundTertiary,
                    }}
                    allowFontScaling={false}
                >
                    {membersCount + (membersCount > 1 ? ' members' : ' member')}
                </Text>
            </View>
        </ZListItemBase>
    );
});