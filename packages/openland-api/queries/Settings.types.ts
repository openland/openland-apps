import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Settings from './Settings';

export const ProfileQuery = typedQuery<Types.ProfileQuery, {}>(Settings.ProfileQuery);
export const ProfileUpdateMutation = typedMutation<Types.ProfileUpdateMutation, Types.ProfileUpdateMutationVariables>(Settings.ProfileUpdateMutation);
export const ProfileCreateMutation = typedMutation<Types.ProfileCreateMutation, Types.ProfileCreateMutationVariables>(Settings.ProfileCreateMutation);