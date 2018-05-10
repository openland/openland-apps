import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Addressing from './Addressing';

export const StateQuery = typedQuery<Types.StateQuery, {}>(Addressing.StateQuery);
export const CountyQuery = typedQuery<Types.CountyQuery, Types.CountyQueryVariables>(Addressing.CountyQuery);