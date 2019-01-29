import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountQuery } from 'openland-api';

export const withAccountQuery = graphqlRouted(AccountQuery);
