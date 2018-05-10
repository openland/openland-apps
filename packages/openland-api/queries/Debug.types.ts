import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Debug from './Debug';

export const DebugReadedStatesQuery = typedQuery<Types.DebugReadedStatesQuery, {}>(Debug.DebugReadedStatesQuery);