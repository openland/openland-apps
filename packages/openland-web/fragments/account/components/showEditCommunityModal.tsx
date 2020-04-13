import * as React from 'react';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-api/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { StoredFileT, UAvatarUploadField } from 'openland-web/components/unicorn/UAvatarUpload';
import { UInputField } from 'openland-web/components/unicorn/UInput';
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

const EditCommunityEntity = (props: {
    id: string;
    modalCtx: XModalController;
    isCommunity: boolean;
    isOwner: boolean;
}) => {
    const organizationId = props.id;
    const client = useClient();
    const data = client.useOrganizationProfile({ organizationId }).organizationProfile;

    const form = useForm();
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.photoRef',
        data.photoRef ? { uuid: data.photoRef.uuid, crop: data.photoRef.crop } : null,
        form,
    );
    const nameField = useField('input.name', data.name, form, [
        {
            checkIsValid: (value) => !!value.trim(),
            text: 'Please enter a name',
        },
    ]);
    const initialOrgShortname = data.shortname || '';
    const shortnameField = useShortnameField('input.shortname', initialOrgShortname, form);
    const aboutField = useField('input.about', data.about || '', form);
    const websiteField = useField('input.website', data.website || '', form);
    const twitterField = useField('input.twitter', data.twitter || '', form);
    const facebookField = useField('input.facebook', data.facebook || '', form);
    const linkedinField = useField('input.linkedin', data.linkedin || '', form);
    const instagramField = useField('input.instagram', data.instagram || '', form);
    const typeField = useField<CommunityType>(
        'input.type',
        data.private ? CommunityType.COMMUNITY_PRIVATE : CommunityType.COMMUNITY_PUBLIC,
        form,
    );
    const [errorText, setErrorText] = React.useState(form.error);
    React.useEffect(() => {
        setErrorText('');
    }, [shortnameField.value]);
    React.useEffect(() => {
        setErrorText(form.error);
    }, [form.error]);

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
                },
                organizationId: organizationId,
            };
            await client.mutateUpdateOrganization(variables);
            if (initialOrgShortname !== shortnameField.value) {
                await client.mutateSetOrgShortname({
                    shortname: shortnameField.value,
                    organizationId,
                });
            }
            await client.refetchOrganization({ organizationId });
            await client.refetchOrganizationProfile({ organizationId });
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
                        {!!errorText && (
                            <XView color="#d75454" paddingLeft={16} marginTop={8} fontSize={12}>
                                {errorText}
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
                    </XView>
                </XScrollView3>
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
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
    showModalBox({ title: isCommunity ? 'Edit community' : 'Edit organization' }, (ctx) => {
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
