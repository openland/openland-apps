import * as React from 'react';
import { RoomShort_SharedRoom, GlobalSearch_items_SharedRoom } from 'openland-api/Types';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { View, Text, TextStyle } from 'react-native';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

export interface GroupViewProps {
    item: RoomShort_SharedRoom | GlobalSearch_items_SharedRoom;
    photo?: string;
    paddingRight?: number;
    onPress: (id: string) => void;
    onLongPress?: () => void;
}

export const GroupView = React.memo<GroupViewProps>((props) => {
    let theme = React.useContext(ThemeContext);
    let item = props.item;
    let membersCount = item.membersCount || 0;

    let handlePress = React.useCallback(() => {
        props.onPress(props.item.id);
    }, [props.item.id, props.onPress])

    return (
        <ZListItemBase height={60} onPress={handlePress} onLongPress={props.onLongPress} separator={false} navigationIcon={true}>
            <View width={74} height={60} alignItems="center" justifyContent="center">
                <ZAvatar
                    src={props.photo}
                    size={42}
                    placeholderKey={item.id}
                    placeholderTitle={item.title}
                />
            </View>
            <View paddingRight={props.paddingRight || 10} marginTop={10} marginBottom={10} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 16,
                        lineHeight: 19,
                        height: 19,
                        color: theme.textColor,
                        fontWeight: TextStyles.weight.medium
                    } as TextStyle}
                >
                    {item.title}
                </Text>
                <Text
                    numberOfLines={1}
                    style={{
                        marginTop: 5,
                        fontSize: 13,
                        lineHeight: 15,
                        height: 15,
                        color: theme.textLabelColor,
                    }}
                >
                    {membersCount + (membersCount > 1 ? ' members' : ' member')}
                </Text>
            </View>
        </ZListItemBase>
    );
});