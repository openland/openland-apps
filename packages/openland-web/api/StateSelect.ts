import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { Addressing } from 'openland-api';

export const StateSelect = graphqlSelect(Addressing.StateQuery);