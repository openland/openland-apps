import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import LinearGradient from 'react-native-linear-gradient';
import { validateShortname, getErrorByShortname } from './SetUserShortname';
import { formatError } from 'openland-y-forms/errorHandling';
import { SUPER_ADMIN } from '../Init';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const RemarkText = (props: { text: string; error: boolean }) => {
    const theme = React.useContext(ThemeContext);
    return (
        <Text
            style={{
                ...TextStyles.Caption,
                color: props.error ? '#F23051' : theme.foregroundTertiary,
                marginTop: 8,
                paddingHorizontal: 32,
            }}
        >
            {props.text}
        </Text>
    );
};

interface ContentProps {
    name: string;
    shortname: string | null;
    onSave: (shortname: string | null) => Promise<any>;
    isGroup: boolean;
    isChannel: boolean;
    isCommunity: boolean;
}

const SetShortnameContent = React.memo((props: PageProps & ContentProps) => {
    const theme = React.useContext(ThemeContext);
    const [error, setError] = React.useState<string | undefined>(undefined);

    const minLength = SUPER_ADMIN ? 3 : 5;
    const maxLength = 16;

    const form = useForm();
    const shortnameField = useField('shortname', props.shortname || '', form);

    React.useEffect(() => {
        if (!shortnameField.value) {
            setError(undefined);
        }
    }, [shortnameField.value]);

    const handleSave = () => {
        if (validateShortname(shortnameField.value, minLength, maxLength)) {
            form.doAction(async () => {
                try {
                    setError(undefined);

                    await props.onSave(shortnameField.value);

                    props.router.back();
                } catch (e) {
                    setError(formatError(e));
                }
            });
        }
    };

    let shortnameError = getErrorByShortname(
        shortnameField.value,
        'Shortname',
        minLength,
        maxLength,
    );

    if (!shortnameField.value) {
        shortnameError = undefined;
    }

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
                            backgroundColor={theme.tintBlue}
                        >
                            <Image
                                source={require('assets/ic-at-glyph-48.png')}
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
                            Shortname
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
                            {`Choose a shortname so other people can find and mention your ${
                                props.isChannel
                                    ? 'channel'
                                    : props.isGroup
                                    ? 'group'
                                    : props.isCommunity
                                    ? 'community'
                                    : 'organization'
                            }`}
                        </Text>
                    </View>
                </LinearGradient>
                <ZListGroup header={null}>
                    <View paddingHorizontal={16}>
                        <ZInput
                            placeholder="Shortname"
                            prefix="@"
                            field={shortnameField}
                            autoCapitalize="none"
                            autoFocus={true}
                            noWrapper={true}
                        />
                    </View>
                    {error && <RemarkText text={error} error={true} />}
                    {!error && shortnameError && <RemarkText text={shortnameError} error={true} />}
                    {!error && !shortnameError && (
                        <RemarkText
                            text={`Only a-z, 0-9 and underscores, at least 3 chars`}
                            error={false}
                        />
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

const SetOrgShortname = React.memo((props: PageProps) => {
    const id = props.router.params.id;
    const profile = getClient().useOrganizationProfile({ organizationId: id }).organizationProfile;
    const handleSave = React.useCallback(
        async (shortname) => {
            await getClient().mutateSetOrgShortname({
                shortname,
                organizationId: id,
            });
            await getClient().refetchOrganizationProfile({ organizationId: id });
        },
        [id],
    );

    return (
        <SetShortnameContent
            {...props}
            name={profile.name}
            shortname={profile.shortname}
            onSave={handleSave}
            isGroup={false}
            isChannel={false}
            isCommunity={profile.isCommunity}
        />
    );
});

const SetGroupShortname = React.memo((props: PageProps) => {
    const id = props.router.params.id;
    const profile = getClient().useRoomChat({ id }).room as RoomChat_room_SharedRoom;
    const handleSave = React.useCallback(
        async (shortname) => {
            await getClient().mutateSetRoomShortname({
                shortname,
                id,
            });
            await getClient().refetchRoomChat({ id });
        },
        [id],
    );

    return (
        <SetShortnameContent
            {...props}
            name={profile.title}
            shortname={profile.shortname}
            onSave={handleSave}
            isGroup={true}
            isChannel={profile.isChannel}
            isCommunity={false}
        />
    );
});

const SetShortnameComponent = React.memo((props: PageProps) => {
    const isGroup = props.router.params.isGroup;
    const Component = isGroup ? SetGroupShortname : SetOrgShortname;

    return (
        <>
            <Component {...props} />
        </>
    );
});

export const SetShortname = withApp(SetShortnameComponent, { navigationAppearance: 'small' });
