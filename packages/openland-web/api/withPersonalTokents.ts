import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { PersonalTokensQuery } from 'openland-api';

export const withPersonalTokens = graphqlRouted(PersonalTokensQuery);