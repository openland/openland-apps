import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { Platform } from 'react-native';
import { ASAvatar } from './ASAvatar';
import { FontStyles, TextStylesAsync, CompensationAlpha } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { UserAvatar } from './UserAvatar';
import { ASImage } from 'react-native-async-view/ASImage';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { DataSourceItem } from 'openland-y-utils/DataSource';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { avatarSizes } from 'openland-mobile/components/ZAvatar';
import { PremiumBadgeAsync } from 'openland-mobile/components/PremiumBadge';

const ASCounter = (props: { value: number | string, muted?: boolean, theme: ThemeGlobal }) => (
    <ASFlex borderRadius={11} backgroundColor={props.muted ? props.theme.foregroundQuaternary : props.theme.accentPrimary} height={22} minWidth={22} justifyContent="center" alignItems="center">
        <ASFlex justifyContent="center" alignItems="center" marginLeft={7} marginRight={7}>
            <ASText color={props.muted ? props.theme.foregroundContrast : props.theme.foregroundInverted} fontSize={13} textAlign="center" fontWeight={FontStyles.Weight.Bold} letterSpacing={-0.08}>{props.value}</ASText>
        </ASFlex>
    </ASFlex>
);

interface DialogItemViewAsyncProps {
    item: DialogDataSourceItem;
    showDiscover: (key: string) => boolean;
    compact?: boolean;
    onPress: (id: string, item: DataSourceItem) => void;
    onDiscoverPress?: () => void;
}

const DialogItemViewAsyncRender = React.memo<DialogItemViewAsyncProps & {theme: ThemeGlobal}>((props) => {
    const { item, theme, showDiscover } = props;
    const isUser = item.kind === 'PRIVATE';
    const highlightGroup = item.kind === 'GROUP' && !item.isPremium;
    const height = props.compact ? 48 : 80;
    const avatarSize = props.compact ? 'small' : 'large';
    const paddingHorizontal = props.compact ? 12 : 16;

    const { size } = avatarSizes[avatarSize];
    const shouldShowDiscover = showDiscover(item.key);

    return (
        <ASFlex flexDirection={shouldShowDiscover ? 'column' : 'row'} flexGrow={1} alignItems="stretch">
            <ASFlex 
                flexGrow={1}
                height={height}
                flexDirection="row"
                highlightColor={theme.backgroundPrimaryActive}
                onPress={() => props.onPress(item.key, item)}
                alignItems={props.compact ? 'center' : undefined}
            >
                <ASFlex marginLeft={paddingHorizontal} width={size} height={height} alignItems="center" justifyContent="center">
                    {!isUser && <ASAvatar
                        src={item.photo}
                        size={avatarSize}
                        placeholderKey={item.key}
                        placeholderTitle={item.title}
                        theme={theme}
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
                <ASFlex marginLeft={paddingHorizontal} marginRight={paddingHorizontal} marginTop={6} marginBottom={6} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                    <ASFlex height={24} alignItems="center">
                        {highlightGroup && <ASFlex alignItems="center" marginRight={4} marginTop={4}><ASImage opacity={CompensationAlpha} tintColor={theme.accentPositive} width={16} height={16} source={require('assets/ic-lock-16.png')} marginBottom={Platform.OS === 'android' ? 4 : 0} /></ASFlex>}
                        {item.isPremium && <ASFlex marginRight={8} marginTop={Platform.OS === 'ios' ? 5 : 2}><PremiumBadgeAsync theme={theme} /></ASFlex>}
                        <ASText {...TextStylesAsync.Label1} numberOfLines={1} flexShrink={1} color={highlightGroup ? theme.accentPositive : theme.foregroundPrimary}>
                            {item.title}
                        </ASText>
                        {item.isMuted && <ASFlex alignItems="center" marginLeft={4} marginTop={4}><ASImage tintColor={theme.foregroundQuaternary} width={16} height={16} source={require('assets/ic-muted-16.png')} marginBottom={Platform.OS === 'android' ? 4 : 0} /></ASFlex>}
                        <ASFlex marginLeft={10} marginTop={2} flexGrow={1} justifyContent="flex-end">
                            {item.date !== undefined && <ASText {...TextStylesAsync.Caption} color={theme.foregroundTertiary}>{formatDate(item.date)}</ASText>}
                        </ASFlex>
                    </ASFlex>
                    {!props.compact && <ASFlex flexDirection="row" alignItems="stretch" height={40}>
                        <ASFlex flexGrow={1}>
                            {!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                                <ASText {...TextStylesAsync.Subhead} color={theme.foregroundSecondary} numberOfLines={2}>
                                    {item.showSenderName && `${item.sender}: `}
                                    {item.fallback}
                                </ASText>
                            </ASFlex>}
                            {!!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                                <ASText {...TextStylesAsync.Subhead} height={36} color={theme.accentPrimary} numberOfLines={2}>{item.typing}...</ASText>
                            </ASFlex>}
                        </ASFlex>
                        {item.unread > 0 && (
                            <ASFlex flexShrink={0} alignItems="center" marginLeft={9}>
                                {item.haveMention && (
                                    <ASFlex width={22} height={22} backgroundColor={theme.accentPrimary} borderRadius={11} marginRight={6} alignItems="center" justifyContent="center">
                                        <ASImage key={`mention-${theme.foregroundInverted}`} tintColor={theme.foregroundInverted} width={12} height={12} source={require('assets/ic-at-12.png')} />
                                    </ASFlex>
                                )}
                                <ASCounter value={item.unread} muted={item.isMuted} theme={theme} />
                            </ASFlex>
                        )}
                    </ASFlex>}
                </ASFlex>
            </ASFlex>
            {shouldShowDiscover && (
                    <ASFlex 
                        backgroundGradient={{start: theme.gradient0to100Start, end: theme.gradient0to100End}}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ASFlex 
                            marginTop={32} 
                            marginBottom={32} 
                            marginLeft={32} 
                            marginRight={32} 
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <ASImage source={require('assets/ic-discover-36.png')} width={36} height={36} tintColor={props.theme.foregroundSecondary} />
                            <ASText marginTop={8} marginBottom={4} {...TextStylesAsync.Title2} color={props.theme.foregroundPrimary}>Find more chats</ASText>
                            <ASText marginBottom={16} {...TextStylesAsync.Body} color={props.theme.foregroundSecondary}>Get recommendations for your interests</ASText>
                            <ASFlex height={36} alignItems="center" justifyContent="center" borderRadius={18} backgroundColor={theme.backgroundTertiaryTrans} onPress={props.onDiscoverPress}>
                                <ASText
                                    marginLeft={16}
                                    marginRight={16}
                                    marginBottom={3}
                                    {...TextStylesAsync.Label1} 
                                    color={theme.foregroundSecondary}
                                >
                                    Discover chats
                                </ASText>
                            </ASFlex>
                        </ASFlex>
                    </ASFlex>
                )}
        </ASFlex>
    );
});

export const DialogItemViewAsync = React.memo<DialogItemViewAsyncProps>((props) => {
    let theme = useThemeGlobal();
    return (<DialogItemViewAsyncRender theme={theme} {...props} />);
});