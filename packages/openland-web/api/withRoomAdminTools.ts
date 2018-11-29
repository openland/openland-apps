import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import {
    RoomAlterHiddenMutation,
    RoomSuperQuery,
    RoomAlterFeaturedMutation,
} from 'openland-api';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';

const withRoomSuper = graphqlRouted(RoomSuperQuery);
const withRoomSetHidden = graphqlMutation(
    RoomAlterHiddenMutation,
    'sertListed',
);
const withRoomSetFeatured = graphqlMutation(
    RoomAlterFeaturedMutation,
    'setFeatured',
);

export const withRoomAdminTools = graphqlCompose3(
    withRoomSuper,
    withRoomSetHidden,
    withRoomSetFeatured,
);
