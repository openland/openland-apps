import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZForm } from '../../components/ZForm';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { Keyboard, View, Platform, Clipboard } from 'react-native';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ActionSheet } from 'openland-mobile/components/ActionSheet';

const SetUserShortnameContent = XMemo<PageProps>((props) => {
    let me = getClient().useAccount().me;
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);
    const [shortname, setShortname] = React.useState(me!.shortname);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    Keyboard.dismiss();

                    await getClient().mutateSetUserShortname(args);

                    await getClient().refetchAccount();
                }}
                onSuccess={() => props.router.back()}
                ref={ref}
                defaultData={{
                    shortname: me!.shortname
                }}
            >
                <View marginTop={Platform.OS === 'ios' ? 15 : undefined} />
                <ZListItemGroup
                    divider={false}
                    footer={{
                        text: 'You can choose a username in Openland.' + '\n' +
                              'Other people will be able to find you by this username, and mention you with this username in groups.' + '\n\n' +
                              'You can use a-z, 0-9 and underscores.' + '\n' +
                              'Minimum length is 3 characters.' + '\n\n' +
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
