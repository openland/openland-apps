import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { MyOrganizations_myOrganizations } from 'openland-api/Types';
import { useClient } from 'openland-web/utils/useClient';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';
import { CheckComponent } from 'openland-web/components/unicorn/UCheckbox';

const selectOrganizationWrapperClassName = css`
    display: flex;
    position: relative;
    flex-grow: 0;
    flex-shrink: 1;
    flex-direction: column;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
`;

const Container = (props: { children: JSX.Element | JSX.Element[] }) => (
    <XView flexShrink={1} flexGrow={1} flexDirection="column">
        <XView fontSize={18} fontWeight="600" marginBottom={20} marginTop={20} paddingLeft={16}>
            Share with
        </XView>
        <div className={selectOrganizationWrapperClassName}>{props.children}</div>
    </XView>
);

const InOtherOrganization = (props: { inOrgId: string }) => {
    const client = useClient();
    const data = client.useOrganizationWithoutMembers({ organizationId: props.inOrgId });
    return (
        <Container>
            <UOrganizationView
                organization={data.organization}
                usePath={false}
                rightElement={
                    <XView marginRight={8}>
                        <CheckComponent squared={true} checked={true} />
                    </XView>
                }
            />
        </Container>
    );
};

interface OrganizationsListProps {
    onChange: (v: string) => void;
    value: string | null;
    inOrgId?: string | null;
}

export const OrganizationsList = ({ onChange, value, inOrgId = null }: OrganizationsListProps) => {
    const client = useClient();
    const orgs = client.useMyOrganizations();
    const userContext = React.useContext(UserInfoContext);
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

    const organizationsMap = orgs.myOrganizations
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(i => (inOrgId ? i.id !== inOrgId : primaryOrganizationId !== i.id));

    if (inOrgId && selectedOrg) {
        organizationsMap.unshift(selectedOrg);
    }

    if (!inOrgId && primaryOrg) {
        organizationsMap.unshift(primaryOrg);
    }

    React.useEffect(
        () => {
            if (!value && inOrgId) {
                onChange(inOrgId);
            }
            if (!value && !inOrgId) {
                onChange(primaryOrganizationId);
            }
        },
        [value],
    );
    return (
        <Container>
            {organizationsMap.map(i => {
                return (
                    <UOrganizationView
                        organization={i}
                        key={'org_' + i.id}
                        onClick={() => onChange(i.id)}
                        usePath={false}
                        description={i.isCommunity ? 'Community' : 'Organization'}
                        rightElement={
                            <XView marginRight={8}>
                                <CheckComponent
                                    squared={true}
                                    checked={
                                        value ? value === i.id : primaryOrganizationId === i.id
                                    }
                                />
                            </XView>
                        }
                    />
                );
            })}
        </Container>
    );
};
