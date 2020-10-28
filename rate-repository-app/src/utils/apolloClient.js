import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const URI = Constants.manifest.extra.APOLLO_URI;

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    // Replace the IP address part with your own IP address!
    // eslint-disable-next-line no-undef
     uri: URI
  });
};

export default createApolloClient;