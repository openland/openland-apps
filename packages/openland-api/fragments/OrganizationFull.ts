import gql from 'graphql-tag';

export const OrganizationFull = gql`
    fragment OrganizationFull on Organization {
        id
        isMine
        editorial: alphaEditorial
        featured: alphaFeatured

        name
        photo

        website
        websiteTitle
        about
        twitter
        facebook
        linkedin
        location
        contacts: alphaContacts{
            firstName
            lastName
            photo: photoRef {
                uuid
            }
            phone
            email
            role: alphaRole
            linkedin: alphaLinkedin
            twitter: alphaTwitter
        }

        organizationType: alphaOrganizationType
        interests: alphaInterests
        locations: alphaLocations

        posts: alphaDummyPosts{
            text 
            type 
            description 
            date 
            image {
                uuid
                crop{
                    x
                    y
                    w
                    h
                }
            }
            activity 
            links{
                text
                url
            }
            pinned 
        }

        lookingFor: alphaLookingFor
        geographies: alphaGeographies
        doShapeAndForm: alphaDOShapeAndForm
        doCurrentUse: alphaDOCurrentUse
        doGoodFitFor: alphaDOGoodFitFor
        doSpecialAttributes: alphaDOSpecialAttributes
        doAvailability: alphaDOAvailability
        arGeographies: alphaARGeographies
        arAreaRange: alphaARAreaRange
        arHeightLimit: alphaARHeightLimit
        arActivityStatus: alphaARActivityStatus
        arAquisitionBudget: alphaARAquisitionBudget
        arAquisitionRate: alphaARAquisitionRate
        arClosingTime: alphaARClosingTime
        arSpecialAttributes: alphaARSpecialAttributes
        arLandUse: alphaARLandUse

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

        listingsAll: alphaListingsAll{
            id
            name
            type
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