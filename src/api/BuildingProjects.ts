import { gql } from 'react-apollo';
import graphqlList from './graphqlList';

export interface PipelineProjectShort {
    id: string;
    name: string;
    description?: string;
    status?: string;
    startedAt?: string;
    completedAt?: string;
    expectedCompletedAt?: string;
    verified: boolean;

    existingUnits?: number;
    proposedUnits?: number;
    existingAffordableUnits?: number;
    proposedAffordableUnits?: number;

    preview?: string;
    extrasDeveloper?: string;
    extrasGeneralConstructor?: string;
    extrasYearEnd?: string;
    extrasAddress?: string;
    extrasAddressSecondary?: string;
    extrasPermit?: string;
    extrasComment?: string;
    extrasUrl?: string;
}

const BuildingProjectsQuery = gql`
  query buildingProjects($cursor: String) {
      items: buildingProjects(first: 50, after: $cursor) {
          edges {
              node {
                id
                name
                description
                status
                startedAt
                completedAt
                expectedCompletedAt
                verified
                existingUnits
                proposedUnits
                existingAffordableUnits
                proposedAffordableUnits
                
                preview: picture(width: 224, height: 164)
                extrasDeveloper
                extrasGeneralConstructor
                extrasYearEnd
                extrasAddress
                extrasAddressSecondary
                extrasPermit
                extrasComment
                extrasUrl
              }
              cursor
          }
          pageInfo {
              hasNextPage
              hasPreviousPage
          }
      }
  }
  `;

export const withBuildingProjectsQuery = graphqlList<PipelineProjectShort, { filter?: string }>(BuildingProjectsQuery);