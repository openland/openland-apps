import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withParcelNotes = graphqlMutation(Queries.Parcels.ParcelNotesMutation, 'parcelNotes', { params: ['parcelId'] });