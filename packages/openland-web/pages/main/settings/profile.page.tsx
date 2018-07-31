import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { XVertical } from 'openland-x-layout/XVertical';
import { XForm } from 'openland-x-forms/XForm2';
import { XContent } from 'openland-x-layout/XContent';
import { withProfile } from '../../../api/withProfile';
import { Navigation } from './_navigation';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XFormError } from 'openland-x-forms/XFormError';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XSelect } from 'openland-x/XSelect';
import { Cities, MetropolitanAreas, States, MultiStateRegions } from '../directory/locationPicker';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { DateFormater } from 'openland-x-format/XDate';
import { Query } from '../../../../../node_modules/react-apollo';
import { MyOrganizationsQuery } from 'openland-api';
import { XInput } from 'openland-x/XInput';

const Content = Glamorous(XContent)({
    paddingTop: 30
});

const HeadTitle = Glamorous.div({
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    color: '#1f3449'
});

const CardText = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 5,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    padding: 18,

    fontSize: 15,
    lineHeight: 1.27,
    letterSpacing: -0.2,
    color: '#334562',
    '& .bold': {
        fontWeight: 600
    },
    '& .person': {
        color: '#6c42ff'
    }
});

export default withApp('Profile', 'viewer', withProfile(withQueryLoader((props) => {
    return (
        <Navigation title="Your profile">
            <Content>
                <XVertical separator={36}>
                    <Query query={MyOrganizationsQuery.document}>
                        {(orgsData) => (
                            <XVertical separator={36}>
                                <XForm
                                    defaultData={{
                                        input: {
                                            firstName: props.data.profile!!.firstName,
                                            lastName: props.data.profile!!.lastName,
                                            primaryOrganizationId: props.data.profile!!.primaryOrganizationId,
                                            role: props.data.profile!!.role,

                                            photoRef: sanitizeIamgeRef(props.data.profile!!.photoRef)
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

                                                    photoRef: sanitizeIamgeRef(data.input.photoRef)
                                                }

                                            }
                                        });
                                    }}
                                    defaultLayout={false}
                                >
                                    <XVertical separator={12}>
                                        <HeadTitle>User</HeadTitle>
                                        <XFormError onlyGeneralErrors={true} />
                                        <XVertical separator={21}>
                                            <XFormLoadingContent>
                                                <XHorizontal separator={12}>
                                                    <XVertical flexGrow={1} maxWidth={480}>
                                                        <XFormField field="input.firstName" title="First name">
                                                            <XInput field="input.firstName" size="medium" />
                                                        </XFormField>
                                                        <XFormField field="input.lastName" title="Last name">
                                                            <XInput field="input.lastName" size="medium" />
                                                        </XFormField>
                                                        <XFormField field="input.primaryOrganizationId" title="Primary organization">
                                                            <XSelect large={true} field="input.primaryOrganizationId" searchable={false} clearable={false} options={((orgsData.data && orgsData.data.myOrganizations) || []).map((org: any) => ({ value: org.id, label: org.name }))} />
                                                        </XFormField>
                                                        <XFormField field="input.role" title="Role">
                                                            <XInput field="input.role" size="medium" />
                                                        </XFormField>
                                                    </XVertical>
                                                    <XFormField field="input.photoRef" title="Photo">
                                                        <XAvatarUpload field="input.photoRef" />
                                                    </XFormField>
                                                </XHorizontal>
                                            </XFormLoadingContent>
                                            <XFormSubmit text="Save changes" style="primary" alignSelf="flex-start" size="medium" succesText="Changes saved!"/>
                                        </XVertical>
                                    </XVertical>
                                </XForm>
                                <XForm
                                    defaultData={{
                                        input: {
                                            phone: props.data.profile!!.phone,
                                            email: props.data.profile!!.email,
                                            website: props.data.profile!!.website,
                                            linkedin: props.data.profile!!.linkedin,
                                            locations: props.data.profile!!.locations
                                        }
                                    }}
                                    defaultAction={async (data) => {
                                        await props.updateProfile({
                                            variables: {
                                                input: {
                                                    phone: data.input.phone,
                                                    email: data.input.email,
                                                    website: data.input.website,
                                                    alphaLinkedin: data.input.linkedin,
                                                    alphaLocations: data.input.locations
                                                }

                                            }
                                        });
                                    }}
                                    defaultLayout={false}
                                >
                                    <XVertical separator={12}>
                                        <HeadTitle>Contacts</HeadTitle>
                                        <XFormError onlyGeneralErrors={true} />
                                        <XVertical maxWidth={480} separator={21}>
                                            <XFormLoadingContent>
                                                <XVertical>
                                                    <XFormField field="input.phone" title="Phone number" >
                                                        <XInput field="input.phone" size="medium" />
                                                    </XFormField>
                                                    <XFormField field="input.email" title="Email" >
                                                        <XInput field="input.email" size="medium" />
                                                    </XFormField>
                                                    <XFormField field="input.website" title="Website" >
                                                        <XInput field="input.website" size="medium" />
                                                    </XFormField>
                                                    <XFormField field="input.linkedin" title="LinkedIn" >
                                                        <XInput field="input.linkedin" size="medium" />
                                                    </XFormField>
                                                    <XFormField field="input.location" title="Location" >
                                                        <XSelect large={true} field="input.location" options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))} />
                                                    </XFormField>
                                                </XVertical>
                                            </XFormLoadingContent>
                                            <XFormSubmit text="Save changes" style="primary" alignSelf="flex-start" size="medium" succesText="Changes saved!"/>
                                        </XVertical>
                                    </XVertical>
                                </XForm>
                            </XVertical>
                        )}
                    </Query>
                    <XVertical separator={15}>
                        <HeadTitle>Super admin</HeadTitle>
                        <XWithRole role="super-admin">
                            <XVertical separator={9}>
                                {props.data.profile && props.data.profile.joinedAt && (
                                    <CardText>
                                        <span>Joined <span className="bold">{DateFormater(props.data.profile.joinedAt)}</span></span>
                                    </CardText>
                                )}
                                {props.data.profile && (
                                    <CardText>
                                        {!props.data.profile.invitedBy && <span>Self-registered</span>}
                                        {props.data.profile.invitedBy && <span>Invited by <span className="bold person">{(props.data.profile.invitedBy || 'John Doe')}</span></span>}

                                    </CardText>
                                )}
                            </XVertical>
                        </XWithRole>
                    </XVertical>
                </XVertical>
            </Content>
        </Navigation>
    );
})));