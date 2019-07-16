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
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface ItemBaseProps {
    avatar: JSX.Element;
    name: string;
    theme: ThemeGlobal;

    onPress: () => void;
}

const ItemBase = XMemo<ItemBaseProps>((props) => {
    const { onPress, avatar, name, theme } = props;
    const height = 48;

    return (
        <ASFlex marginLeft={12} marginRight={12} height={height} flexDirection="row" highlightColor={theme.backgroundPrimaryActive} onPress={onPress} alignItems="center">
            <ASFlex width={height} height={height} alignItems="center" justifyContent="center">
                {avatar}
            </ASFlex>
            <ASFlex marginLeft={4} flexGrow={1} flexBasis={0} alignItems="center">
                <ASText fontSize={15} fontWeight={TextStyles.weight.medium} color={theme.foregroundPrimary} flexGrow={1} flexBasis={0} numberOfLines={1}>
                    {name}
                </ASText>
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
                    size="small"
                    placeholderKey={item.id}
                    placeholderTitle={item.title}
                />
            }
        />
    );
});

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
                    size="small"
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                />
            }
        />
    );
});

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
                    size="small"
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                    online={item.online}
                    theme={theme}
                />
            }
        />
    );
});