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


export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
                <RepositoryItem item={item} infoViewBool={false} />

            )}
            testID="repositoryList"
        />
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
    const { repositories, loading, error } = useRepositories();
    if (error) return <Text>Error fetching repositories</Text>;
    if (loading) return <Text>Loading...</Text>;
    if (!repositories) return <Text>Loading...</Text>;
    return (<RepositoryListContainer repositories={repositories} />
    );
};

export default RepositoryList;