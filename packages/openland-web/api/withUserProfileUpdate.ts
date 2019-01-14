import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ProfileUpdateMutation } from 'openland-api/ProfileUpdateMutation';
import { AccountQuery } from 'openland-api/AccountQuery';
import { MyOrganizationsQuery } from 'openland-api/MyOrganizationsQuery';

export const withUserProfileUpdate = graphqlMutation(ProfileUpdateMutation, 'updateProfile', {
    refetchQueries: [AccountQuery, MyOrganizationsQuery],
});
