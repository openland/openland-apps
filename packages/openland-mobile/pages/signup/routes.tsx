import { SignupUser } from './SignupUser';
import { SRoutesBuilder } from 'react-native-s/SRoutes';
import { SignupOrg } from './SignupOrg';
import { Waitlist } from './Waitlist';

export const SignupRoutes = new SRoutesBuilder()
  .addRoute('SignupUser', SignupUser)
  .addRoute('SignupOrg', SignupOrg)
  .addRoute('Waitlist', Waitlist)
  .build();