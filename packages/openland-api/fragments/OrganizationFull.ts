import gql from 'graphql-tag';

export const OrganizationFull = gql`
    fragment OrganizationFull on Organization {
        id
        isMine

        name
        photo

        website
        about
        twitter
        facebook
        location
        contacts{
            name
            photo
            position
            email
            phone
            link
        }

        followed: alphaFollowed

        potentialSites: alphaPotentialSites {
            from
            to
        }
        siteSizes: alphaSiteSizes {
            from
            to
        }
        developmentModels: alphaDevelopmentModels
        availability: alphaAvailability
        landUse: alphaLandUse
        goodFor: alphaGoodFor
        specialAttributes: alphaSpecialAttributes
        featuredOpportunities: alphaDummyFeaturedOpportunities{
            title
            location{
                lat
                lon
            }
            locationTitle
            tags
        }
    }
`;