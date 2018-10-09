import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { UpdateOrganizationMutation } from 'openland-api/UpdateOrganizationMutation';
import { OrganizationProfileQuery } from 'openland-api';

export const withMyOrganizationProfile = graphqlCompose2(
    graphqlRouted(OrganizationProfileQuery, { params: ['organizationId'] }),
    graphqlMutation(UpdateOrganizationMutation, 'updateOrganizaton', { refetchQueries: [OrganizationQuery], refetchParams: ['organizationId'], params: ['organizationId'] })
);