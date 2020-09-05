import * as React from 'react';
import { View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { CheckListBoxWraper } from '../../modals/UserMultiplePicker';
import Toast from 'openland-mobile/components/Toast';
import { RoomCallsMode } from 'openland-api/spacex.types';
import UrlPattern from 'url-pattern';

let linkPattern = new UrlPattern('http(s)\\://(:subdomain.):domain.:tld(/*)');

const EditGroupCallsComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const group = client.useRoomChat({ id: roomId }).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }
    const [mode, setMode] = React.useState<RoomCallsMode>(group.callSettings.mode);
    const form = useForm();
    const customLinkField = useField('custom-link', group.callSettings.callLink || '', form, [
        {
            text: 'Enter a valid link',
            checkIsValid: (str) => {
                return !!linkPattern.match(str);
            }
        }
    ]);

    const handleSave = () => {
        if (customLinkField.input.invalid) {
            return;
        }
        form.doAction(async () => {
            let callLink = customLinkField.value.trim();
            try {
                let variables = {
                    roomId,
                    input: {
                        callSettings: {
                            mode,
                            ...callLink !== '' && { callLink }
                        }
                    }
                };
                await client.mutateRoomUpdate(variables);
                await Promise.all([
                    client.refetchRoomChat({ id: roomId }),
                    client.refetchRoomTiny({ id: roomId }),
                ]);
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
                            backgroundColor={theme.tintGreen}
                        >
                            <Image
                                source={require('assets/ic-call-glyph-48.png')}
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
                            Group calls
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
                            Choose what calls to use
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header={null}>
                    <CheckListBoxWraper isRadio={true} checked={mode === RoomCallsMode.STANDARD}>
                        <ZListItem
                            text="Standard Openland calls"
                            onPress={() => setMode(RoomCallsMode.STANDARD)}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={mode === RoomCallsMode.LINK}>
                        <ZListItem
                            text="Custom call link"
                            onPress={() => setMode(RoomCallsMode.LINK)}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={mode === RoomCallsMode.DISABLED}>
                        <ZListItem
                            text="No calls"
                            onPress={() => setMode(RoomCallsMode.DISABLED)}
                        />
                    </CheckListBoxWraper>
                </ZListGroup>
                {mode === RoomCallsMode.LINK && (
                    <View paddingHorizontal={16}>
                        <ZInput placeholder="Call link" field={customLinkField} noWrapper={true} autoFocus={true} />
                        <Text style={{ ...TextStyles.Caption, color: theme.foregroundTertiary, marginTop: 8, paddingHorizontal: 16 }}>
                            A link to external call room, e.g. on Zoom, Google Meet, or any other service
                        </Text>
                    </View>
                )}
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupCalls = withApp(EditGroupCallsComponent, {
    navigationAppearance: 'small',
});
