import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperCitiesQuery } from 'openland-api/SuperCitiesQuery';

export const withSuperCities = graphqlRouted(SuperCitiesQuery);