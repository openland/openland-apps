import { ChatCreateIntroMutation } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';

export const withCreateIntro = graphqlMutation(ChatCreateIntroMutation, 'createIntro');