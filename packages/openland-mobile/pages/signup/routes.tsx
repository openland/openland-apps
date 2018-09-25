import { SignupUser } from './SignupUser';
import { SRoutesBuilder } from 'react-native-s/SRoutes';

export const SignupRoutes = new SRoutesBuilder()
  .addRoute('SignupUser', SignupUser)
  .build();