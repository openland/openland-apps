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
import { UserPicker } from './pages/main/modals/UserPicker';
import { TextEditModal } from './pages/main/modals/TextEditModal';
import { ComposeModal } from './pages/main/modals/ComposeModal';
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
import { OrganizationInviteLinkModal } from './pages/main/modals/OrganizationInviteLinkModal';
import { UserMultiplePicker } from './pages/main/modals/UserMultiplePicker';
import { ProfileGroupLink } from './pages/main/ProfileGroupLink';
import { ProfileOrganizationGroups } from './pages/main/ProfileOrganizationGroups';
import { ExploreOrganizations } from './pages/main/ExploreOrganizations';

export const Routes = new SRoutesBuilder()
  .addRoute('Home', Home as any)
  .addRoute('Conversation', Conversation)
  .addRoute('ProfileUser', ProfileUser)
  .addRoute('ProfileOrganization', ProfileOrganization)
  .addRoute('ProfileGroup', ProfileGroup)
  .addRoute('SettingsProfile', SettingsProfile)
  .addRoute('SettingsNotifications', SettingsNotifications)
  .addRoute('SettingsOrganizations', SettingsOrganizations)
  .addRoute('NewOrganization', NewOrganization)
  .addRoute('EditOrganization', EditOrganization)
  .addRoute('UserPicker', UserPicker)
  .addRoute('TextEditModal', TextEditModal)
  .addRoute('ComposeModal', ComposeModal)
  .addRoute('FilePreview', FilePreview)
  .addRoute('DevTypography', Typography)
  .addRoute('DevComponents', Components)
  .addRoute('DevNavigation', Navigation)
  .addRoute('DevLoader', Loader)
  .addRoute('PhoneVerify', PhoneVerify)
  .addRoute('CountryPicker', CountryPicker)
  .addRoute('Compose', Compose)
  .addRoute('CreateGroupAttrs', CreateGroupAttrs)
  .addRoute('CreateChannel', CreateChannel)
  .addRoute('OrganizationInviteLinkModal', OrganizationInviteLinkModal)
  .addRoute('UserMultiplePicker', UserMultiplePicker)
  .addRoute('ProfileGroupLink', ProfileGroupLink)
  .addRoute('ProfileOrganizationGroups', ProfileOrganizationGroups)
  .addRoute('ExploreOrganizations', ExploreOrganizations)
  
  .addRoute('SignupUser', SignupUser)
  .addRoute('SignupOrg', SignupOrg)

  .addRoute('Waitlist', Waitlist)
  .addRoute('Login', Login)
  .addRoute('EmailStart', EmailStart)
  .addRoute('EmailCode', EmailCode)
  .build();