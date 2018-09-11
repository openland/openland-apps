import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ProfileUpdateMutation } from 'openland-api/ProfileUpdateMutation';

export const withUserProfileUpdate =  graphqlMutation(ProfileUpdateMutation, 'updateProfile');
