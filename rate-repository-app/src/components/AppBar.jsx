import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
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
        color: theme.colors.textWhite,
        fontSize: theme.fontSizes.bar,
        fontWeight: theme.fontWeights.bold
    },
    // ...
});

const AppBarTab = () => {
    const user = useAuthorizedUser();

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
                        <Link to='/login' component={TouchableWithoutFeedback}>
                            <Text style={styles.appBarItem}>Login</Text>
                        </Link>
                    </View>
                    : <View>
                        <LogOut style={styles.appBarItem}></LogOut>
                    </View>}
                {!user
                    ? <Link to='/signup' component={TouchableWithoutFeedback}>
                        <Text style={styles.appBarItem}>Sign Up</Text>
                    </Link>
                    : null
                }
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