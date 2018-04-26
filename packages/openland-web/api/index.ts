import { graphql } from 'react-apollo';
import { MutationFunc } from 'react-apollo';
import { graphQLTileSource } from '../utils/graphqlTileSource';
import { graphqlSelect } from '../utils/graphqlSelect';
import { graphqlRouted } from '../utils/graphqlRouted';
import { graphqlMutation } from '../utils/graphqlMutation';
import { graphqlCompose3, graphqlCompose2, graphqlCompose4, graphqlCompose5 } from '../utils/graphqlCompose';
import Types, { Queries } from 'openland-api';

//
// Area
//

export const withAreaQuery = graphqlRouted<Types.AreaQuery>(Queries.Area.AreaQuery, []);
export const withAreaStats = graphqlRouted<Types.AreaStatsQuery>(Queries.AreaStats.AreaStatsQuery, []);
export const withInternalStats = graphqlRouted<Types.InternalStatsQuery>(Queries.AreaStats.InternalStatsQuery, []);

//
// Account
//

export const withAccountQuery = graphqlRouted<Types.AccountQuery>(Queries.Account.AccountQuery, []);

//
// Organizations
//

export const withOrganizations = graphqlRouted<Types.OrganizationsQuery>(Queries.Organizations.OrganizationsQuery);
export const withOrganization = graphqlRouted<Types.OrganizationQuery>(Queries.Organizations.OrganizationQuery, ['orgId']);

export const withOrganizationAddMutation = graphqlMutation<{ add: MutationFunc<Types.OrganizationMutationAddMutationVariables> }>(
    Queries.Organizations.OrganizationMutationAdd, {
        name: 'add',
        refetchQueries: [Queries.Organizations.OrganizationsQuery]
    });
export const withOrganizationRemoveMutation = graphqlMutation<{ remove: MutationFunc<Types.OrganizationMutationRemoveMutationVariables> }>(
    Queries.Organizations.OrganizationMutationRemove, {
        name: 'remove',
        refetchQueries: [Queries.Organizations.OrganizationsQuery],
        params: ['orgId']
    });
