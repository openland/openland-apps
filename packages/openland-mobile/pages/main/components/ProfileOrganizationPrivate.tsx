import * as React from 'react';
import { View, Text, Linking, Image, Platform, Dimensions } from 'react-native';
import { Organization_organization } from 'openland-api/spacex.types';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZButton } from 'openland-mobile/components/ZButton';
import { resolveInternalLink } from 'openland-mobile/utils/resolveInternalLink';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { plural } from 'openland-y-utils/plural';
import { findSocialShortname } from 'openland-y-utils/findSocialShortname';

interface ProfileOrganizationPrivateProps {
    organization: Organization_organization;
}

export const ProfileOrganizationPrivate = React.memo((props: ProfileOrganizationPrivateProps) => {
    const { id, photo, name, about, isCommunity, applyLink, applyLinkEnabled, owner, membersCount } = props.organization;
    const isIos = Platform.OS === 'ios';
    const isXGen = isIos && Dimensions.get('window').height > 800;
    const defaultIosPadding = isXGen ? 34 : 16;
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const typeString = isCommunity ? 'Community' : 'Organization';
    const link = findSocialShortname.site(applyLink);
    const canApply = applyLinkEnabled && link;

    return (
        <>
            <SScrollView>
                <View
                    minHeight={Dimensions.get('window').height - area.top - area.bottom}
                    justifyContent="center"
                    alignItems="center"
                    paddingHorizontal={32}
                    paddingBottom={134} // button box height
                >
                    <ZAvatar
                        size="xx-large"
                        photo={photo}
                        id={id}
                        title={name}
                    />
                    <Text
                        style={{
                            color: theme.foregroundPrimary,
                            marginTop: 32,
                            textAlign: 'center',
                            ...TextStyles.Title2,
                        }}
                        allowFontScaling={false}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            color: theme.foregroundTertiary,
                            marginTop: 8,
                            textAlign: 'center',
                            ...TextStyles.Body,
                        }}
                        allowFontScaling={false}
                    >
                        {about || typeString}
                    </Text>
                    <Text
                        style={{
                            color: theme.foregroundTertiary,
                            marginTop: 32,
                            textAlign: 'center',
                            ...TextStyles.Body,
                        }}
                        allowFontScaling={false}
                    >
                        {plural(membersCount, ['member', 'members'])}
                    </Text>
                </View>
            </SScrollView>
            <ZBlurredView
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                padding={16}
                paddingBottom={isIos ? defaultIosPadding : area.bottom + 16}
                intensity="normal"
            >
                {canApply && (
                    <ZButton
                        title="Apply to join"
                        onPress={resolveInternalLink(link!.url, async () => await Linking.openURL(link!.url))}
                        size="large"
                    />
                )}
                {!canApply && (
                    <>
                        <ZButton
                            title="Message admin"
                            path="Conversation"
                            pathParams={{ flexibleId: owner.id }}
                            size="large"
                        />
                        <View marginTop={16} flexDirection="row" justifyContent="center" alignItems="center">
                            <Image
                                source={require('assets/ic-lock-16.png')}
                                style={{ width: 16, height: 16, tintColor: theme.foregroundTertiary, opacity: 0.84, marginRight: 10 }}
                                fadeDuration={0}
                            />
                            <Text
                                style={{
                                    color: theme.foregroundTertiary,
                                    ...TextStyles.Label2,
                                }}
                                allowFontScaling={false}
                            >
                                This {typeString.toLowerCase()} is invite-only
                            </Text>
                        </View>
                    </>
                )}
            </ZBlurredView>
        </>
    );
});