import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { FeedPostAuthorFragment } from 'openland-api/Types';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { formatDateAtTime } from 'openland-y-utils/formatTime';

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        alignSelf: 'center',
        paddingLeft: 16,
    } as ViewStyle,
    info: {
        flexGrow: 1,
        flexDirection: 'column',
        paddingLeft: 12
    } as ViewStyle,
    name: {
        ...TextStyles.Label2,
    } as TextStyle,
    date: {
        ...TextStyles.Caption,
    } as TextStyle
});

interface FeedAuthorHeaderProps {
    author: FeedPostAuthorFragment;
    date: number;
}

export const FeedAuthorHeader = React.memo((props: FeedAuthorHeaderProps) => {
    const router = getMessenger().history.navigationManager;
    const theme = React.useContext(ThemeContext);
    const { author, date } = props;

    const handlePress = React.useCallback(() => {
        if (author.__typename === 'User') {
            router.push('ProfileUser', { id: author.id });
        } else {
            router.push('ProfileOrganization', { id: author.id });
        }
    }, [author]);

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
            <View style={styles.box}>
                <ZAvatar size="small" src={author.photo} placeholderKey={author.id} placeholderTitle={author.name} />
                <View style={styles.info}>
                    <Text style={[styles.name, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                        {author.name}
                    </Text>
                    <Text style={[styles.date, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                        {formatDateAtTime(date)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});