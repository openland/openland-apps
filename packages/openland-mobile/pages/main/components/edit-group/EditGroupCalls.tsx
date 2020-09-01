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

const EditGroupCallsComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const roomId = props.router.params.id;
    const client = getClient();
    const group = client.useRoomChat({ id: roomId }, { fetchPolicy: 'cache-and-network' }).room;

    if (!group) {
        return null;
    }
    const [value, setValue] = React.useState<'standart' | 'custom' | 'none'>('standart');
    const form = useForm();
    const customLinkField = useField('custom-link', '', form);

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
                    <CheckListBoxWraper isRadio={true} checked={value === 'standart'}>
                        <ZListItem
                            text="Standart Openland calls"
                            onPress={() => setValue('standart')}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={value === 'custom'}>
                        <ZListItem
                            text="Custom call link"
                            onPress={() => setValue('custom')}
                        />
                    </CheckListBoxWraper>
                    <CheckListBoxWraper isRadio={true} checked={value === 'none'}>
                        <ZListItem
                            text="No calls"
                            onPress={() => setValue('none')}
                        />
                    </CheckListBoxWraper>
                </ZListGroup>
                {value === 'custom' && (
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
