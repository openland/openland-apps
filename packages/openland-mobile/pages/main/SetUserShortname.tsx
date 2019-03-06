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

export const GreenErrorText = (props: { text: string }) => (
    <Text
        style={{
            color: '#1daf30',
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

export const validateShortname = (shortname: string | null, label: string, min: number, max: number) => {
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

const SetUserShortnameContent = XMemo<PageProps>((props) => {
    let account = getClient().useAccount();
    let me = account.me;
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);

    const [shortname, setShortname] = React.useState(me!.shortname);
    const isSuperAdmin = account.myPermissions.roles.indexOf('super-admin') >= 0;

    const minLength = isSuperAdmin ? 3 : 5;
    const maxLength = 16;

    const greenErrorLabel = validateShortname(shortname, 'Username', minLength, maxLength);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    await getClient().mutateSetUserShortname(args);

                    await getClient().refetchAccount();
                }}
                onSuccess={() => props.router.back()}
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
                        onChangeText={setShortname}
                        autoFocus={true}
                    />

                    {typeof greenErrorLabel === 'string' && (
                        <GreenErrorText text={greenErrorLabel} />
                    )}
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
