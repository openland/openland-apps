import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RemoveDealMutation } from 'openland-api/RemoveDealMutation';
import { AllDealsQuery } from 'openland-api/AllDealsQuery';

export const withDealRemove = graphqlMutation(RemoveDealMutation, 'remove', { params: ['dealId'], refetchQueries: [AllDealsQuery] });