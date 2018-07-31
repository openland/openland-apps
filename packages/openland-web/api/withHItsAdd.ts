import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { HitsAddMutation } from 'openland-api/HitsAddMutation';

export const withHitsAdd = graphqlMutation(HitsAddMutation, 'addHit');