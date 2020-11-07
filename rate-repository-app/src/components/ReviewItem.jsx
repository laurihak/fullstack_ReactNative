import React from 'react';
import { format } from 'date-fns';
import { View, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import theme from '../theme';
import Text from './Text';
import { useHistory } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';

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
    rating: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderColor: '#0066cc',
        color: '#0066cc',
        fontSize: theme.fontSizes.subheading,
        borderWidth: 2,
    },
    textContainer: {
        flexDirection: 'column',
        borderColor: 'white',
        marginRight: 40,
        marginLeft: 10,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewRepositoryButton: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.lighBlue,
        margin: 10,
        borderRadius: 5,
        color: theme.colors.white,
    },
    removeRepositoryButton: {
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: theme.colors.red,
        margin: 10,
        borderRadius: 5,
        color: theme.colors.white,
    },
    name: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading,
    },
    repositoryName: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.body,
    },
    creatingDate: {
        fontWeight: theme.fontWeights.normal,
        color: 'gray',
        marginTop: 5,
    },
    description: {
        marginTop: 5,
    },
});


const ReviewItem = ({ review, showReviewer, refetch }) => {
    const history = useHistory();
    const user = review.user;
    const [deleteReview] = useDeleteReview();
    const date = format(new Date(review.createdAt), 'dd.MM.yyyy');

    const handleRemove = async() => {
        Alert.alert(
            'Delete review',
            'Are you sure you want to delete this review?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => console.log('CANCEL Pressed'),
                    style: 'cancel'
                },
                { text: 'DELETE', onPress: () => removeReview() }
            ],
            { cancelable: false }
        );
    };

    const removeReview = async() => {
     await deleteReview({id: review.id});
     refetch();
    };

    const handleLinkToRepo = () => {
        history.push(`/repositories/${review.repositoryId}`);
    };

    return (
        <View style={styles.flexContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.rating} testID={'rating'}>{review.rating}</Text>
                <View style={styles.textContainer}>
                    {showReviewer === true
                        ? <Text style={styles.name} testID={'username'}>{user.username}</Text>
                        : null}
                    {showReviewer === true
                        ? null
                        : <Text style={styles.repositoryName} testID={'username'}>{review.repository.name}</Text>}
                    <Text style={styles.creatingDate} testID={'username'}>{date}</Text>
                    <Text style={styles.description} testID={'description'}>{review.text}</Text>

                    {showReviewer === true
                        ? null
                        : <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleLinkToRepo}>
                                <Text style={styles.viewRepositoryButton} testID={'username'}>View repository</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleRemove}>
                                <Text style={styles.removeRepositoryButton} testID={'username'}>Delete review</Text>
                            </TouchableOpacity>
                        </View>}
                </View>
            </View>
        </View>
    );
};

export default ReviewItem;