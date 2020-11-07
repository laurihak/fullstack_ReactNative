import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';
import useSingleRepository from '../hooks/useSingleRepository';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
    container: {
    },
    separator: {
        height: 10,
    },
    headerComponent: {
        borderBottomColor: theme.colors.mainBackGround,
        paddingBottom: 10,
    },
    githubButton: {
        color: 'white',
        backgroundColor: '#0066cc',
        alignSelf: 'center',
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, loading, fetchMore } = useSingleRepository({ id: id, first: 2 });
    if (loading) {
        setTimeout(() => {
            return <Text>Loading...</Text>;
        }, 3000);
    }
    const onEndReach = () => {
        fetchMore();
    };
    if (!repository) return (<Text>Repo not found</Text>);
    const reviewNodes = repository.reviews
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];
    return (
        <FlatList style={styles.container}
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} showReviewer={true} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} infoViewBool={true} />}
            ListHeaderComponentStyle={styles.headerComponent}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        // ...
        />
    );
};

export default SingleRepository;