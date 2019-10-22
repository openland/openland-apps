import * as React from 'react';
import { css } from 'linaria';
import { XViewRouterContext } from 'react-mental';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { TextTitle1 } from 'openland-web/utils/TextStyles';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { OrganizationsList } from './OrganizationsList';
import {
    CreateEntityEngine,
    CreateEntityState,
} from 'openland-engines/createEntity/CreateEntityState';

const titleViewContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
`;

const TitleView = (props: { title: string; canMakeSubmit: boolean; onSubmit: () => void }) => (
    <div className={titleViewContainer}>
        <div className={TextTitle1}>{props.title}</div>
        <UButton
            text="Next"
            onClick={props.canMakeSubmit ? props.onSubmit : undefined}
            disable={!props.canMakeSubmit}
        />
    </div>
);

const containerStyle = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
`;

const contentStyle = css`
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    margin-bottom: 16px;
`;

const avatarStyle = css`
    & .avatar-container {
        width: 120px;
        height: 120px;
    }
`;

const inputsContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-left: 16px;
`;

interface CreateEntityInterface {
    entityState: CreateEntityEngine;
    entityType: 'group' | 'channel' | 'community' | 'organization';
    inOrgId?: string;
}

const CreateEntityComponent = React.memo((props: CreateEntityInterface) => {
    const engine = props.entityState;
    const engineState = engine.getState();
    const router = React.useContext(XViewRouterContext)!;
    const form = useForm();

    const titleField = useField(
        'input.title',
        engineState.title !== null ? engineState.title : '',
        form,
        [
            {
                checkIsValid: value => !!value.trim(),
                text: 'Please enter name',
            },
        ],
    );
    const avatarField = useField<StoredFileT | undefined | null>(
        'input.avatar',
        engineState.photo !== null ? engineState.photo : null,
        form,
    );
    const descriptionField = useField(
        'input.description',
        engineState.description !== null ? engineState.description : '',
        form,
    );
    const secretTypeField = useField<boolean>(
        'input.type',
        props.inOrgId ? false : engineState.secret !== null ? engineState.secret : true,
        form,
    );
    const selectedOrgField = useField<string | null>(
        'input.selectedOrg',
        props.inOrgId
            ? props.inOrgId
            : engineState.shareWith !== null
                ? engineState.shareWith
                : null,
        form,
    );

    const onSubmit = () => {
        form.doAction(() => {
            const data: CreateEntityState = {
                title: titleField.value ? titleField.value : null,
                description: descriptionField.value.trim() ? descriptionField.value.trim() : null,
                secret: secretTypeField.value,
                shareWith: !secretTypeField.value ? selectedOrgField.value : null,
                photo: avatarField.value
                    ? {
                          uuid: avatarField.value.uuid,
                          crop: avatarField.value.crop ? avatarField.value.crop : null,
                      }
                    : null,
            };
            engine.addToState(data);
            const navigatePath = props.inOrgId
                ? `/new/${props.entityType}/in/${props.inOrgId}/explore`
                : `/new/${props.entityType}/explore`;

            router.navigate(navigatePath);
        });
    };

    const isOrg = props.entityType === 'organization';
    const isCommunity = props.entityType === 'community';
    const entityPlaceholder = props.entityType.charAt(0).toUpperCase() + props.entityType.slice(1);
    const showSharingList = !secretTypeField.value && !isCommunity && !isOrg;
    return (
        <Page
            flexGrow={1}
            track={`navigate_new_${props.entityType}`}
            padded={true}
            scroll="disable"
        >
            <UHeader
                appearance="fullwidth"
                titleView={
                    <TitleView
                        title={`New ${props.entityType}`}
                        canMakeSubmit={!!titleField.value.trim()}
                        onSubmit={onSubmit}
                    />
                }
            />
            <div className={containerStyle}>
                <div className={contentStyle}>
                    <UAvatarUploadField field={avatarField} className={avatarStyle} />
                    <div className={inputsContainer}>
                        <UInputField
                            field={titleField}
                            label={`${entityPlaceholder} name`}
                            marginBottom={8}
                        />
                        {!isOrg && (
                            <USelectField
                                field={secretTypeField as any}
                                placeholder={`${entityPlaceholder} type`}
                                searchable={false}
                                options={[
                                    {
                                        value: false,
                                        labelShort: isCommunity ? 'Public' : 'Shared',
                                        label: isCommunity
                                            ? 'Public community'
                                            : `Shared ${props.entityType}`,
                                        subtitle: isCommunity
                                            ? 'Anyone can find and join this community'
                                            : `${
                                                  props.entityType
                                              } where your organization or community members communicate`,
                                    },
                                    {
                                        value: true,
                                        labelShort: isCommunity ? 'Private' : 'Secret',
                                        label: isCommunity
                                            ? 'Private community'
                                            : `Secret ${props.entityType}`,
                                        subtitle: isCommunity
                                            ? 'Only invited people can join community and view chats'
                                            : `People can view and join only by invite from a ${
                                                  props.entityType
                                              } member`,
                                    },
                                ]}
                            />
                        )}
                        {isOrg && (
                            <UTextAreaField
                                field={descriptionField}
                                placeholder="Short description"
                                height={150}
                            />
                        )}
                    </div>
                </div>
                {isCommunity && (
                    <UTextAreaField
                        field={descriptionField}
                        placeholder="Short description"
                        height={200}
                    />
                )}
            </div>
            {showSharingList && (
                <OrganizationsList {...selectedOrgField.input} inOrgId={props.inOrgId} />
            )}
        </Page>
    );
});

export const CreateEntityFragment = React.memo(() => {
    const entityState = React.useContext(MessengerContext).getEntityState();
    const unicorn = useUnicorn();
    const entityType = unicorn.query.type;
    const inOrgId = unicorn.query.id;
    return (
        <CreateEntityComponent
            entityState={entityState}
            entityType={entityType}
            inOrgId={inOrgId}
        />
    );
});
