import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useHistory } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

import { LOG_IN } from '../graphql/mutations';

const useLogin = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(LOG_IN);
  let history = useHistory();

  const logIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments

    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    if (authStorage) { history.push('/repositories'); }
    apolloClient.resetStore();
  };
  return [logIn, result];
};

export default useLogin;