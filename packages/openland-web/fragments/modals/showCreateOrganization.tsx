import * as React from 'react';
import { showModalBox, XModalBoxStyles } from 'openland-x/showModalBox';
import { InitTexts } from 'openland-web/pages/init/_text';
import { useForm } from 'openland-form/useForm';
import { XLoader } from 'openland-x/XLoader';
import { XView } from 'react-mental';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { XButton } from 'openland-x/XButton';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XModalController } from 'openland-x/showModal';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-web/utils/useClient';
import { useXRouter } from 'openland-x-routing/useXRouter';
import { UploadedFile } from 'openland-x/files/XFileUpload';
import { XErrorMessage } from 'openland-x/XErrorMessage';

const CreateOrgForm = React.memo<{ type: 'organization' | 'community'; ctx: XModalController }>(
    props => {
        let texts =
            props.type === 'community'
                ? InitTexts.create_community_popper
                : InitTexts.create_organization_popper;

        let router = useXRouter();
        let client = useClient();
        let form = useForm();
        let nameField = useField('input.name', '', form);
        let descriptionField = useField('input.about', '', form);
        let photoField = useField<UploadedFile | null>('input.photoRef', null, form);

        let createAction = () => {
            form.doAction(async () => {
                let res = await client.mutateCreateOrganization({
                    input: {
                        personal: false,
                        name: nameField.value,
                        about: descriptionField.value,
                        photoRef: photoField.value
                            ? {
                                  uuid: photoField.value!.uuid,
                                  crop: {
                                      x: photoField.value!.crop!.top,
                                      y: photoField.value!.crop!.left,
                                      w: photoField.value!.crop!.width,
                                      h: photoField.value!.crop!.height,
                                  },
                              }
                            : undefined,
                        isCommunity: props.type === 'community',
                    },
                });
                let redirect =
                    (props.type === 'community' ? '/directory/c/' : '/directory/o/') +
                    res.organization.id;
                router.push(redirect);
                props.ctx.hide();
            });
        };

        return (
            <>
                {form.loading && <XLoader loading={form.loading} />}
                {form.error && <XErrorMessage message={form.error} />}
                <XView flexDirection="column" borderRadius={8} overflow="hidden">
                    <XView
                        flexDirection="row"
                        paddingHorizontal={XModalBoxStyles.contentPadding}
                        paddingBottom={24}
                        paddingTop={6}
                    >
                        <XView flexGrow={1} flexDirection="column" flexShrink={1} paddingRight={16}>
                            <XView paddingBottom={16}>
                                <XInput
                                    {...nameField.input}
                                    size="large"
                                    placeholder={texts.namePlaceholder}
                                    autofocus={true}
                                />
                            </XView>
                            <XTextArea
                                {...descriptionField.input}
                                placeholder={texts.descriptionPlaceholder}
                                resize={false}
                            />
                        </XView>
                        <XAvatarUpload
                            {...photoField.input}
                            placeholder={{
                                add: texts.addPhoto,
                                change: texts.changePhoto,
                            }}
                        />
                    </XView>
                    <XView
                        height={72}
                        backgroundColor="rgb(242, 243, 244)"
                        flexDirection="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        paddingHorizontal={XModalBoxStyles.contentPadding}
                    >
                        <XView paddingRight={12}>
                            <XButton
                                text="Cancel"
                                style="ghost"
                                size="large"
                                onClick={() => props.ctx.hide()}
                            />
                        </XView>
                        <XButton
                            text="Create"
                            style="primary"
                            size="large"
                            onClick={createAction}
                        />
                    </XView>
                </XView>
            </>
        );
    },
);

export function showCreateOrganization(type: 'organization' | 'community') {
    let texts =
        type === 'community'
            ? InitTexts.create_community_popper
            : InitTexts.create_organization_popper;
    showModalBox({ title: texts.title }, ctx => {
        return <CreateOrgForm type={type} ctx={ctx} />;
    });
}
