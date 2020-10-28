import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username must be logner than 1')
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
    InputItem: {
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
    SignInButton: {
        paddingHorizontal: 5,
        margin: 5,
        backgroundColor: '#0066cc',
        borderColor: '#0066cc',
        borderRadius: 5,
        minHeight: 30,
        textAlign: 'center',
        color: 'white',
        fontSize: theme.fontSizes.signIn
    },
});

const initialValues = {
    username: '',
    password: '',
};


const SignInForm = ({ onSubmit }) => {

    return (
        <View style={styles.formContainer}>
            <FormikTextInput style={styles.InputItem} name='username' placeholder='Username' />
            <FormikTextInput style={styles.InputItem} name='password' placeholder='Password' secureTextEntry={true} />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.SignInButton}>Sign in</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const SignIn = () => {
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signIn({ username, password });
          } catch (e) {
              console.log(e);
          }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;