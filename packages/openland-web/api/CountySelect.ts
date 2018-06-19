import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { CountyQuery } from 'openland-api/CountyQuery';

export const CountySelect = graphqlSelect<{ stateId: string }>(CountyQuery);