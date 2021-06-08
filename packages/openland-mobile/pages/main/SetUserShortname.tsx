import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { Clipboard, Text } from 'react-native';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { formatError } from 'openland-y-forms/errorHandling';
import { SUPER_ADMIN } from '../Init';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import Toast from 'openland-mobile/components/Toast';
import { useText } from 'openland-mobile/text/useText';

export const ErrorText = (props: { text: string }) => (
    <Text
        style={{
            color: '#f6564e',
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

export const useErrorByShortname = () => {
    let { t } = useText();
    return (shortname: string | null, label: 'Shortname' | 'Username', min: number, max: number) => {
        let validateResult = undefined;

        if (typeof shortname === 'string') {
            if (!shortname.match('^[a-z0-9_]+$')) {
                validateResult = t('validationShortname', 'Can only contain a-z, 0-9, and underscores');
            }

            if (shortname.length < min) {
                validateResult = t('validationMinChars', { num: min, defaultValue: 'Must have at least {{num}} chars' });
            }

            if (shortname.length > max) {
                validateResult = t('validationMaxChars', { num: max, defaultValue: 'Must have no more than {{num}} chars' });
            }
        }

        return validateResult;
    };
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

const SetUserShortnameContent = React.memo((props: PageProps) => {
    const { user, profile } = getClient().useProfile({ fetchPolicy: 'network-only' });
    const { t } = useText();
    const getError = useErrorByShortname();

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

    let shortnameError = getError(shortnameField.value, 'Username', minLength, maxLength);

    if (!shortnameField.value) {
        shortnameError = undefined;
    }

    const footerUsernameText = shortnameField.value
        ? t('shortnameDescription', { path: shortnameField.value, defaultValue: `This link opens a chat with you:\nopenland.com/{{path}}` })
        : '';

    return (
        <>
            <SHeaderButton title={t('save', 'Save')} onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup
                    header={null}
                    footer={{
                        text: t('shortnameUserDescription', {
                            defaultValue: 'You can choose a username in Openland.\nOther people will be able to find you by this username, and mention you with this username in groups.\n\nYou can use a-z, 0-9 and underscores.\nMinimum length is {{minLength}} characters.\n\n{{username}}',
                            username: footerUsernameText,
                            minLength,
                        }),
                        onPress: (link: string) => {
                            if (user.shortname) {
                                ActionSheet.builder().action(t('copy', 'Copy'), () => {
                                    Clipboard.setString(link);
                                    Toast.showCopied();
                                }, false, require('assets/ic-copy-24.png')).show();
                            }
                        },
                        onLongPress: (link: string) => {
                            if (user.shortname) {
                                ActionSheet.builder().action(t('copy', 'Copy'), () => {
                                    Clipboard.setString(link);
                                    Toast.showCopied();
                                }, false, require('assets/ic-copy-24.png')).show();
                            }
                        }
                    }}
                >
                    <ZInput
                        placeholder={t('username', 'Username')}
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

const SetUserShortnameComponent = React.memo((props: PageProps) => {
    const { t } = useText();
    return (
        <>
            <SHeader title={t('username', 'Username')} />
            <SetUserShortnameContent {...props} />
        </>
    );
});

export const SetUserShortname = withApp(SetUserShortnameComponent, { navigationAppearance: 'small' });
