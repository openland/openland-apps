import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ProfileQuery } from 'openland-api/ProfileQuery';
import { ProfileUpdateMutation } from 'openland-api/ProfileUpdateMutation';
import { AccountQuery } from 'openland-api/AccountQuery';

export const withProfile = graphqlCompose2(
    graphqlRouted(ProfileQuery),
    graphqlMutation(ProfileUpdateMutation, 'updateProfile', { refetchQueries: [AccountQuery] })
);
