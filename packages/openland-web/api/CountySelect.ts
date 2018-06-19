import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { Addressing } from 'openland-api';

export const CountySelect = graphqlSelect<{ stateId: string }>(Addressing.CountyQuery);