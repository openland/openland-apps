import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { RoomSendEmailInviteMutation } from 'openland-api';

export const withChanneSendlnviteLink = graphqlMutation(RoomSendEmailInviteMutation, 'send');
