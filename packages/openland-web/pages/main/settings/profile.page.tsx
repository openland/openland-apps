import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XContent } from 'openland-x-layout/XContent';
import { withProfile } from '../../../api/withProfile';
import { Navigation } from './_navigation';
import { XHeader } from 'openland-x/XHeader';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XTitle } from 'openland-x/XTitle';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XFormError } from 'openland-x-forms/XFormError';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XSelect } from 'openland-x/XSelect';
import { Cities, MetropolitanAreas, States, MultiStateRegions } from '../directory/locationPicker';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XText } from 'openland-x/XText';
import { DateFormater } from 'openland-x-format/XDate';
import { Query } from '../../../../../node_modules/react-apollo';
import { MyOrganizationsQuery } from 'openland-api';
import { XInput } from 'openland-x/XInput';

export default withApp('Profile', 'viewer', withProfile(withQueryLoader((props) => {
    return (
        <Navigation title="Your profile">
            <XHeader text="Your profile" />
            <XContent>
                <XVertical alignSelf="stretch">
                    <Query query={MyOrganizationsQuery.document}>
                        {(orgsData) =>
                            <XForm
                                defaultData={{
                                    input: {
                                        firstName: props.data.profile!!.firstName,
                                        lastName: props.data.profile!!.lastName,
                                        primaryOrganizationId: props.data.profile!!.primaryOrganizationId,
                                        role: props.data.profile!!.role,

                                        phone: props.data.profile!!.phone,
                                        email: props.data.profile!!.email,
                                        website: props.data.profile!!.website,
                                        linkedin: props.data.profile!!.linkedin,
                                        locations: props.data.profile!!.locations,

                                        photoRef: sanitizeIamgeRef(props.data.profile!!.photoRef),
                                    }
                                }}
                                defaultAction={async (data) => {
                                    await props.updateProfile({
                                        variables: {
                                            input: {
                                                firstName: data.input.firstName,
                                                lastName: data.input.lastName,
                                                alphaPrimaryOrganizationId: data.input.primaryOrganizationId,
                                                alphaRole: data.input.role,

                                                phone: data.input.phone,
                                                email: data.input.email,
                                                website: data.input.website,
                                                alphaLinkedin: data.input.linkedin,
                                                alphaLocations: data.input.locations,

                                                photoRef: sanitizeIamgeRef(data.input.photoRef),
                                            }

                                        }
                                    });
                                }}
                                defaultLayout={false}
                            >
                                <XVertical>
                                    <XFormError onlyGeneralErrors={true} />
                                    <XFormLoadingContent>
                                        <XVertical>
                                            <XHorizontal>
                                                <XVertical flexGrow={1} maxWidth={500}>
                                                    <XFormField field="input.firstName" title="First name" >
                                                        <XInput field="input.firstName" />
                                                    </XFormField>
                                                    <XFormField field="input.lastName" title="Last name" >
                                                        <XInput field="input.lastName" />
                                                    </XFormField>
                                                    <XFormField field="input.role" title="Role" >
                                                        <XInput field="input.role" />
                                                    </XFormField>

                                                    <XSelect field="input.primaryOrganizationId" searchable={false} clearable={false} options={((orgsData.data && orgsData.data.myOrganizations) || []).map((org: any) => ({ value: org.id, label: org.name }))} />

                                                    <XTitle>Contacts</XTitle>
                                                    <XFormField field="input.phone" title="Phone Number" >
                                                        <XInput field="input.phone" />
                                                    </XFormField>
                                                    <XFormField field="input.email" title="Email" >
                                                        <XInput field="input.email" />
                                                    </XFormField>
                                                    <XFormField field="input.linkedin" title="LinkedIn" >
                                                        <XInput field="input.linkedin" />
                                                    </XFormField>
                                                    <XSelect field="input.location" options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))} />
                                                </XVertical>
                                                <XFormField field="input.photoRef" title="Photo">
                                                    <XAvatarUpload field="input.photoRef" />
                                                </XFormField>
                                            </XHorizontal>
                                        </XVertical>
                                    </XFormLoadingContent>
                                    <XFormSubmit text="Save" style="primary" alignSelf="flex-start" size="medium" />
                                </XVertical>
                            </XForm>
                        }
                    </Query>
                    <XWithRole role="super-admin">
                        {props.data.profile && props.data.profile.joinedAt && <XText>{DateFormater(props.data.profile.joinedAt)}</XText>}
                        {props.data.profile && <XText>{'Invited by ' + (props.data.profile.invitedBy || 'John Doe')}</XText>}
                    </XWithRole>
                </XVertical>
            </XContent>
        </Navigation>
    );
})));