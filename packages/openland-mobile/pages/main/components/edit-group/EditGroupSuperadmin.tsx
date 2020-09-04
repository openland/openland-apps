import * as React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { CheckListBoxWraper } from '../../modals/UserMultiplePicker';
import Toast from 'openland-mobile/components/Toast';
import { SharedRoomKind } from 'openland-api/spacex.types';

const EditGroupSuperadminComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const group = client.useRoomChat({ id: roomId }).room;
    const superGroup = client.useRoomSuper({ id: props.router.params.id }).roomSuper;

    if (!group || group.__typename === 'PrivateRoom' || !superGroup) {
        return null;
    }
    const isInitialPublic = group.kind === SharedRoomKind.PUBLIC;
    const isInitialFeatured = !!superGroup?.featured;
    const [isPublic, setIsPublic] = React.useState(isInitialPublic);
    const [isFeatured, setIsFeatured] = React.useState(isInitialFeatured);

    const form = useForm();

    const handleSave = () => {
        let featuredChanged = isInitialFeatured !== isFeatured;
        let visibilityChanged = isInitialPublic !== isPublic;

        if (!featuredChanged && !visibilityChanged) {
            return;
        }

        form.doAction(async () => {
            try {
                if (visibilityChanged) {
                    await client.mutateRoomUpdate({
                        roomId,
                        input: {
                            kind: isPublic ? SharedRoomKind.PUBLIC : SharedRoomKind.GROUP
                        }
                    });
                }
                if (featuredChanged) {
                    await client.mutateRoomAlterFeatured({ id: roomId, featured: isFeatured });
                }
                await client.refetchRoomChat({ id: props.router.params.id });
                Toast.success({ duration: 1000 }).show();
                props.router.back();
            } catch (e) {
                Toast.failure({ text: 'Something went wrong', duration: 1000 });
            }
        });
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
                            backgroundColor={theme.tintGrey}
                        >
                            <Image
                                source={require('assets/ic-lock-48.png')}
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
                            Superadmin settings
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
                            For Openland team only
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header="Visibility">
                    <CheckListBoxWraper isRadio={true} checked={isPublic}>
                        <ZListItem
                            text="Public"
                            onPress={() => setIsPublic(true)}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={!isPublic}>
                        <ZListItem
                            text="Private"
                            onPress={() => setIsPublic(false)}
                        />
                    </CheckListBoxWraper>
                </ZListGroup>
                <ZListGroup header="Featured group">
                    <CheckListBoxWraper isRadio={true} checked={isFeatured}>
                        <ZListItem
                            text="Yes"
                            onPress={() => setIsFeatured(true)}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={!isFeatured}>
                        <ZListItem
                            text="No"
                            onPress={() => setIsFeatured(false)}
                        />
                    </CheckListBoxWraper>
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupSuperadmin = withApp(EditGroupSuperadminComponent, {
    navigationAppearance: 'small',
});
