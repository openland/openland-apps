import * as React from 'react';
import { View, StyleSheet, ViewStyle, Image, Platform } from 'react-native';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';

const styles = StyleSheet.create({
    box: {
        position: 'absolute',
        top: 0,
        left: -8,
        right: -8,
        bottom: 0
    } as ViewStyle,
});

interface FeedItemShadowProps {
    width: number;
    height: number;
}

export const FeedItemShadow = React.memo((props: FeedItemShadowProps) => {
    const { width, height } = props;
    const resolved = Image.resolveAssetSource(require('assets/feed/bg-card-shadow.png'));

    let capInsets = { top: 48, left: 56, right: 56, bottom: 64 };

    if (Platform.OS === 'android') {
        capInsets = { top: 47, left: 55, right: 55, bottom: 63 };
    }

    return (
        <View style={styles.box}>
            <ASView style={{ width: width + 16, height }}>
                <ASFlex
                    flexGrow={1}
                    backgroundPatch={{
                        source: resolved.uri,
                        scale: resolved.scale,
                        ...capInsets
                    }}
                />
            </ASView>
        </View>
    );
});