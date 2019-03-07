import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZForm } from '../../components/ZForm';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { Clipboard, Text } from 'react-native';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ActionSheet } from 'openland-mobile/components/ActionSheet';
import { formatError } from 'openland-y-forms/errorHandling';

export const ErrorText = (props: { color: string; text: string }) => (
    <Text
        style={{
            color: props.color === 'green' ? '#1daf30' : 'red',
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
}

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
}

const SetUserShortnameContent = XMemo<PageProps>((props) => {
    let account = getClient().useAccount();
    let me = account.me;

    const [shortname, setShortname] = React.useState(me!.shortname);
    const [error, setError] = React.useState<string | undefined>(undefined);

    const isSuperAdmin = account.myPermissions.roles.indexOf('super-admin') >= 0;

    const minLength = isSuperAdmin ? 3 : 5;
    const maxLength = 16;

    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            if (validateShortname(shortname, minLength, maxLength)) {
                ref.current.submitForm();
            }
        }
    }, [shortname, minLength, maxLength]);

    const greenErrorLabel = getErrorByShortname(shortname, 'Username', minLength, maxLength);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    setError(undefined);

                    await getClient().mutateSetUserShortname(args);

                    await getClient().refetchAccount();
                }}
                onSuccess={() => props.router.back()}
                onError={(e) => setError(formatError(e))}
                ref={ref}
                defaultData={{
                    shortname: me!.shortname
                }}
            >
                <ZListItemGroup
                    divider={false}
                    header={null}
                    footer={{
                        text: 'You can choose a username in Openland.' + '\n' +
                              'Other people will be able to find you by this username, and mention you with this username in groups.' + '\n\n' +
                              'You can use a-z, 0-9 and underscores.' + '\n' +
                              'Minimum length is ' + minLength + ' characters.' + '\n\n' +
                              'This link opens a chat with you:' + '\n' +
                              'openland.com/' + (shortname ? shortname : ' username'),
                        onPress: (link: string) => {
                            if (me!.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link)).show();
                            }
                        },
                        onLongPress: (link: string) => {
                            if (me!.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link)).show();
                            }
                        }
                    }}
                >
                    <ZTextInput
                        title="Username"
                        placeholder="username"
                        prefix="@"
                        field="shortname"
                        autoCapitalize="none"
                        border="force-full"
                        onChangeText={(src: string) => {
                            setShortname(src);
                            setError(undefined);
                        }}
                        autoFocus={true}
                    />

                    {error && <ErrorText color="red" text={error} />}
                    {!error && greenErrorLabel && <ErrorText color="green" text={greenErrorLabel} />}
                </ZListItemGroup>
            </ZForm>
        </>
    )
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
