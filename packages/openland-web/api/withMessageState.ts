import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

import { RoomEditMessageMutation } from 'openland-api';

export const withEditMessage = graphqlMutation(RoomEditMessageMutation, 'editMessage');
