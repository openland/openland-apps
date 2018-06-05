import { Queries } from 'openland-api';
import * as Types from 'openland-api/Types';
import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose3, graphqlCompose2, graphqlCompose4, graphqlCompose6, graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { graphQLMapSearchSource } from 'openland-x-graphql/graphqlMapSearchSource';
import { graphqlTask } from 'openland-x-graphql/graphqlTask';

//
// Account
//

export const withAccountQuery = graphqlRouted(Queries.Account.AccountQuery);

//
// Organizations
//

export const withOrganizations = graphqlRouted(Queries.Organizations.OrganizationsQuery);
export const withOrganization = graphqlRouted(Queries.Organizations.OrganizationQuery, ['orgId']);

export const withOrganizationAddMutation = graphqlMutation(Queries.Organizations.OrganizationCreateMutation, 'add', {
    refetchQueries: [Queries.Organizations.OrganizationsQuery]
});
export const withOrganizationRemoveMutation = graphqlMutation(Queries.Organizations.OrganizationRemoveMutation, 'remove', {
    params: ['orgId'],
    refetchQueries: [Queries.Organizations.OrganizationsQuery]
});
export const withOrganizationAlterMutation = graphqlMutation(Queries.Organizations.OrganizationAlterMutation, 'alter', {
    params: ['orgId']
});

export const withOrganizationAlter = graphqlCompose3(
    withOrganization,
    withOrganizationAlterMutation,
    withOrganizationRemoveMutation);

//
// Permits
//

export const withPermits = graphqlRouted(Queries.Permits.PermitsConnectionQuery, ['filter', 'cursor', 'page', 'type', 'sort', 'minUnits', 'issuedYear', 'fromPipeline']);
export const withPermit = graphqlRouted(Queries.Permits.PermitQuery, ['permitId']);

//
// Projects
//

export const withBuildingProjects = graphqlRouted(Queries.Projects.ProjectsConnectionQuery, ['page', 'minUnits', { key: 'year', default: '2018' }, 'filter']);
export const withBuildingProject = graphqlRouted(Queries.Projects.ProjectQuery, ['projectId']);
export const withSFBuildingProjects = graphqlRouted(Queries.Projects.ProjectsSFConnectionQuery, ['page', 'minUnits', 'year', 'filter']);
export const withSFBuildingProject = graphqlRouted(Queries.Projects.ProjectSFQuery, ['projectId']);

//
// Blocks
//

export const withBlocks = graphqlRouted(Queries.Parcels.BlocksConnectionQuery, ['page']);
export const withBlock = graphqlRouted(Queries.Parcels.BlockQuery, ['blockId']);
export const withParcels = graphqlRouted(Queries.Parcels.ParcelsConnectionQuery, ['page', 'query']);
export const withParcelRaw = graphqlRouted(Queries.Parcels.ParcelQuery, ['parcelId']);
export const withParcelsFavorites = graphqlRouted(Queries.Parcels.ParcelsFavoritesQuery);
export const withParcelsFavroutesCount = graphqlRouted(Queries.Parcels.ParcelsFavoritesCountQuery);

// export const withParcelLikeMutations = graphqlCompose2(withParcelLikes, withParcelUnlikes);
export const withParcelLikes = graphqlMutation(Queries.Parcels.ParcelLikeMutation, 'doLike', {
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});
export const withParcelUnlikes = graphqlMutation(Queries.Parcels.ParcelUnlikeMutation, 'doUnlike', {
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});

export const withParcelLikesRouted = graphqlMutation(Queries.Parcels.ParcelLikeMutation, 'doLike', {
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});
export const withParcelUnlikesRouted = graphqlMutation(Queries.Parcels.ParcelUnlikeMutation, 'doUnlike', {
    params: ['parcelId'],
    refetchQueries: [Queries.Parcels.ParcelsFavoritesQuery, Queries.Parcels.ParcelsFavoritesCountQuery]
});

export const withParcelDirect2 = graphqlRouted(Queries.Parcels.ParcelQuery);
export const withParcelDirect = graphqlCompose3(withParcelDirect2, withParcelLikes, withParcelUnlikes);
// export const withParcelLikes = graphqlMutation<{ doLike: MutationFunc<{}> }>(Parcels.ParcelLike, { name: 'doLike' });
// export const withParcelUnlikes = graphqlMutation<{ doUnlike: MutationFunc<{}> }>(Parcels.ParcelUnlike, { name: 'doUnlike' });

export const ParcelPointSource = graphQLTileSource(Queries.Parcels.ParcelsPointOverlayQuery, { cluster: true });

