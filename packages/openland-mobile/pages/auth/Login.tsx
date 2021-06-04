import React from 'react';
import { View, StyleSheet, Image, Text, ViewStyle, Platform, Dimensions } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { API_HOST } from 'openland-y-utils/api';
import { useText } from 'openland-mobile/text/useText';

const fetchCountry = async (): Promise<string | undefined> => {
    return fetch('https://' + API_HOST + '/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `{
            ipLocation 
                { 
                    countryCode
                } 
            }`
        }),
    })
        .then(r => r.json())
        .then(r => r?.data?.ipLocation?.countryCode)
        .catch((e) => {
            console.warn('Country fetch failed: ', e);
        });
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    } as ViewStyle,
    logoWrapper: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60,
    } as ViewStyle,
    buttons: {
        paddingHorizontal: 16,
        maxWidth: 424,
        alignSelf: 'center',
        width: '100%',
    } as ViewStyle,
});

const Logo = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();

    return (
        <View style={styles.logoWrapper}>
            <Image
                fadeDuration={0}
                source={
                    theme.type === 'Light'
                        ? require('assets/ic-logo-240.png')
                        : require('assets/ic-logo-dark-240.png')
                }
                style={{ width: 240, height: 240 }}
            />
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    textAlign: 'center',
                    color: theme.foregroundSecondary,
                }}
            >
                {t('loginTitle', 'Modern social network\nbuilt for you, not advertisers')}
            </Text>
        </View>
    );
});

interface ButtonProps {
    onPhonePress: () => void;
    onMailPress: () => void;
    phoneLoading: boolean;
}

const Buttons = React.memo((props: ButtonProps) => {
    const isIos = Platform.OS === 'ios';
    const isXGen = isIos && Dimensions.get('window').height > 800;
    const isPad = !!(Platform.OS === 'ios' && (Platform as any).isPad);
    const defaultIosPadding = isXGen ? 0 : 16;

    return (
        <View style={[styles.buttons, { paddingBottom: isIos && !isPad ? defaultIosPadding : 16 }]}>
            <ZButton title="Continue with phone" onPress={props.onPhonePress} loading={props.phoneLoading} size="large" />
            <View style={{ height: 16 }} />
            <ZButton
                title="Continue with email"
                onPress={props.onMailPress}
                style="secondary"
                size="large"
            />
        </View>
    );
});

const LoginComponent = React.memo((props: PageProps) => {
    const [country, setCountry] = React.useState<string | undefined>();
    const [pressed, setPressed] = React.useState(false);
    const handlePhonePress = () => {
        setPressed(true);
    };

    const handleEmailPress = () => {
        props.router.push('AuthStart');
    };

    React.useEffect(() => {
        fetchCountry().then(countryCode => {
            if (countryCode) {
                setCountry(countryCode);
            } else {
                setCountry('US');
            }
        });
    }, []);

    React.useEffect(() => {
        if (pressed && country) {
            props.router.push('AuthStart', { phone: true, countryShortname: country });
            setPressed(false);
        }
    }, [pressed, country]);

    return (
        <ZTrack event="root_view">
            <ASSafeAreaView style={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Logo />
                    <Buttons phoneLoading={pressed && !country} onPhonePress={handlePhonePress} onMailPress={handleEmailPress} />
                </View>
            </ASSafeAreaView>
        </ZTrack>
    );
});

export const Login = withApp(LoginComponent, { navigationAppearance: 'small-hidden' });
