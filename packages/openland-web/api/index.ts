import * as Types from 'openland-api/Types';
import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2, graphqlCompose4, graphqlCompose6, graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { graphQLMapSearchSource } from 'openland-x-graphql/graphqlMapSearchSource';
import { graphqlTask } from 'openland-x-graphql/graphqlTask';
import { withParcelNotes } from './withParcelNotes';
import { Permissions, FeatureFlags, Addressing, Deals, Parcels, Sourcing, Debug, SuperCity, Folder, Tasks, Account, Settings } from 'openland-api';

//
// Admin
//

export const withSuperAccountAdd =
    graphqlMutation(Permissions.SuperAccountAddMutation, 'add', { refetchQueries: [Permissions.SuperAccountsQuery] });
export const withSuperAccountRename =
    graphqlMutation(Permissions.SuperAccountRenameMutation, 'rename', { params: ['accountId'] });
export const withSuperAccountActivate =
    graphqlMutation(Permissions.SuperAccountActivateMutation, 'activate', { params: ['accountId'] });
export const withSuperAccountSuspend =
    graphqlMutation(Permissions.SuperAccountSuspendMutation, 'suspend', { params: ['accountId'] });
export const withSuperAccountMemberAdd =
    graphqlMutation(Permissions.SuperAccountMemberAddMutation, 'add', { params: ['accountId'] });
export const withSuperAccountMemberRemove =
    graphqlMutation(Permissions.SuperAccountMemberRemoveMutation, 'remove', { params: ['accountId'] });

export const withFeatureFlags = graphqlRouted(FeatureFlags.FeatureFlagsQuery);
export const withFeatureFlagAdd = graphqlMutation(FeatureFlags.FeatureFlagAddMutation, 'add', { refetchQueries: [FeatureFlags.FeatureFlagsQuery] });
export const withSuperAccountFeatureAdd = graphqlCompose2(
    graphqlMutation(FeatureFlags.FeatureFlagEnableMutation, 'add', { params: ['accountId'] }),
    withFeatureFlags);
export const withSuperAccountFeatureRemove = graphqlCompose2(
    graphqlMutation(FeatureFlags.FeatureFlagDisableMutation, 'remove', { params: ['accountId'] }),
    withFeatureFlags);

//
// Addressing
//

export const StateSelect = graphqlSelect(Addressing.StateQuery);
export const CountySelect = graphqlSelect<{ stateId: string }>(Addressing.CountyQuery);

//
// Deals
//

export const withDeals = graphqlRouted(Deals.AllDealsQuery);
export const withDealsMap = graphqlRouted(Deals.AllDealsMapQuery);
export const withDeal = graphqlRouted(Deals.DealQuery, { params: ['dealId'] });
export const withDealAdd = graphqlMutation(Deals.AddDealMutation, 'add', { refetchQueries: [Deals.AllDealsQuery] });
export const withDealRemove = graphqlMutation(Deals.RemoveDealMutation, 'remove', { params: ['dealId'], refetchQueries: [Deals.AllDealsQuery] });
export const withDealAlter = graphqlMutation(Deals.AlterDealMutation, 'alter', { params: ['dealId'] });
export const withDealAlterCombined = graphqlCompose2(withDealAlter, withDeal);
export const ParcelSelect = graphqlSelect(Parcels.ParcelsSearchQuery);

//
// Sourcing
//

export const withProspectingStats = graphqlRouted(Sourcing.OpportunityStatsQuery);
export const withSourcing = graphqlRouted(Sourcing.SourcingQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});
export const withSourcingFirst = graphqlRouted(Sourcing.SourcingFirstQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});
export const withSourcingAll = graphqlRouted(Sourcing.SourcingAllQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });
export const withSourcingAllReport = graphqlRouted(Sourcing.SourcingAllReportQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });
export const withSourcingCapacity = graphqlRouted(Sourcing.ProspectingCapacityQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });
export const withAddOpportunity = graphqlMutation(Sourcing.AddOpportunityMutation, 'add', { refetchQueries: [Sourcing.OpportunityStatsQuery] });

