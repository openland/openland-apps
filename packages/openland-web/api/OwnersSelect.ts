import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { OwnersQuery } from 'openland-api/OwnersQuery';

export const OwnersSelect = graphqlSelect(OwnersQuery);