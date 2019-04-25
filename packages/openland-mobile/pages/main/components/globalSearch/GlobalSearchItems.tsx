import * as React from 'react';
import { Platform } from 'react-native';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { GlobalSearch_items_User, GlobalSearch_items_Organization, GlobalSearch_items_SharedRoom } from 'openland-api/Types';
import { ASAvatar } from 'openland-mobile/messenger/components/ASAvatar';
import { UserAvatar } from 'openland-mobile/messenger/components/UserAvatar';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext, useThemeGlobal } from 'openland-mobile/themes/ThemeContext';

export const GlobalSearchItemSharedRoom = XMemo<{
    item: GlobalSearch_items_SharedRoom;
    onPress: (id: string, title: string) => void;
}>((props) => {

    const theme = useThemeGlobal();
    const handlePress = React.useCallback(() => {
        props.onPress(props.item.id, props.item.title);
    }, [props.item]);

    let item = props.item;
    let height = 48;
    let avatarSize = 30;

    return (
        <ASFlex height={height} flexDirection="row" highlightColor={theme.selectorColor} onPress={handlePress} alignItems={'center'}>
            <ASFlex marginLeft={7} width={height} height={height} alignItems="center" justifyContent="center">
                <ASAvatar
                    src={item.roomPhoto}
                    size={avatarSize}
                    placeholderKey={item.id}
                    placeholderTitle={item.title}
                />
            </ASFlex>
            <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                <ASFlex height={Platform.OS === 'android' ? 22 : 18} marginTop={Platform.OS === 'android' ? -4 : 0}>
                    <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={theme.textColor} flexGrow={1} flexBasis={0} marginRight={10}>{item.title}</ASText>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
})

export const GlobalSearchItemOrganization = XMemo<{
    item: GlobalSearch_items_Organization;
    onPress: (id: string, title: string) => void;
}>((props) => {
    const theme = useThemeGlobal();
    const handlePress = React.useCallback(() => {
        props.onPress(props.item.id, props.item.name);
    }, [props.item]);

    let item = props.item;
    let height = 48;
    let avatarSize = 30;

    return (
        <ASFlex height={height} flexDirection="row" highlightColor={theme.selectorColor} onPress={handlePress} alignItems={'center'}>
            <ASFlex marginLeft={7} width={height} height={height} alignItems="center" justifyContent="center">
                <ASAvatar
                    src={item.photo}
                    size={avatarSize}
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                />
            </ASFlex>
            <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                <ASFlex height={Platform.OS === 'android' ? 22 : 18} marginTop={Platform.OS === 'android' ? -4 : 0}>
                    <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={theme.textColor} flexGrow={1} flexBasis={0} marginRight={10}>{item.name}</ASText>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
})

export const GlobalSearchItemUser = XMemo<{
    item: GlobalSearch_items_User;
    onPress: (id: string, title: string) => void;
}>((props) => {
    const theme = useThemeGlobal();
    const handlePress = React.useCallback(() => {
        props.onPress(props.item.id, props.item.name);
    }, [props.item])
    let item = props.item;
    let height = 48;
    let avatarSize = 30;

    return (
        <ASFlex height={height} flexDirection="row" highlightColor={theme.selectorColor} onPress={handlePress} alignItems={'center'}>
            <ASFlex marginLeft={7} width={height} height={height} alignItems="center" justifyContent="center">
                <UserAvatar
                    src={item.photo}
                    size={avatarSize}
                    placeholderKey={item.id}
                    placeholderTitle={item.name}
                    online={item.online}
                    theme={theme}
                />
            </ASFlex>
            <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                <ASFlex height={Platform.OS === 'android' ? 22 : 18} marginTop={Platform.OS === 'android' ? -4 : 0}>
                    <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={theme.textColor} flexGrow={1} flexBasis={0} marginRight={10}>{item.name}</ASText>
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
})