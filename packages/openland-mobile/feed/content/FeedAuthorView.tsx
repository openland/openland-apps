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

    const handlePress = React.useCallback(() => {
        if (author.__typename === 'User') {
            router.push('ProfileUser', { id: author.id });
        } else {
            router.push('ProfileOrganization', { id: author.id });
        }
    }, [author]);

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
            <View style={styles.sender}>
                <ZAvatar size="x-small" src={author.photo} placeholderKey={author.id} placeholderTitle={author.name} />
                <Text style={[styles.senderName, { color }]} allowFontScaling={false}>
                    {author.name}
                </Text>
                {author.__typename === 'User' && author.primaryOrganization && (
                    <Text style={[styles.senderOrg, { color, opacity: orgOpacity }]} allowFontScaling={false}>
                        {author.primaryOrganization.name}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
});