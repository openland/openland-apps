import gql from 'graphql-tag';

export const CurrentOrganizationProfileQuery = gql`
query CurrentOrganizationProfile {
    alphaCurrentOrganizationProfile {
        id
        iAmOwner
        title
        logo
        website
        potentialSites{
            from
            to
        }
        siteSizes{
            from
            to
        }
        description
        twitter
        facebook
        developmentModels
        availability
        contacts{
            name
            avatar
            role
            email
            phone
            link
        }
        landUse
        goodFor
        specialAttributes
    }
}
`;

export const EditOrganizationProfileMutation = gql`
mutation EditOrganizationProfile($title: String, $website: String, $role: String, $logo: ImageRefInput, $data: OrganizationProfileInput) {
    alphaEditOrganizationProfile(title: $title, website: $website, role: $role, logo: $logo, extras: $data)
}
`;