const ParcelMetadataAlter = graphqlMutation(Queries.Parcels.ParcelAlterMutation, 'parcelAlterMetadata', { params: ['parcelId'] });
export const withParcelMetadataForm = graphqlCompose2(withParcelRaw, ParcelMetadataAlter);
export const withParcelNotes = graphqlMutation(Queries.Parcels.ParcelNotesMutation, 'parcelNotes', { params: ['parcelId'] });
export const withParcel = graphqlCompose4(withParcelRaw, withParcelLikesRouted, withParcelUnlikesRouted, withParcelNotes);

export const withParcelStats = graphqlRouted(Queries.Parcels.ParcelsStatsQuery);

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

export const withSearch = graphqlRouted(Queries.Search.SearchQuery);

//
// Admin
//

export const withSuperAdmins = graphqlRouted(Queries.Permissions.SuperAdminsQuery);
export const UserSelect = graphqlSelect(Queries.User.UsersQuery);

export const withSuperAdminAdd = graphqlMutation(Queries.Permissions.SuperAdminAddMutation, 'add', { refetchQueries: [Queries.Permissions.SuperAdminsQuery] });
export const withSuperAdminRemove = graphqlMutation(Queries.Permissions.SuperAdminRemoveMutation, 'remove', { refetchQueries: [Queries.Permissions.SuperAdminsQuery] });

export const withSuperAccounts = graphqlRouted(Queries.Permissions.SuperAccountsQuery);
export const withSuperAccount = graphqlRouted(Queries.Permissions.SuperAccountQuery, ['accountId']);

export const withSuperAccountAdd =
    graphqlMutation(Queries.Permissions.SuperAccountAddMutation, 'add', { refetchQueries: [Queries.Permissions.SuperAccountsQuery] });
export const withSuperAccountRename =
    graphqlMutation(Queries.Permissions.SuperAccountRenameMutation, 'rename', { params: ['accountId'] });
export const withSuperAccountActivate =
    graphqlMutation(Queries.Permissions.SuperAccountActivateMutation, 'activate', { params: ['accountId'] });
export const withSuperAccountSuspend =
    graphqlMutation(Queries.Permissions.SuperAccountSuspendMutation, 'suspend', { params: ['accountId'] });
export const withSuperAccountMemberAdd =
    graphqlMutation(Queries.Permissions.SuperAccountMemberAddMutation, 'add', { params: ['accountId'] });
export const withSuperAccountMemberRemove =
    graphqlMutation(Queries.Permissions.SuperAccountMemberRemoveMutation, 'remove', { params: ['accountId'] });

export const withFeatureFlags = graphqlRouted(Queries.FeatureFlags.FeatureFlagsQuery);
export const withFeatureFlagAdd = graphqlMutation(Queries.FeatureFlags.FeatureFlagAddMutation, 'add', { refetchQueries: [Queries.FeatureFlags.FeatureFlagsQuery] });
export const withSuperAccountFeatureAdd = graphqlCompose2(
    graphqlMutation(Queries.FeatureFlags.FeatureFlagEnableMutation, 'add', { params: ['accountId'] }),
    withFeatureFlags);
export const withSuperAccountFeatureRemove = graphqlCompose2(
    graphqlMutation(Queries.FeatureFlags.FeatureFlagDisableMutation, 'remove', { params: ['accountId'] }),
    withFeatureFlags);

//
// Addressing
//

export const StateSelect = graphqlSelect(Queries.Addressing.StateQuery);
export const CountySelect = graphqlSelect<{ stateId: string }>(Queries.Addressing.CountyQuery);

//
// Deals
//

