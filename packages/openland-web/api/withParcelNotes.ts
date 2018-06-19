import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Parcels } from 'openland-api';

export const withParcelNotes = graphqlMutation(Parcels.ParcelNotesMutation, 'parcelNotes', { params: ['parcelId'] });