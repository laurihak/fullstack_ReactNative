import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES_BY } from '../graphql/queries';


export const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  // console.log('variables in useRepositories order:', orderBy, 'direction: ', orderDirection,'keyword: ', searchKeyword);
  const { data, error, loading } = useQuery(GET_REPOSITORIES_BY, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });
  let repositories = null;
  if (data) {
    repositories = data.repositories;
  }
  return { repositories, error, loading };
};

export default useRepositories;