import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import CreateReview from './ReviewForm';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.mainBackGround,
        marginBottom: 5,
        width: theme.size.width,
        height: theme.size.height,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/signin" exact>
                    <SignIn />
                </Route>
                <Route path="/repositories/:id" exact>
                    <SingleRepository />
                </Route>
                <Route path="/createReview" exact>
                    <CreateReview />
                </Route>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;