import { SignupUser } from './SignupUser';
import { SRoutesBuilder } from 'react-native-s/SRoutes';
import { SignupOrg } from './SignupOrg';
import { Waitlist } from './Waitlist';

export const SignupRoutes = (initial: string) => new SRoutesBuilder()
  .addRoute('SignupUser', SignupUser)
  .addRoute('SignupOrg', SignupOrg)
  .addRoute('Waitlist', Waitlist)
  .build(initial);