import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';

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
    textHeadline: {
        marginHorizontal: 5,
        color: theme.colors.textWhite,
        fontSize: theme.fontSizes.bar,
        fontWeight: theme.fontWeights.bold
    },
    textSignIn: { 
        marginHorizontal: 5,
        color: theme.colors.textWhite,
        fontSize: theme.fontSizes.bar,
        fontWeight: theme.fontWeights.bold
    }
    // ...
});

const AppBarTab = () => {
    return (
        <View style={styles.container}>{/* */}
            <ScrollView horizontal={true} style={styles.scrollView}>{/* ... */}
                <View style={styles.textHeadline}>
                    <Link to='/' component={TouchableWithoutFeedback}>
                        <Text style={styles.textHeadline}>Repositories</Text>
                    </Link>
                </View>
                <View style={styles.textSignIn}>
                    <Link to='/signin' component={TouchableWithoutFeedback}>
                        <Text style={styles.textSignIn}>Sign In</Text>
                    </Link>
                </View>
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