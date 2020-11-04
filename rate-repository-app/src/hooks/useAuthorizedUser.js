import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useAuthorizedUser = () => {
    const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
        fetchPolicy: 'cache-and-network'
    });
    let user = null;
    if(error)return false;
    if(loading)return false;
    if (data) {
        if (data.authorizedUser) {
            user = data.authorizedUser;
        }
    }
    if(user) return true;
    return false;
};

export default useAuthorizedUser;