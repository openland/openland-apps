import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-api/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import { trackEvent } from 'openland-x-analytics';
import { useShortnameField } from 'openland-y-utils/form/useShortnameField';

enum CommunityType {
    COMMUNITY_PUBLIC = 'COMMUNITY_PUBLIC',
    COMMUNITY_PRIVATE = 'COMMUNITY_PRIVATE',
}

interface AdminToolsProps {
    id: string;
    published: boolean;
    editorial: boolean;
    featured: boolean;
    activated: boolean | null;
    setActivated: (e: boolean) => void;
    setPublished: (e: boolean) => void;
    setEditorial: (e: boolean) => void;
    setFeatured: (e: boolean) => void;
}

const AdminTools = (props: AdminToolsProps) => {
    const client = useClient();

    const data = client.useSuperAccount({ accountId: props.id, viaOrgId: true }, { suspense: false });

    if (!(data && data.superAccount)) {
        return null;
    }
    const activated = data.superAccount.state === 'ACTIVATED';
    if (props.activated === null) {
        props.setActivated(activated);
    }
    return (
        <XView marginTop={12}>
            <XView marginBottom={20}>
                <UCheckbox label="Activated" checked={props.activated || false} />
                <UCheckbox
                    label="Published"
                    checked={props.published}
                    onChange={() => props.setPublished(!props.published)}
                />
                <UCheckbox
                    label="Featured"
                    checked={props.featured}
                    onChange={() => props.setFeatured(!props.featured)}
                />
                <UCheckbox
                    label="Editorial"
                    checked={props.editorial}
                    onChange={() => props.setEditorial(!props.editorial)}
                />
            </XView>
        </XView>
    );
};

const EditCommunityEntity = (props: {
    id: string;
    modalCtx: XModalController;
    isCommunity: boolean;
    isOwner: boolean;
}) => {
    const organizationId = props.id;
    const client = useClient();
    const data = client.useOrganizationProfile({ organizationId });
    const org = data.organizationProfile;

    // super account
    const [activated, setActivated] = React.useState<null | boolean>(null);
    const [featured, setFeatured] = React.useState(org.featured);
    const [editorial, setEditorial] = React.useState(org.editorial);
    const [published, setPublished] = React.useState(org.published);
    // end super account

    const form = useForm();
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.photoRef',
        org.photoRef ? { uuid: org.photoRef.uuid, crop: org.photoRef.crop } : null,
        form,
    );
    const nameField = useField('input.name', org.name, form, [
        {
            checkIsValid: value => !!value.trim(),
            text: 'Please enter a name',
        },
    ]);
    const initialOrgShortname = org.shortname || '';
    const shortnameField = useShortnameField('input.shortname', initialOrgShortname, form);
    const aboutField = useField('input.about', org.about || '', form);
    const websiteField = useField('input.website', org.website || '', form);
    const twitterField = useField('input.twitter', org.twitter || '', form);
    const facebookField = useField('input.facebook', org.facebook || '', form);
    const linkedinField = useField('input.linkedin', org.linkedin || '', form);
    const instagramField = useField('input.instagram', org.instagram || '', form);
    const typeField = useField<CommunityType>(
        'input.type',
        org.private ? CommunityType.COMMUNITY_PRIVATE : CommunityType.COMMUNITY_PUBLIC,
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
                    alphaFeatured: featured !== org.featured ? featured : org.featured,
                    alphaPublished: published !== org.published ? published : org.published,
                    alphaEditorial: editorial !== org.editorial ? editorial : org.editorial,
                    alphaIsPrivate: typeField.value === CommunityType.COMMUNITY_PRIVATE,
                },
                organizationId: organizationId,
            };
            let promises: Promise<any>[] = [client.mutateUpdateOrganization(variables)];
            if (initialOrgShortname !== shortnameField.value) {
                promises.push(client.mutateSetOrgShortname({ shortname: shortnameField.value, organizationId }));
            }
            await Promise.all(promises);

            await Promise.all([
                client.refetchOrganization({ organizationId }),
                client.refetchOrganizationProfile({ organizationId }),
            ]);
            props.modalCtx.hide();
        });
    };

    return (
        <>
            <XView overflow="hidden" flexShrink={1} flexGrow={1}>
                <XScrollView3 flexShrink={1} flexGrow={1} useDefaultScroll={true}>
                    <XView paddingHorizontal={24} paddingTop={12} paddingBottom={24}>
                        <XView alignSelf="center">
                            <UAvatarUploadField field={avatarField} />
                        </XView>
                        <div className={TextTitle3}>Info</div>
                        <UInputField field={nameField} label={'Community name'} marginTop={12} />
                        {props.isCommunity && (
                            <XView marginTop={16}>
                                <USelectField
                                    field={typeField as any}
                                    placeholder="Community type"
                                    disabled={!props.isOwner}
                                    hideSelector={!props.isOwner}
                                    clearable={false}
                                    searchable={false}
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
                        )}
                        <UInputField
                            field={aboutField}
                            label="Description"
                            marginTop={16}
                            marginBottom={28}
                        />
                        <div className={TextTitle3}>Shortname</div>
                        <UInputField field={shortnameField} label="Shortname" marginTop={12} />
                        {!!form.error && (
                            <XView color="#d75454" paddingLeft={16} marginTop={8} fontSize={12}>
                                {form.error}
                            </XView>
                        )}
                        {!props.isCommunity && (
                            <XView marginTop={28}>
                                <div className={TextTitle3}>Contacts</div>
                                <XView marginTop={12}>
                                    <UInputField
                                        field={websiteField}
                                        label="Website"
                                        marginBottom={16}
                                    />
                                    <UInputField
                                        field={instagramField}
                                        label="Instagram"
                                        marginBottom={16}
                                    />
                                    <UInputField
                                        field={twitterField}
                                        label="Twitter"
                                        marginBottom={16}
                                    />
                                    <UInputField
                                        field={facebookField}
                                        label="Facebook"
                                        marginBottom={16}
                                    />
                                    <UInputField field={linkedinField} label="LinkedIn" />
                                </XView>
                            </XView>
                        )}
                        {/*SUPER ADMIN*/}
                        <XWithRole role={['super-admin', 'editor']}>
                            <XView marginTop={28}>
                                <div className={TextTitle3}>Superadmin</div>
                                <AdminTools
                                    id={props.id}
                                    activated={activated}
                                    editorial={editorial}
                                    published={published}
                                    featured={featured}
                                    setActivated={setActivated}
                                    setEditorial={setEditorial}
                                    setPublished={setPublished}
                                    setFeatured={setFeatured}
                                />
                            </XView>
                        </XWithRole>
                        {/*END SUPER ADMIN*/}
                    </XView>
                </XScrollView3>
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="secondary"
                    size="large"
                    onClick={() => props.modalCtx.hide()}
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
};

export const showEditCommunityModal = (id: string, isCommunity: boolean, isOwner: boolean) => {
    trackEvent(`navigate_${isCommunity ? 'community' : 'org'}_profile_edit`);
    showModalBox({ title: isCommunity ? 'Edit community' : 'Edit organization' }, ctx => {
        return (
            <EditCommunityEntity
                id={id}
                modalCtx={ctx}
                isCommunity={isCommunity}
                isOwner={isOwner}
            />
        );
    });
};
