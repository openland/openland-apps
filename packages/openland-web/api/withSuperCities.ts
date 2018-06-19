import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperCity } from 'openland-api';

export const withSuperCities = graphqlRouted(SuperCity.SuperCitiesQuery);