import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  if(loading) return 'loading';

 const repositories = data.repositories;
  return  { repositories, error, loading };
};

export default useRepositories;