import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Account } from 'openland-api';

export const withAccountQuery = graphqlRouted(Account.AccountQuery);