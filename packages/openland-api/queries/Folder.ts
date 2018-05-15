import gql from 'graphql-tag';
import { ParcelShort } from './Parcels';

export const FoldersQuery = gql`
    query Folders {
        folders: alphaFolders {
            id
            name
            special
        }
    }
`;

export const FolderQuery = gql`
    query Folder($folderId: ID!) {
        folder: alphaFolder(id: $folderId) {
            id
            name
            special
            parcels {
                edges {
                    node {
                        ...ParcelShort
                    }
                }
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                    itemsCount
                    pagesCount
                    currentPage
                    openEnded
                }
            }
        }
    }
    ${ParcelShort}
`;

export const CreateFolderMutation = gql`
    mutation CreateFolder($name: String!) {
        folder: alphaCreateFolder(name: $name) {
            id
            name
            special
        }
    }
`;