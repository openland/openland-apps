import * as React from 'react';
import { Platform } from 'react-native';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { ASText } from 'react-native-async-view/ASText';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { GlobalSearch_items_User, GlobalSearch_items_Organization, GlobalSearch_items_SharedRoom } from 'openland-api/Types';
import { ASAvatar } from 'openland-mobile/messenger/components/ASAvatar';
import { UserAvatar } from 'openland-mobile/messenger/components/UserAvatar';

export class GlobalSearchItemSharedRoom extends React.PureComponent<{
    item: GlobalSearch_items_SharedRoom;
    onPress: (id: string) => void;
}> {
    handlePress = () => {
        this.props.onPress(this.props.item.id);
    }

    render() {
        let item = this.props.item;
        let height = 48;
        let avatarSize = 30;

        return (
            <ASFlex height={height} flexDirection="row" highlightColor={ZStyles.selectedListItem} onPress={this.handlePress} alignItems={'center'}>
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
                        <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={Platform.OS === 'android' ? '#000' : '#181818'} flexGrow={1} flexBasis={0} marginRight={10}>{item.title}</ASText>
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}

export class GlobalSearchItemOrganization extends React.PureComponent<{
    item: GlobalSearch_items_Organization;
    onPress: (id: string) => void;
}> {
    handlePress = () => {
        this.props.onPress(this.props.item.id);
    }

    render() {
        let item = this.props.item;
        let height = 48;
        let avatarSize = 30;

        return (
            <ASFlex height={height} flexDirection="row" highlightColor={ZStyles.selectedListItem} onPress={this.handlePress} alignItems={'center'}>
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
                        <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={Platform.OS === 'android' ? '#000' : '#181818'} flexGrow={1} flexBasis={0} marginRight={10}>{item.name}</ASText>
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}

export class GlobalSearchItemUser extends React.PureComponent<{
    item: GlobalSearch_items_User;
    onPress: (id: string) => void;
}> {
    handlePress = () => {
        this.props.onPress(this.props.item.id);
    }

    render() {
        let item = this.props.item;
        let height = 48;
        let avatarSize = 30;

        return (
            <ASFlex height={height} flexDirection="row" highlightColor={ZStyles.selectedListItem} onPress={this.handlePress} alignItems={'center'}>
                <ASFlex marginLeft={7} width={height} height={height} alignItems="center" justifyContent="center">
                    <UserAvatar
                        src={item.picture}
                        size={avatarSize}
                        placeholderKey={item.id}
                        placeholderTitle={item.name}
                        online={item.online}
                    />
                </ASFlex>
                <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                    <ASFlex height={Platform.OS === 'android' ? 22 : 18} marginTop={Platform.OS === 'android' ? -4 : 0}>
                        <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={Platform.OS === 'android' ? '#000' : '#181818'} flexGrow={1} flexBasis={0} marginRight={10}>{item.name}</ASText>
                    </ASFlex>
                </ASFlex>
            </ASFlex>
        );
    }
}