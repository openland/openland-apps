import gql from 'graphql-tag';
export const OrganizationProfileFull = gql`
    fragment OrganizationProfileFull on OrganizationProfile {
        id
        name
        photoRef {
            uuid
            crop {
                x
                y
                w
                h
            }
        }
        website
        about
        twitter
        facebook
        location
        contacts {
            name
            photoRef {
                uuid
                crop{
                    x
                    y
                    w
                    h
                }
            }
            position
            email
            phone
            link
        }

        potentialSites: alphaPotentialSites {
            from
            to
        }
        siteSizes: alphaSiteSizes{
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