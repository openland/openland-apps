import * as React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { SScrollView } from "react-native-s/SScrollView";
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZSocialPickerRender } from 'openland-mobile/components/ZSocialPickerRender';

const EditGroupComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const group = client.useRoomChat(
        { id: props.router.params.id },
        { fetchPolicy: 'network-only' },
    ).room;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const form = useForm();

    const socialImageField = useField(
        'socialImageRef',
        group.socialImage ? { uuid: group.socialImage } : null,
        form,
    );

    const handleSave = () =>
        form.doAction(async () => {
            try {
                const variables = {
                    roomId: props.router.params.id,
                    input: {
                        ...(socialImageField.value &&
                            socialImageField.value.uuid !== group.socialImage && {
                                socialImageRef: socialImageField.value,
                            }),
                    },
                };

                await client.mutateRoomUpdate(variables);
                await client.refetchRoomChat({ id: props.router.params.id });

                props.router.back();
            } catch (e) {
                console.warn('error', e);
                props.router.back();
            }
        });

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <SScrollView>
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
                                source={require('assets/ic-gallery-glyph-48.png')}
                                style={{
                                    width: 48,
                                    height: 48,
                                    tintColor: theme.foregroundContrast,
                                }}
                            />
                        </View>
                        <Text
                            style={{
                                ...TextStyles.Title2,
                                color: theme.foregroundPrimary,
                                textAlign: 'center',
                                marginTop: 16,
                            }}
                            allowFontScaling={false}
                        >
                            Social sharing image
                        </Text>
                        <Text
                            style={{
                                ...TextStyles.Body,
                                color: theme.foregroundTertiary,
                                textAlign: 'center',
                                maxWidth: 300,
                                marginTop: 4,
                            }}
                            allowFontScaling={false}
                        >
                            Choose an image for sharing invite to the group on social networks
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker
                        field={socialImageField}
                        render={ZSocialPickerRender}
                        pickSize={{ width: 1200, height: 630 }}
                        fullWidth={true}
                    />
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const EditGroupSocialImage = withApp(EditGroupComponent, { navigationAppearance: 'small' });
