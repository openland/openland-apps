import { Login } from './pages/auth/Login';
import { Conversation } from './pages/main/Conversation';
import { Typography } from './pages/dev/Typography';
import { Components } from './pages/dev/Components';
import { SettingsProfile } from './pages/main/SettingsProfile';
import { SettingsNotifications } from './pages/main/SettingsNotifications';
import { SettingsEmail } from './pages/main/SettingsEmail';
import { ProfileUser } from './pages/main/ProfileUser';
import { ProfileOrganization } from './pages/main/ProfileOrganization';
import { ProfileGroup } from './pages/main/ProfileGroup';
import { Navigation } from './pages/dev/Navigation';
import { Loader } from './pages/dev/Loader';
import { Home } from './pages/main/Home';
import { SettingsOrganizations } from './pages/main/beta/SettingsOrganizations';
import { SRoutesBuilder } from 'react-native-s/SRoutes';
import { NewOrganization } from './pages/main/NewOrganization';
import { EditOrganization } from './pages/main/EditOrganization';
import { EditCommunity } from './pages/main/EditCommunity';
import { SignupUser } from './pages/auth/SignupUser';
import { Waitlist } from './pages/auth/Waitlist';
import { EmailStart, EmailCode } from './pages/auth/EmailAuth';
import { SignDiscover } from './pages/auth/SignDiscover';
import { Compose } from './pages/main/Compose';
import { CreateGroupAttrs } from './pages/compose/CreateGroupAttrs';
import { ProfileOrganizationLink } from './pages/main/ProfileOrganizationLink';
import { UserMultiplePicker } from './pages/main/modals/UserMultiplePicker';
import { ProfileGroupLink } from './pages/main/ProfileGroupLink';
import { ProfileOrganizationGroups } from './pages/main/ProfileOrganizationGroups';
import { Developer } from './pages/dev/Developer';
import { Worker } from './pages/dev/Worker';
import { Benchmark } from './pages/dev/Benchmark';
import { BenchmarkAsync } from './pages/dev/BenchmarkAsync';
import { BenchmarkAsyncDirect } from './pages/dev/BenchmarkAsyncDirect';
import { ToastPage } from './pages/dev/Toast';
import { BottomSheetPage } from './pages/dev/BottomSheetPage';
import { DiscoverListing } from './pages/main/DiscoverListing';
import { SelectPrimaryOrganization } from './pages/main/SelectPrimaryOrganization';
import { SetUserShortname } from './pages/main/SetUserShortname';
import { SettingsAppearance } from './pages/main/SettingsAppearance';
import { SettingsAbout } from './pages/main/SettingsAbout';
import { HomeDialogs } from './pages/main/HomeDialogs';
import { SetShortname } from './pages/main/SetShortname';
import { EditGroup } from './pages/main/EditGroup';
import { EditGroupAdvanced } from './pages/main/EditGroupAdvanced';
import { GroupInvite } from './pages/main/GroupInvite';
import { UserPicker } from './pages/main/modals/UserPicker';
import Tasks from './pages/apps/Tasks';
import { Message } from './pages/main/Message';
import { Colors } from './pages/dev/Colors';
import { Discover } from './pages/main/Discover';
import { GroupMultiplePicker } from './pages/main/modals/GroupMultiplePicker';
import { NotificationCenter } from './pages/main/NotificationCenter';
import { InstallApps } from './pages/main/InstallApps';
import { StartConversation } from './pages/main/StartConversation';
import { Invites } from './pages/main/Invites';
import { InvitesMore } from './pages/main/InvitesMore';
import { ProfileGroupFeatured } from './pages/main/ProfileGroupFeatured';
import { Buttons } from './pages/dev/Buttons';
import { Inputs } from './pages/dev/Inputs';
import { Avatars } from './pages/dev/Avatars';
import { SignupOrg } from './pages/auth/SignupOrg';
import { Videos } from './pages/dev/Videos';
import { DocumentsExt } from './pages/dev/DocumentsExt';
import { Feed } from './pages/feed/Feed';
import { FeedCreate } from './pages/feed/FeedCreate';
import { FeedEdit } from './pages/feed/FeedEdit';
import { FeedItem } from './pages/feed/FeedItem';
import { PostMentionPicker } from './pages/main/modals/PostMentionPicker';
import { FeedChannels } from './pages/feed/FeedChannels';
import { FeedChannel } from './pages/feed/FeedChannel';
import { FeedChannelCreate } from './pages/feed/FeedChannelCreate';
import { FeedChannelProfile } from './pages/feed/FeedChannelProfile';
import { FeedChannelEdit } from './pages/feed/FeedChannelEdit';
import { FeedChannelWriters } from './pages/feed/FeedChannelWriters';
import { SetFeedChannelShortname } from './pages/main/SetFeedChannelShortname';
import { FeedPublishTo } from './pages/feed/FeedPublishTo';
import { FeedChannelAddWriter } from './pages/feed/FeedChannelAddWriter';
import { FeedChannelEditAdvanced } from './pages/feed/FeedChannelEditAdvanced';
import { MatchmakingProfile } from './pages/matchmaking/MatchmakingProfile';
import { SharedMedia } from './pages/shared-media/SharedMedia';
import { PowerUps } from './pages/dev/PowerUps';
import { Wallet } from './pages/wallet/Wallet';
import { Subscriptions } from './pages/wallet/Subscriptions';
import { AddCard } from './pages/wallet/AddCard';
import { Explore } from './pages/main/Explore';
import { Collections } from './pages/main/Collections';

