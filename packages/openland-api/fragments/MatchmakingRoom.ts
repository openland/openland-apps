import gql from 'graphql-tag';

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
`;