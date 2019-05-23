import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { XInput } from 'openland-x/XInput';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

export const AboutPlaceholder = (props: { target?: any }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const organizationId = router.routeQuery.organizationId;
    const data = client.useWithoutLoaderOrganizationProfile({ organizationId });

    if (!(data && data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            defaultData={{
                input: {
                    about: data.organizationProfile!!.about,
                },
            }}
            defaultAction={async submitData => {
                await client.mutateUpdateOrganization({
                    organizationId: organizationId,
                    input: {
                        about: submitData.input.about,
                    },
                });
            }}
            target={props.target || <XButton text="About" iconRight="add" />}
            title={TextOrganizationProfile.placeholderAboutModalAboutTitle}
            useTopCloser={true}
        >
            <XVertical>
                <XFormLoadingContent>
                    <XFormField field="fields.input.about">
                        <XTextArea valueStoreKey="fields.input.about" placeholder="Description" />
                    </XFormField>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
    );
};

export const LeaveOrganizationModal = () => {
    const client = useClient();

    let router = React.useContext(XRouterContext)!;
    const organizationId = router.routeQuery.organizationId;

    const data = client.useWithoutLoaderOrganizationProfile({ organizationId });

    let ctx = React.useContext(UserInfoContext);
    if (!(data && data.organizationProfile && !!ctx)) {
        return null;
    }
    const { user } = ctx;

    if (!user) {
        return null;
    }

    return (
        <XModalForm
            submitProps={{
                text: 'Leave organization',
                style: 'danger',
            }}
            title={`Leave ${data.organizationProfile.name}`}
            defaultData={{}}
            defaultAction={async () => {
                await client.mutateOrganizationMemberRemove({
                    userId: user.id,
                    organizationId: data.organizationProfile.id,
                });

                await client.refetchMyOrganizations();
                await client.refetchAccount();

                // hack to navigate after modal closing navigation
                setTimeout(() => {
                    router!.push('/');
                });
            }}
            targetQuery={'leaveOrganization'}
            submitBtnText="Yes, I am sure"
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    Are you sure you want to leave? You will lose access to all internal chats at{' '}
                    {data.organizationProfile.name}. You can only join{' '}
                    {data.organizationProfile.name} by invitation in the future.
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>
    );
};

export const RemoveOrganizationModal = () => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const organizationId = router.routeQuery.organizationId;

    const data = client.useWithoutLoaderOrganizationProfile({ organizationId });

    if (!(data && data.organizationProfile)) {
        return null;
    }

    return (
        <XModalForm
            submitProps={{
                text: 'Delete organization',
                style: 'danger',
            }}
            title={`Delete ${data.organizationProfile.name}`}
            defaultData={{}}
            defaultAction={async () => {
                await client.mutateDeleteOrganization({
                    organizationId: data.organizationProfile.id,
                });

                await client.refetchMyOrganizations();
                await client.refetchAccount();

                // hack to navigate after modal closing navigation
                setTimeout(() => {
                    router!.push('/');
                });
            }}
            targetQuery={'deleteOrganization'}
            submitBtnText="Yes, I am sure"
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    Are you sure you want to delete {data.organizationProfile.name}? This cannot be
                    undone.
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>
    );
};

export const SocialPlaceholder = (props: { target?: any }) => {
    const client = useClient();

    let router = React.useContext(XRouterContext)!;
    const organizationId = router.routeQuery.organizationId;

    const data = client.useWithoutLoaderOrganizationProfile({ organizationId });

    if (!(data && data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title={TextOrganizationProfile.placeholderSocialModalTitle}
            useTopCloser={true}
            defaultData={{
                input: {
                    linkedin: data.organizationProfile!!.linkedin,
                    twitter: data.organizationProfile!!.twitter,
                    facebook: data.organizationProfile!!.facebook,
                },
            }}
            defaultAction={async submitData => {
                await client.mutateUpdateOrganization({
                    organizationId: organizationId,
                    input: {
                        linkedin: submitData.input.linkedin,
                        twitter: submitData.input.twitter,
                        facebook: submitData.input.facebook,
                    },
                });

                await client.refetchOrganization({ organizationId });
            }}
            target={props.target || <XButton text="Add social links" iconRight="add" />}
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    <XFormField field="input.linkedin">
                        <XInput
                            placeholder={TextOrganizationProfile.placeholderSocialModalLinkedIn}
                            field="input.linkedin"
                            size="large"
                        />
                    </XFormField>
                    <XFormField field="input.twitter">
                        <XInput
                            placeholder={TextOrganizationProfile.placeholderSocialModalTwitter}
                            field="input.twitter"
                            size="large"
                        />
                    </XFormField>
                    <XFormField field="input.facebook">
                        <XInput
                            placeholder={TextOrganizationProfile.placeholderSocialModalFacebook}
                            field="input.facebook"
                            size="large"
                        />
                    </XFormField>
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>
    );
};

export const WebsitePlaceholder = (props: { target?: any }) => {
    const client = useClient();

    let router = React.useContext(XRouterContext)!;
    const organizationId = router.routeQuery.organizationId;

    const data = client.useWithoutLoaderOrganizationProfile({ organizationId });

    if (!(data && data.organizationProfile)) {
        return null;
    }
    return (
        <XModalForm
            title={TextOrganizationProfile.placeholderSocialModalTitle}
            useTopCloser={true}
            defaultData={{
                input: {
                    website: data.organizationProfile!!.website,
                },
            }}
            defaultAction={async submitData => {
                await client.mutateUpdateOrganization({
                    organizationId: organizationId,
                    input: {
                        website: submitData.input.website,
                    },
                });

                await client.refetchOrganization({ organizationId });
            }}
            target={props.target || <XButton text="Add website" iconRight="add" />}
        >
            <XFormLoadingContent>
                <XVertical flexGrow={1} separator={8}>
                    <XFormField field="input.website">
                        <XInput
                            placeholder={TextOrganizationProfile.placeholderSocialModalWeb}
                            field="input.website"
                            size="large"
                        />
                    </XFormField>
                </XVertical>
            </XFormLoadingContent>
        </XModalForm>
    );
};
