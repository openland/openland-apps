import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XForm } from 'openland-x-forms/XForm2';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XCheckbox } from 'openland-x/XCheckbox';
import { DateFormater } from 'openland-x/XDate';
import { XFormError } from 'openland-x-forms/XFormError';
import { SettingsNavigation } from './SettingsNavigation';
import { Content, HeadTitle } from './SettingComponents';
import { useClient } from 'openland-web/utils/useClient';
import { XView } from 'react-mental';

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

type AdminToolsT = {
    updateOrganizatonMutations: any;
    published: boolean;
    editorial: boolean;
    featured: boolean;
    variables: { accountId: string; viaOrgId: true };
};

const AdminTools = (props: AdminToolsT) => {
    const client = useClient();

    const data = client.useWithoutLoaderSuperAccount(props.variables);

    if (!(data && data.superAccount)) {
        return null;
    }
    return (
        <XVertical separator={12}>
            <SACreatedBlock>
                <SACreatedText>
                    <span>Created </span>
                    <span className="bold">
                        {data.superAccount.createdAt
                            ? DateFormater(data.superAccount.createdAt)
                            : 'once'}{' '}
                    </span>
                    <span>by </span>
                    <span className="bold author">
                        {data.superAccount.createdBy
                            ? data.superAccount.createdBy.name
                            : 'First name Last name'}
                    </span>
                </SACreatedText>
            </SACreatedBlock>
            <XForm
                defaultData={{
                    input: {
                        activated: data && data.superAccount.state,
                        published: data.superAccount.published ? 'published' : 'unpublished',
                        editorial: props.editorial ? 'editorial' : 'noneditorial',
                        featured: props.featured ? 'featured' : 'nonfeatured',
                    },
                }}
                defaultAction={async submitData => {
                    await props.updateOrganizatonMutations({
                        variables: {
                            input: {
                                alphaPublished: submitData.input.published === 'published',
                                alphaEditorial: submitData.input.editorial === 'editorial',
                                alphaFeatured: submitData.input.featured === 'featured',
                            },
                        },
                    });

                    if (submitData.input.activated === 'ACTIVATED') {
                        await client.mutateSuperAccountActivate({
                            accountId: submitData.data.superAccount.id,
                        });
                    } else {
                        await client.mutateSuperAccountPend({
                            accountId: submitData.data.superAccount.id,
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
                        successText="Changes saved!"
                    />
                </XVertical>
            </XForm>
        </XVertical>
    );
};

const GeneralForm = ({
    data: { organizationProfile },
    updateOrganizaton,
}: OrganizationSettingsT) => {
    return (
        <XForm
            defaultData={{
                input: {
                    name: organizationProfile.name,
                    about: organizationProfile.about,
                    photo: organizationProfile.photoRef,
                    website: organizationProfile.website,
                    twitter: organizationProfile.twitter,
                    facebook: organizationProfile.facebook,
                    linkedin: organizationProfile.linkedin,
                    photoRef: sanitizeImageRef(organizationProfile.photoRef),
                    published: organizationProfile.published ? 'published' : 'unpublished',
                    editorial: organizationProfile.editorial ? 'editorial' : 'noneditorial',
                },
            }}
            defaultAction={async ({
                input: {
                    name,
                    about,
                    photoRef,
                    published,
                    editorial,
                    website,
                    twitter,
                    facebook,
                    linkedin,
                },
            }) => {
                await updateOrganizaton({
                    variables: {
                        input: {
                            name,
                            about,
                            photoRef,
                            website,
                            twitter,
                            facebook,
                            linkedin,
                            alphaPublished: published === 'published',
                            alphaEditorial: editorial === 'editorial',
                        },
                    },
                });
            }}
            defaultLayout={false}
        >
            <XVertical separator={12} maxWidth={660}>
                <HeadTitle>General</HeadTitle>
                <XFormLoadingContent>
                    <XHorizontal separator={12}>
                        <XVertical flexGrow={1} maxWidth={480}>
                            <XInput field="input.name" size="large" title="Organization name" />
                            <XInput field="input.about" size="large" title="About" />
                            <XInput
                                flexGrow={1}
                                title="Website"
                                field="input.website"
                                size="large"
                            />
                            <XInput field="input.twitter" title="Twitter" size="large" />
                            <XInput field="input.facebook" title="Facebook" size="large" />
                            <XInput field="input.linkedin" title="LinkedIn" size="large" />
                        </XVertical>
                        <XAvatarUpload cropParams="1:1, free" field="input.photoRef" />
                    </XHorizontal>
                </XFormLoadingContent>
                <XFormSubmit
                    text="Save changes"
                    alignSelf="flex-start"
                    style="primary"
                    successText="Changes saved!"
                />
            </XVertical>
        </XForm>
    );
};

const ShortNameForm = ({ data, setShortname }: OrganizationSettingsT) => {
    return (
        <XForm
            defaultData={{
                shortname: data.organizationProfile.shortname,
            }}
            defaultAction={async ({ shortname }) => {
                await setShortname({
                    variables: { shortname },
                });
            }}
            defaultLayout={false}
        >
            <XVertical separator={12}>
                <HeadTitle>Organization shortname</HeadTitle>
                <XFormError onlyGeneralErrors={true} />
                <XVertical width={480} separator={12}>
                    <XFormLoadingContent>
                        <XVertical separator={10}>
                            <XInput field="shortname" size="large" title="Shortname" />
                        </XVertical>
                    </XFormLoadingContent>
                    <XFormSubmit
                        text="Save changes"
                        alignSelf="flex-start"
                        style="primary"
                        successText="Changes saved!"
                    />
                </XVertical>
            </XVertical>
        </XForm>
    );
};

type OrganizationSettingsT = {
    updateOrganizaton: any;
    setShortname: any;
    data: { organizationProfile: any };
    orgId?: string;
    hideMembers?: boolean;
};

export const OrganizationSettings = ((props: OrganizationSettingsT) => {
    return (
        <SettingsNavigation title="Organization">
            <Content>
                <XVertical alignSelf="stretch" separator={30}>
                    <XView>
                        <GeneralForm {...props} />
                    </XView>

                    <XView marginTop={20}>
                        <ShortNameForm {...props} />
                    </XView>

                    {/* SUPER ADMIN */}
                    <XWithRole role={['super-admin', 'editor']}>
                        <XVertical separator={36}>
                            <XVertical separator={12}>
                                <HeadTitle>Super admin</HeadTitle>
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
        </SettingsNavigation>
    );
}) as React.ComponentType<XWithRouter & OrganizationSettingsT>;
