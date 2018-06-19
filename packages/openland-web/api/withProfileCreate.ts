import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ProfileCreateMutation } from 'openland-api/ProfileCreateMutation';
import { ProfilePrefillQuery } from 'openland-api/ProfilePrefillQuery';
import { AccountQuery } from 'openland-api/AccountQuery';

export const withProfileCreate = graphqlCompose2(
    graphqlMutation(ProfileCreateMutation, 'createProfile', { refetchQueries: [AccountQuery] }),
    graphqlRouted(ProfilePrefillQuery)
);