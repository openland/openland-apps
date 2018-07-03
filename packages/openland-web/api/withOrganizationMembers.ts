import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OrganizationMembersQuery } from 'openland-api/OrganizationMembersQuery';

export const withOrganizationMembers = graphqlRouted(OrganizationMembersQuery);
