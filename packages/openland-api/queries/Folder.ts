import gql from 'graphql-tag';
import { ParcelShort } from './Parcels';

export const FoldersQuery = gql`
    query Folders {
        folders: alphaFolders {
            id
            name
            special
            parcelsCount
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
            parcelsCount
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
            parcelsCount
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
                parcelsCount
            }
        }
    }
`;

export const SetParcelFolderMutation = gql`
    mutation SetParcelFolder($parcelId: ID!, $folderId: ID) {
        setFolder: alphaParcelSetFolder(parcelId: $parcelId, folderId: $folderId) {
            id
            folder {
                id
                name
                parcelsCount
            }
        }
    }
`;