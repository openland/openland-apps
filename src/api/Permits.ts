import { graphqlRouted } from '../utils/graphqlRouted';
import * as Queries from './queries/Permits';
import * as Types from './queries/Types';

export const withPermitsPagedQuery = graphqlRouted<Types.PermitsConnectionQuery>(Queries.PermitsConnection, ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']);
export const withPermitQuery = graphqlRouted<Types.PermitQuery>(Queries.PermitQuery, ['permitId']);