import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { CreateChannelMutation } from 'openland-api';

export const withCreateChannel = graphqlMutation(CreateChannelMutation, 'createChannel');