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