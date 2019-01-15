import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { MyAppsQuery } from 'openland-api/MyAppsQuery';

export const withMyApps = graphqlRouted(MyAppsQuery);
