import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import LogIn from './Login';
import SignUp from './SignUp';
import CreateReview from './ReviewForm';
import AppBar from './AppBar';
import UserReviewsList from './UserReviewsList';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.mainBackGround,
        width: theme.size.width,
        height: theme.size.height,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/login" exact>
                    <LogIn />
                </Route>
                <Route path="/sign-up" exact>
                    <SignUp />
                </Route>
                <Route path="/repositories/:id" exact>
                    <SingleRepository />
                </Route>
                <Route path="/create-review" exact>
                    <CreateReview />
                </Route>
                <Route path="/view-user-reviews" exact>
                    <UserReviewsList />
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