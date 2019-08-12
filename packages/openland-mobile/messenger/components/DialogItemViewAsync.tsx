import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { ASAvatar } from './ASAvatar';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { UserAvatar } from './UserAvatar';
import { ASImage } from 'react-native-async-view/ASImage';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { DataSourceItem } from 'openland-y-utils/DataSource';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { avatarSizes } from 'openland-mobile/components/ZAvatar';

const ASCounter = (props: { value: number | string, muted?: boolean, theme: ThemeGlobal }) => (
    <ASFlex borderRadius={10} backgroundColor={props.muted ? props.theme.foregroundQuaternary : props.theme.accentPrimary} height={20} minWidth={20} justifyContent="center" alignItems="center">
        <ASFlex justifyContent="center" alignItems="center" marginLeft={6} marginRight={6}>
            <ASText color={props.muted ? props.theme.foregroundContrast : props.theme.foregroundInverted} fontSize={13} textAlign="center" fontWeight={FontStyles.Weight.Bold}>{props.value}</ASText>
        </ASFlex>
    </ASFlex>
);

const DialogItemViewAsyncRender = React.memo<{ theme: ThemeGlobal, item: DialogDataSourceItem, compact?: boolean, onPress: (id: string, item: DataSourceItem) => void }>((props) => {
    const { item, theme } = props;
    const isUser = item.kind === 'PRIVATE';
    const isGroup = item.kind === 'GROUP';
    const isChannel = item.isChannel;
    const height = props.compact ? 48 : 80;
    const avatarSize = props.compact ? 'small' : 'large';
    const paddingHorizontal = props.compact ? 12 : 16;

    const { size } = avatarSizes[avatarSize];

    return (
        <ASFlex
            height={height}
            flexDirection="row"
            highlightColor={theme.backgroundPrimaryActive}
            onPress={() => {
                props.onPress(props.item.key, item);
            }}
            alignItems={props.compact ? 'center' : undefined}
        >
            <ASFlex marginLeft={paddingHorizontal} width={size} height={height} alignItems="center" justifyContent="center">
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
                    theme={theme}
                />}
            </ASFlex>
            <ASFlex marginLeft={paddingHorizontal} marginRight={paddingHorizontal} marginTop={8} marginBottom={8} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                <ASFlex height={24} alignItems="center">
                    {isGroup && !isChannel && <ASFlex alignItems="center" marginRight={2} marginTop={2}><ASImage tintColor={theme.accentPositive} width={13} height={13} source={require('assets/ic-lock-13.png')} marginBottom={Platform.OS === 'android' ? 4 : 3} /></ASFlex>}
                    {isChannel && <ASFlex alignItems="center" marginRight={2} marginTop={2}><ASImage key={theme.foregroundPrimary} tintColor={isGroup ? theme.accentPositive : theme.foregroundPrimary} width={13} height={13} source={require('assets/ic-channel-13.png')} /></ASFlex>}
                    <ASText fontSize={17} fontWeight={FontStyles.Weight.Medium} color={isGroup ? theme.accentPositive : theme.foregroundPrimary} flexGrow={1} flexBasis={0}>{item.title}</ASText>
                    {item.date !== undefined && <ASText fontSize={13} marginLeft={10} color={theme.foregroundTertiary}>{formatDate(item.date)}</ASText>}
                </ASFlex>
                {!props.compact && <ASFlex flexDirection="row" alignItems="stretch" height={40}>
                    <ASFlex flexGrow={1}>
                        {!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            <ASText fontSize={15} lineHeight={20} height={40} color={theme.foregroundSecondary} numberOfLines={2}>
                                {item.showSenderName && `${item.sender}: `}
                                {item.fallback}
                            </ASText>
                        </ASFlex>}
                        {!!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            <ASText fontSize={14} height={36} lineHeight={18} color={theme.accentPrimary} numberOfLines={2}>{item.typing}</ASText>
                        </ASFlex>}
                    </ASFlex>
                    {item.unread > 0 && (
                        <ASFlex flexShrink={0} alignItems="flex-end" marginLeft={10}>
                            {item.haveMention && <ASImage tintColor={theme.accentPrimary} marginRight={4} marginBottom={1} width={18} height={18} source={require('assets/ic-mention-18.png')} />}
                            <ASCounter value={item.unread} muted={item.isMuted} theme={theme} />
                        </ASFlex>
                    )}
                </ASFlex>}
            </ASFlex>
        </ASFlex>
    );
});

export const DialogItemViewAsync = React.memo<{ item: DialogDataSourceItem, compact?: boolean, onPress: (id: string, item: DataSourceItem) => void }>((props) => {
    let theme = useThemeGlobal();
    return (<DialogItemViewAsyncRender theme={theme} {...props} />);
});