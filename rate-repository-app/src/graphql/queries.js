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
        url
      }
    }
  }
}
`;

export const GET_REPOSITORIES_BY = gql`
query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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
        url
      }
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query ($id: ID!){
  repository(id: $id) {
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
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
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