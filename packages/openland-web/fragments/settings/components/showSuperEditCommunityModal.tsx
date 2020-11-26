import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { OrganizationProfile_organizationProfile } from 'openland-api/spacex.types';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-api/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalContent } from 'openland-web/components/XModalContent';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { TextBody, TextTitle3 } from 'openland-web/utils/TextStyles';
import { trackEvent } from 'openland-x-analytics';
import { RadioButtonsSelect } from './RadioButtonsSelect';

const modalSubtitle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 320px;
`;

const formTitle = css`
    margin-top: 16px;
    height: 48px;
    padding-top: 12px;
    padding-bottom: 12px;
    color: var(--foregroundPrimary);
`;

enum CommunityType {
    COMMUNITY_PUBLIC = 'COMMUNITY_PUBLIC',
    COMMUNITY_PRIVATE = 'COMMUNITY_PRIVATE',
}

interface SuperEditCommunityModalBodyProps {
    data: OrganizationProfile_organizationProfile;
    id: string;
    onClose: () => void;
    isCommunity: boolean;
}

const SuperEditCommunityModalBody = React.memo((props: SuperEditCommunityModalBodyProps) => {
    const { featured } = props.data;

    const id = props.id;
    const isPrivate = props.data.private;
    const client = useClient();
    const form = useForm();

    const initialFeatured = featured ? 'true' : 'false';

    const featuredField = useField('featured.input', initialFeatured, form);
    const typeField = useField<CommunityType>(
        'input.type',
        isPrivate ? CommunityType.COMMUNITY_PRIVATE : CommunityType.COMMUNITY_PUBLIC,
        form,
    );

    const doConfirm = () => {
        form.doAction(async () => {
            const variables = {
                input: {
                    alphaIsPrivate: typeField.value === CommunityType.COMMUNITY_PRIVATE,
                    alphaFeatured: featuredField.value === 'true',
                },
                organizationId: id,
            };
            await client.mutateUpdateOrganization(variables);
            await Promise.all([
                client.refetchOrganization({ organizationId: id }),
                client.refetchOrganizationProfile({ organizationId: id }),
            ]);
            props.onClose();
        });
    };

    return (
        <>
            <XScrollView3 flexShrink={1} flexGrow={1} useDefaultScroll={true}>
                <XModalContent>
                    <div className={cx(modalSubtitle, TextBody)}>For Openland team only</div>
                    <USelectField
                        field={typeField}
                        label="Community type"
                        useMenuPortal={true}
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
                    <div className={cx(formTitle, TextTitle3)}>Featured</div>
                    <XView marginHorizontal={-24}>
                        <RadioButtonsSelect
                            selectOptions={[
                                { label: 'Yes', value: 'true' },
                                { label: 'No', value: 'false' },
                            ]}
                            {...featuredField.input}
                            disableHorizontalPadding={true}
                            paddingHorizontal={24}
                            withCorners={true}
                        />
                    </XView>
                </XModalContent>
            </XScrollView3>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={() => props.onClose()}
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
});

interface SuperEditCommunityModalProps {
    id: string;
    onClose: () => void;
    isCommunity: boolean;
}

const SuperEditCommunityModal = (props: SuperEditCommunityModalProps) => {
    const client = useClient();
    const data = client.useOrganizationProfile({ organizationId: props.id }).organizationProfile;

    return (
        <SuperEditCommunityModalBody
            data={data}
            id={props.id}
            isCommunity={props.isCommunity}
            onClose={props.onClose}
        />
    );
};

export const showSuperEditCommunityModal = (id: string, isCommunity: boolean) => {
    trackEvent(`navigate_${isCommunity ? 'community' : 'org'}_profile_edit`);
    showModalBox(
        { width: 480, title: isCommunity ? 'Edit community' : 'Edit organization' },
        (ctx) => {
            return <SuperEditCommunityModal id={id} onClose={ctx.hide} isCommunity={isCommunity} />;
        },
    );
};
