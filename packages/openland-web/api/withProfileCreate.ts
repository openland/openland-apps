import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Settings, Account } from 'openland-api';

export const withProfileCreate = graphqlCompose2(
    graphqlMutation(Settings.ProfileCreateMutation, 'createProfile', { refetchQueries: [Account.AccountQuery] }),
    graphqlRouted(Account.ProfilePrefillQuery)
);