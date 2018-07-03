import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AllChatsQuery } from 'openland-api/AllChatsQuery';

export const withAllChats = graphqlRouted(AllChatsQuery);