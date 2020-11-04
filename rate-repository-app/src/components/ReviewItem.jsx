import React from 'react';
import { format } from 'date-fns';
import { View, Dimensions, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

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
        marginRight: 30,
        marginLeft: 10,
    },
    name: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading,
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


const ReviewItem = ({ review }) => {
    const user = review.user;
    const date = format(new Date(review.createdAt), 'dd.MM.yyyy');
    return (
        <View style={styles.flexContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.rating} testID={'rating'}>{review.rating}</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.name} testID={'username'}>{user.username}</Text>
                    <Text style={styles.creatingDate} testID={'username'}>{date}</Text>
                    <Text style={styles.description} testID={'description'}>{review.text}</Text>
                </View>
            </View>
        </View>
    );
};

export default ReviewItem;