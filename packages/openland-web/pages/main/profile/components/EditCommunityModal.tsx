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
// import { XWithRole } from 'openland-x-permissions/XWithRole';

const XAvatarUploadStyled = Glamorous(XAvatarUpload)({
    width: 120,
    height: 120,
    borderRadius: '50%',
    backgroundColor: '#f4f4f4',
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

const EditCommunityEntity = (props: { id: string; modalCtx: XModalController }) => {
    const [newPhoto, setNewPhoto] = React.useState<UploadedFile | null>(null);
    const [saving, setSaving] = React.useState(false);
    const client = useClient();
    let organizationId = props.id;
    const data = client.useOrganizationProfile({ organizationId });
    const org = data.organizationProfile;

    const form = useForm();
    const nameField = useField('input.name', org.name, form, [
        {
            checkIsValid: value => !!value,
            text: `Please enter a name for this community`,
        },
    ]);

    const typeField = useField<CommunityType>(
        'input.type',
        org.private ? CommunityType.COMMUNITY_PRIVATE : CommunityType.COMMUNITY_PUBLIC,
        form,
    );
    const aboutField = useField('input.about', org.about || '', form);
    const shortNameField = useField('input.shortname', org.shortname || '', form);

    const onAvatarChange = (d: any) => {
        setNewPhoto(d);
    };

    const setShortname = async ({
                                    variables: { shortname },
                                }: {
        variables: { shortname: string };
    }) => {
        await client.mutateSetOrgShortname({ shortname, organizationId });
        await client.refetchOrganization({ organizationId });
        await client.refetchOrganizationProfile({ organizationId });
    };

    const closeModal = async () => {
        await setTimeout(() => {
            props.modalCtx.hide();
        }, 500);
    };

    const updateOrganizaton = async ({
        variables: { input },
    }: {
        variables: { input: UpdateOrganizationProfileInput };
    }) => {
        setSaving(true);
        await client.mutateUpdateOrganization({ input, organizationId });
        await client.refetchOrganization({ organizationId });
        await client.refetchOrganizationProfile({ organizationId });

        if (shortNameField.value !== org.shortname) {
            await setShortname({ variables: { shortname: shortNameField.value } });
        }

        await closeModal();
    };

    return (
        <XView borderRadius={8} overflow="hidden" flexShrink={1}>
            <XScrollView3 flexShrink={1} flexGrow={1}>
                <XView paddingHorizontal={40}>
                    <XView flexDirection="row" justifyContent="space-between" marginBottom={28}>
                        <XAvatarUploadStyled
                            cropParams="1:1"
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
                            <InputField field={nameField} title={'Community name'} />
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
                    </XView>
                    <XView marginBottom={32}>
                        <XView fontSize={18} fontWeight="600" marginBottom={16}>
                            Shortname
                        </XView>
                        <XView flexDirection="row">
                            <XView marginRight={16} flexGrow={1} flexShrink={0}>
                                <XInput
                                    {...shortNameField.input}
                                    size="large"
                                    flexGrow={1}
                                    className={InputClassName}
                                />
                            </XView>
                            <ShortNameButton
                                text="Save"
                                flexShrink={0}
                                style="primary"
                                onClick={() =>
                                    setShortname({ variables: { shortname: shortNameField.value } })
                                }
                            />
                        </XView>
                    </XView>
                    {/*SUPER ADMIN*/}
                    {/*<XWithRole role={['super-admin', 'editor']}>*/}
                    {/*    <XView fontSize={18} fontWeight="600" marginBottom={16}>*/}
                    {/*        Superadmin*/}
                    {/*    </XView>*/}
                    {/*</XWithRole>*/}
                </XView>
            </XScrollView3>
            <XView marginTop={34} backgroundColor="#f4f4f4">
                <XView
                    paddingHorizontal={40}
                    paddingVertical={16}
                    flexDirection="row"
                    justifyContent="flex-end"
                >
                    <XButton
                        loading={saving}
                        text={'save'}
                        size="large"
                        style={'primary'}
                        onClick={() =>
                            updateOrganizaton({
                                variables: {
                                    input: {
                                        name: nameField.value,
                                        about: aboutField.value,
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
                                },
                            })
                        }
                    />
                </XView>
            </XView>
        </XView>
    );
};

export const EditCommunityModal = (id: string) =>
    showModalBox({ title: 'Edit community' }, ctx => {
        return <EditCommunityEntity id={id} modalCtx={ctx} />;
    });
