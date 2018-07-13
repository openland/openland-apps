import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SettingsQuery } from 'openland-api/SettingsQuery';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SettingsUpdateMutation } from 'openland-api/SettingsUpdateMutation';

export const withSettings = graphqlCompose2(graphqlRouted(SettingsQuery), graphqlMutation(SettingsUpdateMutation, 'update'));