import { graphqlList, graphqlListPaged } from '../utils/graphqlList';
import { graphqlRouted } from '../utils/graphqlRouted';
import { Chart } from './Chart';
import * as Queries from './queries/Permits';
import * as Types from './queries/Types';

export interface PermitsStats {
    stats: {
        approvalTimes: Chart;
        approvalDistribution: Chart;
    }
}
export const withPermitsQuery = graphqlList<Types.PermitShortFragment, PermitsStats>(Queries.PermitsConnection, {
    params: ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']
});
export const withPermitsPagedQuery = graphqlListPaged<Types.PermitShortFragment, PermitsStats>(Queries.PermitsConnection, ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']);
export const withPermitQuery = graphqlRouted<Types.PermitQuery>(Queries.PermitQuery, ['permitId']);