import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZForm } from '../../components/ZForm';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { View, Platform, Clipboard } from 'react-native';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ActionSheet } from 'openland-mobile/components/ActionSheet';
import { GreenErrorText, validateShortname } from './SetUserShortname';

const SetOrgShortnameContent = XMemo<PageProps>((props) => {
    let account = getClient().useAccount();
    let organization = getClient().useOrganization({ organizationId: props.router.params.id }).organization;
    let ref = React.useRef<ZForm | null>(null);
    let handleSave = React.useCallback(() => {
        if (ref.current) {
            ref.current.submitForm();
        }
    }, []);

    const [shortname, setShortname] = React.useState(organization.shortname);
    const isSuperAdmin = account.myPermissions.roles.indexOf('super-admin') >= 0;

    const minLength = isSuperAdmin ? 3 : 5;
    const maxLength = 16;

    const greenErrorLabel = validateShortname(shortname, 'Shortname', minLength, maxLength);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    await getClient().mutateSetOrgShortname(args);

                    await getClient().refetchOrganization({ organizationId: organization.id });
                    await getClient().refetchOrganizationProfile({ organizationId: organization.id });
                }}
                onSuccess={() => props.router.back()}
                ref={ref}
                defaultData={{
                    shortname: organization.shortname
                }}
                staticData={{
                    organizationId: organization.id
                }}
            >
                <ZListItemGroup
                    divider={false}
                    header={null}
                    footer={{
                        text: 'You can choose a shortname for ' + organization.name + ' in Openland.' + '\n' +
                              'Other people will be able to find ' + organization.name + ' by this shortname.' + '\n\n' +
                              'You can use a-z, 0-9 and underscores.' + '\n' +
                              'Minimum length is ' + minLength + ' characters.' + '\n\n' +
                              'This link opens ' + organization.name + ' page:' + '\n' +
                              'openland.com/' + (shortname ? shortname : ' shortname'),

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
                    <ZTextInput
                        title="Shortname"
                        placeholder="shortname"
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
