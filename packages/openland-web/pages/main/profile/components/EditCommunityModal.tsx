import * as React from 'react';
import { css } from 'linaria';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { UploadedFile } from 'openland-x/files/XFileUpload';
import { fromValue, XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XTextArea } from 'openland-x/XTextArea';
import { XInput } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { InputField } from '../../mail/InputField';
import { SelectWithDropdown } from '../../mail/SelectWithDropdown';
import { CommunityType } from '../../mail/createEntity';
import { sanitizeImageRef } from 'openland-web/utils/sanitizer';
import { UpdateOrganizationProfileInput } from 'openland-api/Types';
import { formatError } from 'openland-x-forms/errorHandling';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XCheckbox } from 'openland-x/XCheckbox';
import CheckIcon from 'openland-icons/ic-check.svg';

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

    const data = client.useWithoutLoaderSuperAccount({ accountId: props.id, viaOrgId: true });

    if (!(data && data.superAccount)) {
        return null;
    }
    const activated = data.superAccount.state === 'ACTIVATED';
    if (props.activated === null) {
        props.setActivated(activated);
    }
    return (
        <XView>
            <XView flexDirection="row" marginBottom={20}>
                <XView flexGrow={1} flexShrink={0} width={240}>
                    <XCheckbox
                        label="Activated"
                        checked={props.activated || false}
                        disabled={true}
                    />
                </XView>
                <XView flexGrow={1} flexShrink={0} width={240}>
                    <XCheckbox
                        label="Featured"
                        checked={props.featured}
                        onChange={() => props.setFeatured(!props.featured)}
                    />
                </XView>
            </XView>
            <XView flexDirection="row">
                <XView flexGrow={1} flexShrink={0} width={240}>
                    <XCheckbox
                        label="Published"
                        checked={props.published}
                        onChange={() => props.setPublished(!props.published)}
                    />
                </XView>
                <XView flexGrow={1} flexShrink={0} width={240}>
                    <XCheckbox
                        label="Editorial"
                        checked={props.editorial}
                        onChange={() => props.setEditorial(!props.editorial)}
                    />
                </XView>
            </XView>
        </XView>
    );
};

const CloseButton = Glamorous(XButton)({
    border: 'solid 1px #E3E3E3',
});

const XAvatarUploadStyled = Glamorous(XAvatarUpload)({
    width: 120,
    height: 120,
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f4f4f4',
    '&:hover': {
        border: 'none',
    },
    '& > div:hover': {
        backgroundColor: '#919292',
        color: '#fff',
    },
});

const ShortNameButton = Glamorous(XButton)({
    borderRadius: 8,
    height: 40,
});

