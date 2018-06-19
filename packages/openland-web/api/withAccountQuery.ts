import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountQuery } from 'openland-api/AccountQuery';

export const withAccountQuery = graphqlRouted(AccountQuery);