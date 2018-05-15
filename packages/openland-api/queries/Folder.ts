import gql from 'graphql-tag';

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
        }
    }
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