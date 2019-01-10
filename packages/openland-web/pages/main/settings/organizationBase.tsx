import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { Navigation } from './_navigation';
import { XForm } from 'openland-x-forms/XForm2';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XContent } from 'openland-x-layout/XContent';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withSuperAccountActions } from '../../../api/withSuperAccountActions';
import { DateFormater } from 'openland-x/XDate';
import { XFormError } from 'openland-x-forms/XFormError';

const Content = Glamorous(XContent)({
    paddingTop: 20,
    flexGrow: 1,
});

const CategoryTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: '#1f3449',
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
    alignSelf: 'flex-start',
});

const SACreatedText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.43,
    letterSpacing: -0.2,
    color: '#334562',
    '& .bold': {
        fontWeight: 600,
    },
    '& .author': {
        color: '#1790ff',
    },
});

const AdminTools = withSuperAccountActions(props => {
    if (!(props.data && props.data.superAccount)) {
        return null;
    }
    return (
        <XVertical separator={12}>
            <SACreatedBlock>
                <SACreatedText>
                    <span>Created </span>
                    <span className="bold">
                        {props.data.superAccount.createdAt
                            ? DateFormater(props.data.superAccount.createdAt)
                            : 'once'}{' '}
                    </span>
                    <span>by </span>
                    <span className="bold author">
                        {props.data.superAccount.createdBy
                            ? props.data.superAccount.createdBy.name
                            : 'First name Last name'}
                    </span>
                </SACreatedText>
            </SACreatedBlock>
            <XForm
                defaultData={{
                    input: {
                        activated: props.data && props.data.superAccount.state,
                        published: (props as any).published ? 'published' : 'unpublished',
                        editorial: (props as any).editorial ? 'editorial' : 'noneditorial',
                        featured: (props as any).featured ? 'featured' : 'nonfeatured',
                    },
                }}
                defaultAction={async data => {
                    await (props as any).updateOrganizatonMutations({
                        variables: {
                            input: {
                                alphaPublished: data.input.published === 'published',
                                alphaEditorial: data.input.editorial === 'editorial',
                                alphaFeatured: data.input.featured === 'featured',
                            },
                        },
                    });

                    if (data.input.activated === 'ACTIVATED') {
                        props.activate({
                            variables: {
                                accountId: props.data.superAccount.id,
                            },
                        });
                    } else {
                        props.pend({
                            variables: {
                                accountId: props.data.superAccount.id,
                            },
                        });
                    }
                }}
                defaultLayout={false}
            >
                <XVertical separator={4}>
                    <XFormLoadingContent>
                        <XCheckbox
                            label="Activated"
                            trueValue="ACTIVATED"
                            falseValue="PENDING"
                            field="input.activated"
                        />
                        <XCheckbox
                            label="Published"
                            trueValue="published"
                            falseValue="unpublished"
                            field="input.published"
                        />
                        <XCheckbox
                            label="Editorial"
                            trueValue="editorial"
                            falseValue="noneditorial"
                            field="input.editorial"
                        />
                        <XCheckbox
                            label="Featured"
                            trueValue="featured"
                            falseValue="nonfeatured"
                            field="input.featured"
                        />
                    </XFormLoadingContent>
                    <XFormSubmit
                        text="Save changes"
                        alignSelf="flex-start"
                        style="primary"
                        succesText="Changes saved!"
                    />
                </XVertical>
            </XForm>
        </XVertical>
    );
}) as React.ComponentType<{
    updateOrganizatonMutations: any;
    published: boolean;
    editorial: boolean;
    featured: boolean;
    variables: { accountId: string; viaOrgId: true };
}>;

const Separator = Glamorous.div({
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(220, 222, 228, 0.45)',
    marginTop: '24px !important',
    marginBottom: '24px !important',
});

