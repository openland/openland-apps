import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { SHeader } from 'react-native-s/SHeader';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { useText } from 'openland-mobile/text/useText';

interface ChatAccessDeniedProps {
    theme: ThemeGlobal;
    onPress: () => void;
}

export const ChatAccessDenied = React.memo((props: ChatAccessDeniedProps) => {
    const { t } = useText();
    return (
        <>
            <SHeader title={t('accessDenied', 'Access Denied')} />
            <SHeaderButton />
            <ASSafeAreaView style={{ flexGrow: 1, paddingHorizontal: 16 }}>
                <View style={{ height: '73%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={props.theme.type === 'Light' ? require('assets/img-empty.png') : require('assets/img-empty-dark.png')} style={{ width: 224, height: 224, marginBottom: 30 }} />
                    <Text style={{ textAlign: 'center', fontSize: 22, lineHeight: 28, color: props.theme.foregroundPrimary, marginBottom: 10, fontWeight: FontStyles.Weight.Medium }} allowFontScaling={false}>
                        {t('accessDeniedGroup', 'Cannot view group')}
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 16, lineHeight: 24, color: props.theme.foregroundPrimary, opacity: 0.6 }} allowFontScaling={false}>
                        {t('accessDeniedGroupDescription', `This group doesn't exist or you don't have permission to view it`)}
                    </Text>
                </View>
                <View style={{ height: '27%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 118 }}>
                        <ZButton
                            size="large"
                            title={t('goBack', 'Go back')}
                            style="secondary"
                            onPress={props.onPress}
                        />
                    </View>
                </View>
            </ASSafeAreaView>
        </>
    );
});