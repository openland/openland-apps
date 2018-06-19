import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Debug } from 'openland-api';

export const withDebugReaders = graphqlRouted(Debug.DebugReadedStatesQuery);