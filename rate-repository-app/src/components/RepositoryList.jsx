import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading, error } = useRepositories();
    // Get the nodes from the edges array
    if(error) return <Text>Error fetching repositories</Text>;
    if(loading) return <Text>Loading...</Text>;
    if(!repositories) return <Text>Loading...</Text>;
    const repositoryNodes = repositories
        ? repositories.edges.map(edge => edge.node)
        : [];

    return (
        <View>
            <FlatList
                data={repositoryNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <RepositoryItem item={item} />

                )}
            />
        </View>
    );
};

export default RepositoryList;