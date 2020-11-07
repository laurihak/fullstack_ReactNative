import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES_BY } from '../graphql/queries';


export const useRepositories = (variables) => {
  // console.log('variables in useRepositories order:', orderBy, 'direction: ', orderDirection,'keyword: ', searchKeyword);
  const { data, loading, fetchMore,  ...result } = useQuery(GET_REPOSITORIES_BY, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return null;
    }
    fetchMore({
      query: GET_REPOSITORIES_BY,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges
            ],
          },
        };

        return nextResult;
      }
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};


export default useRepositories;