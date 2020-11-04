import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';
import Text from './Text';
import useSingleRepository from '../hooks/useSingleRepository';
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
    const { data, loading, error } = useSingleRepository(id);

    if (loading) return (<Text>loading...</Text>);
    if (error) return (<Text>error...</Text>);

    let reviews = null;
    let repository = null;
    if (data.repository) {
        reviews = data.repository.reviews;
        repository = data.repository;
    }
    const reviewNodes = reviews
        ? reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList style={styles.container}
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} infoViewBool={true} />}
            ListHeaderComponentStyle={styles.headerComponent}
        // ...
        />
    );
};

export default SingleRepository;