import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link, Redirect } from 'react-router-native';
import LogOut from './LogOut';

import useAuthorizedUser from '../hooks/useAuthorizedUser';

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
        color: theme.colors.white,
        fontSize: theme.fontSizes.bar,
        fontWeight: theme.fontWeights.bold
    },
    // ...
});

const AppBarTab = () => {
    const { user } = useAuthorizedUser({ includeReviews: false });

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
                    : <Link to='/create-review' component={TouchableWithoutFeedback}>
                        <Text style={styles.appBarItem}>Create Review</Text>
                    </Link>
                }
                {!user
                    ? null
                    : <Link to='/view-user-reviews' component={TouchableWithoutFeedback}>
                        <Text style={styles.appBarItem}>View Reviews</Text>
                    </Link>
                }
                {!user
                    ? <View>
                        <Link to='/login' component={TouchableWithoutFeedback}>
                            <Text style={styles.appBarItem}>Login</Text>
                        </Link>
                    </View>
                    : <View>
                        <LogOut style={styles.appBarItem}></LogOut>
                    </View>}
                {!user
                    ? <Link to='/sign-up' component={TouchableWithoutFeedback}>
                        <Text style={styles.appBarItem}>Sign Up</Text>
                    </Link>
                    : null
                }
                <Redirect to={'/'}></Redirect>
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