import React from 'react';
import { useMutation, gql, HttpLink, ApolloClient, InMemoryCache, useQuery } from '@apollo/client';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput, TextField, Select, Chip, MenuItem } from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

const validStartDate = function (current) {
    return current.isBefore(moment());
};

// ===========================|| FIREBASE - REGISTER ||=========================== //
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const CREATE_PROJECT = gql`
    mutation ($projectName: String!, $description: String!, $startDate: DateTime!, $endDate: DateTime!, $users: [ID!]!) {
        createProject(
            projectInput: { projectName: $projectName, description: $description, startDate: $startDate, endDate: $endDate, users: $users }
        ) {
            _id
            projectName
            description
            startDate
            endDate
            users
        }
    }
`;

const USERS = gql`
    query {
        users {
            id
            name
            username
            companyName
            email
            phone
            userType
        }
    }
`;

const AddProject = () => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql'
        }),
        cache: new InMemoryCache()
    });
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [createProject] = useMutation(CREATE_PROJECT);
    const { data, loading, error } = useQuery(USERS);
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    console.log(data);
    const users = data.users.map((users) => users);

    const handleSelect = (selected) => {
        const matchID = users.filter((element) => selected.some((e) => element.id === e));
        const result = matchID.map((a) => a.name);
        return result;
    };

    return (
        <>
            <Formik
                initialValues={{
                    projectName: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    users: [],
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    projectName: Yup.string().required('Project Name is required'),
                    description: Yup.string().required('Description is required'),
                    startDate: Yup.date().required('Start Date is required'),
                    endDate: Yup.date().required('End Date is required'),
                    users: Yup.array().required('User is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const projectName = values.projectName;
                        const description = values.description;
                        const startDate = values.startDate;
                        const endDate = values.endDate;
                        const users = values.users;

                        await client.mutate({
                            variables: {
                                projectName,
                                description,
                                startDate,
                                endDate,
                                users
                            },
                            mutation: CREATE_PROJECT
                        }) .then(
                            () => {
                                window.location.href = '/project/project-list';
                            },
                            (err) => {
                                if (scriptedRef.current) {
                                    setStatus({ success: false });
                                    setErrors({ submit: err.message });
                                    setSubmitting(false);
                                }
                            }
                        );
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
                            error={Boolean(touched.projectName && errors.projectName)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-project-register">Project Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-project-register"
                                type="text"
                                name="projectName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.projectName && errors.projectName && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.projectName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.description && errors.description)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-project-description">Project Description</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-project-description"
                                type="text"
                                name="description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.description && errors.description && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.description}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <InputLabel htmlFor="outlined-adornment-project-start">Project Start Date</InputLabel>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.startDate && errors.startDate)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="outlined-adornment-project-start"
                                    name="startDate"
                                    renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                                    value={values.startDate}
                                    onChange={(dateFromValue) => {
                                        setFieldValue('startDate', dateFromValue.toISOString());
                                    }}
                                />
                            </LocalizationProvider>

                            {touched.startDate && errors.startDate && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.startDate}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <InputLabel htmlFor="outlined-adornment-project-end">Project End Date</InputLabel>
                        <FormControl fullWidth error={Boolean(touched.endDate && errors.endDate)} sx={{ ...theme.typography.customInput }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="outlined-adornment-project-start"
                                    name="endDate"
                                    renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                                    value={values.endDate}
                                    onChange={(dateFromValue) => {
                                        setFieldValue('endDate', dateFromValue.toISOString());
                                    }}
                                />
                            </LocalizationProvider>
                            {touched.endDate && errors.endDate && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.endDate}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <InputLabel htmlFor="outlined-adornment-users">Assign Users</InputLabel>
                        <FormControl fullWidth error={Boolean(touched.users && errors.users)} sx={{ ...theme.typography.customInput }}>
                            <Select
                                labelId="outlined-adornment-users-label"
                                id="outlined-adornment-users"
                                multiple
                                value={values.users}
                                onChange={(event) => {
                                    const {
                                        target: { value }
                                    } = event;
                                    setFieldValue('users', value);
                                }}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {handleSelect(selected).map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {data.users.map((users) => (
                                    <MenuItem key={users.name} value={users.id}>
                                        {users.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            {touched.users && errors.users && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.users}
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
                                    Add Project
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddProject;
