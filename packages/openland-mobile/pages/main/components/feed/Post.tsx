import * as React from 'react';
import { View, StyleSheet, Text, ViewStyle, Image } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';

interface PostProps {
    user: { name: string; organization: string; avatar: string; }; // Replace User_user
    text: string;
}

const styles = StyleSheet.create({
    post: {
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    header: { 
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    } as ViewStyle,
    dotDivider: {
        width: 3,
        height: 3,
        borderRadius: 3,
        marginHorizontal: 8
    } as ViewStyle,
    actions: {
        paddingVertical: 8,
        flexDirection: 'row',
    } as ViewStyle,
    actionIcon: {
        marginRight: 38
    },
});

// const ActionIcon = (props: { source: NodeRequire }) => {
//     return null;
// };

export const Post = XMemo<PostProps>((props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <View style={styles.post}>
            <View style={styles.header}>
                <ZAvatar size={'small'} src={props.user.avatar} />
                <Text style={{ ...TypeStyles.subhead, marginLeft: 12, color: theme.foregroundSecondary }}>
                    {props.user.name}
                </Text>
                <View style={[styles.dotDivider, { backgroundColor: theme.foregroundSecondary }]} />
                <Text style={{ ...TypeStyles.subhead, color: theme.foregroundSecondary, flex: 1 }} numberOfLines={1} ellipsizeMode={'tail'}>
                    {props.user.organization}
                </Text>
            </View>

            <Text style={{ ...TypeStyles.body, color: theme.foregroundPrimary, paddingBottom: 4 }}>
                {props.text}
            </Text>
            
            <View style={styles.actions}>
                <View style={styles.actionIcon}>
                    <Image source={require('assets/ic-like-24.png')} style={{ tintColor: theme.foregroundTertiary }} />
                </View>
                <View style={styles.actionIcon}>
                    <Image source={require('assets/ic-message-24.png')} style={{ tintColor: theme.foregroundTertiary }} />
                </View>
                <View style={styles.actionIcon}>
                    <Image source={require('assets/ic-forward-24.png')} style={{ tintColor: theme.foregroundTertiary }} />
                </View>
            </View>
        </View>
    );
});
