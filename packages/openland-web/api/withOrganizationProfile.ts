import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationProfileQuery } from 'openland-api';
import { OrganizationQuery } from 'openland-api';
import { UpdateOrganizationMutation } from 'openland-api';
import { SetOrgShortnameMutation } from 'openland-api';

export const withOrganizationProfile = graphqlCompose3(
    graphqlRouted(OrganizationProfileQuery, {
        params: ['organizationId'],
    }),
    graphqlMutation(UpdateOrganizationMutation, 'updateOrganizaton', {
        params: ['organizationId'],
        refetchQueries: [OrganizationQuery, OrganizationProfileQuery],
        refetchParams: ['organizationId'],
    }),
    graphqlMutation(SetOrgShortnameMutation, 'setShortname', {
        params: ['organizationId'],
        refetchQueries: [OrganizationQuery, OrganizationProfileQuery],
        refetchParams: ['organizationId'],
    }),
);
