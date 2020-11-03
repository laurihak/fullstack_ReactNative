import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const validationSchema = yup.object().shape({
    owner: yup
        .string()
        .min(1, 'Owner must be longer than 1')
        .required('Owner is required'),
    name: yup
        .string()
        .min(5, 'Name must be longer than 5')
        .required('Name is required'),
    rating: yup
        .number()
        .typeError('Value must be a number')
        .min(0, 'Rating must be between 0-100')
        .max(100, 'Rating must be between 0-100')
        .required('Rating is required'),
    review: yup
        .string()
        .min(1, 'Review must be longer than 1')
        .optional(),
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
        textAlignVertical: 'top'
    },
    SignInButton: {
        paddingHorizontal: 5,
        textAlignVertical: 'center',
        margin: 5,
        backgroundColor: '#0066cc',
        borderColor: '#0066cc',
        borderRadius: 5,
        minHeight: 30,
        textAlign: 'center',
        color: 'white',
        fontSize: theme.fontSizes.signIn
    },
    cancelButton: {
        paddingHorizontal: 5,
        textAlignVertical: 'center',
        margin: 5,
        backgroundColor: '#B22222',
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
    password: ''
};

const ReviewForm = ({ onSubmit, onCancel }) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput style={styles.InputItem} testID='owner' name='owner' placeholder='Repository Owner' />
            <FormikTextInput style={styles.InputItem} testID='name' name='name' placeholder='Repositorys Name' />
            <FormikTextInput style={styles.InputItem} testID='rating' name='rating' placeholder='Rating' />
            <FormikTextInput style={styles.InputItem} testID='review' name='review' placeholder='Review' multiline={true} />
            <TouchableWithoutFeedback testID='submitButton' onPress={onSubmit}>
                <Text style={styles.SignInButton}>Create Review</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback testID='cancelButton' onPress={onCancel}>
                <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export const ReviewFormContainer = ({ onSubmit, onCancel }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} onCancel={onCancel} />}
        </Formik>
    );
};
const CreateReview = () => {
    const history = useHistory();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signIn({ username, password });
        } catch (e) {
            console.log(e);
        }
    };
    const onCancel = () => {
        history.goBack();
    };
    return (
        <ReviewFormContainer onSubmit={onSubmit} onCancel={onCancel} />
    );
};

export default CreateReview;

