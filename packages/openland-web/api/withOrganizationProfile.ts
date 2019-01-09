import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationProfileQuery } from 'openland-api/OrganizationProfileQuery';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { UpdateOrganizationMutation } from 'openland-api/UpdateOrganizationMutation';
import { SetOrgShortnameMutation } from 'openland-api/SetOrgShortnameMutation';

export const withOrganizationProfile = graphqlCompose3(
    graphqlRouted(OrganizationProfileQuery, { params: ['organizationId'] }),
    graphqlMutation(UpdateOrganizationMutation, 'updateOrganizaton', {
        params: ['organizationId'],
        refetchQueries: [OrganizationQuery],
        refetchParams: ['organizationId'],
    }),
    graphqlMutation(SetOrgShortnameMutation, 'setShortname', {
        params: ['organizationId'],
        refetchQueries: [OrganizationQuery],
    }),
);
