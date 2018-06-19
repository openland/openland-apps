import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SearchQuery } from 'openland-api/SearchQuery';

export const withSearch = graphqlRouted(SearchQuery);