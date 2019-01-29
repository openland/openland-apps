import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperAccountsQuery } from 'openland-api';

export const withSuperAccounts = graphqlRouted(SuperAccountsQuery);
