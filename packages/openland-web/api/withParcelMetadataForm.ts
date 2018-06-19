import { withParcelRaw } from './withParcelRaw';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { ParcelAlterMutation } from 'openland-api/ParcelAlterMutation';

const ParcelMetadataAlter = graphqlMutation(ParcelAlterMutation, 'parcelAlterMetadata', { params: ['parcelId'] });
export const withParcelMetadataForm = graphqlCompose2(withParcelRaw, ParcelMetadataAlter);