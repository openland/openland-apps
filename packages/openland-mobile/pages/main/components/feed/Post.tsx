import * as React from 'react';
import { View, StyleSheet, Text, ViewStyle, Image, TouchableOpacity } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { GlobalFeedHome_homeFeed_content_message } from 'openland-api/Types';

interface PostProps {
    post: GlobalFeedHome_homeFeed_content_message;
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
        marginRight: 38,
        flexDirection: 'row',
    },
});

// const ActionIcon = (props: { source: NodeRequire }) => {
//     return null;
// };

export const Post = XMemo<PostProps>((props) => {
    const { post } = props; 
    const sender = post.sender;
    const theme = React.useContext(ThemeContext);
    const [like, toggleLike] = React.useState<boolean>(false);

    return (
        <View style={styles.post}>
            <View style={styles.header}>
                <ZAvatar size={'small'} src={sender.photo} />
                <Text style={{ ...TypeStyles.subhead, marginLeft: 12, color: theme.foregroundSecondary }}>
                    {sender.name}
                </Text>
                {sender.primaryOrganization && (
                    <>
                        <View style={[styles.dotDivider, { backgroundColor: theme.foregroundSecondary }]} />
                        <Text style={{ ...TypeStyles.subhead, color: theme.foregroundSecondary, flex: 1 }} numberOfLines={1} ellipsizeMode={'tail'}>
                            {sender.primaryOrganization.name}
                        </Text>
                    </>
                )}
            </View>

            <Text style={{ ...TypeStyles.body, color: theme.foregroundPrimary, paddingBottom: 4 }}>
                {post.message}
            </Text>
            
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => toggleLike(!like)}>
                    <View style={styles.actionIcon}>
                        <Image source={like ? require('assets/ic-like-active-24.png') : require('assets/ic-like-24.png')} style={{ tintColor: like ? theme.tint1 : theme.foregroundTertiary }} />
                        
                        {like && (
                            <View style={{ position: 'absolute', left: 30 }}>
                                <Text style={{ ...TypeStyles.body, color: like ? theme.tint1 : theme.foregroundTertiary }}>1</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
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
