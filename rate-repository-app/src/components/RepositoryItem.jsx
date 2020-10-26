import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    flexContainer: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    headerContainer: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        margin: 10,
    },
    image: {
        borderRadius: 10,
        overflow: 'hidden',
        height: 50,
        width: 50,
        borderWidth: 10
    },
    textContainer: {
        flexDirection: 'column',
        borderColor: 'white',
        marginTop: 5,
        marginLeft: 5,
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: 10,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoItem: {
        justifyContent: 'center',
        flexBasis: 100,
        fontWeight: theme.fontWeights.bold,
        textAlign: 'center',
    },
    descForItem: {
        justifyContent: 'center',
        alignSelf: 'center',
        flexBasis: 100,
        fontWeight: theme.fontWeights.normal,
        textAlign: 'center',
    },
    name: {
        margin: 5,
        fontWeight: theme.fontWeights.bold
    },
    description: {
        margin: 5
    },
    language: {
        paddingHorizontal: 5,
        margin: 5,
        alignSelf: 'flex-start',
        backgroundColor: '#0066cc',
        borderColor: '#0066cc',
        height: 20,
        borderRadius: 5,
        overflow: 'hidden',
        textAlign: 'center',
        color: 'white',
    }
});

const roundValue = (value) => {
    if (value > 1000) {
        return (value / 1000).toString().substr(0, 4) + 'k';
    } else {
        return value;
    }
};

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.flexContainer}>
            <View style={styles.headerContainer}>
                <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.fullName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.language}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoItem}>{roundValue(item.stargazersCount)}</Text>
                    <Text style={styles.infoItem}>{roundValue(item.forksCount)}</Text>
                    <Text style={styles.infoItem}>{roundValue(item.reviewCount)}</Text>
                    <Text style={styles.infoItem}>{roundValue(item.ratingAverage)}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.descForItem}>Stars</Text>
                    <Text style={styles.descForItem}>Forks</Text>
                    <Text style={styles.descForItem}>Reviews</Text>
                    <Text style={styles.descForItem}>Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem;