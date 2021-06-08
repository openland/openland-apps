import * as React from 'react';
import { Text, View } from 'react-native';
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
import { useText } from 'openland-mobile/text/useText';

const EditGroupCallsComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const { t } = useText();
    const group = client.useRoomChat({ id: roomId }).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }
    const [mode, setMode] = React.useState<RoomCallsMode>(group.callSettings.mode);
    const form = useForm();
    const customLinkField = useField('custom-link', group.callSettings.callLink || '', form, [
        {
            text: t('validationLink', 'Enter a valid link'),
            checkIsValid: (str) => {
                if (mode === RoomCallsMode.LINK) {
                    let match = matchLinks(str);
                    return !!match;
                } else {
                    return true;
                }
            },
        },
    ]);
    const handleSave = React.useCallback(() => {
        let callLink = customLinkField.value.trim();
        if (mode === RoomCallsMode.LINK && customLinkField.input.invalid) {
            return;
        }
        form.doAction(async () => {
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
            await client.refetchRoomChat({ id: roomId });
            Toast.success({ duration: 1000 }).show();
            props.router.back();
        });
    }, [mode, form]);

    return (
        <>
            <SHeaderButton title={t('save', 'Save')} onPress={() => handleSave()} />
            <KeyboardAvoidingScrollView>
                <EditPageHeader
                    icon={require('assets/ic-call-glyph-48.png')}
                    tint={theme.tintGreen}
                    title={t('groupCalls', 'Group calls')}
                    description={t('groupCallsChoose', 'Choose what calls to use')}
                />
                <React.Suspense fallback={null}>
                    <ZListGroup header={null}>
                        <CheckListBoxWraper isRadio={true} checked={mode === RoomCallsMode.STANDARD}>
                            <ZListItem
                                text={t('groupCallsStandard', 'Standard Openland rooms')}
                                onPress={() => setMode(RoomCallsMode.STANDARD)}
                            />
                        </CheckListBoxWraper>
                        <CheckListBoxWraper isRadio={true} checked={mode === RoomCallsMode.LINK}>
                            <ZListItem
                                text={t('groupCallsCustom', 'Custom call link')}
                                onPress={() => setMode(RoomCallsMode.LINK)}
                            />
                        </CheckListBoxWraper>
                        <CheckListBoxWraper isRadio={true} checked={mode === RoomCallsMode.DISABLED}>
                            <ZListItem
                                text={t('groupCallsNone', 'No calls')}
                                onPress={() => setMode(RoomCallsMode.DISABLED)}
                            />
                        </CheckListBoxWraper>
                    </ZListGroup>
                    {mode === RoomCallsMode.LINK && (
                        <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                            <ZInput
                                placeholder={t('callLink', 'Call link')}
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
                                {t('groupCallsExternal', 'A link to external call room, e.g. on Zoom, Google Meet, or any other service')}
                            </Text>
                        </View>
                    )}
                </React.Suspense>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditGroupCalls = withApp(EditGroupCallsComponent, {
    navigationAppearance: 'small',
});
