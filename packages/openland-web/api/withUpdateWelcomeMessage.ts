import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { UpdateWelcomeMessageMutation, RoomQuery } from 'openland-api';

export const withUpdateWelcomeMessage = graphqlMutation(
    UpdateWelcomeMessageMutation,
    'updateWelcomeMessage',
    {
        refetchQueries: [RoomQuery],
        refetchRouterParams: [{ sourceParamName: 'conversationId', targetParamName: 'id' }],
    },
);
