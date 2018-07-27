import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { HitsAddMutation } from 'openland-api/HitsAddMutation';

export const withHits = graphqlMutation(HitsAddMutation, 'addHit');