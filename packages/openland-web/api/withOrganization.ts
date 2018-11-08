import { graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { MyOrganizationProfileQuery } from 'openland-api/MyOrganizationProfileQuery';

export const withOrganization = graphqlRouted(OrganizationQuery, { params: ['organizationId'] });