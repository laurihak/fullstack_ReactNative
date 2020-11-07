import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = (variables) => {
    const { data, loading, fetchMore, refetch, networkStatus } = useQuery(GET_AUTHORIZED_USER, {
        variables,
        fetchPolicy: 'cache-and-network'
    });

    const handleFetchMore = () => {
        if (!data.authorizedUser.reviews) {
            return null;
        }
        const canFetchMore =
            !loading && data && data.authorizedUser && data.authorizedUser.reviews && data.authorizedUser.reviews.pageInfo.hasNextPage;
        if (!canFetchMore) {
            return null;
        }
        fetchMore({
            query: GET_AUTHORIZED_USER,
            variables: {
                after: data.authorizedUser.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const nextResult = {
                    authorizedUser: {
                        ...previousResult.authorizedUser,
                        reviews: {
                            ...previousResult.authorizedUser.reviews,
                            ...fetchMoreResult.authorizedUser.reviews,
                            edges: [
                                ...previousResult.authorizedUser.reviews.edges,
                                ...fetchMoreResult.authorizedUser.reviews.edges,
                            ],
                        },
                    },
                };
                return nextResult;
            }
        });
    };
    if (!data) return { user: undefined };
    return {
        reviews: data.authorizedUser ? data.authorizedUser.reviews : undefined,
        user: data.authorizedUser ? data.authorizedUser : undefined,
        fetchMore: handleFetchMore,
        loading,
        refetch,
        networkStatus,
    };
};

export default useAuthorizedUser;