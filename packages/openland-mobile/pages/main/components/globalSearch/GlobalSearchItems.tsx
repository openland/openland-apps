import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { GlobalSearch_items_User, GlobalSearch_items_Organization, GlobalSearch_items_SharedRoom, GlobalSearch_items } from 'openland-api/spacex.types';
import { ASAvatar } from 'openland-mobile/messenger/components/ASAvatar';
import { UserAvatar } from 'openland-mobile/messenger/components/UserAvatar';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { Dimensions, Platform } from 'react-native';
import { ASView } from 'react-native-async-view/ASView';
import { GlobalSearchProps } from './GlobalSearch';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ASImage } from 'react-native-async-view/ASImage';

interface ItemBaseProps {
    avatar: JSX.Element;
    name: string;
    theme: ThemeGlobal;
    featured?: boolean;

    onPress: () => void;
}

const ItemBase = React.memo((props: ItemBaseProps) => {
    const { onPress, avatar, name, featured, theme } = props;
    const showFeatured = featured && theme.displayFeaturedIcon;
    const width = React.useMemo(() => Dimensions.get('screen').width - (showFeatured ? 94 : 74), [showFeatured]);

    return (
        <ASFlex marginLeft={16} marginRight={16} flexDirection="row" highlightColor={theme.backgroundPrimaryActive} onPress={onPress} alignItems="center">
            <ASFlex marginLeft={Platform.OS === 'android' ? 16 : 0} alignItems="center" justifyContent="center">
                {avatar}
            </ASFlex>
            <ASFlex marginLeft={16} flexGrow={1} flexBasis={0} alignItems="center">
                <ASText {...TextStylesAsync.Label1} maxWidth={width} color={theme.foregroundPrimary} numberOfLines={1}>
                    {name}
                </ASText>
                {showFeatured && (
                    <ASImage source={require('assets/ic-verified-16.png')} tintColor="#3DA7F2" width={16} height={16} marginLeft={4} marginTop={2} alignSelf="center" />
                )}
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

const GlobalSearchItemSharedRoom = React.memo((props: ItemRoomProps) => {
    const theme = useThemeGlobal();
    const { item, onPress } = props;
    const handlePress = React.useCallback(() => onPress(item.id, item.title), [item]);

    return (
        <ItemBase
            name={item.title}
            onPress={handlePress}
            theme={theme}
            featured={item.featured}
            avatar={
                <ASAvatar
                    src={item.roomPhoto}
                    size="medium"
                    placeholderKey={item.id}
                    placeholderTitle={item.title}
                    theme={theme}
                />
            }
        />
    );
});

interface ItemOrganizationProps extends ItemProps {
    item: GlobalSearch_items_Organization;
}

const GlobalSearchItemOrganization = React.memo((props: ItemOrganizationProps) => {
    const theme = useThemeGlobal();
    const { item, onPress } = props;
    const handlePress = React.useCallback(() => onPress(item.id, item.name), [item]);

    return (
        <ItemBase
            name={item.name}
            onPress={handlePress}
            theme={theme}
            featured={item.featured}
            avatar={
                <ASAvatar
                    src={item.photo}
                    size="medium"
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                    theme={theme}
                />
            }
        />
    );
});

interface ItemUserProps extends ItemProps {
    item: GlobalSearch_items_User;
    renderSavedMessages: boolean;
}

export const GlobalSearchItemUser = React.memo((props: ItemUserProps) => {
    const theme = useThemeGlobal();
    const messenger = getMessenger();
    const { item, onPress, renderSavedMessages } = props;
    const handlePress = React.useCallback(() => onPress(item.id, item.name), [item]);
    const isSavedMessages = renderSavedMessages && (item.id === messenger.engine.user.id);

    return (
        <ItemBase
            name={isSavedMessages ? 'Saved messages' : item.name}
            onPress={handlePress}
            theme={theme}
            avatar={
                <UserAvatar
                    src={item.photo}
                    size="medium"
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                    online={item.online}
                    theme={theme}
                    savedMessages={isSavedMessages}
                />
            }
        />
    );
});

interface GlobalSearchItemProps extends GlobalSearchProps {
    item: GlobalSearch_items;
    renderSavedMessages: boolean;
}

export const GlobalSearchItem = React.memo((props: GlobalSearchItemProps) => {
    const { item, router, onOrganizationPress, onUserPress, onGroupPress, renderSavedMessages } = props;

    return (
        <ASView style={{ height: 56 }}>
            {item.__typename === 'Organization' && (
                <GlobalSearchItemOrganization
                    item={item}
                    onPress={
                        onOrganizationPress
                            ? onOrganizationPress
                            : () =>
                                router.push('ProfileOrganization', { id: item.id })
                    }
                />
            )}
            {item.__typename === 'User' && (
                <GlobalSearchItemUser
                    item={item}
                    onPress={
                        onUserPress
                            ? onUserPress
                            : () => router.push('Conversation', { id: item.id })
                    }
                    renderSavedMessages={renderSavedMessages}
                />
            )}
            {item.__typename === 'SharedRoom' && (
                <GlobalSearchItemSharedRoom
                    item={item}
                    onPress={
                        onGroupPress
                            ? onGroupPress
                            : () => router.push('Conversation', { id: item.id })
                    }
                />
            )}
        </ASView>
    );
});