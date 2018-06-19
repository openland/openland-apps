import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ParcelNotesMutation } from 'openland-api/ParcelNotesMutation';

export const withParcelNotes = graphqlMutation(ParcelNotesMutation, 'parcelNotes', { params: ['parcelId'] });