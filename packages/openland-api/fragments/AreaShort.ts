import gql from 'graphql-tag';

export const AreaShort = gql`
    fragment AreaShort on Area {
        id
        slug
        writeAccess
    }
`;