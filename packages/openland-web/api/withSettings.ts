import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SettingsQuery } from 'openland-api';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SettingsUpdateMutation } from 'openland-api';

export const withSettings = graphqlCompose2(
    graphqlRouted(SettingsQuery),
    graphqlMutation(SettingsUpdateMutation, 'update'),
);
