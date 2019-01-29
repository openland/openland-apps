import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { GlobalCounterQuery } from 'openland-api';

export const withNotificationCounter = graphqlRouted(GlobalCounterQuery);
