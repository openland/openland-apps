import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as AreaStats from './AreaStats';

export const AreaStatsQuery = typedQuery<Types.AreaStatsQuery, Types.AreaStatsQueryVariables>(AreaStats.AreaStatsQuery);
export const InternalStatsQuery = typedQuery<Types.InternalStatsQuery, {}>(AreaStats.InternalStatsQuery);