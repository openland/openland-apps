
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { AlterMemberAsContactMutation, OrganizationMembersQuery } from 'openland-api';

export const withAlterMemberIsContact = graphqlMutation(AlterMemberAsContactMutation, 'alterIsContact', {refetchQueries: [OrganizationMembersQuery]});