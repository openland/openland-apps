import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AlterDealMutation } from 'openland-api/AlterDealMutation';

export const withDealAlter = graphqlMutation(AlterDealMutation, 'alter', { params: ['dealId'] });