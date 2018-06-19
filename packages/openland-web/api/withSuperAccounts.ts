import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperAccountsQuery } from 'openland-api/SuperAccountsQuery';

export const withSuperAccounts = graphqlRouted(SuperAccountsQuery);