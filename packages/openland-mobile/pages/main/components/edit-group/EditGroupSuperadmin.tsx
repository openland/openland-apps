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

const EditGroupSuperadminComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const group = client.useRoomChat({ id: roomId }, { fetchPolicy: 'cache-and-network' }).room;

    if (!group) {
        return null;
    }
    const [isPrivate, setIsPrivate] = React.useState(group.__typename === 'PrivateRoom');
    const [isFeatured, setIsFeatured] = React.useState(false);

    const form = useForm();

    const handleSave = () =>
        form.doAction(async () => {
            try {

                await client.refetchRoomChat({ id: props.router.params.id });
                props.router.back();
            } catch (e) {
                console.warn('error', e);
                // TODO: failure toast
            }
        });

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
                    <CheckListBoxWraper isRadio={true} checked={!isPrivate}>
                        <ZListItem
                            text="Public"
                            onPress={() => setIsPrivate(false)}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={isPrivate}>
                        <ZListItem
                            text="Public"
                            onPress={() => setIsPrivate(true)}
                        />
                    </CheckListBoxWraper>
                </ZListGroup>
                <ZListGroup header="Featured group">
                    <CheckListBoxWraper isRadio={true} checked={!isFeatured}>
                        <ZListItem
                            text="Yes"
                            onPress={() => setIsFeatured(false)}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={isFeatured}>
                        <ZListItem
                            text="No"
                            onPress={() => setIsFeatured(true)}
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
