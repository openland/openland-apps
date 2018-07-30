
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationInviteOrganizationMutation, AlterMemberAsContactMutation, OrganizationMembersQuery } from 'openland-api';

export const withAlterMemberIsContact = graphqlMutation(AlterMemberAsContactMutation, 'alterIsContact', {refetchQueries: [OrganizationMembersQuery]});