import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XSelect } from 'openland-x/XSelect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { Navigation } from './_navigation';
import { XForm } from 'openland-x-forms/XForm2';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XContent } from 'openland-x-layout/XContent';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { DateFormater } from 'openland-x-format/XDate';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { OrgCategoties } from '../directory/categoryPicker';
import { Cities, MetropolitanAreas, States, MultiStateRegions } from '../directory/locationPicker';
import { TextDirectoryData } from 'openland-text/TextDirectory';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withSuperAccountActions } from '../../../api/withSuperAccountActions';
import { XSelectCustomInputRender } from 'openland-x/basics/XSelectCustom';
import { MembersTable } from './membersTable';

const Content = Glamorous(XContent)({
    paddingTop: 20
});

const CategoryTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: '#1f3449'
});

let shiftArray = (array: any[]) => {
    let res = [...array];
    res.shift();
    return res;
};

const SACreatedBlock = Glamorous.div({
    padding: 16,
    borderRadius: 10,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    alignSelf: 'flex-start'
});

const SACreatedText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#334562',
    '& .bold': {
        fontWeight: 600
    },
    '& .author': {
        color: '#1790ff'
    }
});

const AdminTools = withSuperAccountActions(props => {
    return (
        <XVertical separator={12}>
            <SACreatedBlock>
                <SACreatedText>
                    <span>Created </span>
                    <span className="bold">{props.data.superAccount.createdAt ? DateFormater(props.data.superAccount.createdAt) : 'once'} </span>
                    <span>by </span>
                    <span className="bold author">{props.data.superAccount.createdBy ? props.data.superAccount.createdBy.name : 'John Doe'}</span>
                </SACreatedText>
            </SACreatedBlock>
            <XForm
                defaultData={{
                    input: {
                        activated: props.data && props.data.superAccount.state,
                        published: (props as any).published ? 'published' : 'unpublished',
                        editorial: (props as any).editorial ? 'editorial' : 'noneditorial',
                        featured: (props as any).featured ? 'featured' : 'nonfeatured',
                    }
                }}
                defaultAction={async (data) => {
                    await (props as any).updateOrganizatonMutations({
                        variables: {
                            input: {
                                alphaPublished: data.input.published === 'published',
                                alphaEditorial: data.input.editorial === 'editorial',
                                alphaFeatured: data.input.featured === 'featured',
                            }
                        }
                    });

                    if (data.input.activated === 'ACTIVATED') {
                        props.activate({ variables: { accountId: props.data.superAccount.id } });
                    } else {
                        props.pend({ variables: { accountId: props.data.superAccount.id } });
                    }
                }}
                defaultLayout={false}
            >

                <XVertical separator={4}>
                    <XFormLoadingContent>
                        <XCheckbox label="Activated" trueValue="ACTIVATED" falseValue="PENDING" field="input.activated" />
                        <XCheckbox label="Published" trueValue="published" falseValue="unpublished" field="input.published" />
                        <XCheckbox label="Editorial" trueValue="editorial" falseValue="noneditorial" field="input.editorial" />
                        <XCheckbox label="Featured" trueValue="featured" falseValue="nonfeatured" field="input.featured" />
                    </XFormLoadingContent>
                    <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary-sky-blue" succesText="Changes saved!" size="r-default" />
                </XVertical>
            </XForm>
        </XVertical>
    );
}) as React.ComponentType<{ updateOrganizatonMutations: any, published: boolean, editorial: boolean, featured: boolean, variables: { accountId: string, viaOrgId: true } }>;

const Separator = Glamorous.div({
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(220, 222, 228, 0.45)',
    marginTop: '24px !important',
    marginBottom: '24px !important',
});

