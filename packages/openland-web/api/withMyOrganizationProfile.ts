import { graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { MyOrganizationsQuery } from 'openland-api/MyOrganizationsQuery';
import { UpdateOrganizationMutation } from 'openland-api/UpdateOrganizationMutation';
import { DeleteOrganizationMutation } from 'openland-api/DeleteOrganizationMutation';
import { OrganizationMemberRemoveMutation } from 'openland-api/OrganizationMemberRemoveMutation';
import { OrganizationProfileQuery } from 'openland-api';
import { SetOrgShortnameMutation } from 'openland-api/SetOrgShortnameMutation';
import { AccountQuery } from 'openland-api/AccountQuery';

export const withMyOrganizationProfile = graphqlCompose5(
    graphqlRouted(OrganizationProfileQuery, { params: ['organizationId'] }),
    graphqlMutation(UpdateOrganizationMutation, 'updateOrganizaton', {
        refetchQueries: [OrganizationQuery],
        refetchParams: ['organizationId'],
        params: ['organizationId'],
    }),
    graphqlMutation(SetOrgShortnameMutation, 'setShortname', {
        params: ['organizationId'],
        refetchQueries: [OrganizationQuery],
    }),
    graphqlMutation(DeleteOrganizationMutation, 'deleteOrganization', {
        refetchQueries: [MyOrganizationsQuery, AccountQuery],
        params: ['organizationId'],
    }),
    graphqlMutation(OrganizationMemberRemoveMutation, 'organizationMemberRemove', {
        refetchQueries: [MyOrganizationsQuery, AccountQuery],
        params: ['userId', 'organizationId'],
    }),
);
