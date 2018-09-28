import { SignupUser } from './SignupUser';
import { SRoutesBuilder } from 'react-native-s/SRoutes';
import { SignupOrg } from './SignupOrg';
import { Waitlist } from './Waitlist';
import { EmailStart, EmailCode } from '../auth/EmailAuth';
import { Login } from '../auth/Login';
import { NewOrganization, NewOrganizationAction } from '../main/NewOrganization';
import { SRouter } from 'react-native-s/SRouter';

export const SignupRoutes = (initial: string, onOrgComplete: (router: SRouter) => void) => new SRoutesBuilder()
  .addRoute('SignupUser', SignupUser)
  .addRoute('SignupOrg', SignupOrg)
  .addRoute('NewOrganization', NewOrganizationAction(onOrgComplete))
  .addRoute('Waitlist', Waitlist)
  .build(initial);

export const EmailRoutes = new SRoutesBuilder()
  .addRoute('Login', Login)
  .addRoute('EmailStart', EmailStart)
  .addRoute('EmailCode', EmailCode)
  .build();