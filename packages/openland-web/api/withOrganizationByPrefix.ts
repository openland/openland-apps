import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OrganizationByPrefixQuery } from 'openland-api';

export const withOrganizationByPrefix = graphqlRouted(OrganizationByPrefixQuery);