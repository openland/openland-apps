import { ChatCreateIntroMutation } from 'openland-api';
import { ChatEditIntroMutation } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';

export const withIntro = graphqlCompose2(graphqlMutation(ChatCreateIntroMutation, 'createIntro'), graphqlMutation(ChatEditIntroMutation, 'editIntro'));