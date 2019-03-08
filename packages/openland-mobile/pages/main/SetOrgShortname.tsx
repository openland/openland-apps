import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZForm } from '../../components/ZForm';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { Clipboard } from 'react-native';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ActionSheet } from 'openland-mobile/components/ActionSheet';
import { ErrorText, validateShortname, getErrorByShortname } from './SetUserShortname';
import { formatError } from 'openland-y-forms/errorHandling';

const SetOrgShortnameContent = XMemo<PageProps>((props) => {
    let account = getClient().useAccount();
    let organization = getClient().useOrganization({ organizationId: props.router.params.id }).organization;

    const [shortname, setShortname] = React.useState(organization.shortname);
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

    const greenErrorLabel = getErrorByShortname(shortname, 'Shortname', minLength, maxLength);

    return (
        <>
            <SHeaderButton title="Save" onPress={handleSave} />
            <ZForm
                action={async args => {
                    setError(undefined);

                    await getClient().mutateSetOrgShortname(args);

                    await getClient().refetchOrganization({ organizationId: organization.id });
                    await getClient().refetchOrganizationProfile({ organizationId: organization.id });
                }}
                onSuccess={() => props.router.back()}
                onError={(e) => setError(formatError(e))}
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
