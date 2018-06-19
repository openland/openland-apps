import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { Parcels } from 'openland-api';

export const ParcelSelect = graphqlSelect(Parcels.ParcelsSearchQuery);