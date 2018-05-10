import { graphql } from 'react-apollo';
import { MutationFunc } from 'react-apollo';
import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose3, graphqlCompose2, graphqlCompose4, graphqlCompose6 } from 'openland-x-graphql/graphqlCompose';
import { Queries } from 'openland-api';
import * as Types from 'openland-api/Types';

//
// Account
//

export const withAccountQuery = graphqlRouted<Types.AccountQuery>(Queries.Account.AccountQuery, []);

//
// Organizations
//

export const withOrganizations = graphqlRouted<Types.OrganizationsQuery>(Queries.Organizations.OrganizationsQuery);
export const withOrganization = graphqlRouted<Types.OrganizationQuery, Types.OrganizationQueryVariables>(Queries.Organizations.OrganizationQuery, ['orgId']);

export const withOrganizationAddMutation = graphqlMutation<{ add: MutationFunc<Types.OrganizationCreateMutationVariables> }, Types.OrganizationCreateMutationVariables>(
    Queries.Organizations.OrganizationCreateMutation, {
        name: 'add',
        refetchQueries: [Queries.Organizations.OrganizationsQuery]
    });
export const withOrganizationRemoveMutation = graphqlMutation<{ remove: MutationFunc<Types.OrganizationRemoveMutationVariables> }, Types.OrganizationRemoveMutationVariables>(
    Queries.Organizations.OrganizationRemoveMutation, {
        name: 'remove',
        refetchQueries: [Queries.Organizations.OrganizationsQuery],
        params: ['orgId']
    });
