import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Organizations from './Organizations';

export const OrganizationsQuery = typedQuery<Types.OrganizationsQuery, {}>(Organizations.OrganizationsQuery);
export const OrganizationQuery = typedQuery<Types.OrganizationQuery, Types.OrganizationQueryVariables>(Organizations.OrganizationQuery);

export const OrganizationCreateMutation = typedMutation<Types.OrganizationCreateMutation, Types.OrganizationCreateMutationVariables>(Organizations.OrganizationCreateMutation);
export const OrganizationRemoveMutation = typedMutation<Types.OrganizationRemoveMutation, Types.OrganizationRemoveMutationVariables>(Organizations.OrganizationRemoveMutation);
export const OrganizationAlterMutation = typedMutation<Types.OrganizationAlterMutation, Types.OrganizationAlterMutationVariables>(Organizations.OrganizationAlterMutation);