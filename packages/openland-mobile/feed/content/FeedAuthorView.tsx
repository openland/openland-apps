import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { FeedPostAuthorFragment } from 'openland-api/Types';
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

interface FeedAuthorViewProps {
    author: FeedPostAuthorFragment;
    style: 'default' | 'media';
}

export const FeedAuthorView = XMemo<FeedAuthorViewProps>((props) => {
    const router = getMessenger().history.navigationManager;
    const theme = React.useContext(ThemeContext);
    const { author, style } = props;

    const color = style === 'default' ? theme.foregroundPrimary : theme.foregroundContrast;
    const orgOpacity = style === 'default' ? 1 : 0.56;

    if (author.__typename === 'User') {
        return (
            <TouchableOpacity onPress={() => router.push('ProfileUser', { id: author.id })} activeOpacity={0.6}>
                <View style={styles.sender}>
                    <ZAvatar size="x-small" src={author.photo} placeholderKey={author.id} placeholderTitle={name} />
                    <Text style={[styles.senderName, { color }]} allowFontScaling={false}>
                        {author.name}
                    </Text>
                    {author.primaryOrganization && (
                        <Text style={[styles.senderOrg, { color, opacity: orgOpacity }]} allowFontScaling={false}>
                            {author.primaryOrganization.name}
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity onPress={() => router.push('ProfileOrganization', { id: author.id })} activeOpacity={0.6}>
            <View style={styles.sender}>
                <ZAvatar size="x-small" src={author.photo} placeholderKey={author.id} placeholderTitle={name} />
                <Text style={[styles.senderName, { color }]} allowFontScaling={false}>
                    {author.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
});