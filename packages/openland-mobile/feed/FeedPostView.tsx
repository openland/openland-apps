import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { DataSourceFeedPostItem } from 'openland-engines/feed/FeedEngine';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { Dimensions, View, Text, StyleSheet, ViewStyle, TextStyle, Image } from 'react-native';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';

const styles = StyleSheet.create({
    box: {
        paddingTop: 16,
        paddingBottom: 32,
        marginBottom: -16,
        alignItems: 'center'
    } as ViewStyle,
    container: {
        borderRadius: RadiusStyles.Large,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    } as ViewStyle,
    sender: {
        position: 'absolute',
        padding: 16,
        top: 0, left: 0, right: 0,
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

const PostShadow = React.memo((props: { width: number, height: number }) => {
    const { width, height } = props;
    const resolved = Image.resolveAssetSource(require('assets/feed/bg_card_shadow.png'));

    return (
        <View style={{ position: 'absolute', top: 0, left: -8, right: -8, bottom: 0 }}>
            <ASView style={{ width: width + 16, height }}>
                <ASFlex
                    flexGrow={1}
                    backgroundPatch={{
                        source: resolved.uri,
                        scale: resolved.scale,
                        top: 16, left: 24, right: 24, bottom: 32
                    }}
                />
            </ASView>
        </View>
    );
});

interface FeedPostAsyncProps {
    item: DataSourceFeedPostItem;
}

export const FeedPostView = XMemo<FeedPostAsyncProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { id, sender, text } = props.item;

    const width = Dimensions.get('screen').width;

    const containerWidth = width - 32;
    const containerHeight = containerWidth * (4 / 3);

    return (
        <View style={styles.box}>
            <PostShadow width={width} height={containerHeight + 16 + 32} />

            <View style={[styles.container, { width: containerWidth, height: containerHeight, backgroundColor: theme.backgroundSecondary }]}>
                <View style={styles.sender}>
                    <ZAvatar size="x-small" src={sender.photo} placeholderKey={sender.id} placeholderTitle={sender.name} />
                    <Text style={[styles.senderName, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                        {sender.name}
                    </Text>
                    {sender.primaryOrganization && (
                        <Text style={[styles.senderOrg, { color: theme.foregroundTertiary }]} allowFontScaling={false}>
                            {sender.primaryOrganization.name}
                        </Text>
                    )}
                </View>

                <Text style={{ ...TextStyles.Title1, color: theme.foregroundPrimary, padding: 16, textAlign: 'center' }} allowFontScaling={false}>
                    {text}
                </Text>
            </View>
        </View>
    );
});