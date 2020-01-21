import React from 'react';
import { View, Image, Text, Platform, Dimensions } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { AppStorage as Storage } from 'openland-y-runtime/AppStorage';
import { useClient } from 'openland-mobile/utils/useClient';

const Logo = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    const user = getMessenger().engine.user;
    return (
        <View
            flex={1}
            paddingHorizontal={16}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            <View
                position="relative"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <View top={79} zIndex={1}>
                    <ZAvatar
                        size="medium"
                        src={user.photo}
                        placeholderKey={user.id}
                        placeholderTitle={user.name}
                    />
                </View>
                <Image
                    source={require('assets/art-discover.png')}
                    style={{ width: 240, height: 150, marginBottom: 16 }}
                />
            </View>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Title1,
                    textAlign: 'center',
                    color: theme.foregroundPrimary,
                    marginBottom: 8,
                }}
            >
                You’re on board!
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    textAlign: 'center',
                    color: theme.foregroundSecondary,
                }}
            >
                Your account is ready and it’s time to {'\n'} find interesting communities to join
            </Text>
        </View>
    );
});

const SignDiscoverPage = React.memo((props: PageProps) => {
    const area = React.useContext(ASSafeAreaContext);
    const client = useClient();

    const isIos = Platform.OS === 'ios';
    const isXGen = isIos && Dimensions.get('window').height > 800;
    const defaultIosPadding = isXGen ? 34 : 16;

    const onSkip = async () => {
        client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
        await Storage.writeKey('discover_start', null);
        props.router.pushAndResetRoot('Home');
    };

    const onNext = async () => {
        props.router.push('Discover');
    };

    return (
        <>
            <SHeaderButton title="Skip" onPress={onSkip} />
            <View flex={1}>
                <Logo />
            </View>
            <View padding={16} paddingBottom={isIos ? defaultIosPadding : area.bottom + 16}>
                <ZRoundedButton size="large" title="Next" onPress={onNext} />
            </View>
        </>
    );
});

export const SignDiscover = withApp(SignDiscoverPage, {
    navigationAppearance: 'small',
    hideHairline: true,
});