const InputClassName = css`
    border-radius: 8px !important;
    background: #f2f3f4 !important;
    border: none !important;
    &:focus-within {
        border: none !important;
        box-shadow: none !important;
    }
`;

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

    const [newPhoto, setNewPhoto] = React.useState<UploadedFile | null>(null);
    const [savingData, setSavingData] = React.useState(false);
    const [saveIsDone, setSaveIsDone] = React.useState(false);
    const [shortName, setShortName] = React.useState(org.shortname || '');
    const [saveShortNameIsDone, setSaveShortNameIsDone] = React.useState(false);
    const [savingShortName, setSavingShortName] = React.useState(false);
    const [shortNameError, setShortNameError] = React.useState<string | null>(null);

    // super account
    const [activated, setActivated] = React.useState<null | boolean>(null);
    const [featured, setFeatured] = React.useState(org.featured);
    const [editorial, setEditorial] = React.useState(org.editorial);
    const [published, setPublished] = React.useState(org.published);
    // end super account

    const form = useForm();

    const nameField = useField('input.name', org.name, form, [
        {
            checkIsValid: value => !!value,
            text: `Please enter a name for this ${
                props.isCommunity ? 'community' : 'organization'
            }`,
        },
    ]);
    const aboutField = useField('input.about', org.about || '', form);
    const websiteField = useField('input.website', org.website || '', form);
    const twitterField = useField('input.twitter', org.twitter || '', form);
    const facebookField = useField('input.facebook', org.facebook || '', form);
    const linkedinField = useField('input.linkedin', org.linkedin || '', form);
    const typeField = useField<CommunityType>(
        'input.type',
        org.private ? CommunityType.COMMUNITY_PRIVATE : CommunityType.COMMUNITY_PUBLIC,
        form,
    );

    const onAvatarChange = (file: UploadedFile) => {
        setNewPhoto(file);
    };

    const closeModal = async () => {
        await setTimeout(() => {
            setSavingData(false);
            setSaveIsDone(true);
            setTimeout(() => {
                props.modalCtx.hide();
            }, 1000);
        }, 1000);
    };

    const saveShortName = async (shortname: string, globalSave: boolean) => {
        setShortNameError(null);
        let error = false;
        if (!globalSave) {
            await setSavingShortName(true);
        }
        try {
            await client.mutateSetOrgShortname({ shortname: shortname, organizationId });
            await client.refetchOrganization({ organizationId });
            await client.refetchOrganizationProfile({ organizationId });
        } catch (e) {
            error = true;
            let errorText = '';
            if (formatError(e) === 'Shortname is too short' && !activated) {
                errorText = 'Shortname must have at least 5 characters.';
            } else if (formatError(e) === 'Shortname is too short' && activated) {
                errorText = 'Shortname must have at least 3 characters.';
            } else if (formatError(e) === 'Invalid shortname') {
                errorText = 'Shortname can only contain a-z, 0-9, and underscores.';
            } else {
                errorText = formatError(e);
            }
            setShortNameError(errorText);
        }
        if (!globalSave && error) {
            setSavingShortName(false);
            setSaveShortNameIsDone(false);
        }
        if (!globalSave && !error) {
            await setTimeout(() => {
                setSaveShortNameIsDone(true);
                setTimeout(() => {
                    setSavingShortName(false);
                    setSaveShortNameIsDone(false);
                }, 1000);
            }, 1000);
        }
        if (globalSave && error) {
            setSavingData(false);
        }
        if (globalSave && !error) {
            closeModal();
        }
    };

    const updateOrganizaton = ({ input }: { input: UpdateOrganizationProfileInput }) =>
        form.doAction(async () => {
            await setSavingData(true);
            try {
                await client.mutateUpdateOrganization({ input, organizationId });
                await client.refetchOrganization({ organizationId });
                await client.refetchOrganizationProfile({ organizationId });

                if (shortName && shortName !== org.shortname) {
                    await saveShortName(shortName, true);
                } else {
                    await closeModal();
                }
            } catch (e) {
                setSavingData(false);
            }
        });

    return (
        <XView borderRadius={8} overflow="hidden" flexShrink={1}>
            <XScrollView3 flexShrink={1} flexGrow={1}>
                <XView paddingHorizontal={40} paddingBottom={34}>
                    <XView
                        flexDirection="row"
                        justifyContent="space-between"
                        marginBottom={28}
                        alignItems="center"
                    >
                        <XAvatarUploadStyled
                            cropParams="1:1"
                            placeholder={{
                                add: 'Add photo',
                                change: 'Change',
                            }}
                            onChange={onAvatarChange}
                            value={
                                newPhoto
                                    ? newPhoto
                                    : org.photoRef
                                    ? fromValue({
                                          uuid: org.photoRef.uuid,
                                          isImage: true,
                                          crop: org.photoRef.crop,
                                          width: null,
                                          height: null,
                                      })
                                    : null
                            }
                        />
                        <XView marginLeft={20} flexGrow={1} flexShrink={0}>
                            <InputField
                                field={nameField}
                                title={'Community name'}
                                setFocusOnError
                                hideErrorText
                            />

                            {props.isCommunity && !props.isOwner && (
                                <XView
                                    height={52}
                                    marginTop={16}
                                    paddingHorizontal={16}
                                    backgroundColor="#f2f3f4"
                                    borderRadius={8}
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <XView flexDirection="column" marginTop={-3}>
                                        <XView color="rgba(0, 0, 0, 0.5)" fontSize={12}>
                                            Community type (set by creator)
                                        </XView>
                                        <XView fontSize={14} color="#000" marginTop={-4}>
                                            {org.private ? 'Private' : 'Public'}
                                        </XView>
                                    </XView>
                                </XView>
                            )}
                            {props.isCommunity && props.isOwner && (
                                <XView marginTop={16}>
                                    <SelectWithDropdown
                                        title="Community type"
                                        value={typeField.value}
                                        onChange={typeField.input.onChange}
                                        selectOptions={[
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
                        </XView>
                    </XView>
                    <XView marginBottom={28}>
                        <XView fontSize={18} fontWeight="600" marginBottom={16}>
                            About
                        </XView>
                        <XTextArea
                            flexGrow={1}
                            height={156}
                            resize={false}
                            title="Short description"
                            mode="modern"
                            {...aboutField.input}
                        />
                        <XView
                            fontSize={12}
                            color="rgba(0, 0, 0, 0.5)"
                            marginTop={6}
                            marginLeft={16}
                        >
                            {`Publicly describe this ${
                                props.isCommunity ? 'community' : 'organization'
                            } for all to see`}
                        </XView>
                        {!props.isCommunity && (
                            <XView marginTop={16}>
                                <XView marginBottom={16}>
                                    <InputField field={websiteField} title={'Website'} />
                                </XView>
                                <XView marginBottom={16}>
                                    <InputField field={twitterField} title={'Twitter'} />
                                </XView>
                                <XView marginBottom={16}>
                                    <InputField field={facebookField} title={'Facebook'} />
                                </XView>
                                <XView marginBottom={16}>
                                    <InputField field={linkedinField} title={'LinkedIn'} />
                                </XView>
                            </XView>
                        )}
                    </XView>
                    <XView marginBottom={32}>
                        <XView fontSize={18} fontWeight="600" marginBottom={16}>
                            Shortname
                        </XView>
                        <XView flexDirection="row">
                            <XView marginRight={16} flexGrow={1} flexShrink={0}>
                                <XInput
                                    size="large"
                                    flexGrow={1}
                                    value={shortName}
                                    className={InputClassName}
                                    onChange={(v: string) => {
                                        setShortName(v);
                                        setShortNameError(null);
                                    }}
                                />
                            </XView>
                            <ShortNameButton
                                loading={savingShortName && !saveShortNameIsDone}
                                text={saveShortNameIsDone ? 'Saved!' : 'Save'}
                                flexShrink={0}
                                style={saveShortNameIsDone ? 'success' : 'primary'}
                                onClick={() => saveShortName(shortName, false)}
                                icon={saveShortNameIsDone ? <CheckIcon /> : undefined}
                            />
                        </XView>
                        {!shortNameError && (
                            <XView
                                fontSize={12}
                                color="rgba(0, 0, 0, 0.5)"
                                marginTop={6}
                                marginLeft={16}
                            >
                                {`People will be able to find your ${
                                    props.isCommunity ? 'community' : 'organization'
                                } by this shortname`}
                            </XView>
                        )}
                        {shortNameError && (
                            <XView fontSize={12} color="#f6564e" marginTop={6} marginLeft={16}>
                                {shortNameError}
                            </XView>
                        )}
                    </XView>
                    {/*SUPER ADMIN*/}
                    <XWithRole role={['super-admin', 'editor']}>
                        <XView fontSize={18} fontWeight="600" marginBottom={16}>
                            Superadmin
                        </XView>
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
                    </XWithRole>
                </XView>
            </XScrollView3>
            <XView backgroundColor="#f4f4f4">
                <XView
                    paddingHorizontal={40}
                    paddingVertical={16}
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    <XView marginRight={12}>
                        <CloseButton text="Cancel" size="large" onClick={props.modalCtx.hide} />
                    </XView>
                    <XButton
                        loading={savingData && !saveIsDone}
                        text={saveIsDone ? 'Saved!' : 'Save'}
                        size="large"
                        style={saveIsDone ? 'success' : 'primary'}
                        icon={saveIsDone ? <CheckIcon /> : undefined}
                        onClick={() =>
                            updateOrganizaton({
                                input: {
                                    name: nameField.value,
                                    about: aboutField.value,
                                    website: websiteField.value,
                                    twitter: twitterField.value,
                                    facebook: facebookField.value,
                                    linkedin: linkedinField.value,
                                    alphaFeatured:
                                        featured !== org.featured ? featured : org.featured,
                                    alphaPublished:
                                        published !== org.published ? published : org.published,
                                    alphaEditorial:
                                        editorial !== org.editorial ? editorial : org.editorial,
                                    alphaIsPrivate:
                                        typeField.value === CommunityType.COMMUNITY_PRIVATE,
                                    photoRef: newPhoto
                                        ? sanitizeImageRef({
                                              uuid: newPhoto.uuid,
                                              crop: newPhoto.crop
                                                  ? {
                                                        x: newPhoto.crop.left,
                                                        y: newPhoto.crop.top,
                                                        w: newPhoto.crop.width,
                                                        h: newPhoto.crop.height,
                                                    }
                                                  : null,
                                          })
                                        : org.photoRef
                                        ? sanitizeImageRef({
                                              uuid: org.photoRef.uuid,
                                              crop: org.photoRef.crop,
                                          })
                                        : null,
                                },
                            })
                        }
                    />
                </XView>
            </XView>
        </XView>
    );
};

export const EditCommunityModal = (id: string, isCommunity: boolean, isOwner: boolean) =>
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
