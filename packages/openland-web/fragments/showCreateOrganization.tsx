import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { InitTexts } from 'openland-web/pages/init/_text';
import { useForm } from 'openland-form/useForm';
import { XLoader } from 'openland-x/XLoader';
import { XView } from 'react-mental';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { XButton } from 'openland-x/XButton';
import { delay } from 'openland-y-utils/timer';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';

const CreateOrgForm = React.memo<{ type: 'organization' | 'community' }>((props) => {
    let texts = props.type === 'community'
        ? InitTexts.create_community_popper
        : InitTexts.create_organization_popper;
    let form = useForm();

    return (
        <>
            {form.loading && <XLoader loading={form.loading} />}
            <XView flexDirection="column">
                <XView flexDirection="row" paddingHorizontal={24} paddingBottom={24} paddingTop={6}>
                    <XView flexGrow={1} flexDirection="column" flexShrink={1} paddingRight={16}>
                        <XView paddingBottom={16}>
                            <XInput
                                size="large"
                                placeholder={texts.namePlaceholder}
                                autofocus={true}
                            />
                        </XView>
                        <XTextArea
                            placeholder={texts.descriptionPlaceholder}
                            resize={false}
                        />
                    </XView>
                    <XAvatarUpload
                        placeholder={{
                            add: texts.addPhoto,
                            change: texts.changePhoto,
                        }}
                    />
                </XView>
                <XView flexDirection="row" justifyContent="flex-end" paddingBottom={16} paddingHorizontal={24}>
                    <XButton
                        text="Create"
                        style="primary"
                        size="large"
                        onClick={() => form.doAction(async () => {
                            await delay(1000);
                        })}
                    />
                </XView>
            </XView>
        </>
    )
});

export function showCreateOrganization(type: 'organization' | 'community') {
    let texts = type === 'community'
        ? InitTexts.create_community_popper
        : InitTexts.create_organization_popper;
    showModalBox({ title: texts.title }, () => {
        return <CreateOrgForm type={type} />;
    });
}