import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { MessageSetReactionMutation, MessageUnsetReactionMutation } from 'openland-api';

export const withSetReaction = graphqlMutation(MessageSetReactionMutation, 'setReaction');
export const withUnsetReaction = graphqlMutation(MessageUnsetReactionMutation, 'unsetReaction');
