import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { GroupRoomInfoQuery } from 'openland-api/GroupRoomInfoQuery';
import { GroupRoomMembersInfoQuery } from 'openland-api/GroupRoomMembersInfoQuery';
export const withGroupRoom = graphqlRouted(GroupRoomInfoQuery, { fetchPolicy: 'cache-and-network' });
export const withGroupRoomMembers = graphqlRouted(GroupRoomMembersInfoQuery, { fetchPolicy: 'cache-and-network' });