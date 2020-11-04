import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { useHistory } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Owner is required'),
    repositoryName: yup
        .string()
        .required('Name is required'),
    rating: yup
        .number()
        .typeError('Value must be a number')
        .min(0, 'Rating must be between 0-100')
        .max(100, 'Rating must be between 0-100')
        .required('Rating is required'),
    text: yup
        .string()
        .max(200, 'Review must be shorter than 200')
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
        textAlignVertical: 'center'
    },
    descriptionText: {
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
    createReviewButton: {
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
    ownerName: '',
    repositoryName: '',
    text: ''
};

const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.formContainer}>
            <FormikTextInput style={styles.inputItem} testID='owner' name='ownerName' placeholder='Repository Owner' />
            <FormikTextInput style={styles.inputItem} testID='name' name='repositoryName' placeholder='Repositorys Name' />
            <FormikTextInput style={styles.inputItem} testID='rating' name='rating' placeholder='Rating' />
            <FormikTextInput style={styles.descriptionText} testID='review' name='text' placeholder='Review' multiline={true} />
            <TouchableOpacity testID='createReview' onPress={onSubmit}>
                <Text style={styles.createReviewButton}>Create Review</Text>
            </TouchableOpacity>
            <TouchableOpacity testID='cancelReview'>
                <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export const ReviewFormContainer = ({ onSubmit }) => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};
const CreateReview = () => {
    const history = useHistory();
    const [createReview] = useCreateReview();

    const onSubmit = async (values) => {
        const { rating, repositoryName, ownerName, text } = values;
        try {
            await createReview({ rating, repositoryName, ownerName, text });
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

