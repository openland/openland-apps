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
import { FilePreview } from './pages/main/modals/FilePreview';
import { SettingsOrganizations } from './pages/main/beta/SettingsOrganizations';
import { SRoutesBuilder } from 'react-native-s/SRoutes';
import { NewOrganization } from './pages/main/NewOrganization';
import { EditOrganization } from './pages/main/EditOrganization';
import { EditCommunity } from './pages/main/EditCommunity';
import { SignupUser } from './pages/auth/SignupUser';
import { Waitlist } from './pages/auth/Waitlist';
import { EmailStart, EmailCode } from './pages/auth/EmailAuth';
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
import { GroupList } from './pages/main/GroupList';
import { SelectPrimaryOrganization } from './pages/main/SelectPrimaryOrganization';
import { SetUserShortname } from './pages/main/SetUserShortname';
import { SettingsAppearance } from './pages/main/SettingsAppearance';
import { HomeDialogs } from './pages/main/HomeDialogs';
import { SetOrgShortname } from './pages/main/SetOrgShortname';
import { EditGroup } from './pages/main/EditGroup';
import { EditGroupAdvanced } from './pages/main/EditGroupAdvanced';
import { GroupInvite } from './pages/main/GroupInvite';
import { UserPicker } from './pages/main/modals/UserPicker';
import Tasks from './pages/apps/Tasks';
import { MessageComments } from './pages/main/MessageComments';
import { Colors } from './pages/dev/Colors';
import { Discover } from './pages/main/Discover';
import { CommunityList } from './pages/main/CommunityList';
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
  .addRoute('NewOrganization', NewOrganization)
  .addRoute('EditCommunity', EditCommunity)
  .addRoute('EditOrganization', EditOrganization)
  .addRoute('FilePreview', FilePreview)
  .addRoute('Compose', Compose)
  .addRoute('CreateGroupAttrs', CreateGroupAttrs)
  .addRoute('OrganizationInviteLinkModal', ProfileOrganizationLink)
  .addRoute('GroupMultiplePicker', GroupMultiplePicker)
  .addRoute('UserMultiplePicker', UserMultiplePicker)
  .addRoute('UserPicker', UserPicker)
  .addRoute('ProfileGroupLink', ProfileGroupLink)
  .addRoute('ProfileOrganizationGroups', ProfileOrganizationGroups)
  .addRoute('GroupList', GroupList)
  .addRoute('GroupInvite', GroupInvite)
  .addRoute('MessageComments', MessageComments)
  .addRoute('NotificationCenter', NotificationCenter)

  .addRoute('SetUserShortname', SetUserShortname)
  .addRoute('SetOrgShortname', SetOrgShortname)
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

  .addRoute('HomeDialogs', HomeDialogs)

  .addRoute('Discover', Discover)
  .addRoute('InstallApps', InstallApps)
  .addRoute('StartConversation', StartConversation)
  .addRoute('Invites', Invites)
  .addRoute('InvitesMore', InvitesMore)

  .addRoute('CommunityList', CommunityList)

  .addRoute('Apps/Tasks', Tasks)

  .build();