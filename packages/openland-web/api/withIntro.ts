import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { RoomCreateIntroMutation, RoomEditIntroMutation } from 'openland-api';

const createIntro = graphqlMutation(RoomCreateIntroMutation, 'createIntro');
const editIntro = graphqlMutation(RoomEditIntroMutation, 'editIntro');

export const withIntro = graphqlCompose2(createIntro, editIntro);
