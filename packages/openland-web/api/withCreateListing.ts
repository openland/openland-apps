import { CreateListingMutation } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withCreateListing = graphqlMutation(CreateListingMutation, 'createListing');