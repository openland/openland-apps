import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { OrganizationProfile_organizationProfile } from 'openland-api/spacex.types';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-api/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3, XScrollValues } from 'openland-x/XScrollView3';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { CheckComponent, UCheckboxFiled } from 'openland-web/components/unicorn/UCheckbox';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { TextBody, TextTitle3 } from 'openland-web/utils/TextStyles';
import { trackEvent } from 'openland-x-analytics';
import { useShortnameField } from 'openland-y-utils/form/useShortnameField';
import { XLoader } from 'openland-x/XLoader';
import IcUser from 'openland-icons/s/ic-invite-24.svg';
import IcAt from 'openland-icons/s/ic-at-24.svg';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import GroupIcon from 'openland-icons/s/ic-group-24.svg';

const modalSubtitle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 320px;
`;

interface ShortnameModalBodyProps {
    id: string;
    shortname: string;
    hide: () => void;
    isCommunity: boolean;
}

const ShortnameModalBody = React.memo((props: ShortnameModalBodyProps) => {
    const client = useClient();
    const form = useForm();
    const shortnameField = useShortnameField('input.shortname', props.shortname || '', form);
    const onSave = async () => {
        await form.doAction(async () => {
            await client.mutateSetOrgShortname({
                organizationId: props.id,
                shortname: shortnameField.value,
            });
            await Promise.all([
                client.refetchOrganization({ organizationId: props.id }),
                client.refetchOrganizationProfile({ organizationId: props.id }),
            ]);
            props.hide();
        });
    };
    return (
        <>
            <XModalContent>
                <div className={cx(modalSubtitle, TextBody)}>
                    {`Choose a shortname so other people can find and mention your ${
                        props.isCommunity ? 'community' : 'organization'
                    }`}
                </div>
                <UInputField
                    autofocus={true}
                    label="Shortname"
                    field={shortnameField}
                    remark={
                        form.error ? undefined : 'Only a-z, 0-9 and underscores, at least 3 chars'
                    }
                    errorText={form.error ? form.error : undefined}
                />
            </XModalContent>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={onSave}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
});

const showShortnameModal = (id: string, shortname: string, isCommunity: boolean) => {
    showModalBox(
        {
            width: 400,
            title: 'Shortname',
        },
        (ctx) => (
            <ShortnameModalBody
                id={id}
                shortname={shortname}
                hide={ctx.hide}
                isCommunity={isCommunity}
            />
        ),
    );
};

interface DefaultGroupsModalBodyProps {
    id: string;
    defaultGroups: string[];
    hide: () => void;
}

const DefaultGroupsModalBody = React.memo((props: DefaultGroupsModalBodyProps) => {
    const client = useClient();
    const initialGroups = client.useOrganizationPublicRooms(
        { organizationId: props.id, first: 10 },
        { fetchPolicy: 'network-only' },
    ).organizationPublicRooms;

    const [displayGroups, setDisplayGroups] = React.useState(initialGroups.items);
    const [groupsPrev, setGroupsPrev] = React.useState<string | null>(null);
    const [groupsAfter, setGroupsAfter] = React.useState(initialGroups.cursor);
    const [groupsLoading, setGroupsLoading] = React.useState(!!initialGroups.cursor);

    const [saveLoading, setSaveLoading] = React.useState(false);
    const [selectedGroups, setSelectedGroups] = React.useState<Set<string>>(
        new Set(props.defaultGroups),
    );

    const onSave = async () => {
        setSaveLoading(true);
        await client.mutateUpdateOrganization({
            organizationId: props.id,
            input: {
                autosubscribeRooms: !!selectedGroups.size ? Array.from(selectedGroups) : [],
            },
        });
        await Promise.all([
            client.refetchOrganization({ organizationId: props.id }),
            client.refetchOrganizationProfile({ organizationId: props.id }),
        ]);
        props.hide();
    };

    const onScroll = React.useCallback(async (e: XScrollValues) => {
        if (e.scrollHeight - (e.clientHeight + e.scrollTop) < 40) {
            if (groupsLoading && groupsAfter && groupsAfter !== groupsPrev) {
                setGroupsPrev(groupsAfter);
                const loaded = await client.queryOrganizationPublicRooms(
                    {
                        organizationId: props.id,
                        first: 10,
                        after: groupsAfter,
                    },
                    { fetchPolicy: 'network-only' },
                );
                const { items, cursor } = loaded.organizationPublicRooms;
                setGroupsAfter(cursor);
                setDisplayGroups((prev) => prev.concat(items));
                setGroupsLoading(!!cursor);
            }
        }
    }, [displayGroups, groupsPrev, groupsAfter, groupsLoading]);

    const onGroupClick = (id: string) => {
        let groups = new Set(selectedGroups);
        if (groups.has(id)) {
            groups.delete(id);
        } else {
            groups.add(id);
        }
        setSelectedGroups(groups);
    };

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true} onScroll={onScroll}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        Select groups that will be automatically joined by all new community members
                    </div>
                    <XView marginHorizontal={-24}>
                        {displayGroups.map((i) => (
                            <UListItem
                                key={i.id}
                                title={i.title}
                                avatar={{ photo: i.photo, title: i.title, id: i.id }}
                                onClick={() => onGroupClick(i.id)}
                                rightElement={
                                    <XView marginRight={8}>
                                        <CheckComponent
                                            squared={true}
                                            checked={selectedGroups.has(i.id)}
                                        />
                                    </XView>
                                }
                            />
                        ))}
                        {groupsLoading && (
                            <XView height={40}>
                                <XLoader loading={true}/>
                            </XView>
                        )}
                    </XView>
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={onSave}
                    loading={saveLoading}
                />
            </XModalFooter>
        </>
    );
});

const showDefaultGroupsModal = (id: string, defaultGroups: string[]) => {
    showModalBox(
        {
            width: 400,
            title: 'Default groups',
        },
        (ctx) => <DefaultGroupsModalBody id={id} defaultGroups={defaultGroups} hide={ctx.hide} />,
    );
};

interface ApplyLinkModalBodyProps {
    id: string;
    applyLink: string | null;
    applyLinkEnabled: boolean;
    hide: () => void;
}

const ApplyLinkModalBody = React.memo((props: ApplyLinkModalBodyProps) => {
    const client = useClient();
    const form = useForm();
    const applyLinkEnabledField = useField('input.applyLinkEnabled', props.applyLinkEnabled, form);
    const applyLinkField = useField('input.applyLink', props.applyLink || '', form);

    const onSave = async () => {
        await form.doAction(async () => {
            await client.mutateUpdateOrganization({
                organizationId: props.id,
                input: {
                    applyLink: applyLinkField.value,
                    applyLinkEnabled: applyLinkEnabledField.value,
                },
            });
            await Promise.all([
                client.refetchOrganization({ organizationId: props.id }),
                client.refetchOrganizationProfile({ organizationId: props.id }),
            ]);
            props.hide();
        });
    };

    return (
        <>
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>
                        A link to application form or info
                    </div>
                    <XView marginHorizontal={-24} marginBottom={16}>
                        <UCheckboxFiled
                            withCorners={true}
                            field={applyLinkEnabledField}
                            asSwitcher={true}
                            label="Use apply link"
                            disableHorizontalPadding={true}
                            paddingHorizontal={24}
                        />
                    </XView>
                    <UInputField field={applyLinkField} label="Apply link" />
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={onSave}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
});

const showApplyLinkModal = (id: string, applyLink: string | null, applyLinkEnabled: boolean) => {
    showModalBox(
        {
            width: 400,
            title: 'Apply link',
        },
        (ctx) => (
            <ApplyLinkModalBody
                id={id}
                applyLink={applyLink}
                applyLinkEnabled={applyLinkEnabled}
                hide={ctx.hide}
            />
        ),
    );
};

const formTitle = css`
    height: 48px;
    padding-top: 12px;
    padding-bottom: 12px;
    color: var(--foregroundPrimary);
