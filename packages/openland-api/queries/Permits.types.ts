import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Permits from './Permits';

export const PermitQuery = typedQuery<Types.PermitQuery, Types.PermitQueryVariables>(Permits.PermitQuery);
export const PermitsConnectionQuery = typedQuery<Types.PermitsConnectionQuery, Types.PermitsConnectionQuery>(Permits.PermitsConnectionQuery);