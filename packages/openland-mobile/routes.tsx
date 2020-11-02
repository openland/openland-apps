import { Login } from './pages/auth/Login';
import { AuthStart, AuthCode } from './pages/auth/AuthStart';
import { Conversation } from './pages/main/Conversation';
import { Typography } from './pages/dev/Typography';
import { Components } from './pages/dev/Components';
import { SettingsProfile } from './pages/main/SettingsProfile';
import { SettingsNotifications } from './pages/main/SettingsNotifications';
import { SettingsPrivacy, ChangeLoginMethod, ChangeLoginMethodCode } from './pages/main/SettingsPrivacy';
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
import { SignupUser } from './pages/auth/SignupUser';
import { Waitlist } from './pages/auth/Waitlist';
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
import { SettingsLicenses } from './pages/main/SettingsLicenses';
import { HomeDialogs } from './pages/main/HomeDialogs';
import { SetShortname } from './pages/main/SetShortname';
import { EditGroup } from './pages/main/components/edit-group/EditGroup';
import { EditGroupSocialImage } from './pages/main/components/edit-group/EditGroupSocialImage';
import { EditGroupWelcomeMessage } from './pages/main/components/edit-group/EditGroupWelcomeMessage';
import { EditGroupPrice } from './pages/main/components/edit-group/EditGroupPrice';
import { GroupInvite } from './pages/main/GroupInvite';
import { UserPicker } from './pages/main/modals/UserPicker';
import { CountryPicker } from './pages/main/modals/CountryPicker';
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
import { Videos } from './pages/dev/Videos';
import { DocumentsExt } from './pages/dev/DocumentsExt';
import { SharedMedia } from './pages/shared-media/SharedMedia';
import { PowerUps } from './pages/dev/PowerUps';
import { Wallet } from './pages/wallet/Wallet';
import { Subscriptions } from './pages/wallet/Subscriptions';
import { AddCard } from './pages/wallet/AddCard';
import { Explore } from './pages/main/Explore';
import { Collections } from './pages/main/Collections';
import { Donation } from './pages/wallet/Donation';
import { SettingsCommunities } from './pages/main/SettingsCommunities';
import { MembersSearch } from './pages/main/modals/MembersSearch';
import { UserMutualGroups } from './pages/main/UserMutualGroups';
import { EditGroupServiceMessages } from './pages/main/components/edit-group/EditGroupServiceMessages';
import { EditGroupCalls } from './pages/main/components/edit-group/EditGroupCalls';
import { EditGroupSuperadmin } from './pages/main/components/edit-group/EditGroupSuperadmin';
import { StickersCatalog } from './pages/main/StickersCatalog';
import { EditCommunity } from './pages/main/components/edit-community/EditCommunity';
import { EditCommunitySocialImage } from './pages/main/components/edit-community/EditCommunitySocialImage';
import { EditCommunityDefaultGroups } from './pages/main/components/edit-community/EditCommunityDefaultGroups';
import { EditCommunityApplyLink } from './pages/main/components/edit-community/EditCommunityApplyLink';
import { ChatSearch } from './pages/main/ChatSearch';
import { EditCommunitySuperAdmin } from './pages/main/components/edit-community/EditCommunitySuperAdmin';
import { ReportSpam } from './pages/main/components/ReportSpam';

export const Routes = new SRoutesBuilder()
  .addRoute('Home', Home as any)
  .addRoute('Conversation', Conversation)
  .addRoute('ProfileUser', ProfileUser)
  .addRoute('ProfileOrganization', ProfileOrganization)
  .addRoute('ProfileGroup', ProfileGroup)
  .addRoute('ProfileGroupFeatured', ProfileGroupFeatured)
  .addRoute('EditGroup', EditGroup)
  .addRoute('EditGroupSocialImage', EditGroupSocialImage)
  .addRoute('EditGroupWelcomeMessage', EditGroupWelcomeMessage)
  .addRoute('EditGroupPrice', EditGroupPrice)
  .addRoute('EditGroupServiceMessages', EditGroupServiceMessages)
  .addRoute('EditGroupCalls', EditGroupCalls)
  .addRoute('EditGroupSuperadmin', EditGroupSuperadmin)
  .addRoute('SettingsProfile', SettingsProfile)
  .addRoute('SettingsPrivacy', SettingsPrivacy)
  .addRoute('ChangeLoginMethod', ChangeLoginMethod)
  .addRoute('ChangeLoginMethodCode', ChangeLoginMethodCode)
  .addRoute('SettingsNotifications', SettingsNotifications)
  .addRoute('SettingsEmail', SettingsEmail)
  .addRoute('SettingsOrganizations', SettingsOrganizations)
  .addRoute('SettingsAppearance', SettingsAppearance)
  .addRoute('SettingsAbout', SettingsAbout)
  .addRoute('SettingsLicenses', SettingsLicenses)
  .addRoute('SettingsCommunities', SettingsCommunities)
  .addRoute('NewOrganization', NewOrganization)
  .addRoute('EditCommunity', EditCommunity)
  .addRoute('EditCommunitySocialImage', EditCommunitySocialImage)
  .addRoute('EditCommunityDefaultGroups', EditCommunityDefaultGroups)
  .addRoute('EditCommunityApplyLink', EditCommunityApplyLink)
  .addRoute('EditCommunitySuperAdmin', EditCommunitySuperAdmin)
  .addRoute('EditOrganization', EditOrganization)
  .addRoute('Compose', Compose)
  .addRoute('CreateGroupAttrs', CreateGroupAttrs)
  .addRoute('OrganizationInviteLinkModal', ProfileOrganizationLink)
  .addRoute('GroupMultiplePicker', GroupMultiplePicker)
  .addRoute('UserMultiplePicker', UserMultiplePicker)
  .addRoute('UserPicker', UserPicker)
  .addRoute('CountryPicker', CountryPicker)
  .addRoute('MembersSearch', MembersSearch)
  .addRoute('ProfileGroupLink', ProfileGroupLink)
  .addRoute('ProfileOrganizationGroups', ProfileOrganizationGroups)
  .addRoute('DiscoverListing', DiscoverListing)
  .addRoute('GroupInvite', GroupInvite)
  .addRoute('Message', Message)
  .addRoute('NotificationCenter', NotificationCenter)
  .addRoute('StickersCatalog', StickersCatalog)

  .addRoute('SetUserShortname', SetUserShortname)
  .addRoute('SetShortname', SetShortname)
  .addRoute('SelectPrimaryOrganization', SelectPrimaryOrganization)

  .addRoute('SignupUser', SignupUser)

  .addRoute('Waitlist', Waitlist)
  .addRoute('Login', Login)
  .addRoute('AuthStart', AuthStart)
  .addRoute('AuthCode', AuthCode)

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
  .addRoute('InstallApps', InstallApps)
  .addRoute('StartConversation', StartConversation)
  .addRoute('Invites', Invites)
  .addRoute('InvitesMore', InvitesMore)
  .addRoute('Explore', Explore)
  .addRoute('Collections', Collections)

  .addRoute('Apps/Tasks', Tasks)

  .addRoute('SharedMedia', SharedMedia)
  .addRoute('ChatSearch', ChatSearch)
  .addRoute('ReportSpam', ReportSpam)
  .addRoute('UserMutualGroups', UserMutualGroups)

  .addRoute('Wallet', Wallet)
  .addRoute('Subscriptions', Subscriptions)
  .addRoute('AddCard', AddCard)
  .addRoute('Donation', Donation)

  .build();