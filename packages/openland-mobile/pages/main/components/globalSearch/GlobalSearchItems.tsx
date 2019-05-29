import * as React from 'react';
import { Platform } from 'react-native';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { GlobalSearch_items_User, GlobalSearch_items_Organization, GlobalSearch_items_SharedRoom } from 'openland-api/Types';
import { ASAvatar } from 'openland-mobile/messenger/components/ASAvatar';
import { UserAvatar } from 'openland-mobile/messenger/components/UserAvatar';
import { XMemo } from 'openland-y-utils/XMemo';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { AppTheme } from 'openland-mobile/themes/themes';

interface ItemBaseProps {
    avatar: JSX.Element;
    name: string;
    theme: AppTheme;

    onPress: () => void;
}

const ItemBase = XMemo<ItemBaseProps>((props) => {
    const { onPress, avatar, name, theme } = props;
    const height = 48;

    return (
        <ASFlex height={height} flexDirection="row" highlightColor={theme.selectorColor} onPress={onPress} alignItems={'center'}>
            <ASFlex marginLeft={7} width={height} height={height} alignItems="center" justifyContent="center">
                {avatar}
            </ASFlex>
            <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                <ASFlex alignItems="center">
                    <ASText fontSize={15} lineHeight={Platform.OS === 'android' ? 22 : 18} fontWeight={TextStyles.weight.medium} color={theme.textColor} flexGrow={1} flexBasis={0} marginRight={10}>
                        {name}
                    </ASText>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
});

interface ItemProps {
    onPress: (id: string, title: string) => void;
}

interface ItemRoomProps extends ItemProps {
    item: GlobalSearch_items_SharedRoom;
}

export const GlobalSearchItemSharedRoom = XMemo<ItemRoomProps>((props) => {
    const theme = useThemeGlobal();
    const { item, onPress } = props;
    const handlePress = React.useCallback(() => onPress(item.id, item.title), [item]);

    return (
        <ItemBase
            name={item.title}
            onPress={handlePress}
            theme={theme}
            avatar={
                <ASAvatar
                    src={item.roomPhoto}
                    size={30}
                    placeholderKey={item.id}
                    placeholderTitle={item.title}
                />
            }
        />
    );
})

interface ItemOrganizationProps extends ItemProps {
    item: GlobalSearch_items_Organization;
}

export const GlobalSearchItemOrganization = XMemo<ItemOrganizationProps>((props) => {
    const theme = useThemeGlobal();
    const { item, onPress } = props;
    const handlePress = React.useCallback(() => onPress(item.id, item.name), [item]);

    return (
        <ItemBase
            name={item.name}
            onPress={handlePress}
            theme={theme}
            avatar={
                <ASAvatar
                    src={item.photo}
                    size={30}
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                />
            }
        />
    );
})

interface ItemUserProps extends ItemProps {
    item: GlobalSearch_items_User;
}

export const GlobalSearchItemUser = XMemo<ItemUserProps>((props) => {
    const theme = useThemeGlobal();
    const { item, onPress } = props;
    const handlePress = React.useCallback(() => onPress(item.id, item.name), [item]);

    return (
        <ItemBase
            name={item.name}
            onPress={handlePress}
            theme={theme}
            avatar={
                <UserAvatar
                    src={item.photo}
                    size={30}
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                    online={item.online}
                    theme={theme}
                />
            }
        />
    );
})