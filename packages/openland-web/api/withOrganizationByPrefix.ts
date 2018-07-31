import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OpportunityQuery } from 'openland-api/OpportunityQuery';
import { OrganizationByPrefixQuery } from 'openland-api';

export const withOrganizationByPrefix = graphqlRouted(OrganizationByPrefixQuery);