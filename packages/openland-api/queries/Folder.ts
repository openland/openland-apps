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

export const FoldersSelectQuery = gql`
    query FoldersSelect {
        items: alphaFolders {
            id
            title: name
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

export const AddToFolderMutation = gql`
    mutation AddToFolder($parcelId: ID!, $folderId: ID!) {
        addToFolder: alphaParcelAddToFolder(parcelId: $parcelId, folderId: $folderId) {
            id
            folder {
                id
                name
            }
        }
    }
`;