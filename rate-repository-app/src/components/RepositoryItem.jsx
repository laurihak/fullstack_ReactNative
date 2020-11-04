import React from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import Text from './Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
    flexContainer: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        flexDirection: 'column',
        width: Dimensions.get('window').width,
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
        marginRight: 30,
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
    },
    githubContainer: {
        alignSelf: 'center',
        padding: 10,
    },
    githubButton: {
        color: 'white',
        backgroundColor: '#0066cc',
        alignSelf: 'center',
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
    },
    reviewButton: {
        color: 'white',
        backgroundColor: '#0066cc',
        alignSelf: 'center',
        marginTop: 20,
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
    }
});

const roundValue = (value) => {
    if (value > 1000) {
        return (value / 1000).toString().substr(0, 4) + 'k';
    } else {
        return value;
    }
};

const RepositoryItem = ({ item, infoViewBool }) => {
    const history = useHistory();

    if(!item)return null;
    const onClick = () => {
        history.push(`/repositories/${item.id}`);
    };
    const redirectToGitHub = () => {
        Linking.openURL(item.url);
    };

    if (infoViewBool) return (
        <View style={styles.flexContainer}>
            <View style={styles.headerContainer}>
                <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name} testID={'name'}>{item.fullName}</Text>
                    <Text style={styles.description} testID={'description'}>{item.description}</Text>
                    <Text style={styles.language} testID={'language'}>{item.language}</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <Text style={styles.infoItem} testID={'starGazerCount'}>{roundValue(item.stargazersCount)}</Text>
                    <Text style={styles.infoItem} testID={'forksCount'}>{roundValue(item.forksCount)}</Text>
                    <Text style={styles.infoItem} testID={'reviewCount'}>{roundValue(item.reviewCount)}</Text>
                    <Text style={styles.infoItem} testID={'ratingAverage'}>{roundValue(item.ratingAverage)}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.descForItem}>Stars</Text>
                    <Text style={styles.descForItem}>Forks</Text>
                    <Text style={styles.descForItem}>Reviews</Text>
                    <Text style={styles.descForItem}>Rating</Text>
                </View>
                <View style={styles.githubContainer}>
                    <TouchableOpacity onPress={redirectToGitHub} style={styles.githubButton}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Open in Github</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.flexContainer}>
                <View style={styles.headerContainer}>
                    <Image source={{ uri: item.ownerAvatarUrl }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.name} testID={'name'}>{item.fullName}</Text>
                        <Text style={styles.description} testID={'description'}>{item.description}</Text>
                        <Text style={styles.language} testID={'language'}>{item.language}</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoItem} testID={'starGazerCount'}>{roundValue(item.stargazersCount)}</Text>
                        <Text style={styles.infoItem} testID={'forksCount'}>{roundValue(item.forksCount)}</Text>
                        <Text style={styles.infoItem} testID={'reviewCount'}>{roundValue(item.reviewCount)}</Text>
                        <Text style={styles.infoItem} testID={'ratingAverage'}>{roundValue(item.ratingAverage)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.descForItem}>Stars</Text>
                        <Text style={styles.descForItem}>Forks</Text>
                        <Text style={styles.descForItem}>Reviews</Text>
                        <Text style={styles.descForItem}>Rating</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};



export default RepositoryItem;