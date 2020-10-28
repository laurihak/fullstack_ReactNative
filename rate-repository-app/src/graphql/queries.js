import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
{
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

export const GET_AUTHORIZED_USER = gql`
{
  authorizedUser {
    id
    username
  }
}
`;

// other queries...