export const OrganizationSettings = ((props: any) => {
    return (
        <Navigation title="Organization profile">
            <Content>
                <XVertical alignSelf="stretch" separator={30}>
                    <XVertical separator={12}>
                        <CategoryTitle id="general">General</CategoryTitle>
                        <XForm
                            defaultData={{
                                input: {
                                    name: props.data.organizationProfile.name,
                                    about: props.data.organizationProfile.about,
                                    photo: props.data.organizationProfile.photoRef,
                                    photoRef: sanitizeIamgeRef(
                                        props.data.organizationProfile.photoRef,
                                    ),
                                    published: props.data.organizationProfile.published
                                        ? 'published'
                                        : 'unpublished',
                                    editorial: props.data.organizationProfile.editorial
                                        ? 'editorial'
                                        : 'noneditorial',

                                    website: props.data.organizationProfile.website,
                                    twitter: props.data.organizationProfile.twitter,
                                    facebook: props.data.organizationProfile.facebook,
                                    linkedin: props.data.organizationProfile.linkedin,
                                },
                            }}
                            defaultAction={async data => {
                                await props.updateOrganizaton({
                                    variables: {
                                        input: {
                                            name: data.input.name,
                                            about: data.input.about,
                                            photoRef: data.input.photoRef,
                                            alphaPublished: data.input.published === 'published',
                                            alphaEditorial: data.input.editorial === 'editorial',
                                            website: data.input.website,
                                            twitter: data.input.twitter,
                                            facebook: data.input.facebook,
                                            linkedin: data.input.linkedin,
                                        },
                                    },
                                });
                            }}
                            defaultLayout={false}
                        >
                            <XVertical separator={12} maxWidth={660}>
                                <XFormLoadingContent>
                                    <XHorizontal separator={12}>
                                        <XVertical flexGrow={1} maxWidth={480}>
                                            <XInput
                                                field="input.name"
                                                size="large"
                                                title="Organization name"
                                            />
                                            <XInput
                                                field="input.about"
                                                size="large"
                                                title="About"
                                            />
                                            <XInput
                                                flexGrow={1}
                                                title={
                                                    TextOrganizationProfile.placeholderSocialInputPlaceholder
                                                }
                                                field="input.website"
                                                size="large"
                                            />
                                            <XInput
                                                field="input.twitter"
                                                title="Twitter"
                                                size="large"
                                            />
                                            <XInput
                                                field="input.facebook"
                                                title="Facebook"
                                                size="large"
                                            />
                                            <XInput
                                                field="input.linkedin"
                                                title="LinkedIn"
                                                size="large"
                                            />
                                        </XVertical>
                                        <XAvatarUpload
                                            cropParams="1:1, free"
                                            field="input.photoRef"
                                        />
                                    </XHorizontal>
                                </XFormLoadingContent>
                                <XFormSubmit
                                    text="Save changes"
                                    alignSelf="flex-start"
                                    style="primary"
                                    succesText="Changes saved!"
                                />
                            </XVertical>
                        </XForm>
                        <XForm
                            defaultData={{
                                shortname: props.data.organizationProfile.shortname,
                            }}
                            defaultAction={async data => {
                                await props.setShortname({
                                    variables: { shortname: data.shortname },
                                });
                            }}
                        >
                            <XVertical separator={12}>
                                <CategoryTitle>Organization shortname</CategoryTitle>
                                <XFormError onlyGeneralErrors={true} />
                                <XVertical width={480} separator={12}>
                                    <XFormLoadingContent>
                                        <XVertical separator={10}>
                                            <XInput
                                                field="shortname"
                                                size="large"
                                                title="Shortname"
                                            />
                                        </XVertical>
                                    </XFormLoadingContent>
                                    <XFormSubmit
                                        text="Save changes"
                                        alignSelf="flex-start"
                                        style="primary"
                                        succesText="Changes saved!"
                                    />
                                </XVertical>
                            </XVertical>
                        </XForm>
                    </XVertical>

                    {/* SUPER ADMIN */}
                    <XWithRole role={['super-admin', 'editor']}>
                        <XVertical separator={36}>
                            <XVertical separator={12}>
                                <CategoryTitle id="super-admin">Super admin</CategoryTitle>
                                <AdminTools
                                    variables={{
                                        accountId: props.data.organizationProfile!!.id,
                                        viaOrgId: true,
                                    }}
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
        </Navigation>
    );
}) as React.ComponentType<
    XWithRouter & {
        updateOrganizaton: any;
        setShortname: any;
        data: { organizationProfile: any };
        orgId?: string;
        hideMembers?: boolean;
    }
>;
