import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { FollowOrganizationMutation } from 'openland-api/FollowOrganizationMutation';

export const withOrganization = graphqlCompose2(
    graphqlRouted(OrganizationQuery, { params: ['organizationId'] }),
    graphqlMutation(FollowOrganizationMutation, 'followOrganization', { params: ['organizationId'] })
);