export const withOrganizationAlterMutation = graphqlMutation<{ alter: MutationFunc<Types.OrganizationAlterMutationVariables> }, Types.OrganizationAlterMutationVariables>(
    Queries.Organizations.OrganizationAlterMutation, {
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

export const withPermits = graphqlRouted<Types.PermitsConnectionQuery, Types.PermitsConnectionQueryVariables>(
    Queries.Permits.PermitsConnectionQuery, ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']);
export const withPermit = graphqlRouted<Types.PermitQuery, Types.PermitQueryVariables>(
    Queries.Permits.PermitQuery, ['permitId']);

//
// Projects
//

export const withBuildingProjects = graphqlRouted<Types.ProjectsConnectionQuery, Types.ProjectsConnectionQueryVariables>(
    Queries.Projects.ProjectsConnectionQuery, ['page', 'minUnits', { key: 'year', default: '2018' }, 'filter']);
export const withBuildingProject = graphqlRouted<Types.ProjectQuery, Types.ProjectQueryVariables>(
    Queries.Projects.ProjectQuery, ['projectId']);
export const withSFBuildingProjects = graphqlRouted<Types.ProjectsSFConnectionQuery, Types.ProjectsSFConnectionQueryVariables>(
    Queries.Projects.ProjectsSFConnectionQuery, ['page', 'minUnits', 'year', 'filter']);
export const withSFBuildingProject = graphqlRouted<Types.ProjectSFQuery, Types.ProjectSFQueryVariables>(
    Queries.Projects.ProjectSFQuery, ['projectId']);

//
// Blocks
//

export const withBlocks = graphqlRouted<Types.BlocksConnectionQuery, Types.BlocksConnectionQueryVariables>(
    Queries.Parcels.BlocksConnectionQuery, ['page']);
export const withBlock = graphqlRouted<Types.BlockQuery, Types.BlockQueryVariables>(
    Queries.Parcels.BlockQuery, ['blockId']);
export const withParcels = graphqlRouted<Types.ParcelsConnectionQuery, Types.ParcelsConnectionQueryVariables>(
    Queries.Parcels.ParcelsConnectionQuery, ['page', 'query']);
export const withParcelRaw = graphqlRouted<Types.ParcelQuery, Types.ParcelQueryVariables>(
    Queries.Parcels.ParcelQuery, ['parcelId']);
export const withParcelsFavorites = graphqlRouted<Types.ParcelsFavoritesQuery>(
    Queries.Parcels.ParcelsFavoritesQuery);
export const withParcelsFavroutesCount = graphqlRouted<Types.ParcelsFavoritesCountQuery>(
    Queries.Parcels.ParcelsFavoritesCountQuery);

// export const withParcelLikeMutations = graphqlCompose2(withParcelLikes, withParcelUnlikes);
export const withParcelLikes = graphqlMutation<{ doLike: MutationFunc<Types.ParcelLikeMutationVariables> }, Types.ParcelLikeMutationVariables>(Queries.Parcels.ParcelLikeMutation, {
    name: 'doLike',
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});
export const withParcelUnlikes = graphqlMutation<{ doUnlike: MutationFunc<Types.ParcelUnlikeMutationVariables> }, Types.ParcelUnlikeMutationVariables>(Queries.Parcels.ParcelUnlikeMutation, {
    name: 'doUnlike',
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});

export const withParcelLikesRouted = graphqlMutation<{ doLike: MutationFunc<Types.ParcelLikeMutationVariables> }, Types.ParcelLikeMutationVariables>(Queries.Parcels.ParcelLikeMutation, {
    name: 'doLike',
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});
export const withParcelUnlikesRouted = graphqlMutation<{ doUnlike: MutationFunc<Types.ParcelUnlikeMutationVariables> }, Types.ParcelUnlikeMutationVariables>(Queries.Parcels.ParcelUnlikeMutation, {
    name: 'doUnlike',
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});

export const withParcelDirect2 = graphqlRouted<Types.ParcelQuery, Types.ParcelQueryVariables>(Queries.Parcels.ParcelQuery);
export const withParcelDirect = graphqlCompose3(withParcelDirect2, withParcelLikes, withParcelUnlikes);
// export const withParcelLikes = graphqlMutation<{ doLike: MutationFunc<{}> }>(Parcels.ParcelLike, { name: 'doLike' });
// export const withParcelUnlikes = graphqlMutation<{ doUnlike: MutationFunc<{}> }>(Parcels.ParcelUnlike, { name: 'doUnlike' });

export const ParcelTileSource = graphQLTileSource<Types.ParcelsTileOverlayQuery>(Queries.Parcels.ParcelsTileOverlayQuery);
export const ParcelPointSource = graphQLTileSource<Types.ParcelsPointOverlayQuery>(Queries.Parcels.ParcelsPointOverlayQuery, { cluster: true });
export const BlockTileSource = graphQLTileSource<Types.BlocksTileOverlayQuery>(Queries.Parcels.BlocksTileOverlayQuery);

const ParcelMetadataAlter = graphqlMutation<{ parcelAlterMetadata: MutationFunc<Types.ParcelAlterMutationVariables> }, Types.ParcelAlterMutationVariables>(Queries.Parcels.ParcelAlterMutation, { name: 'parcelAlterMetadata', params: ['parcelId'] });
export const withParcelMetadataForm = graphqlCompose2(withParcelRaw, ParcelMetadataAlter);
export const withParcelNotes = graphqlMutation<{ parcelNotes: MutationFunc<Types.ParcelNotesMutationVariables> }, Types.ParcelNotesMutationVariables>(Queries.Parcels.ParcelNotesMutation, { name: 'parcelNotes', params: ['parcelId'] });
export const withParcel = graphqlCompose4(withParcelRaw, withParcelLikesRouted, withParcelUnlikesRouted, withParcelNotes);

export const withParcelStats = graphql<Types.ParcelsStatsQuery, { query?: string, state: string, county: string, city: string }>(Queries.Parcels.ParcelsStatsQuery, {
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

export const withSuperAdminAdd = graphqlMutation<{ add: MutationFunc<Types.SuperAdminAddMutationVariables> }, Types.SuperAdminAddMutationVariables>(
    Queries.Permissions.SuperAdminAddMutation, { name: 'add', refetchQueries: [Queries.Permissions.SuperAdminsQuery] });
export const withSuperAdminRemove = graphqlMutation<{ remove: MutationFunc<Types.SuperAdminRemoveMutationVariables> }, Types.SuperAdminRemoveMutationVariables>(
    Queries.Permissions.SuperAdminRemoveMutation, { name: 'remove', refetchQueries: [Queries.Permissions.SuperAdminsQuery] });

export const withSuperAccounts = graphqlRouted<Types.SuperAccountsQuery>(Queries.Permissions.SuperAccountsQuery);
export const withSuperAccount = graphqlRouted<Types.SuperAccountQuery, Types.SuperAccountQueryVariables>(Queries.Permissions.SuperAccountQuery, ['accountId']);

export const withSuperAccountAdd = graphqlMutation<{ add: MutationFunc<Types.SuperAccountAddMutationVariables> }, Types.SuperAccountAddMutationVariables>(
    Queries.Permissions.SuperAccountAddMutation, { name: 'add', refetchQueries: [Queries.Permissions.SuperAccountsQuery] });
export const withSuperAccountActivate = graphqlMutation<{ activate: MutationFunc<Types.SuperAccountActivateMutationVariables> }, Types.SuperAccountActivateMutationVariables>(
    Queries.Permissions.SuperAccountActivateMutation, { name: 'activate', params: ['accountId'] });
export const withSuperAccountSuspend = graphqlMutation<{ suspend: MutationFunc<Types.SuperAccountSuspendMutationVariables> }, Types.SuperAccountSuspendMutationVariables>(
    Queries.Permissions.SuperAccountSuspendMutation, { name: 'suspend', params: ['accountId'] });
export const withSuperAccountMemberAdd = graphqlMutation<{ add: MutationFunc<Types.SuperAccountMemberAddMutationVariables> }, Types.SuperAccountMemberAddMutationVariables>(
    Queries.Permissions.SuperAccountMemberAddMutation, { name: 'add', params: ['accountId'] });
export const withSuperAccountMemberRemove = graphqlMutation<{ remove: MutationFunc<Types.SuperAccountMemberRemoveMutationVariables> }, Types.SuperAccountMemberRemoveMutationVariables>(
    Queries.Permissions.SuperAccountMemberRemoveMutation, { name: 'remove', params: ['accountId'] });

export const withFeatureFlags = graphqlRouted<Types.FeatureFlagsQuery>(Queries.FeatureFlags.FeatureFlagsQuery);
export const withFeatureFlagAdd = graphqlMutation<{ add: MutationFunc<Types.FeatureFlagAddMutationVariables> }, Types.FeatureFlagAddMutationVariables>(
    Queries.FeatureFlags.FeatureFlagAddMutation, { name: 'add', refetchQueries: [Queries.FeatureFlags.FeatureFlagsQuery] });
export const withSuperAccountFeatureAdd = graphqlCompose2(
    graphqlMutation<{ add: MutationFunc<Types.FeatureFlagEnableMutationVariables> }, Types.FeatureFlagEnableMutationVariables>(
        Queries.FeatureFlags.FeatureFlagEnableMutation, { name: 'add', params: ['accountId'] }),
    withFeatureFlags);
export const withSuperAccountFeatureRemove = graphqlCompose2(
    graphqlMutation<{ remove: MutationFunc<Types.FeatureFlagDisableMutationVariables> }, Types.FeatureFlagDisableMutationVariables>(
        Queries.FeatureFlags.FeatureFlagDisableMutation, { name: 'remove', params: ['accountId'] }),
    withFeatureFlags);

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
export const withDeal = graphqlRouted<Types.DealQuery, Types.DealQueryVariables>(Queries.Deals.DealQuery, ['dealId']);
export const withDealAdd = graphqlMutation<{ add: MutationFunc<Types.AddDealMutationVariables> }, Types.AddDealMutationVariables>(
    Queries.Deals.AddDealMutation, { name: 'add', refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealRemove = graphqlMutation<{ remove: MutationFunc<Types.RemoveDealMutationVariables> }, Types.RemoveDealMutationVariables>(
    Queries.Deals.RemoveDealMutation, { name: 'remove', params: ['dealId'], refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealAlter = graphqlMutation<{ alter: MutationFunc<Types.AlterDealMutationVariables> }, Types.AlterDealMutationVariables>(
    Queries.Deals.AlterDealMutation, { name: 'alter', params: ['dealId'] });
export const withDealAlterCombined = graphqlCompose2(withDealAlter, withDeal);
export const ParcelSelect = graphqlSelect(Queries.Parcels.ParcelsSearchQuery);

//
// Sourcing
//

export const withProspectingStats = graphqlRouted<Types.OpportunityStatsQuery>(Queries.Sourcing.OpportunityStatsQuery);
export const withSourcing = graphqlRouted<Types.SourcingQuery, Types.SourcingQueryVariables>(Queries.Sourcing.SourcingQuery, ['filter', 'cursor', 'page', 'sort'], false, 'network-only');
export const withSourcingFirst = graphqlRouted<Types.SourcingFirstQuery, Types.SourcingFirstQueryVariables>(Queries.Sourcing.SourcingFirstQuery, ['filter', 'cursor', 'page', 'sort'], false, 'network-only');
export const withSourcingAll = graphqlRouted<Types.SourcingAllQuery, Types.SourcingAllQueryVariables>(Queries.Sourcing.SourcingAllQuery, [], false, 'network-only');
export const withSourcingCapacity = graphqlRouted<Types.ProspectingCapacityQuery, Types.ProspectingCapacityQueryVariables>(Queries.Sourcing.ProspectingCapacityQuery, [], false, 'network-only');
export const withAddOpportunity = graphqlMutation<{ add: MutationFunc<Types.AddOpportunityMutationVariables> }, Types.AddOpportunityMutationVariables>(
    Queries.Sourcing.AddOpportunityMutation, { name: 'add', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });

export const withNextOpportunity = graphqlRouted<Types.NextOpportunityQuery, Types.NextOpportunityQueryVariables>(Queries.Sourcing.NextOpportunityQuery, ['initialId', 'sort'], true, 'network-only');
export const withApproveOpportunity = graphqlMutation<{ approve: MutationFunc<Types.ApproveOpportunityMutationVariables> }, Types.ApproveOpportunityMutationVariables>(
    Queries.Sourcing.ApproveOpportunityMutation, { name: 'approve', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withRejectOpportunity = graphqlMutation<{ reject: MutationFunc<Types.RejectOpportunityMutationVariables> }, Types.RejectOpportunityMutationVariables>(
    Queries.Sourcing.RejectOpportunityMutation, { name: 'reject', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withSnoozeOpportunity = graphqlMutation<{ snooze: MutationFunc<Types.SnoozeOpportunityMutationVariables> }, Types.SnoozeOpportunityMutationVariables>(
    Queries.Sourcing.SnoozeOpportunityMutation, { name: 'snooze', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withResetOpportunity = graphqlMutation<{ reset: MutationFunc<Types.ResetOpportunityMutationVariables> }, Types.ResetOpportunityMutationVariables>(
    Queries.Sourcing.ResetOpportunityMutation, { name: 'reset', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withOpportunityByIdGet = graphqlRouted<Types.OpportunityQuery, Types.OpportunityQueryVariables>(Queries.Sourcing.OpportunityQuery, ['opportunityId']);

export const withOpportunity = graphqlCompose6(withNextOpportunity, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity, withParcelNotes, withResetOpportunity);
export const withOpportunityById = graphqlCompose4(withOpportunityByIdGet, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity);
export const withAddFromSearchOpportunity = graphqlMutation<{ addFromSearch: MutationFunc<Types.AddOpportunityFromSearchMutationVariables> }, Types.AddOpportunityFromSearchMutationVariables>(
    Queries.Sourcing.AddOpportunityFromSearchMutation, { name: 'addFromSearch', refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const SourcingTileSource = graphQLTileSource<Types.OpportunityTileOverlayQuery>(Queries.Sourcing.OpportunityTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});

export const OwnersSelect = graphqlSelect<Types.OwnersQueryVariables>(Queries.Sourcing.OwnersQuery);

// export const RejectButton = withRejectOpportunity((props)=>{
//     return (<XButton></XButton>);
// });

export const withDebugReaders = graphqlRouted<Types.DebugReadedStatesQuery>(Queries.Debug.DebugReadedStatesQuery);