import * as React from 'react';
import { css } from 'linaria';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { OrganizationsList } from './OrganizationsList';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { showModalBox } from 'openland-x/showModalBox';
import { ExploreFragment } from './ExploreFragment';
import BackIcon from 'openland-icons/s/ic-back-24.svg';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';

const containerStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    position: relative;
    max-height: 100%;
`;

const contentStyle = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;

    padding-top: 70px;
    max-width: 480px;
    max-height: 100%;
    width: 100%;
    height: 100%;
    margin: auto;
`;

const headerContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    margin-bottom: 40px;
`;

const textTitle = css`
    font-size: 32px;
    line-height: 32px;
    font-weight: 600;
    flex-shrink: 0;
`;

const bodyContainer = css`
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

const backButtonContainer = css`
    position: absolute;
    top: 17px;
    left: 17px;
`;

interface CreateEntityInterface {
    entityType: 'group' | 'channel' | 'community' | 'organization';
    inOrgId?: string;
}

const CreateEntityComponent = React.memo((props: CreateEntityInterface & { hide: () => void }) => {
    const [settingsPage, setSettingsPage] = React.useState(true);
    const form = useForm();

    const titleField = useField('input.title', '', form, [
        {
            checkIsValid: value => !!value.trim(),
            text: 'Please enter name',
        },
    ]);
    const avatarField = useField<StoredFileT | undefined | null>('input.avatar', null, form);
    const descriptionField = useField('input.description', '', form);
    const secretTypeField = useField<boolean>('input.type', !props.inOrgId, form);
    const selectedOrgField = useField<string | null>(
        'input.selectedOrg',
        props.inOrgId ? props.inOrgId : null,
        form,
    );

    const isOrg = props.entityType === 'organization';
    const isCommunity = props.entityType === 'community';
    const entityPlaceholder = props.entityType.charAt(0).toUpperCase() + props.entityType.slice(1);
    const showSharingList = !secretTypeField.value && !isCommunity && !isOrg;

    const canNextClick = !!titleField.value.trim();

    return (
        <div className={containerStyle}>
            <div className={contentStyle}>
                {settingsPage && (
                    <>
                        <div className={headerContainer}>
                            <div className={textTitle}>{`New ${props.entityType}`}</div>
                            <UButton
                                text="Next"
                                disable={!canNextClick}
                                onClick={canNextClick ? () => setSettingsPage(false) : undefined}
                            />
                        </div>
                        <div className={bodyContainer}>
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
                        {showSharingList && (
                            <OrganizationsList
                                {...selectedOrgField.input}
                                inOrgId={props.inOrgId}
                            />
                        )}
                    </>
                )}
                {!settingsPage && (
                    <>
                        <div className={backButtonContainer}>
                            <UIconButton
                                icon={<BackIcon />}
                                onClick={() => setSettingsPage(true)}
                                size="large"
                            />
                        </div>
                        <ExploreFragment
                            hide={props.hide}
                            title={titleField.value}
                            description={descriptionField.value}
                            photo={sanitizeImageRef(avatarField.value)}
                            secret={secretTypeField.value}
                            inOrgId={props.inOrgId}
                            entityType={props.entityType}
                        />
                    </>
                )}
            </div>
        </div>
    );
});

export const showCreatingFragment = (props: CreateEntityInterface) => {
    showModalBox({ fullScreen: true }, ctx => <CreateEntityComponent {...props} hide={ctx.hide} />);
};
