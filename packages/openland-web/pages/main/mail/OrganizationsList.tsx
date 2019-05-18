import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import {
    MyOrganizations_myOrganizations,
    Organization_organization,
    OrganizationWithoutMembersFragment,
} from 'openland-api/Types';
import { XLoader } from 'openland-x/XLoader';
import { XAvatar } from 'openland-x/XAvatar';
import CheckIcon from 'openland-icons/check-form.svg';
import { useClient } from 'openland-web/utils/useClient';
import { UserInfoContext } from 'openland-web/components/UserInfo';

interface OrganizationItemProps {
    organization:
        | MyOrganizations_myOrganizations
        | Organization_organization
        | OrganizationWithoutMembersFragment;
    onSelect: (v: string) => void;
    isSelected: boolean;
}

const CheckIconClassName = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: #1790ff;
`;

const OrganizationItem = (props: OrganizationItemProps) => {
    const { isSelected, organization } = props;
    return (
        <XView
            cursor="pointer"
            flexShrink={0}
            flexDirection="row"
            alignItems="center"
            paddingLeft={16}
            paddingRight={20}
            paddingVertical={8}
            borderRadius={8}
            backgroundColor={isSelected ? '#F5F5F6' : '#fff'}
            hoverBackgroundColor="#F5F5F6"
            onClick={() => props.onSelect(organization.id)}
        >
            <XAvatar
                src={organization.photo || undefined}
                objectName={organization.name}
                objectId={organization.id}
                style="colorus"
            />
            <XView flexDirection="column" flexGrow={1} marginLeft={16}>
                <XView fontSize={15} fontWeight="600">
                    {organization.name}
                </XView>
                <XView fontSize={14} color="rgba(0, 0, 0, 0.6)">
                    {organization.isCommunity ? 'Community' : 'Organization'}
                </XView>
            </XView>
            {isSelected && (
                <div className={CheckIconClassName}>
                    <CheckIcon />
                </div>
            )}
        </XView>
    );
};

const SelectOrganizationWrapperClassName = css`
    display: flex;
    position: relative;
    flex-grow: 0;
    flex-shrink: 1;
    flex-direction: column;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
`;

const InOtherOrganization = (props: { inOrgId: string }) => {
    const client = useClient();
    const data = client.useOrganizationWithoutMembers({ organizationId: props.inOrgId });
    if (!data.organization) {
        return (
            <XView
                flexShrink={0}
                flexGrow={1}
                flexDirection="column"
                justifyContent="center"
                marginTop={40}
            >
                <XLoader loading={true} height={40} />
            </XView>
        );
    }

    return (
        <XView flexShrink={1} flexGrow={1} flexDirection="column">
            <XView fontSize={18} fontWeight="600" marginBottom={20} marginTop={40} paddingLeft={16}>
                Share with
            </XView>
            <div className={SelectOrganizationWrapperClassName}>
                <OrganizationItem
                    organization={data.organization}
                    isSelected={true}
                    onSelect={() => null}
                />
            </div>
        </XView>
    );
};

export const OrganizationsList = ({
    onChange,
    value,
    inOrgId = null,
}: {
    onChange: (v: string) => void;
    value: string | null;
    inOrgId?: string | null;
}) => {
    const client = useClient();
    const orgs = client.useWithoutLoaderMyOrganizations();
    const userContext = React.useContext(UserInfoContext);
    if (!orgs) {
        return (
            <XView
                flexShrink={0}
                flexGrow={1}
                flexDirection="column"
                justifyContent="center"
                marginTop={40}
            >
                <XLoader loading={true} height={40} />
            </XView>
        );
    }
    let primaryOrganizationId = '';
    if (userContext && userContext.organization) {
        primaryOrganizationId = userContext.organization.id;
    }

    let selectedOrg: MyOrganizations_myOrganizations | undefined | null = null;
    let primaryOrg: MyOrganizations_myOrganizations | undefined | null = null;
    if (inOrgId) {
        selectedOrg = orgs.myOrganizations.find(a => a.id === inOrgId);
        if (!selectedOrg) {
            return <InOtherOrganization inOrgId={inOrgId} />;
        }
    }
    if (primaryOrganizationId) {
        primaryOrg = orgs.myOrganizations.find(a => a.id === primaryOrganizationId);
    }

    return (
        <XView flexShrink={1} flexGrow={1} flexDirection="column">
            <XView fontSize={18} fontWeight="600" marginBottom={20} marginTop={40} paddingLeft={16}>
                Share with
            </XView>
            <div className={SelectOrganizationWrapperClassName}>
                {inOrgId && selectedOrg && (
                    <OrganizationItem
                        organization={selectedOrg}
                        onSelect={onChange}
                        isSelected={value ? value === inOrgId : primaryOrganizationId === inOrgId}
                    />
                )}
                {!inOrgId && primaryOrg && (
                    <OrganizationItem
                        organization={primaryOrg}
                        onSelect={onChange}
                        isSelected={value ? value === primaryOrganizationId : true}
                    />
                )}
                {orgs.myOrganizations
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(i => {
                        if (inOrgId && i.id === inOrgId) {
                            return;
                        }
                        if (primaryOrganizationId === i.id && !inOrgId) {
                            return;
                        }
                        return (
                            <OrganizationItem
                                organization={i}
                                key={'org_' + i.id}
                                onSelect={onChange}
                                isSelected={value ? value === i.id : primaryOrganizationId === i.id}
                            />
                        );
                    })}
            </div>
        </XView>
    );
};
