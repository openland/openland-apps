import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { delayForewer, delay } from 'openland-y-utils/timer';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XTextArea } from 'openland-x/XTextArea';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { SharedRoomKind } from 'openland-api/Types';
import { switchOrganization } from '../../utils/switchOrganization';
import { withCreateOrganization } from '../../api/withCreateOrganization';
import { InitTexts } from '../../pages/init/_text';
import { withCreateChannel } from 'openland-web/api/withCreateChannel';

export const CreateRoom = withCreateChannel(props => {
    return (
        <XModalForm
            {...props}
            useTopCloser={true}
            title="Create room"
            targetQuery="createRoom"
            defaultAction={async data => {
                let oid = props.router.query.createRoom;
                let room = (await props.createChannel({
                    variables: {
                        title: data.input.name,
                        description: data.input.description,
                        organizationId: oid !== 'true' ? oid : undefined,
                        members: [],
                        kind: SharedRoomKind.PUBLIC,
                    },
                })) as any;
                delay(0).then(() => {
                    props.router.push('/mail/' + room.data.room.id);
                });
            }}
            defaultData={{
                input: {
                    name: '',
                },
            }}
            submitBtnText="Create room"
        >
            <XVertical separator={8}>
                <XInput
                    flexGrow={1}
                    size="large"
                    placeholder="Room title"
                    field="input.name"
                    autofocus={true}
                />
                <XTextArea
                    placeholder="Description"
                    resize={false}
                    valueStoreKey="fields.input.description"
                />
            </XVertical>
        </XModalForm>
    );
});

export const CreateOrganization = withCreateOrganization(props => {
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
                let res = (await props.createOrganization({
                    variables: {
                        input: {
                            personal: false,
                            name: data.input.name,
                            about: data.input.about,
                            isCommunity: community,
                            photoRef: data.input.photoRef,
                        },
                    },
                })) as any;
                let redirect =
                    (community ? '/directory/c/' : '/directory/o/') +
                    res.data.createOrganization.id;
                switchOrganization(res.data.createOrganization.id, redirect);
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
            <XVertical separator="large">
                <XFormLoadingContent>
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
