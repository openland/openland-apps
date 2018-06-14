import { withParcelRaw } from './withParcelRaw';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { Queries } from 'openland-api';

const ParcelMetadataAlter = graphqlMutation(Queries.Parcels.ParcelAlterMutation, 'parcelAlterMetadata', { params: ['parcelId'] });
export const withParcelMetadataForm = graphqlCompose2(withParcelRaw, ParcelMetadataAlter);