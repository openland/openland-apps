import { ChatCreateIntroMutation } from 'openland-api';
import { ChatEditIntroMutation } from 'openland-api';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';

const createIntro = graphqlMutation(ChatCreateIntroMutation, 'createIntro');
const editIntro = graphqlMutation(ChatEditIntroMutation, 'editIntro');

export const withIntro = graphqlCompose2(createIntro, editIntro);