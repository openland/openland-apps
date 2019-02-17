import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { ASAvatar } from './ASAvatar';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { TextStyles, AppStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { UserAvatar } from './UserAvatar';
import { ASImage } from 'react-native-async-view/ASImage';

function ASCounter(props: { value: number | string, muted?: boolean }) {
    return (
        <ASFlex borderRadius={9} backgroundColor={props.muted ? '#c8c7cc' : '#0084fe'} height={18} minWidth={18} justifyContent="center">
            <ASFlex justifyContent="center" marginLeft={Platform.select({ default: 4, android: 6 })} marginRight={Platform.select({ default: 4, android: 6 })}>
                <ASText color="#fff" lineHeight={Platform.select({ default: 16, android: 17 })} fontSize={12} minWidth={8} textAlign="center">{props.value + ''}</ASText>
            </ASFlex>
        </ASFlex >
    );
}

export class DialogItemViewAsync extends React.PureComponent<{ item: DialogDataSourceItem, compact?: boolean, onPress: (id: string) => void }> {

    handlePress = () => {
        this.props.onPress(this.props.item.key);
    }

    render() {
        console.log('render: ' + this.props.item.key);
        let item = this.props.item;
        let isUser = item.kind === 'PRIVATE';
        let isGroup = item.kind === 'GROUP';
        let height = this.props.compact ? 48 : 80;
        let avatarSize = this.props.compact ? 30 : 60;
        return (
            <ASFlex height={height} flexDirection="row" highlightColor={ZStyles.selectedListItem} onPress={this.handlePress} alignItems={this.props.compact ? 'center' : undefined}>
                <ASFlex marginLeft={this.props.compact ? 12 : undefined} width={height} height={height} alignItems="center" justifyContent="center">
                    {!isUser && <ASAvatar
                        src={item.photo}
                        size={avatarSize}
                        placeholderKey={item.key}
                        placeholderTitle={item.title}
                    />}
                    {isUser && <UserAvatar
                        src={item.photo}
                        size={avatarSize}
                        placeholderKey={item.flexibleId}
                        placeholderTitle={item.title}
                        online={item.online}
                    />}
                </ASFlex>
                <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                    <ASFlex height={Platform.OS === 'android' ? 22 : 18} marginTop={Platform.OS === 'android' ? -4 : 0}>
                        {isGroup && <ASFlex height={22} alignItems="center" marginRight={1}><ASImage tintColor="green" width={13} height={13} source={require('assets/ic-lock-13.png')} /></ASFlex>}
                        <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={isGroup ? 'green' : (Platform.OS === 'android' ? '#000' : '#181818')} flexGrow={1} flexBasis={0} marginRight={10}>{item.title}</ASText>
                        {item.date !== undefined && <ASText fontSize={13} height={16} marginTop={2} color="#aaaaaa">{formatDate(item.date)}</ASText>}
                    </ASFlex>
                    {!this.props.compact && <ASFlex flexDirection="row" alignItems="stretch" marginTop={2} marginBottom={2} height={38}>
                        {!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            <ASText fontSize={14} lineHeight={18} height={36} color="#181818" numberOfLines={2}>
                                {item.showSenderName && `${item.sender}: `}
                                <ASText fontSize={14} height={36} lineHeight={18} color={Platform.OS === 'android' ? '#676767' : '#7b7b7b'} numberOfLines={2}>{item.message}</ASText>
                            </ASText>
                        </ASFlex>}
                        {!!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            <ASText fontSize={14} height={36} lineHeight={18} color="##4747EC" numberOfLines={2}>{item.typing}</ASText>
                        </ASFlex>}
                        {item.unread > 0 && (
                            <ASFlex marginTop={18} flexShrink={0}>
                                <ASCounter value={item.unread} muted={item.isMuted} />
                            </ASFlex>
                        )}
                    </ASFlex>}
                </ASFlex>
                <ASFlex overlay={true} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                    <ASFlex height={0.5} flexGrow={1} marginLeft={this.props.compact ? 62 : 80} backgroundColor={AppStyles.separatorColor} />
                </ASFlex>
            </ASFlex>
        );
    }
}
