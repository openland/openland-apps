import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZForm } from '../../components/ZForm';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { Clipboard } from 'react-native';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { ErrorText, validateShortname, getErrorByShortname } from './SetUserShortname';
import { formatError } from 'openland-y-forms/errorHandling';
import { SUPER_ADMIN } from '../Init';

const SetOrgShortnameContent = XMemo<PageProps>((props) => {
    const organizationId = props.router.params.id;
    const profile = getClient().useOrganizationProfile({ organizationId }, { fetchPolicy: 'network-only' }).organizationProfile;

    const [shortname, setShortname] = React.useState<string>(profile.shortname || '');
    const [error, setError] = React.useState<string | undefined>(undefined);

    const minLength = SUPER_ADMIN ? 3 : 5;
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
                    await getClient().refetchOrganization({ organizationId });
                    await getClient().refetchOrganizationProfile({ organizationId });
                }}
                onSuccess={() => props.router.back()}
                onError={(e) => setError(formatError(e))}
                ref={ref}
                defaultData={{
                    shortname: profile.shortname
                }}
                staticData={{
                    organizationId
                }}
            >
                <ZListItemGroup
                    footer={{
                        text: 'You can choose a shortname for ' + profile.name + ' in Openland.' + '\n' +
                              'Other people will be able to find ' + profile.name + ' by this shortname.' + '\n\n' +
                              'You can use a-z, 0-9 and underscores.' + '\n' +
                              'Minimum length is ' + minLength + ' characters.' + '\n\n' +
                              'This link opens ' + profile.name + ' page:' + '\n' +
                              'openland.com/' + (shortname ? shortname : ' shortname'),

                        onPress: (link: string) => {
                            if (profile.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link), false, require('assets/ic-msg-copy-24.png')).show();
                            }
                        },
                        onLongPress: (link: string) => {
                            if (profile.shortname) {
                                ActionSheet.builder().action('Copy', () => Clipboard.setString(link), false, require('assets/ic-msg-copy-24.png')).show();
                            }
                        }
                    }}
                >
                    <ZInput
                        placeholder="Shortname"
                        prefix="@"
                        field="shortname"
                        autoCapitalize="none"
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
    );
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
