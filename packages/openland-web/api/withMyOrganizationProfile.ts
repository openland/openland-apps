import { graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationQuery } from 'openland-api';
import { MyOrganizationsQuery } from 'openland-api';
import { UpdateOrganizationMutation } from 'openland-api';
import { DeleteOrganizationMutation } from 'openland-api';
import { OrganizationMemberRemoveMutation } from 'openland-api';
import { OrganizationProfileQuery } from 'openland-api';
import { SetOrgShortnameMutation } from 'openland-api';
import { AccountQuery } from 'openland-api';

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
