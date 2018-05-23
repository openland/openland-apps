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
        }
    }
`;

export const FolderItemsConnectionQuery = gql`
    query FolderItemsConnection($folderId: ID!, $cursor: String, $page: Int) {
        items: alphaFolderItems(folderId: $folderId, first: 50, after: $cursor, page: $page) {
            edges {
                node {
                    id
                    parcel {
                        ...ParcelShort
                    }
                }
                cursor
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                itemsCount
                currentPage
                pagesCount
                openEnded
            }
        }
    }
    ${ParcelShort}
`;

export const CreateFolderMutation = gql`
    mutation CreateFolder($name: String!, $initialParcels: [ID!]) {
        folder: alphaCreateFolder(name: $name, initialParcels: $initialParcels) {
            id
            name
            special
            parcelsCount
            parcels {
                edges {
                    node {
                        id
                        folder {
                            id
                            name
                        }
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
`;

export const AlterFolderMutation = gql`
    mutation AlterFolder($folderId: ID!, $name: String!) {
        alaterFolder: alphaAlterFolder(folderId: $folderId, name: $name) {
            id
            name
        }
    }
`;

export const DeleteFolderMutation = gql`
    mutation DeleteFolder($folderId: ID!) {
        alphaDeleteFolder(folderId: $folderId)
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