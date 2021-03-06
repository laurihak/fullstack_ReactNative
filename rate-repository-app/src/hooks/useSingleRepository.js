import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (variables) => {
  const { data, loading, fetchMore, refetch } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    // Other options
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return null;
    }
    fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges
              ],
            }
          },
        };

        return nextResult;
      }
    });
  };
  return {
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    refetch
  };
};
export default useSingleRepository;