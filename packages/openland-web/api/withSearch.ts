import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Search } from 'openland-api';

export const withSearch = graphqlRouted(Search.SearchQuery);