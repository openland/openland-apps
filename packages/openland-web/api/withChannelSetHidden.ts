import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomAlterHiddenMutation } from 'openland-api';

export const withChannelSetHidden = graphqlMutation(RoomAlterHiddenMutation, 'setHidden');