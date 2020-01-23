import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { XMemo } from 'openland-y-utils/XMemo';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SHeader } from 'react-native-s/SHeader';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface ChatAccessDeniedProps {
    theme: ThemeGlobal;
    onPress: () => void;
}

export const ChatAccessDenied = XMemo<ChatAccessDeniedProps>((props) => (
    <>
        <SHeader title="Access Denied" />
        <SHeaderButton />
        <ASSafeAreaView flexGrow={1} paddingHorizontal={16}>
            <View height="73%" alignItems="center" justifyContent="center">
                <Image source={props.theme.type === 'Light' ? require('assets/img-empty.png') : require('assets/img-empty-dark.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                <Text style={{ textAlign: 'center', fontSize: 22, lineHeight: 28, color: props.theme.foregroundPrimary, marginBottom: 10, fontWeight: FontStyles.Weight.Medium }} allowFontScaling={false}>Cannot view group</Text>
                <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, color: props.theme.foregroundPrimary, opacity: 0.6 }} allowFontScaling={false}>This group doesn't exist or you don't have permission to view it</Text>
            </View>
            <View height="27%" alignItems="center" justifyContent="center">
                <View width={118}>
                    <ZButton
                        size="large"
                        title="Go back"
                        style="secondary"
                        onPress={props.onPress}
                    />
                </View>
            </View>
        </ASSafeAreaView>
    </>
));