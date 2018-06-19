import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { Settings, Account } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withProfile = graphqlCompose2(
    graphqlRouted(Settings.ProfileQuery),
    graphqlMutation(Settings.ProfileUpdateMutation, 'updateProfile', { refetchQueries: [Account.AccountQuery] })
);
