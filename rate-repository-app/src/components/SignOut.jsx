import React, { useContext } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';

import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';
import theme from '../theme';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
    textSignIn: {
        marginHorizontal: 5,
        color: theme.colors.textWhite,
        fontSize: theme.fontSizes.bar,
        fontWeight: theme.fontWeights.bold
    }
    // ...
});

const SignOutButton = ({ onSubmit }) => {

    return (
        <TouchableWithoutFeedback onPress={onSubmit}>
            <Text style={styles.textSignIn}>Sign Out</Text>
        </TouchableWithoutFeedback>
    );
};

const SignOut = () => {
    const authStorage = useContext(AuthStorageContext);
    const apolloClient = useApolloClient();
    let history = useHistory();
    const onSubmit = async () => {
        try {
            authStorage.removeAccessToken();
            apolloClient.resetStore();
            history.push('/signIn');
            
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SignOutButton onSubmit={onSubmit}></SignOutButton>
    );
};

export default SignOut;