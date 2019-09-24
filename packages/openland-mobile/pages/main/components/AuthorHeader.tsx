import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Dimensions } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { UserShort, OrganizationShort } from 'openland-api/Types';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { formatDateAtTime } from 'openland-y-utils/formatTime';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'stretch',
        flexDirection: 'row'
    } as ViewStyle,
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        alignSelf: 'center',
        paddingHorizontal: 16,
        maxWidth: '100%',
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

interface AuthorHeaderProps {
    author: UserShort | OrganizationShort;
    date: number;
}

const LABEL_MAX_WIDTH = Dimensions.get('screen').width - 185;

export const AuthorHeader = React.memo((props: AuthorHeaderProps) => {
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
                    <Text
                        style={[styles.name, { color: theme.foregroundPrimary, maxWidth: LABEL_MAX_WIDTH }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {author.name}
                    </Text>
                    <Text
                        style={[styles.date, { color: theme.foregroundSecondary, maxWidth: LABEL_MAX_WIDTH }]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {formatDateAtTime(date)}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});