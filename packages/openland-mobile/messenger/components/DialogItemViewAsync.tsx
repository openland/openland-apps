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
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { DataSourceItem } from 'openland-y-utils/DataSource';

function ASCounter(props: { value: number | string, muted?: boolean }) {
    return (
        <ASFlex borderRadius={9} backgroundColor={props.muted ? '#c8c7cc' : '#0084fe'} height={18} minWidth={18} justifyContent="center">
            <ASFlex justifyContent="center" marginLeft={Platform.select({ default: 4, android: 6 })} marginRight={Platform.select({ default: 4, android: 6 })}>
                <ASText color="#fff" lineHeight={Platform.select({ default: 16, android: 17 })} fontSize={12} minWidth={8} textAlign="center">{props.value + ''}</ASText>
            </ASFlex>
        </ASFlex >
    );
}

export const DialogItemViewAsync = React.memo<{ item: DialogDataSourceItem, compact?: boolean, onPress: (id: string, item: DataSourceItem) => void }>((props) => {
    let item = props.item;
    let isUser = item.kind === 'PRIVATE';
    let isGroup = item.kind === 'GROUP';
    let isChannel = item.isChannel;
    let height = props.compact ? 48 : 80;
    let avatarSize = props.compact ? 30 : 60;
    let theme = React.useContext(ThemeContext);
    return (
        <ASFlex
            height={height}
            flexDirection="row"
            highlightColor={theme.selectorColor}
            onPress={() => {
                props.onPress(props.item.key, item);
            }}
            alignItems={props.compact ? 'center' : undefined}
        >
            <ASFlex marginLeft={props.compact ? 12 : undefined} width={height} height={height} alignItems="center" justifyContent="center">
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
                    {isGroup && !isChannel && <ASFlex height={22} alignItems="flex-end" marginRight={1}><ASImage tintColor={theme.dialogTitleSecureColor} width={13} height={13} source={require('assets/ic-lock-13.png')} marginBottom={Platform.OS === 'android' ? 4 : 3} /></ASFlex>}
                    {isChannel && <ASFlex height={22} alignItems="flex-end" marginRight={1}><ASImage tintColor={isGroup ? theme.dialogTitleSecureColor : '#000'} width={13} height={13} source={require('assets/ic-channel-13.png')} marginBottom={Platform.OS === 'android' ? 4 : 3} /></ASFlex>}
                    <ASText fontSize={15} height={22} fontWeight={TextStyles.weight.medium} color={isGroup ? theme.dialogTitleSecureColor : theme.dialogTitleColor} flexGrow={1} flexBasis={0} marginRight={10}>{item.title}</ASText>
                    {item.date !== undefined && <ASText fontSize={13} height={16} marginTop={2} color={theme.dialogDateColor}>{formatDate(item.date)}</ASText>}
                </ASFlex>
                {!props.compact && <ASFlex flexDirection="row" alignItems="stretch" marginTop={2} marginBottom={2} height={38}>
                    {!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                        <ASText fontSize={14} lineHeight={18} height={36} color={theme.dialogSenderColor} numberOfLines={2}>
                            {item.showSenderName && `${item.sender}: `}
                            <ASText fontSize={14} height={36} lineHeight={18} color={theme.dialogMessageColor} numberOfLines={2}>{item.fallback}</ASText>
                        </ASText>
                    </ASFlex>}
                    {!!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                        <ASText fontSize={14} height={36} lineHeight={18} color={theme.dialogTypingColor} numberOfLines={2}>{item.typing}</ASText>
                    </ASFlex>}
                    {item.unread > 0 && (
                        <ASFlex marginTop={18} flexShrink={0}>
                            <ASCounter value={item.unread} muted={item.isMuted} />
                        </ASFlex>
                    )}
                </ASFlex>}
            </ASFlex>
            {/* <ASFlex overlay={true} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                <ASFlex height={1} flexGrow={1} marginLeft={props.compact ? 62 : 80} backgroundColor={theme.selectorColor} />
            </ASFlex> */}
        </ASFlex>
    );
});