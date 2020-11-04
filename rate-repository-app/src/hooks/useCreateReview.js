import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  let history = useHistory();

  const createReview = async ({ rating, repositoryName, ownerName, text }) => {
    // call the mutate function here with the right arguments
    const ratingInt = parseInt(rating);
    const { data } = await mutate({ variables: { rating: ratingInt, repositoryName, ownerName, text } });
    if (data) {
      history.push(`/repositories/${data.repositoryId}`);
      console.log(data);
    }
  };
  return [createReview, result];
};
export default useCreateReview;