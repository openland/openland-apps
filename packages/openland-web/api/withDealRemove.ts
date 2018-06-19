import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Deals } from 'openland-api';

export const withDealRemove = graphqlMutation(Deals.RemoveDealMutation, 'remove', { params: ['dealId'], refetchQueries: [Deals.AllDealsQuery] });