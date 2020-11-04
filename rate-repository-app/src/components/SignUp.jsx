import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useCreateUser from '../hooks/useCreateUser';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, 'Username must be longer than 1')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be longer than 5')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .min(5, 'Password must be longer than 5')
        .oneOf([yup.ref('password')], 'Password does not match').required('Password confirmation is required')
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
    signUpButton: {
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
    passwordConfirmation: '',
};


const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput style={styles.inputItem} testID='usernameField' name='username' placeholder='Username' />
            <FormikTextInput style={styles.inputItem} testID='passwordField' name='password' placeholder='Password' secureTextEntry={true} />
            <FormikTextInput style={styles.inputItem} testID='passwordConfirmationField' name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry={true} />
            <TouchableWithoutFeedback testID='submitButton' onPress={onSubmit}>
                <Text style={styles.signUpButton}>Sign Up</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const SignUpContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};
const SignUp = () => {
    const [createUser] = useCreateUser();
    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await createUser({ username, password });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <SignUpContainer onSubmit={onSubmit} />
    );
};

export default SignUp;