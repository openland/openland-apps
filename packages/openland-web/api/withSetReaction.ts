import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { MessageSetReactionMutation, MessageUnsetReactionMutation } from 'openland-api';

export const withSetReaction = graphqlMutation(MessageSetReactionMutation, 'setReaction');
export const withUnsetReaction = graphqlMutation(MessageUnsetReactionMutation, 'unsetReaction');
export const withChangeReaction = graphqlCompose2(withUnsetReaction, withSetReaction);
