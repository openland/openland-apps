import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Permissions } from 'openland-api';

export const withSuperAccounts = graphqlRouted(Permissions.SuperAccountsQuery);