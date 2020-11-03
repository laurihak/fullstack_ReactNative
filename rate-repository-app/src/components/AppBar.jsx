import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/react-hooks';
import SignOut from './SignOut';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight * 2,
        backgroundColor: theme.colors.tabBackGround,
        paddingLeft: theme.paddings.left,
        paddingRight: theme.paddings.right,
        paddingBottom: Constants.statusBarHeight,
        // ...
    },
    scrollView: {
        flexDirection: 'row',
        // ...
    },
    appBarItem: {
        marginHorizontal: 5,
        color: theme.colors.textWhite,
        fontSize: theme.fontSizes.bar,
        fontWeight: theme.fontWeights.bold
    },
    // ...
});

const AppBarTab = () => {
    const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
    });
    let user = null;
    if (data) {
        if (data.authorizedUser) {
            user = data.authorizedUser;
        }
    }
    console.log(data);
    const redirectToReviewForm = () => {
        history.push(`/createReview`);
    };

    return (
        <View style={styles.container}>{/* */}
            <ScrollView horizontal={true} style={styles.scrollView}>{/* ... */}
                <View>
                    <Link to='/' component={TouchableWithoutFeedback}>
                        <Text style={styles.appBarItem}>Repositories</Text>
                    </Link>
                </View>
                {!user
                    ? null
                    : <Link to='/createReview' component={TouchableWithoutFeedback}>
                        <Text style={styles.appBarItem}>Create Review</Text>
                    </Link>
                }
                {!user
                    ? <View>
                        <Link to='/signin' component={TouchableWithoutFeedback}>
                            <Text style={styles.appBarItem}>Sign In</Text>
                        </Link>
                    </View>
                    : <View>
                        <SignOut style={styles.appBarItem}></SignOut>
                    </View>}
            </ScrollView>
        </View >
    );
};

const AppBar = () => {
    return (
        <AppBarTab />
    );
};

export default AppBar;