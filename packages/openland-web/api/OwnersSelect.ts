import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { Sourcing } from 'openland-api';

export const OwnersSelect = graphqlSelect(Sourcing.OwnersQuery);