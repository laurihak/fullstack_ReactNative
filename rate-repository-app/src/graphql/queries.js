import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
        repositories {
          edges {
            node {
              id  
              name
              fullName
              description
              ownerName
              language
              forksCount
              reviewCount
              ratingAverage
              stargazersCount
              ownerAvatarUrl
            }
          }
        }
  }
`;

// other queries...