import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { FlatList, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const HeaderComponent = ({ orderBy, setOrderBy, searchKeyword, setSearchKeyword }) => {

    return (
        <>
            <SearchBarComponent searchQuery={searchKeyword} setSearchQuery={setSearchKeyword} />
            <SortingComponent orderBy={orderBy} setOrderBy={setOrderBy} />
        </>
    );
};
const SearchBarComponent = ({ searchQuery, setSearchQuery }) => {

    const onChangeSearch = query => setSearchQuery(query);
    return (
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
        />
    );
};
const SortingComponent = ({ orderBy, setOrderBy }) => {
    return (
        <Picker
            selectedValue={orderBy}
            onValueChange={(value) =>
                setOrderBy(value)
            }>
            <Picker.Item label="Latest repositories" value="CREATED_AT/DESC" />
            <Picker.Item label="Highest rated" value="RATING_AVERAGE/DESC" />
            <Picker.Item label="Lowest rated" value="RATING_AVERAGE/ASC" />
        </Picker>
    );
};

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
    renderHeader = () => {
        return (
            <HeaderComponent orderBy={this.props.orderBy} setOrderBy={this.props.setOrderBy} searchKeyword={this.props.searchKeyword} setSearchKeyword={this.props.setSearchKeyword} />
        );
    };


    render() {
        return (
            <FlatList
                data={this.props.repositories}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <RepositoryItem item={item} infoViewBool={false} />
                )}
                ListHeaderComponent={this.renderHeader}
                onEndReached={this.props.onEndReach}
                onEndReachedThreshold={0.5}
                testID="repositoryList"
            />
        );
    }
}
const RepositoryList = () => {
    const [orderBy, setOrderBy] = useState('CREATED_AT/DESC');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [debouncedKeyword] = useDebounce(searchKeyword, 1000);
    const order = orderBy.split('/');
    const { repositories, loading, fetchMore } = useRepositories({ first: 6, orderBy: order[0], orderDirection: order[1], searchKeyword: debouncedKeyword });

    if (loading) {
        setTimeout(() => {
            return <Text>Loading...</Text>;
        }, 3000);
    }
    const onEndReach = () => {
        fetchMore();
    };

    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (<RepositoryListContainer repositories={repositoryNodes} onEndReach={onEndReach} orderBy={orderBy} setOrderBy={setOrderBy} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
    );
};

export default RepositoryList;