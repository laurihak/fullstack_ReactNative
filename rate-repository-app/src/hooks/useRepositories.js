import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  let repositories = null;
 if(data) {
  repositories = data.repositories;
 }
  return  { repositories, error, loading };
};

export default useRepositories;