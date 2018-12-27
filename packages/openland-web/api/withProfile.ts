import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ProfileQuery } from 'openland-api/ProfileQuery';
import { ProfileUpdateMutation } from 'openland-api/ProfileUpdateMutation';
import { AccountQuery } from 'openland-api/AccountQuery';
import { SetUserShortnameMutation } from 'openland-api/SetUserShortnameMutation';

export const withProfile = graphqlCompose3(
    graphqlRouted(ProfileQuery),
    graphqlMutation(ProfileUpdateMutation, 'updateProfile', {
        refetchQueries: [AccountQuery],
    }),
    graphqlMutation(SetUserShortnameMutation, 'setShortname', {
        refetchQueries: [AccountQuery],
    }),
);