`;

enum CommunityType {
    COMMUNITY_PUBLIC = 'COMMUNITY_PUBLIC',
    COMMUNITY_PRIVATE = 'COMMUNITY_PRIVATE',
}

interface EditCommunityModalBodyProps {
    data: OrganizationProfile_organizationProfile;
    id: string;
    onClose: () => void;
    isCommunity: boolean;
    isOwner: boolean;
}

const EditCommunityModalBody = React.memo((props: EditCommunityModalBodyProps) => {
    const {
        name,
        photoRef,
        shortname,
        about,
        website,
        twitter,
        facebook,
        linkedin,
        instagram,
        membersCanInvite,
        applyLink,
        applyLinkEnabled,
        autosubscribeRooms,
    } = props.data;
    const id = props.id;
    const isPrivate = props.data.private;
    const client = useClient();

    const form = useForm();
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.photoRef',
        photoRef ? { uuid: photoRef.uuid, crop: photoRef.crop } : null,
        form,
    );
    const nameField = useField('input.name', name, form, [
        {
            checkIsValid: (value) => !!value.trim(),
            text: 'Please enter a name',
        },
    ]);
    const aboutField = useField('input.about', about || '', form);
    const websiteField = useField('input.website', website || '', form);
    const twitterField = useField('input.twitter', twitter || '', form);
    const facebookField = useField('input.facebook', facebook || '', form);
    const linkedinField = useField('input.linkedin', linkedin || '', form);
    const instagramField = useField('input.instagram', instagram || '', form);
    const membersCanInviteField = useField('input.membersCanInvite', membersCanInvite, form);
    const typeField = useField<CommunityType>(
        'input.type',
        isPrivate ? CommunityType.COMMUNITY_PRIVATE : CommunityType.COMMUNITY_PUBLIC,
        form,
    );

    const doConfirm = () => {
        form.doAction(async () => {
            const variables = {
                input: {
                    name: nameField.value.trim(),
                    about: aboutField.value,
                    website: websiteField.value,
                    twitter: twitterField.value,
                    facebook: facebookField.value,
                    linkedin: linkedinField.value,
                    instagram: instagramField.value,
                    photoRef: sanitizeImageRef(avatarField.value),
                    alphaIsPrivate: typeField.value === CommunityType.COMMUNITY_PRIVATE,
                    betaMembersCanInvite: membersCanInviteField.value,
                },
                organizationId: id,
            };
            await client.mutateUpdateOrganization(variables);
            await Promise.all([
                client.refetchOrganization({ organizationId: id }),
                client.refetchOrganizationProfile({ organizationId: id }),
            ]);
            props.onClose();
        });
    };

    return (
        <>
            <XScrollView3 flexShrink={1} flexGrow={1} useDefaultScroll={true}>
                <XModalContent>
                    <XView alignSelf="center" marginTop={12}>
                        <UAvatarUploadField field={avatarField} />
                    </XView>
                    <div className={cx(formTitle, TextTitle3)}>Info</div>
                    <UInputField field={nameField} label="Community name" />
                    <XView marginTop={16}>
                        <USelectField
                            field={typeField}
                            label="Community type"
                            useMenuPortal={true}
                            disabled={!props.isOwner}
                            hideSelector={!props.isOwner}
                            options={[
                                {
                                    value: CommunityType.COMMUNITY_PUBLIC,
                                    label: `Public community`,
                                    labelShort: 'Public',
                                    subtitle: `Anyone can find and join this community`,
                                },
                                {
                                    value: CommunityType.COMMUNITY_PRIVATE,
                                    label: `Private community`,
                                    labelShort: 'Private',
                                    subtitle: `Only invited people can join community and view chats`,
                                },
                            ]}
                        />
                    </XView>
                    <UTextAreaField
                        field={aboutField}
                        placeholder="Description"
                        marginVertical={16}
                        autoResize={true}
                    />
                    <div className={cx(formTitle, TextTitle3)}>Contacts</div>
                    <UInputField field={websiteField} label="Website" marginBottom={16} />
                    <UInputField field={instagramField} label="Instagram" marginBottom={16} />
                    <UInputField field={twitterField} label="Twitter" marginBottom={16} />
                    <UInputField field={facebookField} label="Facebook" marginBottom={16} />
                    <UInputField field={linkedinField} label="LinkedIn" marginBottom={16} />
                    <div className={cx(formTitle, TextTitle3)}>Settings</div>
                    <XView marginHorizontal={-24}>
                        <UListItem
                            title="Shortname"
                            icon={<IcAt />}
                            paddingHorizontal={24}
                            onClick={() =>
                                showShortnameModal(id, shortname || '', props.isCommunity)
                            }
                            textRight={shortname || 'None'}
                        />
                        {isPrivate && (
                            <UCheckboxFiled
                                withCorners={true}
                                field={membersCanInviteField}
                                asSwitcher={true}
                                label="Members can use invite links"
                                disableHorizontalPadding={true}
                                paddingHorizontal={24}
                                icon={<IcUser />}
                            />
                        )}
                        <UListItem
                            title="Default groups"
                            icon={<GroupIcon />}
                            paddingHorizontal={24}
                            onClick={() => showDefaultGroupsModal(id, autosubscribeRooms)}
                            textRight={
                                autosubscribeRooms.length > 0
                                    ? String(autosubscribeRooms.length)
                                    : 'None'
                            }
                        />
                        {isPrivate && (
                            <UListItem
                                title="Apply link"
                                icon={<LinkIcon />}
                                paddingHorizontal={24}
                                onClick={() => showApplyLinkModal(id, applyLink, applyLinkEnabled)}
                                textRight={applyLinkEnabled ? 'On' : 'Off'}
                            />
                        )}
                    </XView>
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={() => props.onClose()}
                />
                <UButton
                    text="Save"
                    style="primary"
                    size="large"
                    onClick={doConfirm}
                    loading={form.loading}
                />
            </XModalFooter>
        </>
    );
});

interface EditCommunityModalProps {
    id: string;
    onClose: () => void;
    isCommunity: boolean;
    isOwner: boolean;
}

const EditCommunityModal = (props: EditCommunityModalProps) => {
    const client = useClient();
    const data = client.useOrganizationProfile({ organizationId: props.id }).organizationProfile;

    return (
        <EditCommunityModalBody
            data={data}
            id={props.id}
            isCommunity={props.isCommunity}
            isOwner={props.isOwner}
            onClose={props.onClose}
        />
    );
};

export const showEditCommunityModal = (id: string, isCommunity: boolean, isOwner: boolean) => {
    trackEvent(`navigate_${isCommunity ? 'community' : 'org'}_profile_edit`);
    showModalBox(
        { width: 480, title: isCommunity ? 'Edit community' : 'Edit organization' },
        (ctx) => {
            return (
                <EditCommunityModal
                    id={id}
                    onClose={ctx.hide}
                    isCommunity={isCommunity}
                    isOwner={isOwner}
                />
            );
        },
    );
};