export const Routes = new SRoutesBuilder()
  .addRoute('Home', Home as any)
  .addRoute('Conversation', Conversation)
  .addRoute('ProfileUser', ProfileUser)
  .addRoute('ProfileOrganization', ProfileOrganization)
  .addRoute('ProfileGroup', ProfileGroup)
  .addRoute('ProfileGroupFeatured', ProfileGroupFeatured)
  .addRoute('EditGroup', EditGroup)
  .addRoute('EditGroupAdvanced', EditGroupAdvanced)
  .addRoute('SettingsProfile', SettingsProfile)
  .addRoute('SettingsNotifications', SettingsNotifications)
  .addRoute('SettingsEmail', SettingsEmail)
  .addRoute('SettingsOrganizations', SettingsOrganizations)
  .addRoute('SettingsAppearance', SettingsAppearance)
  .addRoute('SettingsAbout', SettingsAbout)
  .addRoute('NewOrganization', NewOrganization)
  .addRoute('EditCommunity', EditCommunity)
  .addRoute('EditOrganization', EditOrganization)
  .addRoute('Compose', Compose)
  .addRoute('CreateGroupAttrs', CreateGroupAttrs)
  .addRoute('OrganizationInviteLinkModal', ProfileOrganizationLink)
  .addRoute('GroupMultiplePicker', GroupMultiplePicker)
  .addRoute('UserMultiplePicker', UserMultiplePicker)
  .addRoute('UserPicker', UserPicker)
  .addRoute('PostMentionPicker', PostMentionPicker)
  .addRoute('ProfileGroupLink', ProfileGroupLink)
  .addRoute('ProfileOrganizationGroups', ProfileOrganizationGroups)
  .addRoute('DiscoverListing', DiscoverListing)
  .addRoute('GroupInvite', GroupInvite)
  .addRoute('Message', Message)
  .addRoute('NotificationCenter', NotificationCenter)

  .addRoute('SetUserShortname', SetUserShortname)
  .addRoute('SetShortname', SetShortname)
  .addRoute('SetFeedChannelShortname', SetFeedChannelShortname)
  .addRoute('SelectPrimaryOrganization', SelectPrimaryOrganization)

  .addRoute('SignupUser', SignupUser)
  .addRoute('SignupOrg', SignupOrg)

  .addRoute('Waitlist', Waitlist)
  .addRoute('Login', Login)
  .addRoute('EmailStart', EmailStart)
  .addRoute('EmailCode', EmailCode)

  .addRoute('Dev', Developer)
  .addRoute('DevWorker', Worker)
  .addRoute('DevTypography', Typography)
  .addRoute('DevComponents', Components)
  .addRoute('DevNavigation', Navigation)
  .addRoute('DevBenchmarks', Benchmark)
  .addRoute('DevBenchmarksAsync', BenchmarkAsync)
  .addRoute('DevBenchmarksAsyncDirect', BenchmarkAsyncDirect)
  .addRoute('DevLoader', Loader)
  .addRoute('DevColors', Colors)
  .addRoute('DevToast', ToastPage)
  .addRoute('DevBottomSheet', BottomSheetPage)
  .addRoute('DevButtons', Buttons)
  .addRoute('DevInputs', Inputs)
  .addRoute('DevAvatars', Avatars)
  .addRoute('DevVideos', Videos)
  .addRoute('DevDocumentsExt', DocumentsExt)
  .addRoute('DevPowerUps', PowerUps)

  .addRoute('HomeDialogs', HomeDialogs)

  .addRoute('Discover', Discover)
  .addRoute('SignDiscover', SignDiscover)
  .addRoute('InstallApps', InstallApps)
  .addRoute('StartConversation', StartConversation)
  .addRoute('Invites', Invites)
  .addRoute('InvitesMore', InvitesMore)
  .addRoute('Explore', Explore)
  .addRoute('Collections', Collections)

  .addRoute('Apps/Tasks', Tasks)

  .addRoute('Feed', Feed)
  .addRoute('FeedItem', FeedItem)
  .addRoute('FeedCreate', FeedCreate)
  .addRoute('FeedEdit', FeedEdit)
  .addRoute('FeedChannels', FeedChannels)
  .addRoute('FeedChannel', FeedChannel)
  .addRoute('FeedChannelCreate', FeedChannelCreate)
  .addRoute('FeedChannelProfile', FeedChannelProfile)
  .addRoute('FeedChannelEdit', FeedChannelEdit)
  .addRoute('FeedChannelEditAdvanced', FeedChannelEditAdvanced)
  .addRoute('FeedChannelWriters', FeedChannelWriters)
  .addRoute('FeedPublishTo', FeedPublishTo)
  .addRoute('FeedChannelAddWriter', FeedChannelAddWriter)

  .addRoute('MatchmakingProfile', MatchmakingProfile)

  .addRoute('SharedMedia', SharedMedia)

  .addRoute('Wallet', Wallet)
  .addRoute('Subscriptions', Subscriptions)
  .addRoute('AddCard', AddCard)

  .build();