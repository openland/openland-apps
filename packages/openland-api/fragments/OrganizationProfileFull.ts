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
        websiteTitle
        about
        twitter
        facebook
        linkedin

        shortname

        featured: alphaFeatured
    }
`;
