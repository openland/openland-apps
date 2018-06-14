import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Queries } from 'openland-api';

export const withSearch = graphqlRouted(Queries.Search.SearchQuery);