import { Login } from './pages/auth/Login';
import { Conversation } from './pages/main/Conversation';
import { Typography } from './pages/dev/Typography';
import { Components } from './pages/dev/Components';
import { SettingsProfile } from './pages/main/SettingsProfile';
import { SettingsNotifications } from './pages/main/SettingsNotifications';
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
import { PhoneVerify, CountryPicker } from './pages/auth/PhoneVerify';
import { SignupUser } from './pages/auth/SignupUser';
import { SignupOrg } from './pages/auth/SignupOrg';
import { Waitlist } from './pages/auth/Waitlist';
import { EmailStart, EmailCode } from './pages/auth/EmailAuth';
import { Compose } from './pages/main/Compose';
import { CreateGroupAttrs } from './pages/compose/CreateGroupAttrs';
import { CreateChannel } from './pages/compose/CreateChannel';
import { ProfileOrganizationLink } from './pages/main/ProfileOrganizationLink';
import { UserMultiplePicker } from './pages/main/modals/UserMultiplePicker';
import { ProfileGroupLink } from './pages/main/ProfileGroupLink';
import { ProfileOrganizationGroups } from './pages/main/ProfileOrganizationGroups';
import { ExploreOrganizations } from './pages/main/ExploreOrganizations';
import { Developer } from './pages/dev/Developer';
import { Worker } from './pages/dev/Worker';
import { Benchmark } from './pages/dev/Benchmark';
import { BenchmarkAsync } from './pages/dev/BenchmarkAsync';
import { Call } from './pages/main/Call';
import { BenchmarkAsyncDirect } from './pages/dev/BenchmarkAsyncDirect';
import { GroupList } from './pages/main/GroupList';

export const Routes = new SRoutesBuilder()
  .addRoute('Home', Home as any)
  .addRoute('Conversation', Conversation)
  .addRoute('Call', Call)
  .addRoute('ProfileUser', ProfileUser)
  .addRoute('ProfileOrganization', ProfileOrganization)
  .addRoute('ProfileGroup', ProfileGroup)
  .addRoute('SettingsProfile', SettingsProfile)
  .addRoute('SettingsNotifications', SettingsNotifications)
  .addRoute('SettingsOrganizations', SettingsOrganizations)
  .addRoute('NewOrganization', NewOrganization)
  .addRoute('EditOrganization', EditOrganization)
  .addRoute('FilePreview', FilePreview)
  .addRoute('PhoneVerify', PhoneVerify)
  .addRoute('CountryPicker', CountryPicker)
  .addRoute('Compose', Compose)
  .addRoute('CreateGroupAttrs', CreateGroupAttrs)
  .addRoute('CreateChannel', CreateChannel)
  .addRoute('OrganizationInviteLinkModal', ProfileOrganizationLink)
  .addRoute('UserMultiplePicker', UserMultiplePicker)
  .addRoute('ProfileGroupLink', ProfileGroupLink)
  .addRoute('ProfileOrganizationGroups', ProfileOrganizationGroups)
  .addRoute('ExploreOrganizations', ExploreOrganizations)
  .addRoute('GroupList', GroupList)

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

  .build();