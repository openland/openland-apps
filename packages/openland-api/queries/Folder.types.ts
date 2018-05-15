import { typedQuery } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Folder from './Folder';

export const FoldersQuery = typedQuery<Types.FoldersQuery, {}>(Folder.FoldersQuery);