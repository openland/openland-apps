import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
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

const SetFeedChannelShortnameComponent = XMemo<PageProps>((props) => {
    const { router } = props;
    const { id } = router.params;
    const channel = getClient().useFeedChannel({ id }, { fetchPolicy: 'network-only' }).channel;

    const [error, setError] = React.useState<string | undefined>(undefined);

    const minLength = SUPER_ADMIN ? 3 : 5;
    const maxLength = 16;

    const form = useForm();
    const shortnameField = useField('shortname', channel.shortname || '', form);

    React.useEffect(() => setError(undefined), [shortnameField.value]);

    const handleSave = () => {
        if (validateShortname(shortnameField.value, minLength, maxLength)) {
            form.doAction(async () => {
                try {
                    setError(undefined);

                    await getClient().mutateSetFeedChannelShortname({
                        id,
                        shortname: shortnameField.value,
                    });
                    await getClient().refetchFeedChannel({ id });

                    router.back();
                } catch (e) {
                    setError(formatError(e));
                }
            });
        }
    };

    const greenErrorLabel = getErrorByShortname(shortnameField.value, 'Shortname', minLength, maxLength);

    return (
        <>
            <SHeader title="Shortname" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup
                    header={null}
                    footer={{
                        text: 'You can choose a shortname for ' + channel.title + ' in Openland.' + '\n' +
                            'Other people will be able to find ' + channel.title + ' by this shortname.' + '\n\n' +
                            'You can use a-z, 0-9 and underscores.' + '\n' +
                            'Minimum length is ' + minLength + ' characters.' + '\n\n' +
                            'This link opens ' + channel.title + ' page:' + '\n' +
                            'openland.com/' + (shortnameField.value ? shortnameField.value : ' shortname'),

                        onPress: (link: string) => {
                            if (channel.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link), false, require('assets/ic-copy-24.png')).show();
                            }
                        },
                        onLongPress: (link: string) => {
                            if (channel.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link), false, require('assets/ic-copy-24.png')).show();
                            }
                        }
                    }}
                >
                    <ZInput
                        placeholder="Shortname"
                        prefix="@"
                        field={shortnameField}
                        autoCapitalize="none"
                        autoFocus={true}
                    />

                    {error && <ErrorText color="red" text={error} />}
                    {!error && greenErrorLabel && <ErrorText color="green" text={greenErrorLabel} />}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const SetFeedChannelShortname = withApp(SetFeedChannelShortnameComponent, { navigationAppearance: 'small' });
