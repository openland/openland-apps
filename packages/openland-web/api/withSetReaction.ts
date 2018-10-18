import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { MessageSetReactionMutation, MessageUnsetReactionMutation, SwitchReactionMutation } from 'openland-api';

export const withSetReaction = graphqlMutation(MessageSetReactionMutation, 'setReaction');
export const withUnsetReaction = graphqlMutation(MessageUnsetReactionMutation, 'unsetReaction');
export const withSwitchReaction = graphqlMutation(SwitchReactionMutation, 'switch');
export const withChangeReaction = graphqlCompose3(withUnsetReaction, withSetReaction, withSwitchReaction);