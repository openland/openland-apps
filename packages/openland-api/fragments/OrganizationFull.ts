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
        developmentOportunities: alphaListingDevelopmentOportunities{
            name
            id
            name
            summary
            specialAttributes
            status
            updatedAt
            
            location{
                lat
                lon
            }
            locationTitle
            availability
            area
            price
            dealType
            shapeAndForm
            currentUse
            goodFitFor
            additionalLinks{
                text
                url
            }
        },
        acquisitionRequests: alphaListingAcquisitionRequests{
            name
            id
            name
            summary
            specialAttributes
            status
            updatedAt

            photo{
                uuid
                crop{
                    x
                    y
                    w
                    h
                }
            }
            shortDescription
            areaRange{
                from
                to
            }
            geographies
            landUse
            unitCapacity
        }
    }
`;