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
import { XModalController } from 'openland-x/showModal';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XView } from 'react-mental';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { InputField } from 'openland-web/components/InputField';
import { XErrorMessage } from 'openland-x/XErrorMessage';
import { XModalFooterButton } from 'openland-web/components/XModalFooterButton';
import { XModalContent } from 'openland-web/components/XModalContent';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XCheckbox } from 'openland-x/XCheckbox';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XText } from 'openland-x/XText';
import { showModalBox } from 'openland-x/showModalBox';
import { XInputBasic } from 'openland-x/basics/XInputBasic';
import { XLoader } from 'openland-x/XLoader';

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

                await client.refetchOrganization({ organizationId });
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

export const LeaveOrganizationModal = ({
    organizationId,
    hide,
}: {
    organizationId: string;
    hide: () => void;
}) => {
    const client = useClient();

    let router = React.useContext(XRouterContext)!;

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
        <XView borderRadius={8}>
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    Are you sure you want to leave? You will lose access to all internal chats at{' '}
                    {data.organizationProfile.name}. You can only join{' '}
                    {data.organizationProfile.name} by invitation in the future.
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Remove"
                    style="danger"
                    size="large"
                    onClick={async () => {
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
                />
            </XModalFooter>
        </XView>
    );
};

export const showLeaveOrganizationModal = (organizationId: string) =>
    showModalBox(
        {
            title: `Leave organization`,
        },
        ctx => {
            return <LeaveOrganizationModal organizationId={organizationId} hide={ctx.hide} />;
        },
    );

export const RemoveOrganizationModal = ({
    organizationId,
    hide,
}: {
    organizationId: string;
    hide: () => void;
}) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
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
        <XView borderRadius={8}>
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    Are you sure you want to delete {data.organizationProfile.name}? This cannot be
                    undone.
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" onClick={hide} />
                </XView>

                <XButton
                    text="Delete organization"
                    style="danger"
                    action={async () => {
                        await client.mutateDeleteOrganization({
                            organizationId: data.organizationProfile.id,
                        });

                        await client.refetchMyOrganizations();
                        await client.refetchAccount();

                        // hack to navigate after modal closing navigation
                        setTimeout(() => {
                            router!.push('/');
                        });

                        hide();
                    }}
                />
            </XModalFooter>
        </XView>
    );
};

export const showDeleteOrganizationModal = ({
    orgName,
    organizationId,
}: {
    orgName: string;
    organizationId: string;
}) =>
    showModalBox(
        {
            title: `Delete ${orgName}`,
        },
        ctx => {
            return <RemoveOrganizationModal organizationId={organizationId} hide={ctx.hide} />;
        },
    );

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

export const WebsitePlaceholder = ({
    organizationId,
    hide,
}: {
    organizationId: string;
    hide: () => void;
}) => {
    const client = useClient();
    const data = client.useOrganizationProfile({ organizationId });
    const org = data.organizationProfile;

    const form = useForm();
    const websiteField = useField('input.website', org.website || '', form);

    const save = () =>
        form.doAction(async () => {
            await client.mutateUpdateOrganization({
                organizationId,
                input: {
                    website: websiteField.value,
                },
            });

            await client.refetchOrganization({ organizationId });

            hide();
        });

    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XVertical flexGrow={1} separator={8}>
                    <XInput
                        placeholder={TextOrganizationProfile.placeholderSocialModalWeb}
                        {...websiteField.input}
                        size="large"
                    />
                </XVertical>
            </XModalContent>
            <XModalFooter>
                <XView marginRight={12}>
                    <XButton text="Cancel" style="ghost" size="large" onClick={hide} />
                </XView>
                <XButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={save}
                    loading={form.loading}
                />
            </XModalFooter>
        </XView>
    );
};

export const showWebsitePlaceholderModal = (organizationId: string) => {
    showModalBox(
        {
            title: TextOrganizationProfile.placeholderSocialModalTitle,
        },
        ctx => {
            return <WebsitePlaceholder organizationId={organizationId} hide={ctx.hide} />;
        },
    );
};

export const MakeFeaturedModal = (props: {
    ctx: XModalController;
    roomId: string;
    userId: string;
}) => {
    const { ctx, roomId, userId } = props;
    const client = useClient();
    const form = useForm();
    const userBadge = client.useSuperBadgeInRoom(
        { roomId, userId },
        { fetchPolicy: 'cache-and-network' },
    ).superBadgeInRoom;
    const [featured, setFeatured] = React.useState<boolean>(!!userBadge);
    const descriptionField = useField('input.description', userBadge ? userBadge.name : '', form, [
        {
            checkIsValid: value => value.trim().length > 0,
            text: "Description can't be empty",
        },
        {
            checkIsValid: value => value.trim().length <= 40,
            text: 'Max length: 40 characters',
        },
    ]);

    const onSave = () => {
        form.doAction(async () => {
            if (featured) {
                await client.mutateSuperBadgeCreateToRoom({
                    name: descriptionField.value,
                    userId,
                    roomId,
                });
            } else {
                if (userBadge) {
                    await client.mutateSuperBadgeUnsetToRoom({
                        userId,
                        roomId,
                        badgeId: userBadge.id,
                    });
                }
            }

            ctx.hide();
        });
    };

    return (
        <>
            {form.error && <XErrorMessage message={form.error} />}
            <XView flexDirection="column" borderRadius={8} overflow="hidden">
                <XModalContent>
                    <XCheckbox
                        label={featured ? 'Featured' : 'Not featured'}
                        checked={featured}
                        onChange={() => setFeatured(!featured)}
                        switcher={true}
                    />
                    {featured && (
                        <XView marginTop={20}>
                            <InputField
                                title="Description"
                                field={descriptionField}
                                setFocusOnError
                                maxLength={40}
                            />
                        </XView>
                    )}
                </XModalContent>
                <XModalFooter>
                    <XModalFooterButton text="Cancel" style="ghost" onClick={() => ctx.hide()} />
                    <XModalFooterButton text="Save" style="primary" onClick={onSave} />
                </XModalFooter>
            </XView>
        </>
    );
};
