import { Queries } from 'openland-api';
import * as Types from 'openland-api/Types';
import { graphQLTileSource } from 'openland-x-graphql/graphqlTileSource';
import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2, graphqlCompose4, graphqlCompose6, graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { graphQLMapSearchSource } from 'openland-x-graphql/graphqlMapSearchSource';
import { graphqlTask } from 'openland-x-graphql/graphqlTask';
import { withParcelNotes } from './withParcelNotes';

//
// Admin
//

export const withSuperAccounts = graphqlRouted(Queries.Permissions.SuperAccountsQuery);
export const withSuperAccount = graphqlRouted(Queries.Permissions.SuperAccountQuery, { params: ['accountId'] });

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
export const withDeal = graphqlRouted(Queries.Deals.DealQuery, { params: ['dealId'] });
export const withDealAdd = graphqlMutation(Queries.Deals.AddDealMutation, 'add', { refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealRemove = graphqlMutation(Queries.Deals.RemoveDealMutation, 'remove', { params: ['dealId'], refetchQueries: [Queries.Deals.AllDealsQuery] });
export const withDealAlter = graphqlMutation(Queries.Deals.AlterDealMutation, 'alter', { params: ['dealId'] });
export const withDealAlterCombined = graphqlCompose2(withDealAlter, withDeal);
export const ParcelSelect = graphqlSelect(Queries.Parcels.ParcelsSearchQuery);

//
// Sourcing
//

export const withProspectingStats = graphqlRouted(Queries.Sourcing.OpportunityStatsQuery);
export const withSourcing = graphqlRouted(Queries.Sourcing.SourcingQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});
export const withSourcingFirst = graphqlRouted(Queries.Sourcing.SourcingFirstQuery, {
    params: ['filter', 'cursor', 'page', 'sort'], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only'
});
export const withSourcingAll = graphqlRouted(Queries.Sourcing.SourcingAllQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });
export const withSourcingAllReport = graphqlRouted(Queries.Sourcing.SourcingAllReportQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });
export const withSourcingCapacity = graphqlRouted(Queries.Sourcing.ProspectingCapacityQuery, { params: [], notifyOnNetworkStatusChange: false, fetchPolicy: 'network-only' });
export const withAddOpportunity = graphqlMutation(Queries.Sourcing.AddOpportunityMutation, 'add', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });

export const withNextOpportunity = graphqlRouted(Queries.Sourcing.NextOpportunityQuery, { params: ['initialId', 'sort'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });
export const withApproveOpportunity = graphqlMutation(Queries.Sourcing.ApproveOpportunityMutation, 'approve', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withRejectOpportunity = graphqlMutation(Queries.Sourcing.RejectOpportunityMutation, 'reject', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withSnoozeOpportunity = graphqlMutation(Queries.Sourcing.SnoozeOpportunityMutation, 'snooze', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withResetOpportunity = graphqlMutation(Queries.Sourcing.ResetOpportunityMutation, 'reset', { refetchQueries: [Queries.Sourcing.OpportunityStatsQuery] });
export const withOpportunityByIdGet = graphqlRouted(Queries.Sourcing.OpportunityQuery, { params: ['opportunityId'] });

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
export const withFolder = graphqlRouted(Queries.Folder.FolderQuery, { params: [], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });

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

export const withFolderItems = graphqlRouted(Queries.Folder.FolderItemsConnectionQuery, { params: ['folderId', 'page', 'cursor'], notifyOnNetworkStatusChange: true, fetchPolicy: 'network-only' });

export const ParcelMapSearch = graphQLMapSearchSource(Queries.Parcels.ParcelsMapSearchQuery);

export const withSampleTask = graphqlTask(Queries.Tasks.SampleTask);
export const withFolderExportTask = graphqlTask(Queries.Tasks.FolderExportTask);

//
// Invites
//

export const withInvites = graphqlRouted(Queries.Account.AccountInvitesQuery);
export const withInviteCreate = graphqlMutation(Queries.Account.AccountCreateInviteMutation, 'createInvite', { refetchQueries: [Queries.Account.AccountInvitesQuery] });
export const withInviteDestroy = graphqlMutation(Queries.Account.AccountDestroyInviteMutation, 'destroyInvite', { refetchQueries: [Queries.Account.AccountInvitesQuery] });
export const withInviteInfo = graphqlCompose2(
    graphqlRouted(Queries.Account.AccountInviteInfoQuery, { params: ['inviteKey'] }),
    graphqlMutation(Queries.Account.AccountInviteJoinMutation, 'doJoin', { params: ['inviteKey'] }));

//
// User Profile
//

export const withProfile = graphqlCompose2(
    graphqlRouted(Queries.Settings.ProfileQuery),
    graphqlMutation(Queries.Settings.ProfileUpdateMutation, 'updateProfile', { refetchQueries: [Queries.Account.AccountQuery] })
);

export const withProfileCreate = graphqlCompose2(
    graphqlMutation(Queries.Settings.ProfileCreateMutation, 'createProfile', { refetchQueries: [Queries.Account.AccountQuery] }),
    graphqlRouted(Queries.Account.ProfilePrefillQuery)
);