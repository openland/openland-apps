import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ResolveShortNameQuery } from 'openland-api';

export const withShortName = graphqlRouted(ResolveShortNameQuery, {
    params: ['shortname'],
    fetchPolicy: 'network-only',
});
