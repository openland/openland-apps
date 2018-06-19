import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';
import { Folder } from 'openland-api';

export const FolderSelect = graphqlSelect<{}>(Folder.FoldersSelectQuery);