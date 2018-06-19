import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { ParcelsSearchQuery } from 'openland-api/ParcelsSearchQuery';

export const ParcelSelect = graphqlSelect(ParcelsSearchQuery);