export const withOrganizationAlterMutation = graphqlMutation<{ alter: MutationFunc<Types.OrganizationMutationAddMutationVariables> }>(
    Queries.Organizations.OrganizationMutationAlter, {
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

export const withPermits = graphqlRouted<Types.PermitsConnectionQuery>(Queries.Permits.PermitsConnection, ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']);
export const withPermit = graphqlRouted<Types.PermitQuery>(Queries.Permits.PermitQuery, ['permitId']);

//
// Projects
//

export const withBuildingProjects = graphqlRouted<Types.ProjectsConnectionQuery>(Queries.Projects.ProjectsConnection, ['page', 'minUnits', { key: 'year', default: '2018' }, 'filter']);
export const withBuildingProject = graphqlRouted<Types.ProjectQuery>(Queries.Projects.ProjectQuery, ['projectId']);
export const withSFBuildingProjects = graphqlRouted<Types.ProjectsSFConnectionQuery>(Queries.Projects.ProjectsSFConnection, ['page', 'minUnits', 'year', 'filter']);
export const withSFBuildingProject = graphqlRouted<Types.ProjectSFQuery>(Queries.Projects.ProjectSFQuery, ['projectId']);

//
// Blocks
//

export const withBlocks = graphqlRouted<Types.BlocksConnectionQuery>(Queries.Parcels.BlocksConnection, ['page']);
export const withBlock = graphqlRouted<Types.BlockQuery>(Queries.Parcels.BlockQuery, ['blockId']);
export const withParcels = graphqlRouted<Types.ParcelsConnectionQuery>(Queries.Parcels.ParcelsConnection, ['page', 'query']);
export const withParcelRaw = graphqlRouted<Types.ParcelQuery>(Queries.Parcels.ParcelQuery, ['parcelId']);
export const withParcelsFavorites = graphqlRouted<Types.ParcelsFavoritesQuery>(Queries.Parcels.ParcelsFavorites);
export const withParcelsFavroutesCount = graphqlRouted<Types.ParcelsFavoritesCountQuery>(Queries.Parcels.ParcelsFavoritesCount);

// export const withParcelLikeMutations = graphqlCompose2(withParcelLikes, withParcelUnlikes);
export const withParcelLikes = graphql<{ doLike: MutationFunc<{}> }, { parcelId: string }>(Queries.Parcels.ParcelLike, {
    name: 'doLike',
    options: (props: { parcelId: string }) => {
        return {
            variables: {
                parcelId: props.parcelId
            },
            refetchQueries: [{ query: Queries.Parcels.ParcelsFavorites }, { query: Queries.Parcels.ParcelsFavoritesCount }]
        };
    }
});
export const withParcelUnlikes = graphql<{ doUnlike: MutationFunc<{}> }, { parcelId: string }>(Queries.Parcels.ParcelUnlike, {
    name: 'doUnlike',
    options: (props: { parcelId: string }) => {
        return {
            variables: {
                parcelId: props.parcelId
            },
            refetchQueries: [{ query: Queries.Parcels.ParcelsFavorites }, { query: Queries.Parcels.ParcelsFavoritesCount }]
        };
    }
});

export const withParcelLikesRouted = graphqlMutation<{ doLike: MutationFunc<{}> }>(Queries.Parcels.ParcelLike, {
    name: 'doLike',
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavorites, Queries.Parcels.ParcelsFavoritesCount]
});
export const withParcelUnlikesRouted = graphqlMutation<{ doUnlike: MutationFunc<{}> }>(Queries.Parcels.ParcelUnlike, {
    name: 'doUnlike',
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavorites, Queries.Parcels.ParcelsFavoritesCount]
});

export const withParcelDirect2 = graphql<Types.ParcelQuery, { parcelId: string }>(Queries.Parcels.ParcelQuery, {
    options: (props: { parcelId: string }) => ({
        variables: {
            parcelId: props.parcelId
        }
    })
});
export const withParcelDirect = graphqlCompose3(withParcelDirect2, withParcelLikes, withParcelUnlikes);
// export const withParcelLikes = graphqlMutation<{ doLike: MutationFunc<{}> }>(Parcels.ParcelLike, { name: 'doLike' });
// export const withParcelUnlikes = graphqlMutation<{ doUnlike: MutationFunc<{}> }>(Parcels.ParcelUnlike, { name: 'doUnlike' });

export const ParcelTileSource = graphQLTileSource<Types.ParcelsTileOverlayQuery>(Queries.Parcels.ParcelsTileOverlay);
export const ParcelPointSource = graphQLTileSource<Types.ParcelsPointOverlayQuery>(Queries.Parcels.ParcelsPointOverlay, { cluster: true });
export const BlockTileSource = graphQLTileSource<Types.BlocksTileOverlayQuery>(Queries.Parcels.BlocksTileOverlay);

const ParcelMetadataAlter = graphqlMutation<{ parcelAlterMetadata: MutationFunc<Types.ParcelAlterMutationVariables> }>(Queries.Parcels.ParcelAlter, { name: 'parcelAlterMetadata', params: ['parcelId'] });
export const withParcelMetadataForm = graphqlCompose2(withParcelRaw, ParcelMetadataAlter);
export const withParcelNotes = graphqlMutation<{ parcelNotes: MutationFunc<any> }>(Queries.Parcels.ParcelNotes, { name: 'parcelNotes', params: ['parcelId'] });
export const withParcel = graphqlCompose4(withParcelRaw, withParcelLikesRouted, withParcelUnlikesRouted, withParcelNotes);

export const withParcelStats = graphql<Types.ParcelsStatsQuery, { query?: string, state: string, county: string, city: string }>(Queries.Parcels.ParcelsStats, {
    options: (props: { query?: string, state: string, county: string, city: string }) => ({
        variables: {
            query: props.query,
            state: props.state,
            county: props.county,
            city: props.city
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

export const withSearch = graphql<Types.SearchQuery, { query: string }>(Queries.Search.SearchQuery, {
    options: (props: { query: string }) => {
        return {
            variables: {
                query: props.query
            }
        };
    }
});

//
// Admin
//

export const withSuperAdmins = graphqlRouted<Types.SuperAdminsQuery>(Queries.Permissions.SuperAdminsQuery);
export const UserSelect = graphqlSelect(Queries.User.UsersQuery);
export const withSuperAdminAdd = graphqlMutation<{ add: MutationFunc<{}> }>(Queries.Permissions.SuperAdminAdd, { name: 'add', refetchQueries: [Queries.Permissions.SuperAdminsQuery] });
export const withSuperAdminRemove = graphqlMutation<{ remove: MutationFunc<{}> }>(Queries.Permissions.SuperAdminRemove, { name: 'remove', refetchQueries: [Queries.Permissions.SuperAdminsQuery] });

export const withSuperAccounts = graphqlRouted<Types.SuperAccountsQuery>(Queries.Permissions.SuperAccountsQuery);
export const withSuperAccount = graphqlRouted<Types.SuperAccountQuery>(Queries.Permissions.SuperAccountQuery, ['accountId']);
export const withSuperAccountAdd = graphqlMutation<{ add: MutationFunc<{}> }>(Queries.Permissions.SuperAccountAdd, { name: 'add', refetchQueries: [Queries.Permissions.SuperAccountsQuery] });

export const withSuperAccountActivate = graphqlMutation<{ activate: MutationFunc<{}> }>(Queries.Permissions.SuperAccountActivate, { name: 'activate', params: ['accountId'] });
export const withSuperAccountSuspend = graphqlMutation<{ suspend: MutationFunc<{}> }>(Queries.Permissions.SuperAccountSuspend, { name: 'suspend', params: ['accountId'] });
export const withSuperAccountMemberAdd = graphqlMutation<{ add: MutationFunc<{}> }>(Queries.Permissions.SuperAccountMemberAdd, { name: 'add', params: ['accountId'] });
export const withSuperAccountMemberRemove = graphqlMutation<{ remove: MutationFunc<{}> }>(Queries.Permissions.SuperAccountMemberRemove, { name: 'remove', params: ['accountId'] });

export const withFeatureFlags = graphqlRouted<Types.FeatureFlagsQuery>(Queries.FeatureFlags.FeatureFlagsQuery);
export const withFeatureFlagAdd = graphqlMutation<{ add: MutationFunc<{}> }>(Queries.FeatureFlags.FeatureFlagAdd, { name: 'add', refetchQueries: [Queries.FeatureFlags.FeatureFlagsQuery] });
export const withSuperAccountFeatureAdd = graphqlCompose2(graphqlMutation<{ add: MutationFunc<{}> }>(Queries.FeatureFlags.FeatureFlagOrganizationAdd, { name: 'add', params: ['accountId'] }), withFeatureFlags);
export const withSuperAccountFeatureRemove = graphqlCompose2(graphqlMutation<{ remove: MutationFunc<{}> }>(Queries.FeatureFlags.FeatureFlagOrganizationRemove, { name: 'remove', params: ['accountId'] }), withFeatureFlags);

//
// Addressing
//

export const StateSelect = graphqlSelect(Queries.Addressing.StateQuery);
export const CountySelect = graphqlSelect<{ stateId: string }>(Queries.Addressing.CountyQuery);

//
// Deals
//

export const withDeals = graphqlRouted<Types.AllDealsQuery>(Queries.Deals.AllDealsQuery);
export const withDealsMap = graphqlRouted<Types.AllDealsMapQuery>(Queries.Deals.AllDealsMapQuery);
export const withDeal = graphqlRouted<Types.DealQuery>(Queries.Deals.DealQuery, ['dealId']);
export const withDealAdd = graphqlMutation<{ add: MutationFunc<{}> }>(Queries.Deals.AddDealMitation, { name: 'add', refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealRemove = graphqlMutation<{ remove: MutationFunc<{}> }>(Queries.Deals.RemoveDealMutation, { name: 'remove', params: ['dealId'], refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealAlter = graphqlMutation<{ alter: MutationFunc<{}> }>(Queries.Deals.AlterDealMitation, { name: 'alter', params: ['dealId'] });
export const withDealAlterCombined = graphqlCompose2(withDealAlter, withDeal);
export const ParcelSelect = graphqlSelect(Queries.Parcels.ParcelsSearchQuery);

//
// Sourcing
//

export const withProspectingStats = graphqlRouted<Types.OpportunityStatsQuery>(Queries.Sourcing.OpportunityStatsQuery);
export const withSourcing = graphqlRouted<Types.SourcingQuery>(Queries.Sourcing.SourcingQuery, ['filter', 'cursor', 'page', 'sort'], false, 'network-only');
export const withAddOpportunity = graphqlMutation<{ add: MutationFunc<{}> }>(Queries.Sourcing.AddOpportunityMutation, { name: 'add', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });

export const withNextOpportunity = graphqlRouted<Types.NextOpportunityQuery>(Queries.Sourcing.NextOpportunityQuery, ['initialId', 'sort'], true, 'network-only');
export const withApproveOpportunity = graphqlMutation<{ approve: MutationFunc<{}> }>(Queries.Sourcing.ApproveOpportunityMutation, { name: 'approve', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withRejectOpportunity = graphqlMutation<{ reject: MutationFunc<{}> }>(Queries.Sourcing.RejectOpportunityMutation, { name: 'reject', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withSnoozeOpportunity = graphqlMutation<{ snooze: MutationFunc<{}> }>(Queries.Sourcing.SnoozeOpportunityMutation, { name: 'snooze', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withOpportunityByIdGet = graphqlRouted<Types.OpportunityQuery>(Queries.Sourcing.OpportunityQuery, ['opportunityId']);

export const withOpportunity = graphqlCompose5(withNextOpportunity, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity, withParcelNotes);
export const withOpportunityById = graphqlCompose4(withOpportunityByIdGet, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity);
export const withAddFromSearchOpportunity = graphqlMutation<{ addFromSearch: MutationFunc<{}> }>(Queries.Sourcing.AddOpportunityFromSearchMutation, { name: 'addFromSearch', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const SourcingTileSource = graphQLTileSource<Types.OpportunityTileOverlayQuery>(Queries.Sourcing.OpportunityTileOverlay, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});

export const OwnersSelect = graphqlSelect<Types.OwnersQueryQueryVariables>(Queries.Sourcing.OwnersQuery);

// export const RejectButton = withRejectOpportunity((props)=>{
//     return (<XButton></XButton>);
// });