export const withDeals = graphqlRouted(Queries.Deals.AllDealsQuery);
export const withDealsMap = graphqlRouted(Queries.Deals.AllDealsMapQuery);
export const withDeal = graphqlRouted(Queries.Deals.DealQuery, ['dealId']);
export const withDealAdd = graphqlMutation(Queries.Deals.AddDealMutation, 'add', { refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealRemove = graphqlMutation(Queries.Deals.RemoveDealMutation, 'remove', { params: ['dealId'], refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealAlter = graphqlMutation(Queries.Deals.AlterDealMutation, 'alter', { params: ['dealId'] });
export const withDealAlterCombined = graphqlCompose2(withDealAlter, withDeal);
export const ParcelSelect = graphqlSelect(Queries.Parcels.ParcelsSearchQuery);

//
// Sourcing
//

export const withProspectingStats = graphqlRouted(Queries.Sourcing.OpportunityStatsQuery);
export const withSourcing = graphqlRouted(Queries.Sourcing.SourcingQuery, ['filter', 'cursor', 'page', 'sort'], false, 'network-only');
export const withSourcingFirst = graphqlRouted(Queries.Sourcing.SourcingFirstQuery, ['filter', 'cursor', 'page', 'sort'], false, 'network-only');
export const withSourcingAll = graphqlRouted(Queries.Sourcing.SourcingAllQuery, [], false, 'network-only');
export const withSourcingAllReport = graphqlRouted(Queries.Sourcing.SourcingAllReportQuery, [], false, 'network-only');
export const withSourcingCapacity = graphqlRouted(Queries.Sourcing.ProspectingCapacityQuery, [], false, 'network-only');
export const withAddOpportunity = graphqlMutation(Queries.Sourcing.AddOpportunityMutation, 'add', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });

export const withNextOpportunity = graphqlRouted(Queries.Sourcing.NextOpportunityQuery, ['initialId', 'sort'], true, 'network-only');
export const withApproveOpportunity = graphqlMutation(Queries.Sourcing.ApproveOpportunityMutation, 'approve', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withRejectOpportunity = graphqlMutation(Queries.Sourcing.RejectOpportunityMutation, 'reject', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withSnoozeOpportunity = graphqlMutation(Queries.Sourcing.SnoozeOpportunityMutation, 'snooze', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withResetOpportunity = graphqlMutation(Queries.Sourcing.ResetOpportunityMutation, 'reset', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withOpportunityByIdGet = graphqlRouted(Queries.Sourcing.OpportunityQuery, ['opportunityId']);

export const withOpportunity = graphqlCompose6(withNextOpportunity, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity, withParcelNotes, withResetOpportunity);
export const withOpportunityById = graphqlCompose4(withOpportunityByIdGet, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity);
export const withAddFromSearchOpportunity = graphqlMutation(Queries.Sourcing.AddOpportunityFromSearchMutation, 'addFromSearch', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const SourcingTileSource = graphQLTileSource(Queries.Sourcing.OpportunityTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});

export const OwnersSelect = graphqlSelect<Types.OwnersQueryVariables>(Queries.Sourcing.OwnersQuery);

// export const RejectButton = withRejectOpportunity((props)=>{
//     return (<XButton></XButton>);
// });

export const withDebugReaders = graphqlRouted(Queries.Debug.DebugReadedStatesQuery);
export const withSuperCities = graphqlRouted(Queries.SuperCity.SuperCitiesQuery);
export const withFolders = graphqlRouted(Queries.Folder.FoldersQuery);
export const withFolder = graphqlRouted(Queries.Folder.FolderQuery, [], true, 'network-only');

export const withCreateFolderMutation = graphqlMutation(Queries.Folder.CreateFolderMutation, 'createFolder', { refetchQueries: [Queries.Folder.FoldersQuery] });
export const withDeleteFolderMutation = graphqlMutation(Queries.Folder.DeleteFolderMutation, 'deleteFolder', { refetchQueries: [Queries.Folder.FoldersQuery] });
export const withAlterFolderMutation = graphqlMutation(Queries.Folder.AlterFolderMutation, 'alterFolder', { refetchQueries: [Queries.Folder.FoldersQuery] });
export const withAddToFolderMutation = graphqlMutation(Queries.Folder.AddToFolderMutation, 'addToFolder', { refetchQueries: [Queries.Folder.FoldersQuery] });
export const withAddToFolderFromSearchMutation = graphqlMutation(Queries.Folder.AddToFolderFromSearchMutation, 'addToFolderFromSearch', { refetchQueries: [Queries.Folder.FoldersQuery] });
export const withCreateFolderFromSearchMutation = graphqlMutation(Queries.Folder.CreateFolderFromSearchMutation, 'createFolderFromSearch', { refetchQueries: [Queries.Folder.FoldersQuery] });
export const withSetFolderMutation = graphqlMutation(Queries.Folder.SetParcelFolderMutation, 'setFolder', { refetchQueries: [Queries.Folder.FoldersQuery] });
export const withFolderActions = graphqlCompose5(withCreateFolderMutation, withDeleteFolderMutation, withAlterFolderMutation, withAddToFolderMutation, withSetFolderMutation);
export const FolderSelect = graphqlSelect<{}>(Queries.Folder.FoldersSelectQuery);
export const FolderTileSource = graphQLTileSource(Queries.Folder.FolderTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});

export const withFolderItems = graphqlRouted(Queries.Folder.FolderItemsConnectionQuery, ['folderId', 'page', 'cursor'], true, 'network-only');

export const ParcelMapSearch = graphQLMapSearchSource(Queries.Parcels.ParcelsMapSearchQuery);

export const withSampleTask = graphqlTask(Queries.Tasks.SampleTask);
export const withFolderExportTask = graphqlTask(Queries.Tasks.FolderExportTask);

export const withSaveProfile = graphqlMutation(Queries.Account.SaveProfileMutation, 'saveProfile', { refetchQueries: [Queries.Account.AccountQuery] });
export const withCreateProfile = graphqlCompose2(graphqlMutation(Queries.Account.SaveProfileMutation, 'createProfile'), graphqlRouted(Queries.Account.ProfilePrefillQuery));
export const withDebugAccounts = graphqlRouted(Queries.Debug.DebugOwnAccountsQuery);