import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useLogin from '../hooks/useLogIn';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username must be longer than 1')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be longer than 5')
        .required('Password is required'),
});

const styles = StyleSheet.create({
    formContainer: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'right',
        minHeight: '100%',
        paddingTop: 20,
        backgroundColor: 'white',
    },
    inputItem: {
        margin: 5,
        marginTop: 10,
        fontSize: theme.fontSizes.signIn,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minWidth: 250,
        textAlign: 'left',
    },
    loginButton: {
        paddingHorizontal: 5,
        margin: 5,
        backgroundColor: '#0066cc',
        borderColor: '#0066cc',
        borderRadius: 5,
        minHeight: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: theme.fontSizes.signIn
    },
});

const initialValues = {
    username: '',
    password: '',
};


const LoginForm = ({ onSubmit }) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput style={styles.inputItem} testID='usernameField' name='username' placeholder='Username' />
            <FormikTextInput style={styles.inputItem} testID='passwordField' name='password' placeholder='Password' secureTextEntry={true} />
            <TouchableWithoutFeedback testID='submitButton' onPress={onSubmit}>
                <Text style={styles.loginButton}>Login</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const LoginContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
        </Formik>
    );
};
const Login = () => {
    const [login] = useLogin();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await login({ username, password });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <LoginContainer onSubmit={onSubmit} />
    );
};

export default Login;