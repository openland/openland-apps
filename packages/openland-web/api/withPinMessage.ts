import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { PinMessageMutation, UnpinMessageMutation } from 'openland-api';

export const withPinMessage = graphqlMutation(PinMessageMutation, 'pinMessage');
export const withUnpinMessage = graphqlMutation(UnpinMessageMutation, 'unpinMessage');
