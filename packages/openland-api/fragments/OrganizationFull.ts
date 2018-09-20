import gql from 'graphql-tag';
import { UserShort } from './UserShort';

export const OrganizationFull = gql`
    fragment OrganizationFull on Organization {
        id
        superAccountId
        isMine
        isOwner: alphaIsOwner
        editorial: alphaEditorial
        featured: alphaFeatured
        isCommunity: alphaIsCommunity
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

        members: alphaOrganizationMembers{
            role
            user{
                ...UserShort

                photoRef {
                    uuid
                    crop {
                        x
                        y
                        w
                        h
                    }
                }
            }
        }

        organizationType: alphaOrganizationType
        interests: alphaInterests
        locations: alphaLocations

        channels: alphaCreatedChannels{
            id
            isRoot
            title
            photos
            photo
            membersCount
            memberRequestsCount
            hidden
            featured
        }

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
    ${UserShort}
`;