import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Organization } from 'openland-api';

export const withOrganization = graphqlCompose2(
    graphqlRouted(Organization.OrganizationQuery, { params: ['organizationId'] }),
    graphqlMutation(Organization.FollowOrganizationMutation, 'followOrganization', { params: ['organizationId'] })
);