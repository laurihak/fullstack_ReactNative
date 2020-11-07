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
query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
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
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      totalCount
      hasNextPage
    }
  }
}
`;

export const GET_REPOSITORY = gql`
query($id: ID!, $first: Int, $after: String) {
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
    reviews (first: $first, after: $after){
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
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query getAuthorizedUser($includeReviews: Boolean!, $first: Int, $after: String) {
  authorizedUser {
    id
    username
    reviews (first: $first, after: $after) @include(if: $includeReviews) {
      edges {
        node {
          id
          rating
          text
          createdAt
          repositoryId
          repository{
          	name
          }
          user {
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
    }
  }
}
`;

// other queries...