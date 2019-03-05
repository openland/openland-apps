import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZForm } from '../../components/ZForm';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput2 } from 'openland-mobile/components/ZTextInput2';
import { Keyboard, View, Platform, Clipboard } from 'react-native';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ActionSheet } from 'openland-mobile/components/ActionSheet';

const SetOrgShortnameContent = XMemo<PageProps>((props) => {
    let organization = getClient().useOrganization({ organizationId: props.router.params.id }).organization;
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    Keyboard.dismiss();

                    await getClient().mutateSetOrgShortname(args);

                    await getClient().refetchAccount();
                }}
                onSuccess={() => props.router.back()}
                ref={ref}
                defaultData={{
                    shortname: organization.shortname
                }}
            >
                <View marginTop={Platform.OS === 'ios' ? 15 : undefined} />
                <ZListItemGroup
                    divider={false}
                    footer={{
                        text: 'You can choose a shortname for ' + organization.name + ' in Openland.' + '\n' +
                              'Other people will be able to find ' + organization.name + ' by this shortname.' + '\n\n' +
                              'You can use a-z, 0-9 and underscores.' + '\n' +
                              'Minimum length is 3 characters.' + '\n\n' +
                              'This link opens ' + organization.name + ' page:' + '\n' +
                              'openland.com/' + (organization.shortname ? organization.shortname : ' shortname'),

                        onPress: (link: string) => {
                            if (organization.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link)).show();
                            }
                        },
                        onLongPress: (link: string) => {
                            if (organization.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link)).show();
                            }
                        }
                    }}
                >
                    <ZTextInput2
                        title="Shortname"
                        placeholder="shortname"
                        prefix="@"
                        field="shortname"
                        autoCapitalize="none"
                        border="force-full"
                    />
                </ZListItemGroup>
            </ZForm>
        </>
    )
});

class SetOrgShortnameComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Shortname" />
                <SetOrgShortnameContent {...this.props} />
            </>
        );
    }
}

export const SetOrgShortname = withApp(SetOrgShortnameComponent, { navigationAppearance: 'small' });
