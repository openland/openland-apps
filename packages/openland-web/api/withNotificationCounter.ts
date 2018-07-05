import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { GlobalCounterQuery } from 'openland-api/GlobalCounterQuery';

export const withNotificationCounter = graphqlRouted(GlobalCounterQuery);