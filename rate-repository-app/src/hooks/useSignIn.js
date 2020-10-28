import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useContext } from 'react';
import AuthStorageContext from '../contexts/AuthStorageContext';

import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);
  
  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments

    const { data } = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    console.log('TOKEN: ', data.authorize.accessToken);
    apolloClient.resetStore();
  };
  return [signIn, result];
};

export default useSignIn;