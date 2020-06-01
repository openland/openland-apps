import * as React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZButton } from 'openland-mobile/components/ZButton';
import Toast from 'openland-mobile/components/Toast';

const SettingsProfilePhoneComponent = React.memo((props: PageProps) => {
    const [confirmState, setConfirmState] = React.useState(false);
    const [validCode, setValidCode] = React.useState('');
    const [sessionState, setSessionState] = React.useState<null | string>(null);
    const theme = React.useContext(ThemeContext);
    const client = getClient();

    const userPhoneParse = props.router.params.phone.match(/\d/g);
    const userPhone = userPhoneParse && userPhoneParse.join('');

    const subtitleText = !confirmState
        ? `Are you sure you want to pair this phone +${userPhone} ?`
        : 'Enter confirm code';

    const handleConfirm = async () => {
        setConfirmState(true);
        const data = await client.mutateSendPhonePairCode({ phone: `+${userPhone}` });
        setSessionState(data.sendPhonePairCode);
    };

    const handleSave = async () => {
        if (sessionState) {
            const loader = Toast.loader();
            loader.show();
            await client.mutatePairPhone({
                sessionId: sessionState,
                confirmationCode: validCode,
            });
            await client.refetchAuthPoints();
            await client.refetchProfile();
            loader.hide();
            props.router.back();
        }
    };

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]}>
                    <View
                        alignItems="center"
                        justifyContent="center"
                        paddingTop={16}
                        paddingBottom={32}
                    >
                        <View
                            width={80}
                            height={80}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={80}
                            backgroundColor={theme.tintGreen}
                        >
                            <Image
                                source={require('assets/ic-call-end-glyph-48.png')}
                                style={{
                                    width: 48,
                                    height: 48,
                                    tintColor: theme.foregroundContrast,
                                }}
                            />
                        </View>
                        <Text
                            allowFontScaling={false}
                            style={{
                                ...TextStyles.Title2,
                                color: theme.foregroundPrimary,
                                textAlign: 'center',
                                marginTop: 16,
                            }}
                        >
                            Pair phone
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header={null}>
                    <Text
                        allowFontScaling={false}
                        style={{
                            ...TextStyles.Body,
                            color: theme.foregroundTertiary,
                            maxWidth: 300,
                            marginBottom: 16,
                            marginHorizontal: 16,
                        }}
                    >
                        {subtitleText}
                    </Text>
                    {!confirmState && (
                        <View paddingHorizontal={16}>
                            <ZButton title="Pair" size="large" onPress={handleConfirm} />
                        </View>
                    )}
                    {confirmState && (
                        <ZInput
                            placeholder="Code"
                            value={validCode}
                            onChangeText={setValidCode}
                            keyboardType="numeric"
                            autoFocus={true}
                        />
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const SettingsProfilePhone = withApp(SettingsProfilePhoneComponent, {
    navigationAppearance: 'small',
});
