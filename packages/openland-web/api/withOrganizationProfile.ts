import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationProfileQuery } from 'openland-api/OrganizationProfileQuery';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { UpdateOrganizationMutation } from 'openland-api/UpdateOrganizationMutation';

export const withOrganizationProfile = graphqlCompose2(
    graphqlRouted(OrganizationProfileQuery, { params: ['organizationId'] }),
    graphqlMutation(UpdateOrganizationMutation, 'updateOrganizaton', { params: ['organizationId'], refetchQueries: [OrganizationQuery], refetchParams: ['organizationId'] })
);