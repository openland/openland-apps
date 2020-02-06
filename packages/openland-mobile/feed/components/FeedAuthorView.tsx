import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles, SecondarinessAlpha } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { FeedPostAuthorFragment, FeedPostSourceFragment } from 'openland-api/spacex.types';
import { getMessenger } from 'openland-mobile/utils/messenger';

const styles = StyleSheet.create({
    sender: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    } as ViewStyle,
    senderName: {
        ...TextStyles.Label2,
        paddingLeft: 8
    } as TextStyle,
    senderOrg: {
        ...TextStyles.Caption,
        marginLeft: 8
    } as TextStyle
});

interface FeedAuthorViewProps {
    author: FeedPostAuthorFragment;
    source?: FeedPostSourceFragment;
    style: 'default' | 'media';
    maxWidth: number;
}

export const FeedAuthorView = React.memo((props: FeedAuthorViewProps) => {
    const router = getMessenger().history.navigationManager;
    const theme = React.useContext(ThemeContext);
    const { author, source, style, maxWidth } = props;

    const color = style === 'default' ? theme.foregroundPrimary : theme.foregroundContrast;
    const orgColor = style === 'default' ? theme.foregroundTertiary : theme.foregroundContrast;
    const orgOpacity = style === 'default' ? 1 : SecondarinessAlpha;

    const handlePress = React.useCallback(() => {
        if (source) {
            router.push('FeedChannel', { id: source.id });
        } else {
            router.push('ProfileUser', { id: author.id });
        }
    }, [author]);

    const avatarEntity = source || author;
    const title = source ? source.title : author.name;
    const subtitle = source ? author.name : (author.primaryOrganization ? author.primaryOrganization.name : undefined);

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
            <View style={styles.sender}>
                <ZAvatar size="x-small" src={avatarEntity.photo} placeholderKey={avatarEntity.id} placeholderTitle={title} />
                <Text style={[styles.senderName, { color, maxWidth: maxWidth - 32 - 24 }]} allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail">
                    {title}
                    {subtitle && (
                        <>
                            {'   '}
                            <Text style={[styles.senderOrg, { color: orgColor, opacity: orgOpacity }]} allowFontScaling={false}>
                                {subtitle}
                            </Text>
                        </>
                    )}
                </Text>
            </View>
        </TouchableOpacity>
    );
});