export const OrganizationSettigs = ((props: any) => {
    return (
        <Navigation title="Organization profile">
            <Content>
                <XVertical alignSelf="stretch" separator={30}>
                    <XVertical separator={12}>
                        <CategoryTitle id="general">General</CategoryTitle>
                        <XForm
                            defaultData={{

                                input: {
                                    name: props.data.organizationProfile!!.name,
                                    photo: props.data.organizationProfile!!.photoRef,
                                    primaryLocation: [(props.data.organizationProfile!!.locations || [])[0]].filter(l => !!(l)),
                                    locations: shiftArray(props.data.organizationProfile!!.locations || []),
                                    photoRef: sanitizeIamgeRef(props.data.organizationProfile!!.photoRef),
                                    organizationType: props.data.organizationProfile!!.organizationType,
                                    interests: props.data.organizationProfile!!.interests,
                                    published: props.data.organizationProfile!!.published ? 'published' : 'unpublished',
                                    editorial: props.data.organizationProfile!!.editorial ? 'editorial' : 'noneditorial',
                                }
                            }}
                            defaultAction={async (data) => {
                                // console.warn(data);
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            name: data.input.name,
                                            photoRef: data.input.photoRef,
                                            alphaOrganizationType: data.input.organizationType,
                                            alphaInterests: data.input.interests,
                                            alphaLocations: [...(data.input.primaryLocation || []), ...(data.input.locations || [])],
                                            alphaPublished: data.input.published === 'published',
                                            alphaEditorial: data.input.editorial === 'editorial',
                                        }
                                    }
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XVertical separator={12}>
                                <XFormLoadingContent>
                                    <XHorizontal separator={12}>
                                        <XVertical flexGrow={1} maxWidth={480}>
                                            <XInput field="input.name" size="r-default" color="primary-sky-blue" placeholder="Organization name" />
                                            <Separator />
                                            <XSelect
                                                creatable={true}
                                                multi={true}
                                                field="input.primaryLocation"
                                                options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))}
                                                render={
                                                    <XSelectCustomInputRender
                                                        popper={true}
                                                        placeholder="Primary location"
                                                        rounded={true}
                                                    />
                                                }
                                            />
                                            <XSelect
                                                creatable={true}
                                                multi={true}
                                                field="input.locations"
                                                options={[...Cities, ...MetropolitanAreas, ...States, ...MultiStateRegions].map(e => ({ label: e, value: e }))}
                                                render={
                                                    <XSelectCustomInputRender
                                                        popper={true}
                                                        placeholder="More locations"
                                                        rounded={true}
                                                    />
                                                }
                                            />
                                            <XSelect
                                                options={OrgCategoties}
                                                multi={true}
                                                field="input.organizationType"
                                                render={
                                                    <XSelectCustomInputRender
                                                        popper={true}
                                                        placeholder="Categories"
                                                        rounded={true}
                                                    />
                                                }
                                            />
                                            <XSelect
                                                large={true}
                                                creatable={true}
                                                multi={true}
                                                field="input.interests"
                                                options={TextDirectoryData.interestPicker}
                                                render={
                                                    <XSelectCustomInputRender
                                                        popper={true}
                                                        placeholder="Interests"
                                                        rounded={true}
                                                    />
                                                }
                                            />

                                        </XVertical>
                                        <XAvatarUpload cropParams="1:1, free" field="input.photoRef" />
                                    </XHorizontal>
                                </XFormLoadingContent>
                                <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary-sky-blue" succesText="Changes saved!" size="r-default" />
                            </XVertical>
                        </XForm>
                    </XVertical>

                    <XVertical separator={12}>
                        <CategoryTitle id="links">Links</CategoryTitle>
                        <XForm
                            defaultData={{
                                input: {
                                    website: props.data.organizationProfile!!.website,
                                    twitter: props.data.organizationProfile!!.twitter,
                                    facebook: props.data.organizationProfile!!.facebook,
                                    linkedin: props.data.organizationProfile!!.linkedin,
                                }
                            }}
                            defaultAction={async (data) => {
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            website: data.input.website,
                                            twitter: data.input.twitter,
                                            facebook: data.input.facebook,
                                            linkedin: data.input.linkedin,
                                        }
                                    }
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XVertical separator={12}>
                                <XFormLoadingContent>
                                    <XVertical flexGrow={1} maxWidth={480}>
                                        <XInputGroup>
                                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialInputPlaceholder} field="input.website" size="r-default" color="primary-sky-blue" />
                                            <XInput flexGrow={1} placeholder={TextOrganizationProfile.placeholderSocialLinkTitlePlaceholder} field="input.websiteTitle" size="r-default" color="primary-sky-blue" />
                                        </XInputGroup>
                                        <XInput field="input.twitter" placeholder="Twitter" size="r-default" color="primary-sky-blue" />
                                        <XInput field="input.facebook" placeholder="Facebook" size="r-default" color="primary-sky-blue" />
                                        <XInput field="input.linkedin" placeholder="LinkedIn" size="r-default" color="primary-sky-blue" />
                                    </XVertical>
                                </XFormLoadingContent>
                                <XFormSubmit text="Save changes" alignSelf="flex-start" style="primary-sky-blue" succesText="Changes saved!" size="r-default" />
                            </XVertical>
                        </XForm>
                    </XVertical>

                    {!props.hideMembers && (
                        <XVertical separator={12}>
                            <CategoryTitle id="members">Members</CategoryTitle>
                            <MembersTable/>
                        </XVertical>
                    )}

                    {/* SUPER ADMIN */}
                    <XWithRole role={['super-admin', 'editor']}>
                        <XVertical separator={36}>
                            <XVertical separator={12}>
                                <CategoryTitle id="super-admin">Super admin</CategoryTitle>
                                <AdminTools
                                    variables={{ accountId: props.data.organizationProfile!!.id, viaOrgId: true }}
                                    updateOrganizatonMutations={props.updateOrganizaton}
                                    published={props.data.organizationProfile!!.published}
                                    editorial={props.data.organizationProfile!!.editorial}
                                    featured={props.data.organizationProfile!!.featured}
                                />
                            </XVertical>
                        </XVertical>
                    </XWithRole>
                </XVertical>
            </Content>
        </Navigation >
    );
}) as React.ComponentType<XWithRouter & { updateOrganizaton: any, data: { organizationProfile: any }, orgId?: string, hideMembers?: boolean }>;
