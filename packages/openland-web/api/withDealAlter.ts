import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Deals } from 'openland-api';

export const withDealAlter = graphqlMutation(Deals.AlterDealMutation, 'alter', { params: ['dealId'] });