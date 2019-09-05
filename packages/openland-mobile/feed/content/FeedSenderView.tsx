import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { UserShort } from 'openland-api/Types';
import { getMessenger } from 'openland-mobile/utils/messenger';

const styles = StyleSheet.create({
    sender: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    senderName: {
        ...TextStyles.Label2,
        marginLeft: 8
    } as TextStyle,
    senderOrg: {
        ...TextStyles.Caption,
        marginLeft: 8
    } as TextStyle
});

interface FeedSenderViewProps {
    sender: UserShort;
    style: 'default' | 'media';
}

export const FeedSenderView = XMemo<FeedSenderViewProps>((props) => {
    const router = getMessenger().history.navigationManager;
    const theme = React.useContext(ThemeContext);
    const { sender, style } = props;
    const { id, photo, name, primaryOrganization } = sender;

    const color = style === 'default' ? theme.foregroundPrimary : theme.foregroundContrast;
    const orgOpacity = style === 'default' ? 1 : 0.56;

    return (
        <TouchableOpacity onPress={() => router.push('ProfileUser', { id })} activeOpacity={0.6}>
            <View style={styles.sender}>
                <ZAvatar size="x-small" src={photo} placeholderKey={id} placeholderTitle={name} />
                <Text style={[styles.senderName, { color }]} allowFontScaling={false}>
                    {name}
                </Text>
                {primaryOrganization && (
                    <Text style={[styles.senderOrg, { color, opacity: orgOpacity }]} allowFontScaling={false}>
                        {primaryOrganization.name}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
});