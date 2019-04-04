import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { delayForewer } from 'openland-y-utils/timer';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XTextArea } from 'openland-x/XTextArea';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { switchOrganization } from '../../utils/switchOrganization';
import { withRouter } from 'openland-x-routing/withRouter';
import { InitTexts } from '../../pages/init/_text';
import { useClient } from 'openland-web/utils/useClient';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';

export const CreateOrganization = withRouter(props => {
    const client = useClient();
    const isMobile = React.useContext(IsMobileContext);

    let community = props.router.query.createOrganization === 'community';
    let texts = community
        ? InitTexts.create_community_popper
        : InitTexts.create_organization_popper;
    return (
        <XModalForm
            targetQuery="createOrganization"
            useTopCloser={true}
            title={texts.title}
            submitBtnText={texts.submit}
            defaultAction={async data => {
                let result = await client.mutateCreateOrganization({
                    input: {
                        personal: false,
                        name: data.input.name,
                        about: data.input.about,
                        isCommunity: community,
                        photoRef: data.input.photoRef,
                    },
                });
                let redirect =
                    (community ? '/directory/c/' : '/directory/o/') + result.organization.id;
                switchOrganization(result.organization.id, redirect);
                await delayForewer();
            }}
            defaultData={{
                input: {
                    name: '',
                    website: '',
                    photoRef: null,
                },
            }}
        >
            <XVertical separator="large" flexGrow={isMobile ? 1 : undefined}>
                <XFormLoadingContent flexGrow={isMobile ? 1 : undefined}>
                    <XHorizontal>
                        <XVertical separator={8} flexGrow={1}>
                            <XInput
                                flexGrow={1}
                                field="input.name"
                                size="large"
                                placeholder={texts.namePlaceholder}
                                autofocus={true}
                            />
                            <XTextArea
                                placeholder={texts.descriptionPlaceholder}
                                resize={false}
                                valueStoreKey="fields.input.about"
                            />
                        </XVertical>
                        <XAvatarUpload
                            field="input.photoRef"
                            placeholder={{
                                add: texts.addPhoto,
                                change: texts.changePhoto,
                            }}
                        />
                    </XHorizontal>
                </XFormLoadingContent>
            </XVertical>
        </XModalForm>
    );
});