export const withNextOpportunity = graphqlRouted(Sourcing.NextOpportunityQuery, { params: ['initialId', 'sort'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });
export const withApproveOpportunity = graphqlMutation(Sourcing.ApproveOpportunityMutation, 'approve', { refetchQueries: [Sourcing.OpportunityStatsQuery] });
export const withRejectOpportunity = graphqlMutation(Sourcing.RejectOpportunityMutation, 'reject', { refetchQueries: [Sourcing.OpportunityStatsQuery] });
export const withSnoozeOpportunity = graphqlMutation(Sourcing.SnoozeOpportunityMutation, 'snooze', { refetchQueries: [Sourcing.OpportunityStatsQuery] });
export const withResetOpportunity = graphqlMutation(Sourcing.ResetOpportunityMutation, 'reset', { refetchQueries: [Sourcing.OpportunityStatsQuery] });
export const withOpportunityByIdGet = graphqlRouted(Sourcing.OpportunityQuery, { params: ['opportunityId'] });

export const withOpportunity = graphqlCompose6(withNextOpportunity, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity, withParcelNotes, withResetOpportunity);
export const withOpportunityById = graphqlCompose4(withOpportunityByIdGet, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity);
export const withAddFromSearchOpportunity = graphqlMutation(Sourcing.AddOpportunityFromSearchMutation, 'addFromSearch', { refetchQueries: [Sourcing.OpportunityStatsQuery] });
export const SourcingTileSource = graphQLTileSource(Sourcing.OpportunityTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});

export const OwnersSelect = graphqlSelect<Types.OwnersQueryVariables>(Sourcing.OwnersQuery);

// export const RejectButton = withRejectOpportunity((props)=>{
//     return (<XButton></XButton>);
// });

export const withDebugReaders = graphqlRouted(Debug.DebugReadedStatesQuery);
export const withSuperCities = graphqlRouted(SuperCity.SuperCitiesQuery);
export const withFolders = graphqlRouted(Folder.FoldersQuery);
export const withFolder = graphqlRouted(Folder.FolderQuery, { params: [], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });

export const withCreateFolderMutation = graphqlMutation(Folder.CreateFolderMutation, 'createFolder', { refetchQueries: [Folder.FoldersQuery] });
export const withDeleteFolderMutation = graphqlMutation(Folder.DeleteFolderMutation, 'deleteFolder', { refetchQueries: [Folder.FoldersQuery] });
export const withAlterFolderMutation = graphqlMutation(Folder.AlterFolderMutation, 'alterFolder', { refetchQueries: [Folder.FoldersQuery] });
export const withAddToFolderMutation = graphqlMutation(Folder.AddToFolderMutation, 'addToFolder', { refetchQueries: [Folder.FoldersQuery] });
export const withAddToFolderFromSearchMutation = graphqlMutation(Folder.AddToFolderFromSearchMutation, 'addToFolderFromSearch', { refetchQueries: [Folder.FoldersQuery] });
export const withCreateFolderFromSearchMutation = graphqlMutation(Folder.CreateFolderFromSearchMutation, 'createFolderFromSearch', { refetchQueries: [Folder.FoldersQuery] });
export const withSetFolderMutation = graphqlMutation(Folder.SetParcelFolderMutation, 'setFolder', { refetchQueries: [Folder.FoldersQuery] });
export const withFolderActions = graphqlCompose5(withCreateFolderMutation, withDeleteFolderMutation, withAlterFolderMutation, withAddToFolderMutation, withSetFolderMutation);
export const FolderSelect = graphqlSelect<{}>(Folder.FoldersSelectQuery);
export const FolderTileSource = graphQLTileSource(Folder.FolderItemsTileOverlayQuery, {
    propertiesFactory: (src) => ({ parcelId: src.parcel.id })
});

export const withFolderItems = graphqlRouted(Folder.FolderItemsConnectionQuery, { params: ['folderId', 'page', 'cursor'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });

export const ParcelMapSearch = graphQLMapSearchSource(Parcels.ParcelsMapSearchQuery);

export const withSampleTask = graphqlTask(Tasks.SampleTaskMutation);
export const withFolderExportTask = graphqlTask(Tasks.FolderExportTaskMutation);

//
// Invites
//

export const withInvites = graphqlRouted(Account.AccountInvitesQuery);
export const withInviteCreate = graphqlMutation(Account.AccountCreateInviteMutation, 'createInvite', { refetchQueries: [Account.AccountInvitesQuery] });
export const withInviteDestroy = graphqlMutation(Account.AccountDestroyInviteMutation, 'destroyInvite', { refetchQueries: [Account.AccountInvitesQuery] });
export const withInviteInfo = graphqlCompose2(
    graphqlRouted(Account.AccountInviteInfoQuery, { params: ['inviteKey'] }),
    graphqlMutation(Account.AccountInviteJoinMutation, 'doJoin', { params: ['inviteKey'] }));

//
// User Profile
//

export const withProfile = graphqlCompose2(
    graphqlRouted(Settings.ProfileQuery),
    graphqlMutation(Settings.ProfileUpdateMutation, 'updateProfile', { refetchQueries: [Account.AccountQuery] })
);

export const withProfileCreate = graphqlCompose2(
    graphqlMutation(Settings.ProfileCreateMutation, 'createProfile', { refetchQueries: [Account.AccountQuery] }),
    graphqlRouted(Account.ProfilePrefillQuery)
);