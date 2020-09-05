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
import Toast from 'openland-mobile/components/Toast';

const EditGroupServiceMessagesComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const group = client.useRoomChat({ id: roomId }).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }

    const [joinsEnabled, setJoinsEnabled] = React.useState(group.serviceMessageSettings.joinsMessageEnabled);
    const [leavesEnabled, setLeavesEnabled] = React.useState(group.serviceMessageSettings.leavesMessageEnabled);

    const form = useForm();

    const handleSave = () =>
        form.doAction(async () => {
            try {
                let variables = {
                    roomId,
                    input: {
                        serviceMessageSettings: {
                            joinsMessageEnabled: joinsEnabled,
                            leavesMessageEnabled: leavesEnabled,
                        }
                    }
                };
                await client.mutateRoomUpdate(variables);
                await client.refetchRoomChat({ id: roomId });
                Toast.success({ duration: 1000 }).show();
                props.router.back();
            } catch (e) {
                Toast.failure({ text: 'Something went wrong', duration: 1000 });
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
                            backgroundColor={theme.tintPink}
                        >
                            <Image
                                source={require('assets/ic-megaphone-glyph-48.png')}
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
                            Service messages
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
                            Choose what messages to get
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header={null}>
                    <ZListItem
                        text="New member joins"
                        toggle={joinsEnabled}
                        onToggle={(value) => setJoinsEnabled(value)}
                    />
                    <ZListItem
                        text="Member leaves"
                        toggle={leavesEnabled}
                        onToggle={(value) => setLeavesEnabled(value)}
                    />
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupServiceMessages = withApp(EditGroupServiceMessagesComponent, {
    navigationAppearance: 'small',
});
