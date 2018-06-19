import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { FoldersSelectQuery } from 'openland-api/FoldersSelectQuery';

export const FolderSelect = graphqlSelect<{}>(FoldersSelectQuery);