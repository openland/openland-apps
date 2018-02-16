import { MutationFunc } from 'react-apollo';
import { graphqlRouted } from '../utils/graphqlRouted';
import { graphqlMutation } from '../utils/graphqlMutation';
import { graphqlCompose3 } from '../utils/graphqlCompose';
import * as Types from './Types';
import * as Area from './queries/Area';
import * as AreaStats from './queries/AreaStats';
import * as Organizations from './queries/Organizations';
import * as Permits from './queries/Permits';
import * as Projects from './queries/Projects';
import * as Account from './queries/Account';
import * as Blocks from './queries/Blocks';
import * as Search from './queries/Search';
import { graphql } from 'react-apollo';

//
// Area
//

export const withAreaQuery = graphqlRouted<Types.AreaQuery>(Area.AreaQuery, []);
export const withAreaStats = graphqlRouted<Types.AreaStatsQuery>(AreaStats.AreaStatsQuery, []);
export const withInternalStats = graphqlRouted<Types.InternalStatsQuery>(AreaStats.InternalStatsQuery, []);

//
// Account
//

export const withAccountQuery = graphqlRouted<Types.AccountQuery>(Account.AccountQuery, []);

//
// Organizations
//

export const withOrganizations = graphqlRouted<Types.OrganizationsQuery>(Organizations.OrganizationsQuery);
export const withOrganization = graphqlRouted<Types.OrganizationQuery>(Organizations.OrganizationQuery, ['orgId']);

export const withOrganizationAddMutation = graphqlMutation<{ add: MutationFunc<Types.OrganizationMutationAddMutationVariables> }>(
    Organizations.OrganizationMutationAdd, {
        name: 'add',
        refetchQueries: [Organizations.OrganizationsQuery]
    });
export const withOrganizationRemoveMutation = graphqlMutation<{ remove: MutationFunc<Types.OrganizationMutationRemoveMutationVariables> }>(
    Organizations.OrganizationMutationRemove, {
        name: 'remove',
        refetchQueries: [Organizations.OrganizationsQuery],
        params: ['orgId']
    });
export const withOrganizationAlterMutation = graphqlMutation<{ alter: MutationFunc<Types.OrganizationMutationAddMutationVariables> }>(
    Organizations.OrganizationMutationAlter, {
        name: 'alter',
        params: ['orgId']
    });

export const withOrganizationAlter = graphqlCompose3(
    withOrganization,
    withOrganizationAlterMutation,
    withOrganizationRemoveMutation);

//
// Permits
//

export const withPermits = graphqlRouted<Types.PermitsConnectionQuery>(Permits.PermitsConnection, ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']);
export const withPermit = graphqlRouted<Types.PermitQuery>(Permits.PermitQuery, ['permitId']);

//
// Projects
//

export const withBuildingProjects = graphqlRouted<Types.ProjectsConnectionQuery>(Projects.ProjectsConnection, ['page', 'minUnits', { key: 'year', default: '2018' }, 'filter']);
export const withBuildingProject = graphqlRouted<Types.ProjectQuery>(Projects.ProjectQuery, ['projectId']);
export const withSFBuildingProjects = graphqlRouted<Types.ProjectsSFConnectionQuery>(Projects.ProjectsSFConnection, ['page', 'minUnits', 'year', 'filter']);
export const withSFBuildingProject = graphqlRouted<Types.ProjectSFQuery>(Projects.ProjectSFQuery, ['projectId']);

//
// Blocks
//

export const withBlocks = graphqlRouted<Types.BlocksConnectionQuery>(Blocks.BlocksConnection, ['page']);
export const withBlock = graphqlRouted<Types.BlockQuery>(Blocks.BlockQuery, ['blockId']);
export const withParcels = graphqlRouted<Types.ParcelsConnectionQuery>(Blocks.ParcelsConnection, ['page']);
export const withParcel = graphqlRouted<Types.ParcelQuery>(Blocks.ParcelQuery, ['parcelId']);
export const withParcelDirect = graphql<Types.ParcelQuery, { parcelId: string }>(Blocks.ParcelQuery, {
    options: (props: { parcelId: string }) => ({
        variables: {
            parcelId: props.parcelId
        }
    })
});

//
// Pictures
//

export interface Picture {
    url: string;
    retina: string;
}

//
// Search
//

export const withSearch = graphql<Types.SearchQuery, { query: string }>(Search.SearchQuery, {
    options: (props: { query: string }) => {
        return {
            variables: {
                query: props.query
            }
        };
    }
});