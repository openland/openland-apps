import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatListQuery } from 'openland-api';

export const withChatsAll = graphqlRouted(ChatListQuery);