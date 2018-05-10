import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Search from './Search';

export const SearchQuery = typedQuery<Types.SearchQuery, Types.SearchQueryVariables>(Search.SearchQuery);