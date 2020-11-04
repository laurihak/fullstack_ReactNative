import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id }
  }, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  return { data, error, loading };
};
export default useSingleRepository;