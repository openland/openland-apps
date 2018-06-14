import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withAccountQuery = graphqlRouted(Queries.Account.AccountQuery);