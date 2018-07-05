import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ChatOrganizationQuery } from 'openland-api/ChatOrganizationQuery';

export const withChatOrganization = graphqlRouted(ChatOrganizationQuery);