import React from 'react';
import { useMutation, gql, HttpLink, ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, TextField, Select, Chip, MenuItem } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const CREATE_USER = gql`
    mutation ($companyName: String!, $email: String!, $name: String!, $username: String!, $phone: Float!, $userType: UserType!) {
        createUser(
            userInput: { companyName: $companyName, email: $email, name: $name, phone: $phone, username: $username, userType: $userType }
        ) {
            id
            companyName
            email
            name
            phone
            username
            userType
        }
    }
`;

const AddUser = () => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql'
        }),
        cache: new InMemoryCache()
    });
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const { data, loading, error } = useMutation(CREATE_USER);
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    return (
        <>
            <Formik
                initialValues={{
                    companyName: '',
                    email: '',
                    name: '',
                    phone: null,
                    username: '',
                    userType: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    companyName: Yup.string().required('Company Name is required'),
                    email: Yup.string().required('Email is required'),
                    name: Yup.string().required('Name is required'),
                    phone: Yup.number().required('Phone Number is required'),
                    username: Yup.string().required('Username is required'),
                    userType: Yup.string().required('User Type is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log(values);

                    try {
                        const companyName = values.companyName;
                        const email = values.email;
                        const name = values.name;
                        const username = values.username;
                        const phone = parseInt(values.phone, 10);
                        const userType = values.userType;

                        await client.mutate({
                            variables: {
                                name,
                                username,
                                companyName,
                                email,
                                phone,
                                userType
                            },
                            mutation: CREATE_USER
                        });

                        if (scriptedRef.current) {
                            setStatus({ success: true });

                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.companyName && errors.companyName)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-user-companyName">Company Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-user-companyName"
                                type="text"
                                name="companyName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.companyName && errors.companyName && (
                                <FormHelperText error id="standard-weight-helper-text--compnayName">
                                    {errors.companyName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl fullWidth error={Boolean(touched.name && errors.name)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-user-name">Name</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-user-name"
                                type="text"
                                name="name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.name && errors.name && (
                                <FormHelperText error id="standard-weight-helper-text--name">
                                    {errors.name}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.username && errors.username)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-username">Username (Unique)</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-username"
                                type="text"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.username && errors.username && (
                                <FormHelperText error id="standard-weight-helper-text--username">
                                    {errors.username}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email">Email Address</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-email"
                                type="text"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--email">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-phone">Phone Number</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-phone"
                                type="text"
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.phone && errors.phone && (
                                <FormHelperText error id="standard-weight-helper-text--phone">
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <InputLabel htmlFor="outlined-adornment-usertype">Select User Type</InputLabel>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.userType && errors.userType)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <Select
                                labelId="outlined-adornment-usertype"
                                id="outlined-adornment-usertype"
                                value={values.userType}
                                label="User Type"
                                onChange={(event) => {
                                    const {
                                        target: { value }
                                    } = event;
                                    setFieldValue('userType', value);
                                    console.log(values);
                                }}
                            >
                                <MenuItem value="PROJECT_MANAGER">PROJECT_MANAGER</MenuItem>
                                <MenuItem value="CLIENT">CLIENT</MenuItem>
                                <MenuItem value="TRADIES">TRADIES</MenuItem>
                                <MenuItem value="NORMAL_STAFF">NORMAL_STAFF</MenuItem>
                            </Select>

                            {touched.userType && errors.userType && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.userType}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Add User
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddUser;
