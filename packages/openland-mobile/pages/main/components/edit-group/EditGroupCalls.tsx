import * as React from 'react';
import { View, Text } from 'react-native';
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
import { matchLinks } from 'openland-y-utils/TextProcessor';
import { EditPageHeader } from '../EditPageHeader';

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
                let match = matchLinks(str);
                return !!match;
            },
        },
    ]);

    const handleSave = () => {
        let callLink = customLinkField.value.trim();
        if (mode === RoomCallsMode.LINK && customLinkField.input.invalid) {
            return;
        }
        form.doAction(async () => {
            try {
                const callSettings =
                    mode === RoomCallsMode.LINK
                        ? {
                              mode: mode,
                              callLink: callLink,
                          }
                        : {
                              mode: mode,
                          };
                await client.mutateRoomUpdate({
                    roomId: roomId,
                    input: {
                        callSettings: callSettings,
                    },
                });
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
                <EditPageHeader
                    icon={require('assets/ic-call-glyph-48.png')}
                    tint={theme.tintGreen}
                    title="Group calls"
                    description="Choose what calls to use"
                />
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
                    <View marginTop={16} paddingHorizontal={16}>
                        <ZInput
                            placeholder="Call link"
                            field={customLinkField}
                            noWrapper={true}
                            autoFocus={true}
                        />
                        <Text
                            style={{
                                ...TextStyles.Caption,
                                color: theme.foregroundTertiary,
                                marginTop: 8,
                                paddingHorizontal: 16,
                            }}
                        >
                            A link to external call room, e.g. on Zoom, Google Meet, or any other
                            service
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
