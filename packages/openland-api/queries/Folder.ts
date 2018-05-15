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