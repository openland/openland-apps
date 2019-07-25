import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZForm } from '../../components/ZForm';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { Clipboard, Text } from 'react-native';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { formatError } from 'openland-y-forms/errorHandling';
import { SUPER_ADMIN } from '../Init';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SScrollView } from 'react-native-s/SScrollView';
import Toast from 'openland-mobile/components/Toast';

const Loader = Toast.loader();

export const ErrorText = (props: { color: string; text: string }) => (
    <Text
        style={{
            color: props.color === 'green' ? '#6cb83d' : '#f6564e',
            fontSize: 13,
            lineHeight: 17,
            paddingHorizontal: 16,
            paddingBottom: 10,
            paddingTop: 6
        }}
    >
        {props.text}
    </Text>
);

export const getErrorByShortname = (shortname: string | null, label: 'Shortname' | 'Username', min: number, max: number) => {
    let validateResult = undefined;

    if (typeof shortname === 'string') {
        if (!shortname.match('^[a-z0-9_]+$')) {
            validateResult = 'A ' + label.toLowerCase() + ' can only contain a-z, 0-9, and underscores.';
        }

        if (shortname.length < min) {
            validateResult = label + ' must have at least ' + min + ' characters.';
        }

        if (shortname.length > max) {
            validateResult = label + ' must have no more than ' + max + ' characters.';
        }
    }

    return validateResult;
};

export const validateShortname = (shortname: string | null, min: number, max: number) => {
    let validateResult = false;

    if (typeof shortname === 'string') {
        if ((!shortname.match('^[a-z0-9_]+$')) || (shortname.length < min) || (shortname.length > max)) {
            validateResult = false;
        } else {
            validateResult = true;
        }
    }

    return validateResult;
};

const SetUserShortnameContent = XMemo<PageProps>((props) => {
    const { user, profile } = getClient().useProfile({ fetchPolicy: 'network-only' });

    if (!user || !profile) {
        return null;
    }

    const [error, setError] = React.useState<string | undefined>(undefined);

    const minLength = SUPER_ADMIN ? 3 : 5;
    const maxLength = 16;

    const form = useForm();
    const shortnameField = useField('shortname', user.shortname || '', form);

    const handleSave = () => {
        if (validateShortname(shortnameField.value, minLength, maxLength)) {
            form.doAction(async () => {
                try {
                    setError(undefined);

                    await getClient().mutateSetUserShortname({
                        shortname: shortnameField.value
                    });

                    await getClient().refetchAccount();

                    props.router.back();
                
                } catch (e) {
                    setError(formatError(e));
                }
            });
        }
    };

    React.useEffect(() => {
        setError(undefined);
    }, [shortnameField.value]);

    React.useEffect(() => {
        if (form.loading) {
            Loader.show();
        } else {
            Loader.hide();
        }
    }, [form.loading]);

    const greenErrorLabel = getErrorByShortname(shortnameField.value, 'Username', minLength, maxLength);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <SScrollView>
                <ZListItemGroup
                    header={null}
                    footer={{
                        text: 'You can choose a username in Openland.' + '\n' +
                            'Other people will be able to find you by this username, and mention you with this username in groups.' + '\n\n' +
                            'You can use a-z, 0-9 and underscores.' + '\n' +
                            'Minimum length is ' + minLength + ' characters.' + '\n\n' +
                            'This link opens a chat with you:' + '\n' +
                            'openland.com/' + (shortnameField.value ? shortnameField.value : ' username'),
                        onPress: (link: string) => {
                            if (user.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link), false, require('assets/ic-copy-24.png')).show();
                            }
                        },
                        onLongPress: (link: string) => {
                            if (user.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link), false, require('assets/ic-copy-24.png')).show();
                            }
                        }
                    }}
                >
                    <ZInput
                        placeholder="Username"
                        prefix="@"
                        field={shortnameField}
                        autoCapitalize="none"
                        autoFocus={true}
                    />

                    {error && <ErrorText color="red" text={error} />}
                    {!error && greenErrorLabel && <ErrorText color="green" text={greenErrorLabel} />}
                </ZListItemGroup>
            </SScrollView>
        </>
    );
});

class SetUserShortnameComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Username" />
                <SetUserShortnameContent {...this.props} />
            </>
        );
    }
}

export const SetUserShortname = withApp(SetUserShortnameComponent, { navigationAppearance: 'small' });
