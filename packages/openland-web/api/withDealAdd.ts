import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AllDealsQuery } from 'openland-api/AllDealsQuery';
import { AddDealMutation } from 'openland-api/AddDealMutation';

export const withDealAdd = graphqlMutation(AddDealMutation, 'add', { refetchQueries: [AllDealsQuery] });