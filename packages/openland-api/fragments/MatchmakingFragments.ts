import gql from 'graphql-tag';

export const MatchmakingProfileFragment = gql`
    fragment MatchmakingProfileFragment on MatchmakingProfile {
        chatCreated
        user {
            id
            isYou
            name
            photo
            primaryOrganization {
                id
                name
            }
        }
        answers {
            ... on TextMatchmakingAnswer {
                question {
                    id
                    title
                    subtitle
                }
                answer
            }
            ... on MultiselectMatchmakingAnswer {
                question {
                    id
                    title
                    subtitle
                }
                tags
            }
        }
    }
`;

export const MatchmakingRoomFragment = gql`
    fragment MatchmakingRoomFragment on MatchmakingRoom {
        enabled
        questions {
            ... on TextMatchmakingQuestion {
                id
                title
                subtitle
            }
            ... on MultiselectMatchmakingQuestion {
                id
                title
                subtitle
                tags
            }
        }
        myProfile {
            ...MatchmakingProfileFragment
        }
        profiles {
            chatCreated
            user {
                id
                name
                photo
                primaryOrganization {
                    id
                    name
                    photo
                }
            }
            answers {
                ... on TextMatchmakingAnswer {
                    question {
                        id
                        title
                        subtitle
                    }
                    answer
                }
                ... on MultiselectMatchmakingAnswer {
                    question {
                        id
                        title
                        subtitle
                    }
                    tags
                }
            }
        }
    }
    ${MatchmakingProfileFragment}
`;