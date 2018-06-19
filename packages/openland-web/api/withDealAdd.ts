import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Deals } from 'openland-api';

export const withDealAdd = graphqlMutation(Deals.AddDealMutation, 'add', { refetchQueries: [Deals.AllDealsQuery] });