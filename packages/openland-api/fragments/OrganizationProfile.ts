import { UserShort } from '../fragments/UserShort';
import gql from 'graphql-tag';
export const OrganizationProfile = gql`
    fragment OrganizationProfile on AlphaOrganizationProfile {
        id
        iAmOwner
        name
        photo
        personalOrganizationUser{
            ...UserShort
        }
        followed
        isCurrent
        photoRef {
            uuid
            crop{
                x
                y
                w
                h
            }
        }
        website
        potentialSites{
            from
            to
        }
        siteSizes{
            from
            to
        }
        about
        twitter
        facebook
        developmentModels
        availability
        contacts{
            name
            avatar
            avatarRef {
                uuid
                crop{
                    x
                    y
                    w
                    h
                }
            }
            role
            email
            phone
            link
        }
        landUse
        goodFor
        specialAttributes
    }
    ${UserShort}
`;