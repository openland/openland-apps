import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { MyAppsQuery } from 'openland-api';

export const withMyApps = graphqlRouted(MyAppsQuery);
