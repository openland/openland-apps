import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { Clipboard } from 'react-native';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { ErrorText, validateShortname, getErrorByShortname } from './SetUserShortname';
import { formatError } from 'openland-y-forms/errorHandling';
import { SUPER_ADMIN } from '../Init';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { RoomChat_room_SharedRoom } from 'openland-api/spacex.types';

interface ContentProps {
    name: string;
    shortname: string | null;
    onSave: (shortname: string | null) => Promise<any>;
}

const SetShortnameContent = React.memo((props: PageProps & ContentProps) => {
    const [error, setError] = React.useState<string | undefined>(undefined);

    const minLength = SUPER_ADMIN ? 3 : 5;
    const maxLength = 16;

    const form = useForm();
    const shortnameField = useField('shortname', props.shortname || '', form);

    React.useEffect(() => setError(undefined), [shortnameField.value]);

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

    const shortnameError = getErrorByShortname(
        shortnameField.value,
        'Shortname',
        minLength,
        maxLength,
    );
    const footerShortnameText = shortnameField.value
        ? `This link opens ${props.name} page:\nopenland.com/${shortnameField.value}`
        : '';

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup
                    header={null}
                    footer={{
                        text:
                            'You can choose a shortname for ' +
                            props.name +
                            ' in Openland.' +
                            '\n' +
                            'Other people will be able to find it by this shortname.' +
                            '\n\n' +
                            'You can use a-z, 0-9 and underscores.' +
                            '\n' +
                            'Minimum length is ' +
                            minLength +
                            ' characters.' +
                            '\n\n' +
                            footerShortnameText,

                        onPress: (link: string) => {
                            if (props.shortname) {
                                ActionSheet.builder()
                                    .action(
                                        'Copy',
                                        () => Clipboard.setString(link),
                                        false,
                                        require('assets/ic-copy-24.png'),
                                    )
                                    .show();
                            }
                        },
                        onLongPress: (link: string) => {
                            if (props.shortname) {
                                ActionSheet.builder()
                                    .action(
                                        'Copy',
                                        () => Clipboard.setString(link),
                                        false,
                                        require('assets/ic-copy-24.png'),
                                    )
                                    .show();
                            }
                        },
                    }}
                >
                    <ZInput
                        placeholder="Shortname"
                        prefix="@"
                        field={shortnameField}
                        autoCapitalize="none"
                        autoFocus={true}
                    />

                    {error && <ErrorText text={error} />}
                    {!error && shortnameError && <ErrorText text={shortnameError} />}
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
        />
    );
});

const SetShortnameComponent = React.memo((props: PageProps) => {
    const isGroup = props.router.params.isGroup;
    const Component = isGroup ? SetGroupShortname : SetOrgShortname;

    return (
        <>
            <SHeader title="Shortname" />
            <Component {...props} />
        </>
    );
});

export const SetShortname = withApp(SetShortnameComponent, { navigationAppearance: 'small' });
