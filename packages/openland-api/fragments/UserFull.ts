import gql from 'graphql-tag';
export const UserFull = gql`
    fragment UserFull on User {
        id
        name
        firstName
        lastName
        photo
        phone
        email
        website
        about
        location
        isBot
        isYou
        online
        lastSeen
        linkedin
        twitter
        primaryOrganization: alphaPrimaryOrganization {
            ...OrganizationShort
        }
        channels: channelsJoined {
            id
            title
            hidden
            photos
            photo
            membersCount
            organization{
                ...OrganizationShort
            }
        }
    }
`;