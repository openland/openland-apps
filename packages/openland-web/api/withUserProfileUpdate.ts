import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ProfileUpdateMutation } from 'openland-api';
import { AccountQuery } from 'openland-api';
import { MyOrganizationsQuery } from 'openland-api';

export const withUserProfileUpdate = graphqlMutation(ProfileUpdateMutation, 'updateProfile', {
    refetchQueries: [AccountQuery, MyOrganizationsQuery],
});
