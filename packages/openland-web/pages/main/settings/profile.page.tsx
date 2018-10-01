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
    paddingTop: 20
});

const HeadTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: '#1f3449'
});

const CardText = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    padding: 16,

    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#334562',
    '& .bold': {
        fontWeight: 600
    },
    '& .person': {
        color: '#1790ff'
    }
});

export default withApp('Profile', 'viewer', withProfile(withQueryLoader((props) => {
    return (
        <Navigation title="Profile">
            <Content>
                <XVertical separator={21}>
                    <Query query={MyOrganizationsQuery.document}>
                        {(orgsData) => (
                            <XVertical separator={30}>
                                <XForm
                                    defaultData={{
                                        input: {
                                            firstName: props.data.profile!!.firstName,
                                            lastName: props.data.profile!!.lastName,
                                            primaryOrganizationId: props.data.profile!!.primaryOrganization && props.data.profile!!.primaryOrganization!!.id,
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
                                        <HeadTitle>Profile</HeadTitle>
                                        <XFormError onlyGeneralErrors={true} />
                                        <XVertical separator={12}>
                                            <XFormLoadingContent>
                                                <XHorizontal separator={12}>
                                                    <XVertical flexGrow={1} maxWidth={480}>
                                                        <XInput title="First name" field="input.firstName" size="r-default" color="primary-sky-blue" placeholder="First name" />
                                                        <XInput title="Last name" field="input.lastName" size="r-default" color="primary-sky-blue" placeholder="Last name" />
                                                        <XSelect
                                                            rounded={true}
                                                            field="input.primaryOrganizationId"
                                                            searchable={false}
                                                            clearable={false}
                                                            options={((orgsData.data && orgsData.data.myOrganizations) || []).map((org: any) => ({ value: org.id, label: org.name }))}
                                                        />
                                                        <XInput field="input.role" size="r-default" color="primary-sky-blue" placeholder="Role" />
                                                    </XVertical>
                                                    <XAvatarUpload field="input.photoRef" />
                                                </XHorizontal>
                                            </XFormLoadingContent>
                                            <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary-sky-blue" succesText="Changes saved!" size="r-default" />
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
                                        <XVertical maxWidth={480} separator={12}>
                                            <XFormLoadingContent>
                                                <XVertical>
                                                    <XInput field="input.phone" size="r-default" color="primary-sky-blue" placeholder="Phone number" />
                                                    <XInput field="input.email" size="r-default" color="primary-sky-blue" placeholder="Email" />
                                                    <XInput field="input.website" size="r-default" color="primary-sky-blue" placeholder="Website" />
                                                    <XInput field="input.linkedin" size="r-default" color="primary-sky-blue" placeholder="LinkedIn" />
                                                    <XSelect
                                                        placeholder="Primary location"
                                                        rounded={true}
                                                        field="input.location"
                                                        options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))}
                                                    />
                                                </XVertical>
                                            </XFormLoadingContent>
                                            <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary-sky-blue" succesText="Changes saved!" size="r-default" />
                                        </XVertical>
                                    </XVertical>
                                </XForm>
                            </XVertical>
                        )}
                    </Query>
                    <XVertical separator={18}>
                        <XWithRole role="super-admin">
                            <HeadTitle>Super admin</HeadTitle>
                            <XHorizontal separator={8}>
                                {props.data.profile && props.data.profile.joinedAt && (
                                    <CardText>
                                        <span>Joined <span className="bold">{DateFormater(props.data.profile.joinedAt)}</span></span>
                                    </CardText>
                                )}
                                {props.data.profile && (
                                    <CardText>
                                        {!props.data.profile.invitedBy && <span>Self-registered</span>}
                                        {props.data.profile.invitedBy && <span>Invited by <span className="bold person">{(props.data.profile.invitedBy.name || 'John Doe')}</span></span>}

                                    </CardText>
                                )}
                            </XHorizontal>
                        </XWithRole>
                    </XVertical>
                </XVertical>
            </Content>
        </Navigation>
    );
})));