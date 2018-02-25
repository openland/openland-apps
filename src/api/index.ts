import { MutationFunc } from 'react-apollo';
import { graphqlRouted } from '../utils/graphqlRouted';
import { graphqlMutation } from '../utils/graphqlMutation';
import { graphqlCompose3, graphqlCompose2 } from '../utils/graphqlCompose';
import * as Types from './Types';
import * as Area from './queries/Area';
import * as AreaStats from './queries/AreaStats';
import * as Organizations from './queries/Organizations';
import * as Permits from './queries/Permits';
import * as Projects from './queries/Projects';
import * as Account from './queries/Account';
import * as Parcels from './queries/Parcels';
import * as Search from './queries/Search';
import { graphql } from 'react-apollo';
import { graphQLTileSource } from '../utils/graphqlTileSource';

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

export const withBlocks = graphqlRouted<Types.BlocksConnectionQuery>(Parcels.BlocksConnection, ['page']);
export const withBlock = graphqlRouted<Types.BlockQuery>(Parcels.BlockQuery, ['blockId']);
export const withParcels = graphqlRouted<Types.ParcelsConnectionQuery>(Parcels.ParcelsConnection, ['page', 'query']);
export const withParcelRaw = graphqlRouted<Types.ParcelQuery>(Parcels.ParcelQuery, ['parcelId']);

export const withParcelsFavorites = graphqlRouted<Types.ParcelsFavoritesQuery>(Parcels.ParcelsFavorites);

// export const withParcelLikeMutations = graphqlCompose2(withParcelLikes, withParcelUnlikes);
export const withParcelLikes = graphql<{ doLike: MutationFunc<{}> }, { parcelId: string }>(Parcels.ParcelLike, {
    name: 'doLike',
    options: (props: { parcelId: string }) => {
        return {
            variables: {
                parcelId: props.parcelId
            },
            refetchQueries: [{ query: Parcels.ParcelsFavorites }]
        };
    }
});
export const withParcelUnlikes = graphql<{ doUnlike: MutationFunc<{}> }, { parcelId: string }>(Parcels.ParcelUnlike, {
    name: 'doUnlike',
    options: (props: { parcelId: string }) => {
        return {
            variables: {
                parcelId: props.parcelId
            },
            refetchQueries: [{ query: Parcels.ParcelsFavorites }]
        };
    }
});

export const withParcelLikesRouted = graphqlMutation<{ doLike: MutationFunc<{}> }>(Parcels.ParcelLike, {
    name: 'doLike',
    params: ['parcelId'],
    refetchQueries: [Parcels.ParcelsFavorites]
});
export const withParcelUnlikesRouted = graphqlMutation<{ doUnlike: MutationFunc<{}> }>(Parcels.ParcelUnlike, {
    name: 'doUnlike',
    params: ['parcelId'],
    refetchQueries: [Parcels.ParcelsFavorites]
});

export const withParcelDirect2 = graphql<Types.ParcelQuery, { parcelId: string }>(Parcels.ParcelQuery, {
    options: (props: { parcelId: string }) => ({
        variables: {
            parcelId: props.parcelId
        }
    })
});
export const withParcelDirect = graphqlCompose3(withParcelDirect2, withParcelLikes, withParcelUnlikes)
// export const withParcelLikes = graphqlMutation<{ doLike: MutationFunc<{}> }>(Parcels.ParcelLike, { name: 'doLike' });
// export const withParcelUnlikes = graphqlMutation<{ doUnlike: MutationFunc<{}> }>(Parcels.ParcelUnlike, { name: 'doUnlike' });

export const ParcelTileSource = graphQLTileSource<Types.ParcelsTileOverlayQuery>(Parcels.ParcelsTileOverlay);
export const ParcelPointSource = graphQLTileSource<Types.ParcelsPointOverlayQuery>(Parcels.ParcelsPointOverlay, true);
export const BlockTileSource = graphQLTileSource<Types.BlocksTileOverlayQuery>(Parcels.BlocksTileOverlay);

const ParcelMetadataAlter = graphqlMutation<{ parcelAlterMetadata: MutationFunc<Types.ParcelAlterMutationVariables> }>(Parcels.ParcelAlter, { name: 'parcelAlterMetadata', params: ['parcelId'] });
export const withParcelMetadataForm = graphqlCompose2(withParcelRaw, ParcelMetadataAlter);
export const withParcel = graphqlCompose3(withParcelRaw, withParcelLikesRouted, withParcelUnlikesRouted);

export const withParcelStats = graphql<Types.ParcelsStatsQuery, { query?: string }>(Parcels.ParcelsStats, {
    options: (props: { query?: string }) => ({
        variables: {
            query: props.query
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