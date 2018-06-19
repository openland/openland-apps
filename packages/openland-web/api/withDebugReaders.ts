import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { DebugReadedStatesQuery } from 'openland-api/DebugReadedStatesQuery';

export const withDebugReaders = graphqlRouted(DebugReadedStatesQuery);