import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Area from './Area';

export const AreaQuery = typedQuery<Types.AreaQuery, Types.AreaQueryVariables>(Area.AreaQuery);