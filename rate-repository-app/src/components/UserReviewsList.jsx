import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import Text from './Text';
import useAuthorizedUser from '../hooks/useAuthorizedUser';


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewListContainer = ({ reviews, onEndReach, refetch }) => {
    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <ReviewItem review={item} showReviewer={false} refetch={refetch} />

            )}
            keyExtractor={({ id }) => id}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.1}
            testID="repositoryList"
        />
    );
};
const UserReviewsList = () => {
    const { reviews, loading, fetchMore, refetch, } = useAuthorizedUser({ first: 8, includeReviews: true });

    if (loading) {
        setTimeout(() => {
            return <Text>Loading...</Text>;
        }, 3000);
    }
    if(!reviews) return <Text>Could not find reviews...</Text>;
    const onEndReach = () => {
        console.log('fetching more reviews for user');
        fetchMore();
    };
    const reviewNodes = reviews
        ? reviews.edges.map((edge) => edge.node)
        : [];

    if (!reviews) return (null);
    return (<ReviewListContainer reviews={reviewNodes} onEndReach={onEndReach} refetch={refetch} />
    );
};

export default UserReviewsList;